import Image from "next/image";
import Link from "next/link";
import { services, projects } from "@/data/site";
import Spotlight from "./spotlight";

const serviceProjects = [
  { service: services[0], project: projects[0] },
  { service: services[1], project: projects[2] },
  { service: services[2], project: projects[1] },
];

export function Workflows() {
  return (
    <section id="solucoes" className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-800/80 py-14 md:py-20">
          <div className="mx-auto max-w-3xl pb-10 text-center md:pb-14" data-aos="fade-up">
            <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-orange-200"><span className="h-px w-7 bg-orange-400" />Áreas de atuação</p>
            <h2 className="pb-4 font-nacelle text-3xl font-semibold text-gray-100 md:text-5xl">Engenharia para cada etapa da obra.</h2>
            <p className="text-lg text-indigo-200/65">Da infraestrutura urbana à construção predial, planejamento e execução acompanhados por equipe técnica.</p>
          </div>
          <Spotlight className="group mx-auto grid max-w-sm items-stretch gap-5 lg:max-w-none lg:grid-cols-3">
            {serviceProjects.map(({ service, project }, index) => (
              <Link
                className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/70 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                href={`/projetos#${project.slug}`}
                key={service.index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950">
                  <div className="relative aspect-[1.7] overflow-hidden bg-gray-900">
                    <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 900px) 100vw, 33vw" className="object-cover transition duration-700 group-hover/card:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-gray-950/75 px-3 py-1 text-xs text-gray-100">{service.index} / 0{serviceProjects.length}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-nacelle text-xl font-semibold text-gray-100">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-indigo-200/65">{service.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-200 transition group-hover/card:text-indigo-100">Ver obra relacionada <span aria-hidden="true">↗</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </Spotlight>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-gray-400">
            {services.slice(3).map((service) => <span key={service.index} className="rounded-full border border-gray-800 px-4 py-2">{service.title}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
