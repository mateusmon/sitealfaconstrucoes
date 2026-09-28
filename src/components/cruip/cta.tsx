import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { site } from "@/data/site";

export function Cta() {
  return (
    <section id="contato" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-800 bg-gradient-to-r from-transparent via-gray-900/80 to-transparent py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-indigo-200">Próximo projeto</p>
            <h2 className="pb-5 font-nacelle text-3xl font-semibold text-gray-100 md:text-5xl">Vamos construir uma solução para a sua obra?</h2>
            <p className="mx-auto mb-8 max-w-xl text-indigo-200/65">Fale com a equipe da Gama Galvão Engenharia sobre escopo, planejamento e execução.</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link className="btn bg-indigo-500 text-gray-950 hover:bg-indigo-400" href="/contato">Solicitar orçamento <ArrowUpRight /></Link>
              <a className="btn border border-gray-700 bg-gray-900 text-gray-200 hover:border-indigo-300" href={site.phoneLinks[0]}>Ligar para a equipe <ArrowRight /></a>
            </div>
            <p className="mt-7 text-xs text-gray-500">{site.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
