import { EthnyCTA } from "../components/EthnyCTA";
import { EthnyHero } from "../components/EthnyHero";
import { EthnyMenuBlock } from "../components/EthnyMenuBlock";
import { EthnySection } from "../components/EthnySection";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyNewsletterLayout } from "../layouts/EthnyNewsletterLayout";
import { emailBrand, emailVariables } from "../tokens/email-brand";

export default function SeasonalMenuEmail() {
  return (
    <EthnyNewsletterLayout preview="Une inspiration de saison pour imaginer une prochaine table Ethny.">
      <EthnyHero
        eyebrow="Inspiration de saison"
        title="Une table autour du vegetal, des epices et du geste"
        intro={`Bonjour ${emailVariables.firstName}, voici une inspiration de menu pour imaginer une prochaine experience Ethny, a ajuster selon la saison, le lieu et vos invites.`}
        image={emailBrand.assets.heroSeasonal}
      />
      <EthnySection>
        <EthnyMenuBlock
          title="Inspiration menu"
          intro="Base indicative, sans prix final ni reservation confirmee."
          items={[
            "Mise en bouche autour des herbes, agrumes et croustillant",
            "Entree vegetale, bouillon parfume ou poisson delicat",
            "Plat autour d'une cuisson precise et d'une sauce signature",
            "Dessert elegant, fruit, creme, texture et fraicheur",
          ]}
          note="Les allergies, preferences et contraintes logistiques sont a valider avant proposition."
        />
      </EthnySection>
      <EthnySection background="cream">
        <EthnyCTA
          title="Adapter cette inspiration"
          text="Une proposition personnalisee peut etre construite avec les postes separes."
          href={emailVariables.quoteLink}
          label="Demander un menu"
        />
      </EthnySection>
      <EthnySection>
        <EthnySignature />
      </EthnySection>
    </EthnyNewsletterLayout>
  );
}
