import type { ContactSubmission } from '../types/api';

export type ContactFormSubmission = {
  name: string;
  email: string;
  scope: string;
  message: string;
  consentAccepted: boolean;
  botcheck: string;
};

export type ContactDeliveryConfig = {
  cmsApiUrl?: string;
  web3FormsAccessKey?: string;
};

export function getContactDeliveryMode(config: ContactDeliveryConfig) {
  if (config.cmsApiUrl?.trim()) {
    return 'cms';
  }

  if (config.web3FormsAccessKey?.trim()) {
    return 'web3forms';
  }

  return 'offline';
}

export function buildCmsContactSubmission(submission: ContactFormSubmission): ContactSubmission {
  return {
    name: submission.name,
    email: submission.email,
    company: submission.scope || null,
    message: submission.scope ? `Zakres: ${submission.scope}\n\n${submission.message}` : submission.message,
  };
}

export function buildWeb3FormsSubmission(submission: ContactFormSubmission, accessKey: string) {
  return {
    access_key: accessKey,
    subject: 'Nowe zapytanie ze strony RSB',
    from_name: 'Rozwin Swoj Biznes',
    name: submission.name,
    email: submission.email,
    scope: submission.scope,
    message: submission.message,
    botcheck: submission.botcheck,
    consent: submission.consentAccepted ? 'accepted' : 'missing',
  };
}
