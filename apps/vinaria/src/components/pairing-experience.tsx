"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { ethnyMenuTemplates, type EthnyCourseChoice } from "@/data/ethny-menu-templates";
import { recommendPairings } from "@/lib/pairing-engine";
import type {
  BudgetLevel,
  MealType,
  PairingRecommendation,
  PairingSource,
  WineColor,
} from "@/types";
import { WineCard } from "./wine-card";

const winePairingOffers: Record<"discovery" | "prestige", Partial<Record<3 | 4 | 5 | 6, number>>> = {
  discovery: { 3: 3500, 4: 4500, 5: 5500, 6: 6500 },
  prestige: { 3: 5500, 4: 6500, 5: 8500 },
};

const mealTypes = [
  ["dinner", "Dîner privé"],
  ["celebration", "Mariage / réception"],
  ["lunch", "Entreprise / lunch"],
  ["aperitif", "Walking dinner"],
] as const satisfies readonly [MealType, string][];

const colorOptions = [
  ["white", "Blanc"],
  ["red", "Rouge"],
  ["rose", "Rosé"],
  ["sparkling", "Bulles"],
  ["dessert", "Moelleux"],
] as const satisfies readonly [WineColor, string][];

const styleOptions = [
  "Cuisine française",
  "Fusion Ethny",
  "Méditerranéen",
  "Asiatique",
  "Végétal",
  "Épicé",
] as const;

const ethnyCueOptions = [
  "option végétarienne confirmée",
  "plat légèrement épicé",
  "sauce importante dans l’accord",
  "accord plus frais",
  "accord plus rond",
  "accord plus gourmand",
] as const;

const deliverySlotOptions = [
  ["morning", "Matin"],
  ["noon", "Midi"],
  ["evening", "Soir"],
] as const;

const ethnyProgressSteps = [
  ["Menu", "Base Ethny"],
  ["Plats", "Choix par service"],
  ["Résumé", "Date et zone"],
  ["Accords", "Sélection caviste"],
] as const;

const freeProgressSteps = [
  ["Formule", "Format"],
  ["Menu", "Plats libres"],
  ["Événement", "Date et zone"],
  ["Accords", "Sélection caviste"],
] as const;

const allowedBelgianPostalPrefixes = ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "30"];

interface ServiceInput {
  protein: string;
  cooking: string;
  sauce: string;
  side: string;
  style: string;
  allergies: string;
  notes: string;
}

interface ServiceResult {
  serviceIndex: number;
  serviceLabel: string;
  dish: string;
  alternatives: PairingRecommendation[];
}

interface EthnyCourseModifier {
  color: WineColor | "any";
  cues: string[];
}

function emptyService(): ServiceInput {
  return {
    protein: "",
    cooking: "",
    sauce: "",
    side: "",
    style: "Cuisine française",
    allergies: "",
    notes: "",
  };
}

function templateToServices(templateId: string): ServiceInput[] {
  const template = ethnyMenuTemplates.find((item) => item.id === templateId);
  if (!template) return [];

  return template.courses.map((course) => {
    const firstChoice = course.choices[0];
    return {
      protein: firstChoice?.name ?? course.label,
      cooking: "",
      sauce: firstChoice?.detail ?? "",
      side: course.label,
      style: template.defaultStyle,
      allergies: "",
      notes: `${template.title} · ${course.label}`,
    };
  });
}

function initialCourseSelections(templateId: string) {
  const template = ethnyMenuTemplates.find((item) => item.id === templateId);
  if (!template) return {};
  return Object.fromEntries(template.courses.map((course) => [course.label, 0])) as Record<string, number>;
}

function initialCourseModifiers(templateId: string) {
  const template = ethnyMenuTemplates.find((item) => item.id === templateId);
  if (!template) return {};
  return Object.fromEntries(
    template.courses.map((course) => [course.label, { color: "any", cues: [] }]),
  ) as Record<string, EthnyCourseModifier>;
}

