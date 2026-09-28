"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { quoteServices } from "@/data/site";
import { ArrowUpRight } from "./icons";

const media = [
  { image: "/images/projeto-linha-branca.jpeg", alt: "Terraplanagem na Estrada Linha Branca, Correntina/BA", copy: "Preparação, conformação e movimentação de solo para obras de diferentes escalas.", tags: "Preparo do terreno · Movimentação de solo" },
  { image: "/images/projeto-rodovia-soja.jpeg", alt: "Microrevestimento na Rodovia da Soja, na Bahia", copy: "Execução e recuperação de vias em TSD, CBUQ, microrevestimento e piso intertravado.", tags: "Vias urbanas · Rodovias · Piso intertravado" },
  { image: "/images/projeto-drenagem.jpeg", alt: "Execução de escavação e rede de drenagem", copy: "Redes pluviais, caixas de retenção e soluções de drenagem superficial e profunda.", tags: "Águas pluviais · Saneamento · Redes" },
  { image: "/images/projeto-doalnara.jpg", alt: "Vista aérea da infraestrutura da Fazenda Doalnara", copy: "Urbanização integrada com redes, pavimentos e apoio técnico à implantação de condomínios.", tags: "Urbanização · Redes · Acessos" },
  { image: "/images/predial-vila-doalnara.jpg", alt: "Edificações da Vila Doalnara", copy: "Construções residenciais, comerciais e institucionais. Reformas, ampliações e revitalização de fachadas.", tags: "Construção · Reforma · Fachadas" },
  { image: "/images/projeto-crm-df.jpg", alt: "Reforma institucional do CRM do Distrito Federal", copy: "Projetos, planejamento, orçamento e fiscalização. Avaliação de imóveis, relatórios, perícias e laudos extrajudiciais.", tags: "Projetos · Fiscalização · Avaliações · Laudos" },
];

export function ServiceExplorer() {
  const [active, setActive] = useState<number | null>(0);
  const prefix = useId();
  return (
    <section id="solucoes" className="services-section section" aria-labelledby="services-title">
      <div className="shell">
        <div className="chapter-heading" data-reveal><div><p className="eyebrow"><span />01 / Soluções</p><h2 id="services-title">Sua obra tem etapas.<br />Nós temos as soluções.</h2></div><p>Execução e conhecimento técnico conectados, do planejamento ao acabamento.</p></div>
        <div className="mare-services">{quoteServices.map((item,index) => <div className={`mare-service${active === index ? " is-open" : ""}`} key={item.id}>
          <h3><button className="mare-service-row" id={`${prefix}-service-${index}`} type="button" aria-expanded={active === index} aria-controls={`${prefix}-panel-${index}`} onClick={() => setActive(active === index ? null : index)}><span className="service-number">(0{index + 1})</span><span className="mare-service-name">{item.title}</span><span className="service-plus" aria-hidden="true">+</span></button></h3>
          <div className="mare-service-panel" id={`${prefix}-panel-${index}`} role="region" aria-labelledby={`${prefix}-service-${index}`} inert={active !== index} aria-hidden={active !== index}><div><div className="mare-service-content"><div className="service-detail-copy"><p>{media[index].copy}</p><span>{media[index].tags}</span><Link className="text-link" href={`/contato?servico=${item.id}#orcamento`}>Orçar este serviço <ArrowUpRight /></Link></div><div className="service-photo"><Image src={media[index].image} alt={media[index].alt} fill sizes="(max-width: 760px) 100vw, 35vw" /></div></div></div></div>
        </div>)}</div>
      </div>
    </section>
  );
}
