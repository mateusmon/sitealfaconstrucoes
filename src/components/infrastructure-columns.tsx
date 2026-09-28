"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/site";
import { ArrowUpRight } from "./icons";

const infrastructureProjects = projects.filter((project) => project.category === "Infraestrutura");
const columns = [infrastructureProjects.slice(0, 2), infrastructureProjects.slice(2), infrastructureProjects.slice(1, 3)];

export function InfrastructureColumns() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="infrastructure-columns-section section dark-surface" aria-labelledby="infraestrutura-em-movimento">
      <div className="shell">
        <div className="section-heading-grid infrastructure-columns-heading">
          <div>
            <p className="eyebrow eyebrow--light"><span aria-hidden="true" />Obras de infraestrutura</p>
            <h2 id="infraestrutura-em-movimento">Cada bloco mostra uma frente real de execução.</h2>
          </div>
          <p>Terraplanagem, drenagem, pavimentação e urbanização apresentados com local, escopo e registro visual do acervo da empresa.</p>
        </div>

        <div className="infrastructure-columns-grid">
          {columns.map((column, columnIndex) => {
            const items = [...column, ...column];
            return (
              <div className={`infrastructure-column infrastructure-column--${columnIndex + 1}`} key={columnIndex}>
                <motion.div
                  className="infrastructure-column-track"
                  animate={reducedMotion ? undefined : { y: ["0%", "-50%"] }}
                  transition={reducedMotion ? undefined : { duration: 22 + columnIndex * 4, repeat: Infinity, ease: "linear" }}
                >
                  {items.map((project, itemIndex) => (
                    <article className="infrastructure-block" key={`${project.slug}-${itemIndex}`}>
                      <div className="infrastructure-block-media">
                        <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 760px) 88vw, 28vw" />
                        <span>{project.category}</span>
                      </div>
                      <div className="infrastructure-block-copy">
                        <p>{project.location}</p>
                        <h3>{project.title}</h3>
                        <span>{project.summary}</span>
                        <Link href={`/contato?assunto=${encodeURIComponent(project.title)}`}>
                          Conversar sobre esta obra <ArrowUpRight />
                        </Link>
                      </div>
                    </article>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
