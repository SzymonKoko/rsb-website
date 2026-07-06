import { describe, expect, it } from 'vitest';
import {
  buildCmsContactSubmission,
  buildWeb3FormsSubmission,
  getContactDeliveryMode,
} from './contactSubmission';

const submission = {
  name: 'Anna Kowalska',
  email: 'anna@example.com',
  scope: 'Strona wizytowkowa',
  message: 'Potrzebuje nowej strony dla lokalnej firmy.',
  consentAccepted: true,
  botcheck: '',
};

describe('contact submission delivery', () => {
  it('uses the CMS when a CMS API URL is configured', () => {
    expect(getContactDeliveryMode({ cmsApiUrl: 'https://cms.example.com', web3FormsAccessKey: 'abc' })).toBe('cms');
  });

  it('uses Web3Forms when no CMS API URL is configured and a Web3Forms key exists', () => {
    expect(getContactDeliveryMode({ cmsApiUrl: '', web3FormsAccessKey: 'abc' })).toBe('web3forms');
  });

  it('stays offline when neither CMS nor Web3Forms is configured', () => {
    expect(getContactDeliveryMode({ cmsApiUrl: '', web3FormsAccessKey: '' })).toBe('offline');
  });
});

describe('contact submission payloads', () => {
  it('keeps CMS payload compatible with the existing submissions API', () => {
    expect(buildCmsContactSubmission(submission)).toEqual({
      name: 'Anna Kowalska',
      email: 'anna@example.com',
      company: 'Strona wizytowkowa',
      message: 'Zakres: Strona wizytowkowa\n\nPotrzebuje nowej strony dla lokalnej firmy.',
    });
  });

  it('builds a Web3Forms payload for email delivery', () => {
    expect(buildWeb3FormsSubmission(submission, 'access-key-123')).toEqual({
      access_key: 'access-key-123',
      subject: 'Nowe zapytanie ze strony RSB',
      from_name: 'Rozwin Swoj Biznes',
      name: 'Anna Kowalska',
      email: 'anna@example.com',
      scope: 'Strona wizytowkowa',
      message: 'Potrzebuje nowej strony dla lokalnej firmy.',
      botcheck: '',
      consent: 'accepted',
    });
  });
});
