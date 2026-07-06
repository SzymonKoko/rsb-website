import { useState } from 'react';
import { getContactMode, submitContactForm } from '../api/client';
import { usePageContent } from '../content/pageContentContext';

export function ContactForm() {
  const content = usePageContent();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'offline' | 'error'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const scope = String(formData.get('scope') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const botcheck = String(formData.get('botcheck') ?? '').trim();
    const consentAccepted = formData.get('consent') === 'on';

    if (botcheck) {
      form.reset();
      setStatus('sent');
      return;
    }

    if (getContactMode() === 'offline') {
      setStatus('offline');
      return;
    }

    if (!name || !email || !message || !consentAccepted) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      await submitContactForm({
        name,
        email,
        scope,
        message,
        consentAccepted,
        botcheck,
      });
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="section-heading">
        <p className="eyebrow">{content.contactEyebrow}</p>
        <h2 id="contact-title">{content.contactTitle}</h2>
        <p>{content.contactText}</p>
      </div>

      <div className="contact-layout">
        <div className="brief-card">
          <span className="card-kicker">{content.briefKicker}</span>
          <h3>{content.briefTitle}</h3>
          <ul>
            {content.briefItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            {content.formNameLabel}
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder={content.formNamePlaceholder}
              required
            />
          </label>
          <label>
            {content.formEmailLabel}
            <input name="email" type="email" autoComplete="email" placeholder={content.formEmailPlaceholder} required />
          </label>
          <label>
            {content.formScopeLabel}
            <select name="scope" defaultValue="">
              <option value="" disabled>
                {content.formScopePlaceholder}
              </option>
              <option>Strona wizytówkowa</option>
              <option>Strona produktowa</option>
              <option>Marketing i SEO</option>
              <option>Kompletny pakiet</option>
            </select>
          </label>
          <label className="honeypot-field" aria-hidden="true">
            Nie wypelniaj tego pola
            <input name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
          </label>
          <label>
            {content.formMessageLabel}
            <textarea name="message" rows={4} placeholder={content.formMessagePlaceholder} required />
          </label>
          <label className="consent-field">
            <input name="consent" type="checkbox" required />
            <span>{content.formConsentLabel}</span>
          </label>
          <p className="form-note" role="status" aria-live="polite">
            {status === 'idle' && content.formIdleNote}
            {status === 'sending' && content.formSendingNote}
            {status === 'sent' && content.formSuccessNote}
            {status === 'offline' && content.formOfflineNote}
            {status === 'error' && content.formErrorNote}
          </p>
          <button className="button primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? content.formSendingLabel : content.formSubmitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
