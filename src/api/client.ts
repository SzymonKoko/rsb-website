import type { ApiFaq, ApiList, ApiPortfolioItem, ApiService, ContactSubmission, PageContent } from '../types/api';
import {
  buildCmsContactSubmission,
  buildWeb3FormsSubmission,
  getContactDeliveryMode,
  type ContactFormSubmission,
} from './contactSubmission';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, '');
const WEB3FORMS_ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim();
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export function hasCmsApi() {
  return Boolean(API_URL);
}

export function getContactMode() {
  return getContactDeliveryMode({ cmsApiUrl: API_URL, web3FormsAccessKey: WEB3FORMS_ACCESS_KEY });
}

async function request<T>(path: string, options: RequestInit = {}) {
  if (!API_URL) {
    throw new Error('CMS API is not configured');
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`CMS API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getServices() {
  return request<ApiList<ApiService>>('/api/services');
}

export function getPortfolio() {
  return request<ApiList<ApiPortfolioItem>>('/api/portfolio');
}

export function getFaqs() {
  return request<ApiList<ApiFaq>>('/api/faqs');
}

export function getPageContent() {
  return request<{ data: PageContent }>('/api/page-content');
}

export function submitContact(payload: ContactSubmission) {
  return request('/api/submissions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function submitContactForm(payload: ContactFormSubmission) {
  const mode = getContactMode();

  if (mode === 'cms') {
    return submitContact(buildCmsContactSubmission(payload));
  }

  if (mode === 'web3forms' && WEB3FORMS_ACCESS_KEY) {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(buildWeb3FormsSubmission(payload, WEB3FORMS_ACCESS_KEY)),
    });

    if (!response.ok) {
      throw new Error(`Web3Forms request failed: ${response.status}`);
    }

    return response.json();
  }

  throw new Error('Contact form delivery is not configured');
}
