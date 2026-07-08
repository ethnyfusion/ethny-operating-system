import { Text } from "@react-email/components";
import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnyMenuBlock } from "../components/EthnyMenuBlock";
import { EthnySection } from "../components/EthnySection";
import { EthnyServiceCard } from "../components/EthnyServiceCard";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyMarketingLayout } from "../layouts/EthnyMarketingLayout";
import { emailBrand, emailVariables } from "../tokens/email-brand";
import { emailTypography } from "../tokens/email-typography";

export default function PrivateChefExperience() {
  return (
    <EthnyMarketingLayout
      preview="Une experience chef a domicile premium, claire et adaptee a votre table."
      eyebrow="Chef a domicile"
    >
      <EthnyHero
        eyebrow="Experience privee"
        title="Un diner de chef, chez vous"
        intro={`Bonjour ${emailVariables.firstName}, pour un ${emailVariables.eventType} ou une table plus intime, Ethny propose une experience chef a domicile soignee, conviviale et adaptee au rythme de vos invites.`}
        image={emailBrand.assets.heroPrivateChef}
        ctaHref={emailVariables.bookingLink}
        ctaLabel="Verifier la disponibilite"
      />
      <EthnySection>
        <EthnyServiceCard
          icon={emailBrand.assets.chefIcon}
          title="Sur mesure, du menu au service"
          text="La proposition peut integrer menu, accords vins, aperitif, service, vaisselle ou materiel selon le lieu et le niveau d'accompagnement souhaite."
        />
      </EthnySection>
      <EthnySection background="cream">
        <EthnyMenuBlock
          title="Exemple de construction"
          intro="A adapter selon la saison, les contraintes alimentaires et le format."
          items={[
            "Accueil et mise en bouche",
            "Entree autour du vegetal, des epices ou de la mer",
            "Plat signature selon les influences Ethny",
            "Dessert soigne et final de table",
          ]}
          note="Cet exemple n'est pas un devis confirme."
        />
      </EthnySection>
      <EthnySection>
        <Text style={bodyStyle}>
          Si vous avez deja une date en tete, vous pouvez transmettre les
          premieres informations. La disponibilite sera confirmee apres
          verification.
        </Text>
        <EthnyCTA
          title="Preparer votre table"
          text="Une proposition claire peut etre preparee avec les postes separes."
          href={emailVariables.quoteLink}
          label="Recevoir un devis personnalise"
        />
      </EthnySection>
      <EthnySection>
        <EthnySignature />
      </EthnySection>
    </EthnyMarketingLayout>
  );
}

const bodyStyle = {
  color: "rgba(42, 42, 42, 0.78)",
  fontFamily: emailTypography.body,
  fontSize: 16,
  lineHeight: "25px",
  margin: "0 0 22px",
};
