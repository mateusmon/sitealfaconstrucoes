import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { InfrastructureColumns } from "@/components/infrastructure-columns";
import { BuildingProjectCarousel } from "@/components/building-project-carousel";
import { Cta } from "@/components/cruip/cta";
import { Features } from "@/components/cruip/features";
import { ScrollExpansionHero } from "@/components/ui/scroll-expansion-hero";
import { Workflows } from "@/components/cruip/workflows";
import { formatDate, news } from "@/data/site";

export function CruipHome() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-950 text-gray-200">
      <ScrollExpansionHero />

      <section id="empresa" className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 border-t border-gray-800/80 py-14 md:grid-cols-[.9fr_1.1fr] md:gap-16 md:py-20">
            <div data-aos="fade-up">
              <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-orange-200"><span className="h-px w-7 bg-orange-400" />A empresa</p>
              <h2 className="font-nacelle text-3xl font-semibold text-gray-100 md:text-4xl">Estrutura técnica para tirar projetos do papel.</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-indigo-200/65">Do preparo do solo à entrega da obra, cada etapa é conduzida com responsabilidade técnica, organização e atenção ao resultado do cliente.</p>
              <Link href="/projetos" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo-200 hover:text-white">Ver portfólio completo <ArrowRight /></Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2" data-aos="fade-up" data-aos-delay="100">
              <article className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5"><h3 className="font-nacelle font-semibold text-gray-100">Atuação integrada</h3><p className="mt-2 text-sm leading-relaxed text-indigo-200/60">Execução, fiscalização, projetos, orçamento e acompanhamento em uma visão completa da obra.</p></article>
              <article className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5"><h3 className="font-nacelle font-semibold text-gray-100">Experiência técnica</h3><p className="mt-2 text-sm leading-relaxed text-indigo-200/60">Responsabilidade técnica de Cláudio M. Gama, Engenheiro Civil e de Segurança do Trabalho.</p></article>
              <article className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5 sm:col-span-2"><h3 className="font-nacelle font-semibold text-gray-100">Soluções verificáveis</h3><p className="mt-2 text-sm leading-relaxed text-indigo-200/60">Portfólio com obras rodoviárias, urbanização, drenagem, residenciais e reformas institucionais.</p></article>
            </div>
          </div>
        </div>
      </section>

      <Workflows />
      <Features />
      <InfrastructureColumns />
      <BuildingProjectCarousel />

      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="border-t border-gray-800/80 py-14 md:py-20">
            <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:gap-16">
              <div data-aos="fade-up">
                <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-orange-200"><span className="h-px w-7 bg-orange-400" />Responsabilidade técnica</p>
                <h2 className="font-nacelle text-3xl font-semibold text-gray-100 md:text-4xl">Experiência que orienta decisões.</h2>
                <h3 className="mt-7 font-nacelle text-xl font-semibold text-gray-100">Cláudio M. Gama</h3>
                <p className="mt-2 text-sm leading-relaxed text-indigo-200/65">Engenheiro Civil e de Segurança do Trabalho · Formação UEFS, 1999.</p>
                <p className="mt-5 text-sm text-indigo-200/65">Avaliações, projetos, perícias e laudos extrajudiciais.</p>
              </div>
              <ul className="divide-y divide-gray-800 border-y border-gray-800" data-aos="fade-up" data-aos-delay="100">
                <li className="flex gap-5 py-4 text-sm text-gray-300"><span className="font-semibold text-indigo-200">2000</span>Gerenciamento da Construção e Qualidade de Obras</li>
                <li className="flex gap-5 py-4 text-sm text-gray-300"><span className="font-semibold text-indigo-200">2010</span>MBA em Gestão de Incorporação Imobiliária e da Construção Civil</li>
                <li className="flex gap-5 py-4 text-sm text-gray-300"><span className="font-semibold text-indigo-200">2010</span>Business and Management for International Professionals — UC Irvine</li>
                <li className="flex gap-5 py-4 text-sm text-gray-300"><span className="font-semibold text-indigo-200">2013</span>Engenharia de Segurança do Trabalho</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="noticias" className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="border-t border-gray-800/80 py-14 md:py-20">
            <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" data-aos="fade-up">
              <div><p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-orange-200"><span className="h-px w-7 bg-orange-400" />Gama Galvão News</p><h2 className="font-nacelle text-3xl font-semibold text-gray-100 md:text-4xl">Obras, frota e execução em movimento.</h2></div>
              <Link href="/noticias" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo-200 hover:text-white">Todas as notícias <ArrowRight /></Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {news.map((item, index) => (
                <article key={item.slug} className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50" data-aos="fade-up" data-aos-delay={index * 100}>
                  <Link href={`/noticias/${item.slug}`} className="relative block aspect-[1.55] overflow-hidden bg-gray-800"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /></Link>
                  <div className="p-5"><div className="mb-3 flex justify-between gap-2 text-[.7rem] uppercase tracking-wider text-indigo-200/60"><span>{item.category}</span><time dateTime={item.date}>{formatDate(item.date)}</time></div><h3 className="font-nacelle text-lg font-semibold text-gray-100"><Link href={`/noticias/${item.slug}`}>{item.title}</Link></h3><p className="mt-2 text-sm leading-relaxed text-indigo-200/60">{item.excerpt}</p><Link className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-indigo-200 hover:text-white" href={`/noticias/${item.slug}`}>Ler notícia <ArrowUpRight /></Link></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </div>
  );
}
