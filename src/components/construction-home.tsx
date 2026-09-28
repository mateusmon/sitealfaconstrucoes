import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { CompanyIntro } from "./company-intro";
import { ConstructionHero } from "./ui/construction-hero";
import { ServiceExplorer } from "./service-explorer";
import { ProjectShowcase } from "./project-showcase";
import { QuoteRequest } from "./quote-request";
import { EngineeringMarquee } from "./engineering-marquee";
import { formatDate, news } from "@/data/site";

export function ConstructionHome() {
  return (
    <>
      <CompanyIntro />
      <ConstructionHero />
      <EngineeringMarquee />
      <section id="empresa" className="company-section section" aria-labelledby="company-title">
        <div className="shell company-grid">
          <div className="company-image" data-reveal><Image src="/images/projeto-doalnara.jpg" alt="Vista aérea da infraestrutura executada na Fazenda Doalnara, na Bahia" fill sizes="(max-width: 760px) 100vw, 45vw" /><div><span>Fazenda Doalnara</span><span>Formosa do Rio Preto/BA</span></div></div>
          <div className="company-copy" data-reveal><p className="eyebrow"><span />A Gama Galvão</p><h2 id="company-title" className="word-statement" aria-label="Satisfação do cliente. Esse é o nosso principal compromisso.">{"Satisfação do cliente. Esse é o nosso principal compromisso.".split(" ").map((word,index) => <span key={index}>{word} </span>)}</h2><p>Engenharia aplicada à infraestrutura, edificações e desenvolvimento urbano. Reunimos execução, projetos e acompanhamento técnico para conduzir cada etapa da sua obra.</p><dl className="company-facts"><div><dt>Atuação</dt><dd>Distrito Federal e Bahia</dd></div><div><dt>Do início ao fim</dt><dd>Planejamento, orçamento, execução e fiscalização</dd></div><div><dt>Responsável técnico</dt><dd>Cláudio M. Gama · Engenheiro Civil e de Segurança do Trabalho</dd></div></dl><Link className="text-link" href="/#solucoes">Conheça nossas soluções <ArrowUpRight /></Link></div>
        </div>
      </section>
      <ServiceExplorer />
      <ProjectShowcase />
      <section className="expertise-section section" aria-labelledby="expertise-title"><div className="shell expertise-grid"><div data-reveal><p className="eyebrow"><span />03 / Responsabilidade técnica</p><h2 id="expertise-title">Conhecimento que<br />sustenta a execução.</h2><div className="expertise-person"><span className="expertise-monogram" aria-hidden="true">CG</span><div><h3>Cláudio M. Gama</h3><p>Engenheiro Civil e de Segurança do Trabalho<br />Formação UEFS · 1999</p></div></div><p className="expertise-description">Avaliações, projetos, perícias e laudos extrajudiciais. Planejamento, orçamento e fiscalização com visão técnica da obra.</p></div><ol className="expertise-timeline" data-reveal><li><span>2000</span><div><h3>Gerenciamento da Construção</h3><p>Qualidade de Obras · UEFS / UFRGS</p></div></li><li><span>2005</span><div><h3>Gestão de Incorporação Imobiliária</h3><p>Especialização · Universidade Estácio de Sá</p></div></li><li><span>2010</span><div><h3>Gestão Imobiliária e Construção Civil</h3><p>MBA · Fundação Getulio Vargas</p></div></li><li><span>2010</span><div><h3>Business and Management</h3><p>International Professionals · UC Irvine</p></div></li><li><span>2013</span><div><h3>Engenharia de Segurança do Trabalho</h3><p>Pós-graduação · FTED</p></div></li></ol></div></section>
      <section id="noticias" className="updates-section section" aria-labelledby="updates-title"><div className="shell"><div className="chapter-heading" data-reveal><div><p className="eyebrow"><span />04 / Gama Galvão News</p><h2 id="updates-title">Direto do canteiro.</h2></div><Link className="text-link" href="/noticias">Todas as notícias <ArrowUpRight /></Link></div><div className="news-grid">{news.map(item => <article className="news-card" key={item.slug} data-reveal><Link className="news-media" href={`/noticias/${item.slug}`}><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 760px) 100vw, 33vw" /></Link><div className="news-meta"><span>{item.category}</span><time dateTime={item.date}>{formatDate(item.date)}</time></div><h3><Link href={`/noticias/${item.slug}`}>{item.title}</Link></h3><p>{item.excerpt}</p><Link className="text-link" href={`/noticias/${item.slug}`}>Ler notícia <ArrowUpRight /></Link></article>)}</div></div></section>
      <QuoteRequest />
    </>
  );
}
