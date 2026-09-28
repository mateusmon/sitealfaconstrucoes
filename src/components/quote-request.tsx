"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./icons";
import { quoteServices, site } from "@/data/site";

type Values = { name: string; email: string; phone: string; company: string; location: string; stage: string; timeframe: string; message: string };
const emptyValues: Values = { name: "", email: "", phone: "", company: "", location: "", stage: "", timeframe: "", message: "" };
const steps = ["Serviço", "Obra e contato", "Revisão"];

export function QuoteRequest({ initialService = "", initialSubject = "", standalone = false }: { initialService?: string; initialSubject?: string; standalone?: boolean }) {
  const [service, setService] = useState(quoteServices.some(item => item.id === initialService) ? initialService : "");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({ ...emptyValues, message: initialSubject ? `Tenho interesse em um projeto semelhante a ${initialSubject}.` : "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Values | "service", string>>>({});
  const [status, setStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefix = useId();
  const StepHeading = standalone ? "h2" : "h3";
  const selected = quoteServices.find(item => item.id === service);
  const emailBody = ["Olá, equipe Gama Galvão!", "", "Gostaria de solicitar um orçamento.", "", `Serviço: ${selected?.title ?? ""}`, `Nome: ${values.name.trim()}`, `E-mail: ${values.email.trim()}`, `Telefone: ${values.phone.trim() || "Não informado"}`, `Empresa: ${values.company.trim() || "Não informado"}`, `Local da obra: ${values.location.trim()}`, `Etapa: ${values.stage}`, `Previsão de início: ${values.timeframe || "A combinar"}`, "", "Descrição da obra:", values.message.trim(), "", "Solicitação preparada pelo site da Gama Galvão Engenharia."].join("\n");
  const subject = `Solicitação de orçamento — ${selected?.title ?? "Engenharia"} — ${values.location.trim()}`;
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  function update(field: keyof Values, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
    setStatus("");
  }
  function goTo(next: number) {
    setStep(next); setStatus("");
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 80 || top > innerHeight * .45) sectionRef.current?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    });
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (step === 0) {
      if (!service) { setErrors({ service: "Escolha o serviço que sua obra precisa." }); return; }
      goTo(1); return;
    }
    const next: typeof errors = {};
    if (values.name.trim().length < 2) next.name = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Informe um e-mail válido para retorno.";
    if (values.phone && (values.phone.replace(/\D/g, "").length < 10 || values.phone.replace(/\D/g, "").length > 13)) next.phone = "Informe um telefone com DDD.";
    if (values.location.trim().length < 3) next.location = "Informe a cidade e o estado da obra.";
    if (!values.stage) next.stage = "Selecione a etapa atual da obra.";
    if (values.message.trim().length < 10) next.message = "Descreva o serviço em pelo menos 10 caracteres.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) { requestAnimationFrame(() => document.getElementById(`${prefix}-${first}`)?.focus()); return; }
    goTo(2);
  }
  function reset() { setService(""); setValues(emptyValues); setErrors({}); goTo(0); }
  async function copyMessage() {
    try { await navigator.clipboard.writeText(`Para: ${site.email}\nAssunto: ${subject}\n\n${emailBody}`); setStatus("Mensagem copiada. Cole no e-mail de sua preferência."); }
    catch { setStatus("Não foi possível copiar. Use uma das opções de e-mail acima."); }
  }
  const field = (name: keyof Values, label: string, placeholder: string, required = false, type = "text", autoComplete?: string) => (
    <div className="quote-field">
      <label htmlFor={`${prefix}-${name}`}>{label}{!required && <span> (opcional)</span>}</label>
      <input id={`${prefix}-${name}`} name={name} type={type} autoComplete={autoComplete} maxLength={name === "email" ? 120 : 90} value={values[name]} placeholder={placeholder} required={required} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${prefix}-${name}-error` : undefined} onChange={event => update(name, event.target.value)} />
      {errors[name] && <p className="field-error" role="alert" id={`${prefix}-${name}-error`}>{errors[name]}</p>}
    </div>
  );

  return (
    <section ref={sectionRef} id="orcamento" className={`quote-section${standalone ? " quote-section--standalone" : ""}`} aria-labelledby={`${prefix}-title`}>
      <div className="shell quote-grid">
        <div className="quote-main">
          <p className="eyebrow"><span />Seu próximo projeto</p>
          {standalone ? <h1 id={`${prefix}-title`}>Vamos tirar sua<br />obra do papel?</h1> : <h2 id={`${prefix}-title`}>Vamos tirar sua<br />obra do papel?</h2>}
          <p className="quote-lead">Escolha o serviço, conte sobre a obra e revise seu pedido. No final, a solicitação segue por e-mail.</p>
          <ol className="quote-steps" aria-label="Etapas do orçamento">{steps.map((title, index) => <li key={title} className={index <= step ? "is-current" : ""} aria-current={index === step ? "step" : undefined}><span>0{index + 1}</span>{title}</li>)}</ol>
          <form onSubmit={submit} noValidate className="quote-form">
            <div className="quote-panel" key={step}>
              <StepHeading tabIndex={-1} ref={headingRef}>{step === 0 ? "Qual serviço sua obra precisa?" : step === 1 ? "Conte um pouco sobre o projeto." : "Seu pedido está pronto para revisar."}</StepHeading>
              {step === 0 && <>
                <fieldset className="quote-options"><legend className="sr-only">Escolha um serviço</legend>{quoteServices.map(item => <label className="quote-option" key={item.id}><input type="radio" name="service" value={item.id} checked={service === item.id} onChange={() => { setService(item.id); setErrors({}); }} /><span><strong>{item.title}</strong><small>{item.description}</small></span><span className="quote-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10" /></svg></span></label>)}</fieldset>
                {errors.service && <p className="field-error" role="alert">{errors.service}</p>}
                <div className="quote-actions"><span className="quote-step-count">Etapa 1 de 3</span><button className="button button--dark button--arrow" type="submit">Continuar <span><ArrowRight /></span></button></div>
              </>}
              {step === 1 && <>
                <p className="quote-required">Nome, e-mail, local, etapa e descrição são obrigatórios.</p>
                <div className="quote-fields">
                  {field("name", "Seu nome", "Como podemos chamar você?", true, "text", "name")}
                  {field("email", "E-mail para retorno", "voce@empresa.com.br", true, "email", "email")}
                  {field("phone", "Telefone", "(61) 99999-9999", false, "tel", "tel")}
                  {field("company", "Empresa", "Nome da empresa", false, "text", "organization")}
                  {field("location", "Local da obra", "Cidade / UF", true)}
                  <div className="quote-field"><label htmlFor={`${prefix}-stage`}>Etapa atual</label><select id={`${prefix}-stage`} name="stage" value={values.stage} required aria-invalid={Boolean(errors.stage)} aria-describedby={errors.stage ? `${prefix}-stage-error` : undefined} onChange={event => update("stage", event.target.value)}><option value="">Selecione uma etapa</option><option>Planejamento</option><option>Projeto em desenvolvimento</option><option>Pronta para iniciar</option><option>Obra em andamento</option><option>Reforma ou manutenção</option></select>{errors.stage && <p className="field-error" role="alert" id={`${prefix}-stage-error`}>{errors.stage}</p>}</div>
                </div>
                <div className="quote-field"><label htmlFor={`${prefix}-timeframe`}>Previsão de início <span>(opcional)</span></label><select id={`${prefix}-timeframe`} value={values.timeframe} onChange={event => update("timeframe", event.target.value)}><option value="">A combinar</option><option>Assim que possível</option><option>Nos próximos 3 meses</option><option>Entre 3 e 6 meses</option><option>Mais de 6 meses</option></select></div>
                <div className="quote-field"><label htmlFor={`${prefix}-message`}>O que você precisa executar?</label><textarea id={`${prefix}-message`} name="message" maxLength={2000} rows={4} required placeholder="Conte o escopo, a área aproximada e o que já está definido." value={values.message} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${prefix}-message-error` : undefined} onChange={event => update("message", event.target.value)} />{errors.message && <p className="field-error" role="alert" id={`${prefix}-message-error`}>{errors.message}</p>}</div>
                <p className="quote-privacy">Seus dados compõem apenas o e-mail que você decidir enviar. <Link href="/politica-de-privacidade">Política de privacidade</Link>.</p>
                <div className="quote-actions"><button className="button button--outline" type="button" onClick={() => goTo(0)}><ArrowLeft /> Voltar</button><button className="button button--dark button--arrow" type="submit">Revisar pedido <span><ArrowRight /></span></button></div>
              </>}
              {step === 2 && <>
                <p className="quote-review-note">Confira os dados e escolha como enviar. O orçamento será analisado pela equipe após o recebimento do e-mail.</p>
                <dl className="quote-recap">{[["Serviço", selected?.title], ["Nome", values.name], ["E-mail", values.email], ["Telefone", values.phone || "Não informado"], ["Empresa", values.company || "Não informado"], ["Local", values.location], ["Etapa", values.stage], ["Início", values.timeframe || "A combinar"]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                <div className="quote-description"><span>Descrição da obra</span><p>{values.message}</p></div>
                <div className="quote-send-actions"><a className="button button--accent" href={mailHref} onClick={() => setStatus("Seu aplicativo de e-mail será aberto com o pedido preenchido. Revise e clique em enviar por lá.")}>Abrir e-mail <ArrowUpRight /></a><a className="button button--outline" href={gmailHref} target="_blank" rel="noopener noreferrer" onClick={() => setStatus("O Gmail será aberto em outra aba. Revise a mensagem e envie por lá.")}>Abrir no Gmail <ArrowUpRight /></a></div>
                <button className="quote-copy" type="button" onClick={copyMessage}>Copiar mensagem</button>
                <div className="quote-actions"><button className="button button--outline" type="button" onClick={() => goTo(1)}><ArrowLeft /> Editar dados</button><button className="quote-reset" type="button" onClick={reset}>Novo pedido</button></div>
              </>}
            </div>
            {status && <p className="quote-status" role="status">{status}</p>}
          </form>
        </div>
        <aside className="quote-side" aria-label="Resumo do pedido de orçamento">
          <div className="quote-side-brand"><Image src="/images/logo-reference.png" alt="" width={72} height={72} /><div><strong>Gama Galvão</strong><span>Engenharia para sua obra.</span></div></div>
          <p className="quote-side-label">Seu projeto começa aqui</p>
          <dl className="quote-summary"><div><dt>Serviço</dt><dd>{selected?.title || "A escolher"}</dd></div><div><dt>Local da obra</dt><dd>{values.location || "A informar"}</dd></div><div><dt>Etapa</dt><dd>{values.stage || "A informar"}</dd></div><div><dt>Previsão de início</dt><dd>{values.timeframe || "A combinar"}</dd></div></dl>
          <div className="quote-side-help"><span>Prefere falar com a equipe?</span><a href={site.phoneLinks[0]}>{site.phones[0]} <ArrowUpRight /></a><a className="quote-side-email" href={`mailto:${site.email}`}>{site.email}</a></div>
          <p className="quote-side-address">{site.address}</p>
          <span className="quote-side-footer">Infraestrutura · Construção · Projetos</span>
        </aside>
      </div>
    </section>
  );
}
