import { Heading, Text } from "@react-email/components";
import { EthnyHero } from "../components/EthnyHero";
import { EthnyQuoteBlock } from "../components/EthnyQuoteBlock";
import { EthnySection } from "../components/EthnySection";
import { EthnySignature } from "../components/EthnySignature";
import { EthnyNewsletterLayout } from "../layouts/EthnyNewsletterLayout";
import { emailBrand, emailVariables } from "../tokens/email-brand";
import { emailColors } from "../tokens/email-colors";
import { emailTypography } from "../tokens/email-typography";

export default function BrandStoryEmail() {
  return (
    <EthnyNewsletterLayout preview="L'histoire d'Ethny, entre base francaise, influences nomades et cuisine humaine.">
      <EthnyHero
        eyebrow="Storytelling Ethny"
        title="Une cuisine francaise ouverte sur le monde"
        intro={`Bonjour ${emailVariables.firstName}, Ethny Nomad Cuisine est nee d'une envie simple : creer des tables sur mesure, avec une base francaise et des influences qui voyagent entre Bresil, Asie, Mediterranee et Orient.`}
        image={emailBrand.assets.heroStory}
      />
      <EthnySection>
        <Heading style={headingStyle}>Une presence de chef, pas une prestation impersonnelle</Heading>
        <Text style={bodyStyle}>
          Chaque experience est pensee autour du lieu, des invites et du moment.
          Le geste reste artisanal, la presentation soignee, le service clair et
          la relation humaine au centre.
        </Text>
        <EthnyQuoteBlock
          quote="Premium sans arrogance. Chaleureux sans familiarite excessive. Clair, concret, rassurant."
          author="Ligne editoriale Ethny"
        />
      </EthnySection>
      <EthnySection background="cream">
        <Text style={bodyStyle}>
          Pour une table privee, un anniversaire, un diner corporate ou un cours
          de cuisine, l'objectif reste le meme : creer un moment elegant,
          genereux et personnel.
        </Text>
        <EthnySignature closing="Au plaisir de cuisiner pour vous," />
      </EthnySection>
    </EthnyNewsletterLayout>
  );
}

const headingStyle = {
  color: emailColors.forestDeep,
  fontFamily: emailTypography.title,
  fontSize: 30,
  lineHeight: "34px",
  margin: "0 0 12px",
};

const bodyStyle = {
  color: "rgba(42, 42, 42, 0.78)",
  fontFamily: emailTypography.body,
  fontSize: 16,
  lineHeight: "25px",
  margin: "0 0 20px",
};
