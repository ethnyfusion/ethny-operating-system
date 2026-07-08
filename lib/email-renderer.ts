import { render } from "@react-email/render";
import { createElement } from "react";
import {
  getEmailCampaign,
  type EmailCampaign,
} from "@/lib/email-campaigns";
import {
  replaceEmailVariables,
  resolveEmailVariables,
  type EmailVariableInput,
} from "@/lib/email-variables";

export type RenderedCampaignEmail = {
  campaign: EmailCampaign;
  subject: string;
  previewText: string;
  html: string;
  text: string;
};

export async function renderCampaignEmail(
  campaignId: string,
  variables: EmailVariableInput = {},
): Promise<RenderedCampaignEmail> {
  const campaign = getEmailCampaign(campaignId);

  if (!campaign) {
    throw new Error(`Unknown email campaign: ${campaignId}`);
  }

  const resolvedVariables = resolveEmailVariables(variables);
  const template = createElement(campaign.Template);
  const [rawHtml, rawText] = await Promise.all([
    render(template, { pretty: true }),
    render(template, { plainText: true }),
  ]);

  return {
    campaign,
    subject: replaceEmailVariables(campaign.defaultSubject, resolvedVariables),
    previewText: replaceEmailVariables(campaign.previewText, resolvedVariables),
    html: replaceEmailVariables(rawHtml, resolvedVariables),
    text: replaceEmailVariables(rawText, resolvedVariables),
  };
}
