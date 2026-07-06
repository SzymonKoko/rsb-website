export type ApiList<T> = {
  data: T[];
};

export type ApiService = {
  id: string;
  title: string;
  description: string;
  sortOrder: number;
  isPublished: boolean;
};

export type ApiPortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string | null;
  projectUrl: string | null;
  tags: string[];
  sortOrder: number;
  isPublished: boolean;
};

export type ApiFaq = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isPublished: boolean;
};

export type ContactSubmission = {
  name: string;
  email: string;
  company?: string | null;
  message: string;
};

export type PageContent = {
  brandName: string;
  brandTagline: string;
  navHome: string;
  navOffer: string;
  navPortfolio: string;
  navContact: string;
  headerCta: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  offerEyebrow: string;
  offerTitle: string;
  offerText: string;
  audienceEyebrow: string;
  audienceTitle: string;
  metricsEyebrow: string;
  metricsTitle: string;
  processEyebrow: string;
  processTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  portfolioEyebrow: string;
  portfolioTitle: string;
  portfolioText: string;
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  briefKicker: string;
  briefTitle: string;
  briefItems: string[];
  formNameLabel: string;
  formNamePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formScopeLabel: string;
  formScopePlaceholder: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formConsentLabel: string;
  formIdleNote: string;
  formOfflineNote: string;
  formErrorNote: string;
  formSuccessNote: string;
  formSendingNote: string;
  formSubmitLabel: string;
  formSendingLabel: string;
  footerText: string;
};
