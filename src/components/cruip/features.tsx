import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/site";
import { ArrowUpRight } from "@/components/icons";

export function Features() {
  return (
    <section id="obras" className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-800/80 py-14 md:py-20">
          <div className="mx-auto max-w-3xl pb-10 text-center md:pb-14" data-aos="fade-up">
            <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-orange-200"><span className="h-px w-7 bg-orange-400" />Obras em destaque</p>
            <h2 className="pb-4 font-nacelle text-3xl font-semibold text-gray-100 md:text-5xl">Execução registrada em campo.</h2>
            <p className="text-lg text-indigo-200/65">Projetos do acervo da Gama Galvão, com o escopo e o local de cada obra.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.filter((project) => project.featured).map((project, index) => (
              <article key={project.slug} className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/70" data-aos="fade-up" data-aos-delay={index * 100}>
                <Link href={`/projetos#${project.slug}`} className="relative block aspect-[1.45] overflow-hidden bg-gray-800">
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 800px) 100vw, 33vw" priority={index === 0} className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-gray-950/80 px-3 py-1 text-xs text-gray-100">{project.category}</span>
                </Link>
                <div className="p-5 md:p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[.13em] text-indigo-200/55">{project.location}</p>
                  <h3 className="font-nacelle text-xl font-semibold text-gray-100">{project.title}</h3>
                  <p className="mt-2 text-sm text-indigo-200/65">{project.summary}</p>
                  <Link href={`/contato?assunto=${encodeURIComponent(project.title)}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-indigo-200 hover:text-white">Falar sobre uma obra semelhante <ArrowUpRight /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link href="/projetos" className="btn border border-gray-700 bg-gray-900 text-gray-200 hover:border-indigo-400/60">Ver portfólio completo <ArrowUpRight /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
