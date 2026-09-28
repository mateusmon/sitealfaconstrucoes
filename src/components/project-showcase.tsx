"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { buildingProjects, projects } from "@/data/site";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./icons";

const infrastructure = projects.filter(project => project.category === "Infraestrutura").map(project => ({ ...project, detail: project.summary }));
const categories = ["Infraestrutura", "Obras prediais"];

export function ProjectShowcase() {
  const [category, setCategory] = useState(0);
  const [active, setActive] = useState(0);
  const prefix = useId();
  const galleryRef = useRef<HTMLDivElement>(null);
  const items = category === 0 ? infrastructure : buildingProjects;
  const current = items[active];
  function move(direction: number) { setActive(index => (index + direction + items.length) % items.length); }
  function choose(index: number) {
    setActive(index);
    if ((galleryRef.current?.getBoundingClientRect().top ?? 0) < 96) galleryRef.current?.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return (
    <section id="obras" className="showcase-section section" aria-labelledby="showcase-title">
      <div className="shell">
        <div className="chapter-heading chapter-heading--light" data-reveal><div><p className="eyebrow eyebrow--light"><span />02 / Portfólio</p><h2 id="showcase-title">Engenharia que<br />você pode ver.</h2></div><div><p>Conheça algumas de nossas obras de infraestrutura e construção predial.</p><Link className="text-link text-link--light" href="/projetos">Ver portfólio completo <ArrowUpRight /></Link></div></div>
        <div className="showcase-tabs" role="tablist" aria-label="Categoria de obras">{categories.map((label, index) => <button key={label} id={`${prefix}-tab-${index}`} role="tab" type="button" tabIndex={category === index ? 0 : -1} aria-selected={category === index} aria-controls={`${prefix}-panel`} onClick={() => { setCategory(index); setActive(0); }} onKeyDown={event => { if(event.key !== "ArrowLeft" && event.key !== "ArrowRight") return; event.preventDefault(); const next = 1 - category; setCategory(next); setActive(0); document.getElementById(`${prefix}-tab-${next}`)?.focus(); }}>{label}<span>{index === 0 ? infrastructure.length : buildingProjects.length}</span></button>)}</div>
        <div id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-tab-${category}`}>
          <div ref={galleryRef} className="showcase-gallery" role="region" aria-roledescription="carrossel" aria-label={`Projetos de ${categories[category].toLowerCase()}`} tabIndex={0} onKeyDown={event => { if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return; if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }}>
            <div className="showcase-photo" key={current.image}><Image src={current.image} alt={`${current.title}, ${current.location}`} fill sizes="(max-width: 760px) 100vw, 60vw" /><span>{categories[category]}</span></div>
            <div className="showcase-copy">
              <div className="showcase-counter"><span>Obra selecionada</span><span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span></div>
              <div className="showcase-info" key={current.slug}><p>{current.location}</p><h3>{current.title}</h3><span>{current.detail}</span><Link className="text-link text-link--light" href={`/contato?assunto=${encodeURIComponent(current.title)}#orcamento`}>Tenho um projeto semelhante <ArrowUpRight /></Link></div>
              <div className="showcase-controls"><p aria-live="polite">{current.title}</p><button type="button" className="carousel-arrow" aria-label="Obra anterior" onClick={() => move(-1)}><ArrowLeft /></button><button type="button" className="carousel-arrow" aria-label="Próxima obra" onClick={() => move(1)}><ArrowRight /></button></div>
            </div>
          </div>
          <div className="showcase-strip" aria-label="Escolher uma obra">{items.map((item, index) => <button type="button" key={item.slug} aria-pressed={active === index} onClick={() => choose(index)}><span className="showcase-thumb"><Image src={item.image} alt="" fill sizes="(max-width: 760px) 65vw, 24vw" /></span><span className="showcase-thumb-meta">{String(index + 1).padStart(2, "0")} / {item.location}</span><strong>{item.title}</strong><span className="showcase-thumb-action">{active === index ? "Obra selecionada" : "Ver esta obra"}<ArrowUpRight /></span></button>)}</div>
        </div>
      </div>
    </section>
  );
}
