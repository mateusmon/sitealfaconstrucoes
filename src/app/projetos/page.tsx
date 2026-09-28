import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ProjectFilter } from "@/components/project-filter";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Portfólio de obras de infraestrutura, obras prediais e reformas da Gama Galvão Engenharia.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero dark-surface">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow eyebrow--light"><span aria-hidden="true" />Portfólio</p>
            <h1>Obras que mostram método, escala e execução.</h1>
          </div>
          <p>
            Conheça nossas obras de infraestrutura, edificações e reformas, com a localização e o escopo de cada projeto.
          </p>
        </div>
      </section>
      <section className="section portfolio-page">
        <div className="shell">
          <ProjectFilter />
        </div>
      </section>
      <section className="contact-band contact-band--compact">
        <div className="shell contact-band-grid">
          <h2>Tem uma obra com escopo semelhante?</h2>
          <div className="contact-band-action">
            <p>Conte o contexto, local e etapa atual para iniciarmos uma conversa técnica.</p>
            <Link className="button button--accent" href="/contato">Solicitar orçamento <ArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