function inferDishTags(choice: EthnyCourseChoice, defaultStyle: string) {
  const text = `${choice.name} ${choice.detail} ${defaultStyle}`.toLowerCase();
  const tags = new Set<string>();

  if (/vég|veget|légume|aubergine|carotte|risotto|pastèque|mangue|avocat/.test(text)) tags.add("végétal");
  if (/bar|saumon|thon|poisson|gravlax/.test(text)) tags.add("poisson");
  if (/bœuf|boeuf|canard|agneau|viande|picanha/.test(text)) tags.add("viande");
  if (/piment|gingembre|curry|galanga|épice|epice/.test(text)) tags.add("épicé");
  if (/fumé|fumee|fumé|grillé|grille|rôti|roti|laqué|laque/.test(text)) tags.add("grillé");
  if (/sauce|jus|bouillon|beurre blanc|miso|teriyaki|moqueca/.test(text)) tags.add("sauce");
  if (/cru|sashimi|ceviche|tartare/.test(text)) tags.add("cru");

  return Array.from(tags).slice(0, 4);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toInputDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function isInManualDeliveryZone(country: string, postalCode: string) {
  if (country !== "BE") return false;
  const prefix = postalCode.replace(/\D/g, "").slice(0, 2);
  return allowedBelgianPostalPrefixes.includes(prefix);
}

function serviceToDish(service: ServiceInput) {
  return [
    service.protein,
    service.cooking && `cuisson ${service.cooking}`,
    service.sauce && `sauce ${service.sauce}`,
    service.side && `accompagnement ${service.side}`,
    service.style,
    service.notes,
  ]
    .filter(Boolean)
    .join(" · ");
}

function serviceTags(service: ServiceInput) {
  return [
    service.protein,
    service.cooking,
    service.sauce,
    service.side,
    service.style,
    service.notes,
  ].filter(Boolean);
}

function confidenceScore(services: ServiceInput[]) {
  const scores = services.map((service) => {
    const coreFields = [service.protein, service.cooking, service.sauce, service.side, service.notes].filter(
      (value) => value.trim().length > 2,
    ).length;
    return Math.min(1, coreFields / 3);
  });
  return scores.reduce((sum, score) => sum + score, 0) / Math.max(1, scores.length);
}

export function PairingExperience({ source }: { source: PairingSource }) {
  const initialTemplateId = source === "ethny_menu" ? "fusion-signature" : "custom";
  const initialTemplate = ethnyMenuTemplates.find((template) => template.id === initialTemplateId);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId);
  const [guests, setGuests] = useState(6);
  const [servicesCount, setServicesCount] = useState<3 | 4 | 5 | 6>(initialTemplate?.servicesCount ?? 4);
  const [mealType, setMealType] = useState<MealType>(initialTemplate?.recommendedMealType ?? "dinner");
  const [budget, setBudget] = useState<BudgetLevel>("prestige");
  const [services, setServices] = useState<ServiceInput[]>(() =>
    initialTemplate ? templateToServices(initialTemplate.id) : Array.from({ length: 4 }, emptyService),
  );
  const [ethnyCourseSelections, setEthnyCourseSelections] = useState<Record<string, number>>(() =>
    initialCourseSelections(initialTemplateId),
  );
  const [ethnyCourseModifiers, setEthnyCourseModifiers] = useState<Record<string, EthnyCourseModifier>>(() =>
    initialCourseModifiers(initialTemplateId),
  );
  const [ethnyFinalNote, setEthnyFinalNote] = useState("");
  const [colors, setColors] = useState<WineColor[]>([]);
  const [preferences, setPreferences] = useState("");
  const [allergyConsent, setAllergyConsent] = useState(false);
  const [eventDate, setEventDate] = useState(toInputDate(addDays(new Date(), 14)));
  const [postalCode, setPostalCode] = useState("1300");
  const [city, setCity] = useState("Wavre");
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(toInputDate(addDays(new Date(), 2)));
  const [deliverySlot, setDeliverySlot] = useState<"morning" | "noon" | "evening">("evening");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [results, setResults] = useState<ServiceResult[]>([]);
  const [alternativeIndexes, setAlternativeIndexes] = useState<Record<number, number>>({});
  const [expertLeadReason, setExpertLeadReason] = useState<string | null>(null);

  const isEthnyMenu = source === "ethny_menu";
  const minEventDate = useMemo(() => toInputDate(addDays(new Date(), 7)), []);
  const minDeliveryDate = useMemo(() => toInputDate(addDays(new Date(), 2)), []);
  const selectedTemplate = ethnyMenuTemplates.find((template) => template.id === selectedTemplateId);
  const formula = budget === "exception" ? "prestige" : budget;
  const offerPricePerGuest = winePairingOffers[formula][servicesCount];
  const shortNotice = eventDate < minEventDate;
  const outsideZone = !isInManualDeliveryZone("BE", postalCode);

  function changeBudget(value: BudgetLevel) {
    setBudget(value);
    if (value === "prestige" && servicesCount === 6) changeServicesCount(5);
  }

  function changeServicesCount(nextCount: 3 | 4 | 5 | 6) {
    setServicesCount(nextCount);
    setServices((current) =>
      Array.from({ length: nextCount }, (_, index) => current[index] ?? emptyService()),
    );
  }

  function applyTemplate(templateId: string) {
    setSelectedTemplateId(templateId);
    if (templateId === "custom") {
      setServices(Array.from({ length: servicesCount }, emptyService));
      return;
    }

    const template = ethnyMenuTemplates.find((item) => item.id === templateId);
    if (!template) return;
    const nextServices = templateToServices(templateId);
    setServicesCount(template.servicesCount);
    setMealType(template.recommendedMealType);
    setServices(nextServices);
    setEthnyCourseSelections(initialCourseSelections(templateId));
    setEthnyCourseModifiers(initialCourseModifiers(templateId));
    if (template.servicesCount === 6 && budget === "prestige") setBudget("discovery");
  }

  function toggleColor(value: WineColor) {
    setColors((current) =>
      current.includes(value) ? current.filter((color) => color !== value) : [...current, value],
    );
  }

  function updateService(index: number, field: keyof ServiceInput, value: string) {
    setServices((current) =>
      current.map((service, serviceIndex) =>
        serviceIndex === index ? { ...service, [field]: value } : service,
      ),
    );
  }

  function selectEthnyCourse(courseLabel: string, choiceIndex: number) {
    setEthnyCourseSelections((current) => ({ ...current, [courseLabel]: choiceIndex }));
  }

  function setEthnyCourseColor(courseLabel: string, color: WineColor | "any") {
    setEthnyCourseModifiers((current) => ({
      ...current,
      [courseLabel]: { color, cues: current[courseLabel]?.cues ?? [] },
    }));
  }

  function toggleEthnyCue(courseLabel: string, cue: string) {
    setEthnyCourseModifiers((current) => {
      const existing = current[courseLabel] ?? { color: "any", cues: [] };
      const cues = existing.cues.includes(cue)
        ? existing.cues.filter((item) => item !== cue)
        : [...existing.cues, cue];
      return { ...current, [courseLabel]: { ...existing, cues } };
    });
  }

  function buildEthnyServices() {
    if (!selectedTemplate) return services;

    return selectedTemplate.courses.map((course) => {
      const selectedChoice = course.choices[ethnyCourseSelections[course.label] ?? 0] ?? course.choices[0];
      const modifier = ethnyCourseModifiers[course.label] ?? { color: "any", cues: [] };
      const precisionText = [
        selectedTemplate.title,
        course.label,
        modifier.cues.join(", "),
        modifier.color !== "any" && `préférence ${colorOptions.find(([value]) => value === modifier.color)?.[1].toLowerCase()}`,
        ethnyFinalNote && `note client : ${ethnyFinalNote}`,
      ].filter(Boolean).join(" · ");

      return {
        protein: selectedChoice?.name ?? course.label,
        cooking: "",
        sauce: selectedChoice?.detail ?? "",
        side: course.label,
        style: selectedTemplate.defaultStyle,
        allergies: "",
        notes: precisionText,
      };
    });
  }

  function preferredColorsForService(index: number) {
    if (!isEthnyMenu || !selectedTemplate) return colors;
    const course = selectedTemplate.courses[index];
    const color = course ? ethnyCourseModifiers[course.label]?.color : "any";
    return color && color !== "any" ? [color] : colors;
  }

  function composeResults(nextServices = services) {
    setExpertLeadReason(null);
    setAlternativeIndexes({});
    setServices(nextServices);
    const targetHasAllergies = nextServices.some((service) => service.allergies.trim().length > 0);

    if (shortNotice) {
      setExpertLeadReason("Votre événement est à moins de 7 jours : l’équipe reprend la demande en direct.");
      return;
    }
    if (outsideZone) {
      setExpertLeadReason("L’adresse semble hors zone manuelle V1 (~40 km autour du caviste). Contactez-nous pour l’organiser.");
      return;
    }
    if (targetHasAllergies && !allergyConsent) {
      setExpertLeadReason("Les allergies/restrictions demandent un consentement dédié avant traitement.");
      return;
    }
    if (confidenceScore(nextServices) < 0.58) {
      setExpertLeadReason("Votre demande mérite l’avis d’un spécialiste : le menu manque encore de détails pour recommander sans forcer.");
      return;
    }

    const nextResults = nextServices.map((service, index) => {
      const dish = serviceToDish(service);
      const alternatives = recommendPairings({
        source,
        dishes: [dish],
        guests,
        mealType,
        budget,
        preferences: preferences.split(",").map((item) => item.trim()).filter(Boolean),
        excludedTags: [],
        preferredColors: preferredColorsForService(index),
        culinaryTags: serviceTags(service),
      }).slice(0, 3);

      return {
        serviceIndex: index,
        serviceLabel: selectedTemplate?.courses[index]?.label ?? `Service ${index + 1}`,
        dish,
        alternatives,
      };
    });

    const averageTopScore =
      nextResults.reduce((sum, result) => sum + (result.alternatives[0]?.score ?? 0), 0) /
      Math.max(1, nextResults.length);

    if (averageTopScore < 14 || nextResults.some((result) => result.alternatives.length === 0)) {
      setExpertLeadReason("Votre demande mérite l’avis d’un spécialiste : aucun accord assez fiable n’a été forcé.");
      return;
    }

    setResults(nextResults);
    setStep(4);
  }

  function submitStep(event: FormEvent) {
    event.preventDefault();
    if (step === 1) setStep(2);
    if (step === 2) setStep(3);
    if (step === 3) composeResults();
  }

  function showAlternative(serviceIndex: number) {
    const current = alternativeIndexes[serviceIndex] ?? 0;
    const next = current + 1;
    const maxAlternative = Math.min(2, (results[serviceIndex]?.alternatives.length ?? 1) - 1);
    if (next > maxAlternative) {
      setExpertLeadReason("Vous avez déjà parcouru les alternatives V1 : créons maintenant un accord totalement personnalisé.");
      return;
    }
    setAlternativeIndexes((currentIndexes) => ({ ...currentIndexes, [serviceIndex]: next }));
  }

  function submitEthnyStep(event: FormEvent) {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
    if (step === 3) composeResults(buildEthnyServices());
  }

  function renderOrderIntake() {
    return (
      <section className="order-intake-card" aria-label="Formulaire de commande">
        <div className="order-intake-heading">
          <div>
            <span className="eyebrow">Commande</span>
            <h3>Vos informations de livraison</h3>
          </div>
          <dl>
            {selectedTemplate ? (
              <div><dt>Menu</dt><dd>{selectedTemplate.title}</dd></div>
            ) : (
              <div><dt>Formule</dt><dd>{formula === "discovery" ? "Découverte" : "Prestige"}</dd></div>
            )}
            <div><dt>Date événement</dt><dd>{eventDate}</dd></div>
          </dl>
        </div>

        <div className="order-intake-grid">
          <label className="field">
            <span>Date souhaitée</span>
            <input
              type="date"
              min={minDeliveryDate}
              value={deliveryDate}
              onChange={(event) => setDeliveryDate(event.target.value)}
            />
          </label>
          <fieldset className="delivery-slot-field">
            <legend>Créneau souhaité</legend>
            <div className="compact-segmented three">
              {deliverySlotOptions.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={deliverySlot === value ? "active" : ""}
                  onClick={() => setDeliverySlot(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="field">
            <span>Ville</span>
            <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Bruxelles, Wavre…" />
          </label>
          <label className="field">
            <span>Adresse</span>
            <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Rue, numéro…" />
          </label>
          <label className="field order-notes">
            <span>Informations complémentaires</span>
            <textarea
              value={deliveryInstructions}
              onChange={(event) => setDeliveryInstructions(event.target.value)}
              placeholder="Digicode, étage, instructions, cadeau, contact sur place…"
              rows={4}
            />
          </label>
        </div>
        <p>Première date disponible : minimum 48 h après confirmation. Aucun paiement n’est demandé avant validation caviste.</p>
        <Link className="primary-button full-button" href="/cart">
          Continuer vers la demande <ArrowRight size={17} />
        </Link>
      </section>
    );
  }

  if (isEthnyMenu) {
    return (
      <div className="pairing-layout ethny-menu-flow">
        <div className="flow-progress ethny-flow-progress" aria-label="Progression Menus Ethny">
          {ethnyProgressSteps.map(([label, helper], index) => (
            <span key={label} className={step >= index + 1 ? "active" : ""} aria-current={step === index + 1 ? "step" : undefined}>
              <i>{index + 1}</i>
              <b>{label}</b>
              <small>{helper}</small>
            </span>
          ))}
        </div>

        {step < 4 && (
          <form className="pairing-form ethny-menu-form" onSubmit={submitEthnyStep}>
            {step === 1 && (
              <>
                <div className="form-step ethny-step-heading">
                  <span className="step-number">01</span>
                  <div>
                    <h2>Choisissez votre menu Ethny</h2>
                    <p>Une base structurée suffit : sélectionnez le menu, le nombre de convives et la formule. Les plats viennent juste après.</p>
                  </div>
                </div>

                <div className="ethny-menu-toolbar">
                  <label className="field compact-field">
                    <span><Users size={16} /> Convives</span>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={guests}
                      onChange={(event) => setGuests(Number(event.target.value))}
                    />
                  </label>
                  <fieldset className="ethny-inline-fieldset">
                    <legend>Formule</legend>
                    <div className="compact-segmented">
                      {(["discovery", "prestige"] as const).map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={budget === value ? "active" : ""}
                          onClick={() => changeBudget(value)}
                        >
                          {value === "discovery" ? "Découverte" : "Prestige"}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="ethny-menu-card-grid">
                  {ethnyMenuTemplates.map((template) => (
                    <article
                      className={selectedTemplateId === template.id ? "ethny-menu-card selected" : "ethny-menu-card"}
                      key={template.id}
                    >
                      <span>{template.servicesCount} services</span>
                      <h3>{template.title}</h3>
                      <p>{template.subtitle}</p>
                      <small>{template.defaultStyle}</small>
                      <button type="button" onClick={() => applyTemplate(template.id)}>
                        {selectedTemplateId === template.id ? "Menu choisi" : "Choisir ce menu"}
                      </button>
                    </article>
                  ))}
                </div>
              </>
            )}

            {step === 2 && selectedTemplate && (
              <>
                <div className="form-step ethny-step-heading">
                  <span className="step-number">02</span>
                  <div>
                    <h2>Sélectionnez les plats</h2>
                    <p>Une sélection par service. Ajoutez seulement les précisions utiles à l’accord, pas de formulaire lourd.</p>
                  </div>
                </div>

                <div className="ethny-course-list">
                  {selectedTemplate.courses.map((course, courseIndex) => {
                    const selectedChoiceIndex = ethnyCourseSelections[course.label] ?? 0;
                    const modifier = ethnyCourseModifiers[course.label] ?? { color: "any", cues: [] };
                    return (
                      <section className="ethny-course-block" key={course.label}>
                        <div className="ethny-course-title">
                          <span>Service {courseIndex + 1}</span>
                          <h3>{course.label}</h3>
                        </div>

                        <div className="dish-choice-grid">
                          {course.choices.map((choice, choiceIndex) => {
                            const selected = selectedChoiceIndex === choiceIndex;
                            const tags = inferDishTags(choice, selectedTemplate.defaultStyle);
                            return (
                              <button
                                type="button"
                                key={choice.name}
                                className={selected ? "dish-choice-card selected" : "dish-choice-card"}
                                onClick={() => selectEthnyCourse(course.label, choiceIndex)}
                              >
                                <strong>{choice.name}</strong>
                                {choice.detail && <small>{choice.detail}</small>}
                                {tags.length > 0 && (
                                  <span className="dish-tags">
                                    {tags.map((tag) => <em key={tag}>{tag}</em>)}
                                  </span>
                                )}
                                <b>{selected ? "Sélectionné" : "Choisir"}</b>
                              </button>
                            );
                          })}
                        </div>

                        <div className="course-precision-row">
                          <div>
                            <span>Précisions utiles</span>
                            <div className="mini-chip-row">
                              {ethnyCueOptions.map((cue) => (
                                <button
                                  key={cue}
                                  type="button"
                                  className={modifier.cues.includes(cue) ? "mini-chip active" : "mini-chip"}
                                  onClick={() => toggleEthnyCue(course.label, cue)}
                                >
                                  {cue}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span>Couleur</span>
                            <div className="mini-chip-row">
                              <button
                                type="button"
                                className={modifier.color === "any" ? "mini-chip active" : "mini-chip"}
                                onClick={() => setEthnyCourseColor(course.label, "any")}
                              >
                                Sans préférence
                              </button>
                              {colorOptions.slice(0, 4).map(([value, label]) => (
                                <button
                                  key={value}
                                  type="button"
                                  className={modifier.color === value ? "mini-chip active" : "mini-chip"}
                                  onClick={() => setEthnyCourseColor(course.label, value)}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && selectedTemplate && (
              <>
                <div className="form-step ethny-step-heading">
                  <span className="step-number">03</span>
                  <div>
                    <h2>Votre menu sélectionné</h2>
                    <p>Vérifiez les choix principaux, ajoutez un dernier détail si besoin, puis Vinaria génère l’accord.</p>
                  </div>
                </div>

                <div className="ethny-summary-layout">
                  <aside className="ethny-summary-card">
                    <span className="eyebrow">Votre menu sélectionné</span>
                    <h3>{selectedTemplate.title}</h3>
                    <dl>
                      <div><dt>Convives</dt><dd>{guests}</dd></div>
                      <div><dt>Formule</dt><dd>{formula === "discovery" ? "Découverte" : "Prestige"}</dd></div>
                    </dl>
                    <ol>
                      {selectedTemplate.courses.map((course) => {
                        const choice = course.choices[ethnyCourseSelections[course.label] ?? 0] ?? course.choices[0];
                        return (
                          <li key={course.label}>
                            <span>{course.label}</span>
                            <strong>{choice?.name}</strong>
                          </li>
                        );
                      })}
                    </ol>
                  </aside>

                  <div className="ethny-summary-controls">
                    <div className="form-row two">
                      <label className="field">
                        <span><CalendarDays size={16} /> Date de l’événement</span>
                        <input type="date" min={minEventDate} value={eventDate} onChange={(event) => setEventDate(event.target.value)} />
                      </label>
                      <label className="field">
                        <span><MapPin size={16} /> Code postal</span>
                        <input value={postalCode} onChange={(event) => setPostalCode(event.target.value)} placeholder="1300" />
                      </label>
                    </div>
                    <div className="form-row two">
                      <label className="field">
                        <span>Ville</span>
                        <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Wavre" />
                      </label>
                      <label className="field">
                        <span>Un détail à nous confier ? <small>optionnel</small></span>
                        <input
                          value={ethnyFinalNote}
                          onChange={(event) => setEthnyFinalNote(event.target.value)}
                          placeholder="ex. repas en terrasse, préférence fraîcheur, surprise anniversaire…"
                        />
                      </label>
                    </div>

                    {(shortNotice || outsideZone) && (
                      <div className="expert-lead-card">
                        <AlertTriangle />
                        <div>
                          <strong>Contactez-nous</strong>
                          <p>
                            {shortNotice
                              ? "Votre date est trop proche pour le flux semi-automatique."
                              : "Cette zone sort du périmètre manuel V1 prévu autour du caviste."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {expertLeadReason && (
              <div className="expert-lead-card">
                <ShieldCheck />
                <div>
                  <strong>Votre demande mérite l’avis d’un spécialiste</strong>
                  <p>{expertLeadReason}</p>
                  <Link href="mailto:vinaria@ethny.be" className="text-link">Créer un accord personnalisé <ArrowRight size={15} /></Link>
                </div>
              </div>
            )}

            <div className="flow-actions ethny-flow-actions">
              {step > 1 && <button type="button" className="secondary-button" onClick={() => setStep((current) => (current - 1) as 1 | 2 | 3)}>Retour</button>}
              <button className="primary-button" type="submit">
                {step === 3 ? "Générer mon accord" : "Continuer"} <Sparkles size={18} />
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <section className="pairing-results guided-results" aria-live="polite">
            <div className="results-heading">
              <div>
                <span className="eyebrow">Résultat d’accord</span>
                <h2>Une sélection par service, validable par le caviste.</h2>
              </div>
            </div>

            <p className="curation-note">
              Les plats viennent du menu Ethny sélectionné. Le caviste confirme ensuite le stock, le millésime et les substitutions possibles avant paiement.
            </p>

            <div className="service-results">
              {results.map((result) => {
                const selectedIndex = alternativeIndexes[result.serviceIndex] ?? 0;
                const recommendation = result.alternatives[selectedIndex];
                if (!recommendation) return null;
                return (
                  <article className="service-result-card" key={result.serviceLabel}>
                    <div className="service-result-heading">
                      <div>
                        <span className="eyebrow">{result.serviceLabel}</span>
                        <h3>{result.dish}</h3>
                      </div>
                      <button type="button" className="secondary-button" onClick={() => showAlternative(result.serviceIndex)}>
                        Autre proposition
                      </button>
                    </div>
                    <WineCard
                      wine={recommendation.wine}
                      note={recommendation.explanation}
                      suggestedQuantity={recommendation.recommendedQuantity}
                      serviceLabel={result.serviceLabel}
                      variant="recommendation"
                    />
                    <div className="service-result-note">
                      <CheckCircle2 />
                      <p>
                        Quantité conseillée : {recommendation.recommendedQuantity} bouteille{recommendation.recommendedQuantity > 1 ? "s" : ""}.
                        Alternative {selectedIndex + 1}/3 maximum côté V1.
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {renderOrderIntake()}
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="pairing-layout">
      <div className="flow-progress" aria-label="Progression">
        {freeProgressSteps.map(([label, helper], index) => (
          <span key={label} className={step >= index + 1 ? "active" : ""} aria-current={step === index + 1 ? "step" : undefined}>
            <i>{index + 1}</i>
            <b>{label}</b>
            <small>{helper}</small>
          </span>
        ))}
      </div>

      {step < 4 && (
        <form className="pairing-form guided-flow-form" onSubmit={submitStep}>
          {step === 1 && (
            <>
              <div className="form-step">
                <span className="step-number">01</span>
                <div>
                  <h2>Votre table</h2>
                  <p>Composez un accord libre en indiquant seulement le format du repas. Le détail de vos plats vient à l’étape suivante.</p>
                </div>
              </div>

              <div className="form-row">
                <label className="field">
                  <span><Users size={16} /> Convives</span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={guests}
                    onChange={(event) => setGuests(Number(event.target.value))}
                  />
                </label>
                <label className="field">
                  <span>Services</span>
                  <select
                    value={servicesCount}
                    onChange={(event) => changeServicesCount(Number(event.target.value) as 3 | 4 | 5 | 6)}
                  >
                    <option value={3}>3 services</option>
                    <option value={4}>4 services</option>
                    <option value={5}>5 services</option>
                    {budget !== "prestige" && <option value={6}>6 services</option>}
                  </select>
                </label>
                <label className="field">
                  <span>Type de repas</span>
                  <select value={mealType} onChange={(event) => setMealType(event.target.value as MealType)}>
                    {mealTypes.map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
              </div>

              <fieldset>
                <legend>Gamme</legend>
                <div className="offer-switch">
                  {(["discovery", "prestige"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={budget === value ? "offer-card active" : "offer-card"}
                      onClick={() => changeBudget(value)}
                    >
                      <strong>{value === "discovery" ? "Découverte" : "Prestige"}</strong>
                      <small>
                        {value === "discovery"
                          ? "Accord accessible · cave curatée"
                          : "Sélection plus ambitieuse · validation caviste"}
                      </small>
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="formula-estimate sticky-estimate">
                <span>Gamme utilisée par le moteur</span>
                <strong>{offerPricePerGuest ? "Curatée" : "Sur mesure"}</strong>
                <small>Le budget guide les recommandations en interne. Le montant final est confirmé après validation caviste.</small>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-step">
                <span className="step-number">02</span>
                <div>
                  <h2>Saisie guidée par service</h2>
                  <p>Quelques champs précis valent mieux qu’un grand texte flou. Les allergies restent minimisées et ne sont jamais transmises au caviste.</p>
                </div>
              </div>

              <div className="service-editor-intro">
                <strong>{selectedTemplate ? `Base : ${selectedTemplate.title}` : "Base libre"}</strong>
                <span>Chaque ligne reste modifiable : Vinaria ne fige jamais un menu Ethny si la prestation a évolué.</span>
              </div>

              <div className="service-editor-grid">
                {services.map((service, index) => (
                  <section className="service-editor-card" key={index}>
                    <span className="eyebrow">{selectedTemplate?.courses[index]?.label ?? `Service ${index + 1}`}</span>
                    <div className="form-row two">
                      <label className="field">
                        <span>Protéine / base</span>
                        <input
                          required
                          value={service.protein}
                          onChange={(event) => updateService(index, "protein", event.target.value)}
                          placeholder="Bar, volaille, bœuf, légumes…"
                        />
                      </label>
                      <label className="field">
                        <span>Cuisson</span>
                        <input
                          value={service.cooking}
                          onChange={(event) => updateService(index, "cooking", event.target.value)}
                          placeholder="rôti, basse température, grillé…"
                        />
                      </label>
                    </div>
                    <div className="form-row two">
                      <label className="field">
                        <span>Sauce</span>
                        <input
                          value={service.sauce}
                          onChange={(event) => updateService(index, "sauce", event.target.value)}
                          placeholder="beurre blanc, jus court, curry…"
                        />
                      </label>
                      <label className="field">
                        <span>Accompagnement</span>
                        <input
                          value={service.side}
                          onChange={(event) => updateService(index, "side", event.target.value)}
                          placeholder="asperges, champignons, riz parfumé…"
                        />
                      </label>
                    </div>
                    <div className="form-row two">
                      <label className="field">
                        <span>Style</span>
                        <select value={service.style} onChange={(event) => updateService(index, "style", event.target.value)}>
                          {styleOptions.map((style) => <option key={style}>{style}</option>)}
                        </select>
                      </label>
                      <label className="field">
                        <span>Allergies / restrictions <small>optionnel</small></span>
                        <input
                          value={service.allergies}
                          onChange={(event) => updateService(index, "allergies", event.target.value)}
                          placeholder="à éviter, uniquement si utile"
                        />
                      </label>
                    </div>
                    <label className="field">
                      <span>Champ libre <small>optionnel</small></span>
                      <textarea
                        value={service.notes}
                        onChange={(event) => updateService(index, "notes", event.target.value)}
                        placeholder="Texture, dominante gustative, envie particulière…"
                        rows={2}
                      />
                    </label>
                  </section>
                ))}
              </div>

              <label className="sensitive-consent">
                <input
                  type="checkbox"
                  checked={allergyConsent}
                  onChange={(event) => setAllergyConsent(event.target.checked)}
                />
                <span>
                  J’accepte que Vinaria traite temporairement les allergies/restrictions indiquées pour construire l’accord.
                  <small>Ces informations sont minimisées, non transmises au caviste, et prévues pour purge après livraison.</small>
                </span>
              </label>

              <fieldset>
                <legend>Couleurs souhaitées <small>optionnel</small></legend>
                <div className="chip-group">
                  {colorOptions.map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      className={colors.includes(value) ? "chip active" : "chip"}
                      onClick={() => toggleColor(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="field">
                <span>Préférences <small>optionnel</small></span>
                <input
                  value={preferences}
                  onChange={(event) => setPreferences(event.target.value)}
                  placeholder="minéral, fruité, peu boisé…"
                />
              </label>
            </>
          )}

          {step === 3 && (
            <>
              <div className="form-step">
                <span className="step-number">03</span>
                <div>
                  <h2>Date et zone de livraison</h2>
                  <p>La V1 promet une livraison après validation et paiement, avec demande au plus tard 7 jours avant l’événement.</p>
                </div>
              </div>

              <div className="form-row two">
                <label className="field">
                  <span><CalendarDays size={16} /> Date de l’événement</span>
                  <input type="date" min={minEventDate} value={eventDate} onChange={(event) => setEventDate(event.target.value)} />
                </label>
                <label className="field">
                  <span><MapPin size={16} /> Code postal</span>
                  <input value={postalCode} onChange={(event) => setPostalCode(event.target.value)} placeholder="1300" />
                </label>
              </div>
              <div className="form-row two">
                <label className="field">
                  <span>Ville</span>
                  <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Wavre" />
                </label>
                <label className="field">
                  <span>Adresse <small>peut être complétée au checkout</small></span>
                  <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Rue, numéro…" />
                </label>
              </div>

              {(shortNotice || outsideZone) && (
                <div className="expert-lead-card">
                  <AlertTriangle />
                  <div>
                    <strong>Contactez-nous</strong>
                    <p>
                      {shortNotice
                        ? "Votre date est trop proche pour le flux semi-automatique."
                        : "Cette zone sort du périmètre manuel V1 prévu autour du caviste."}
                    </p>
                  </div>
                </div>
              )}

              <div className="recap-panel">
                <span className="eyebrow">Récapitulatif avant moteur</span>
                <dl>
                  <div><dt>Formule</dt><dd>{formula === "discovery" ? "Découverte" : "Prestige"}</dd></div>
                  <div><dt>Prix</dt><dd>Confirmé après validation</dd></div>
                  {selectedTemplate && <div><dt>Menu</dt><dd>{selectedTemplate.title}</dd></div>}
                  <div><dt>Services</dt><dd>{servicesCount}</dd></div>
                  <div><dt>Date</dt><dd>{eventDate}</dd></div>
                  <div><dt>Adresse</dt><dd>{postalCode} {city}</dd></div>
                </dl>
              </div>
            </>
          )}

          {expertLeadReason && (
            <div className="expert-lead-card">
              <ShieldCheck />
              <div>
                <strong>Votre demande mérite l’avis d’un spécialiste</strong>
                <p>{expertLeadReason}</p>
                <Link href="mailto:vinaria@ethny.be" className="text-link">Créer un accord personnalisé <ArrowRight size={15} /></Link>
              </div>
            </div>
          )}

          <div className="flow-actions">
            {step > 1 && <button type="button" className="secondary-button" onClick={() => setStep((current) => (current - 1) as 1 | 2 | 3)}>Retour</button>}
            <button className="primary-button" type="submit">
              {step === 3 ? "Lancer le moteur" : "Continuer"} <Sparkles size={18} />
            </button>
          </div>
        </form>
      )}

      {step === 4 && (
        <section className="pairing-results guided-results" aria-live="polite">
          <div className="results-heading">
            <div>
              <span className="eyebrow">Résultat d’accord</span>
              <h2>Une sélection par service, validable par le caviste.</h2>
            </div>
            <div className="estimate">
              <span>Formule</span>
              <strong>{formula === "discovery" ? "Découverte" : "Prestige"}</strong>
            </div>
          </div>

          <p className="curation-note">
            Chaque ligne reste une recommandation V1 : le caviste confirme le stock, le millésime et les substitutions possibles avant tout paiement.
          </p>

          {expertLeadReason && (
            <div className="expert-lead-card">
              <ShieldCheck />
              <div>
                <strong>Créons un accord personnalisé</strong>
                <p>{expertLeadReason}</p>
              </div>
            </div>
          )}

          <div className="service-results">
            {results.map((result) => {
              const selectedIndex = alternativeIndexes[result.serviceIndex] ?? 0;
              const recommendation = result.alternatives[selectedIndex];
              if (!recommendation) return null;
              return (
                <article className="service-result-card" key={result.serviceLabel}>
                  <div className="service-result-heading">
                    <div>
                      <span className="eyebrow">{result.serviceLabel}</span>
                      <h3>{result.dish}</h3>
                    </div>
                    <button type="button" className="secondary-button" onClick={() => showAlternative(result.serviceIndex)}>
                      Autre proposition
                    </button>
                  </div>
                  <WineCard
                    wine={recommendation.wine}
                    note={recommendation.explanation}
                    suggestedQuantity={recommendation.recommendedQuantity}
                    serviceLabel={result.serviceLabel}
                    variant="recommendation"
                  />
                  <div className="service-result-note">
                    <CheckCircle2 />
                    <p>
                      Quantité conseillée : {recommendation.recommendedQuantity} bouteille{recommendation.recommendedQuantity > 1 ? "s" : ""}.
                      Alternative {selectedIndex + 1}/3 maximum côté V1.
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {renderOrderIntake()}
        </section>
      )}
    </div>
  );
}
