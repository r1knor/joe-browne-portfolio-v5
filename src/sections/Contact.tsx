import { useState, type FormEvent } from 'react';
import { SectionFrame } from '../components/SectionFrame';
import { site } from '../data/site';

type FormState = { name: string; email: string; message: string };
const initialForm: FormState = { name: '', email: '', message: '' };

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setStatus('Email copied to clipboard.');
    } catch {
      setStatus(`Copy unavailable. Email ${site.email}.`);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const formElement = event.currentTarget;
    if (!formElement.reportValidity()) return;
    setSending(true);
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    setStatus('Opening your email app with the message drafted.');
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setSending(false), 1200);
  };

  return (
    <SectionFrame id="contact" number="06" title="Route the next job here." className="contact">
      <div className="contact__layout">
        <div className="contact__statement" data-reveal>
          <p>Available for studio artwork, design systems, production-heavy creative work and selected collaborations.</p>
          <button type="button" onClick={copyEmail}>{site.email}<span>Copy email</span></button>
          <div className="contact__links">
            <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={site.soundcloud} target="_blank" rel="noreferrer">SoundCloud ↗</a>
          </div>
        </div>

        <form onSubmit={submit} className="contact__form" data-reveal>
          <div>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" required />
          </div>
          <div>
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" required />
          </div>
          <div>
            <label htmlFor="contact-message">Project outline</label>
            <textarea id="contact-message" name="message" rows={5} minLength={20} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required />
          </div>
          <button type="submit" disabled={sending}>Draft email <span aria-hidden="true">↗</span></button>
          <p className="contact__status" role="status" aria-live="polite">{status}</p>
          <small>No form data is stored. Submit opens your default email application.</small>
        </form>
      </div>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Joe Browne</span>
        <span>Salford, UK</span>
        <a href="#about">Back to top ↑</a>
      </footer>
    </SectionFrame>
  );
}
