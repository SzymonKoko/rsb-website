import type { ApiFaq, ApiList, ApiPortfolioItem, ApiService, ContactSubmission, PageContent } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

export function hasCmsApi() {
  return Boolean(API_URL);
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
