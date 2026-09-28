"use client";

import { FormEvent, useRef, useState } from "react";
import { site } from "@/data/site";
import { ArrowUpRight } from "./icons";

type FormValues = { name: string; email: string; phone: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);

  function validate() {
    const next: FormErrors = {};
    if (values.name.trim().length < 2) next.name = "Informe seu nome.";
    if (!values.email.trim() && !values.phone.trim()) {
      next.email = "Informe um e-mail ou telefone para retorno.";
      next.phone = "Informe um telefone ou e-mail para retorno.";
    } else if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      next.email = "Informe um e-mail válido.";
    }
    if (values.message.trim().length < 10) next.message = "Conte um pouco mais sobre o serviço desejado.";
    return next;
  }

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const subject = values.subject.trim() || "Solicitação de orçamento pelo site";
    const body = [
      `Nome: ${values.name}`,
      `E-mail: ${values.email || "Não informado"}`,
      `Telefone: ${values.phone || "Não informado"}`,
      "",
      values.message,
    ].join("\n");

    setStatus("Abrindo seu aplicativo de e-mail. Revise a mensagem antes de enviar.");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const errorEntries = Object.entries(errors).filter((entry): entry is [keyof FormValues, string] => Boolean(entry[1]));

  return (
    <form className="contact-form" noValidate onSubmit={submit}>
      {errorEntries.length ? (
        <div className="error-summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <h2>Revise os campos destacados</h2>
          <ul>
            {errorEntries.map(([field, message]) => (
              <li key={field}><a href={`#${field}`}>{message}</a></li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={(event) => update("name", event.target.value)}
          />
          {errors.name ? <p id="name-error" className="field-error">{errors.name}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="subject">Assunto <span>(opcional)</span></label>
          <input
            id="subject"
            name="subject"
            value={values.subject}
            onChange={(event) => update("subject", event.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : "contact-hint"}
            onChange={(event) => update("email", event.target.value)}
          />
          {errors.email ? <p id="email-error" className="field-error">{errors.email}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : "contact-hint"}
            onChange={(event) => update("phone", event.target.value)}
          />
          {errors.phone ? <p id="phone-error" className="field-error">{errors.phone}</p> : null}
        </div>
      </div>

      <p id="contact-hint" className="form-hint">Informe pelo menos uma forma de contato.</p>

      <div className="field">
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
        {errors.message ? <p id="message-error" className="field-error">{errors.message}</p> : null}
      </div>

      <div className="form-submit">
        <button className="button button--accent" type="submit">
          Preparar e-mail <ArrowUpRight />
        </button>
        <p>O formulário abre uma mensagem no seu aplicativo de e-mail; nenhum dado é enviado automaticamente.</p>
      </div>
      {status ? <p className="form-status" role="status">{status}</p> : null}
    </form>
  );
}
