"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { buildingProjects } from "@/data/site";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./icons";

const wrap = (value: number, length: number) => ((value % length) + length) % length;

export function BuildingProjectCarousel() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const move = useCallback((step: number) => setActive((current) => wrap(current + step, buildingProjects.length)), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move]);

  return (
    <section className="building-carousel-section section" aria-labelledby="obras-prediais-titulo">
      <div className="shell">
        <div className="section-heading-grid building-carousel-heading">
          <div>
            <p className="eyebrow"><span aria-hidden="true" />Obras prediais</p>
            <h2 id="obras-prediais-titulo">Veja alguns de nossos projetos realizados.</h2>
          </div>
          <p>Um recorte do portfólio de edificações residenciais, esportivas e institucionais.</p>
        </div>

        <div className="building-carousel" role="region" aria-roledescription="carrossel" aria-label="Projetos de obras prediais" tabIndex={0}>
          <div className="building-carousel-stage" aria-live="polite">
            {buildingProjects.map((project, index) => {
              let offset = index - active;
              if (offset > buildingProjects.length / 2) offset -= buildingProjects.length;
              if (offset < -buildingProjects.length / 2) offset += buildingProjects.length;
              const visible = Math.abs(offset) <= 2;
              return (
                <motion.article
                  className="building-carousel-card"
                  key={project.slug}
                  animate={{
                    x: `${offset * 63}%`,
                    scale: offset === 0 ? 1 : 0.82,
                    rotateY: offset * -14,
                    opacity: visible ? (offset === 0 ? 1 : 0.45) : 0,
                  }}
                  transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 24 }}
                  style={{ zIndex: 10 - Math.abs(offset), pointerEvents: offset === 0 ? "auto" : "none" }}
                  aria-hidden={offset !== 0}
                >
                  <div className="building-carousel-media">
                    <Image src={project.image} alt={`Imagem de referência do projeto ${project.title}`} fill sizes="(max-width: 760px) 86vw, 28rem" />
                    <span>Obra predial</span>
                  </div>
                  <div className="building-carousel-copy">
                    <p>{project.detail}</p>
                    <h3>{project.title}</h3>
                    <Link href={`/contato?assunto=${encodeURIComponent(project.title)}`}>
                      Conversar sobre este projeto <ArrowUpRight />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="building-carousel-controls">
            <button type="button" className="carousel-arrow" onClick={() => move(-1)} aria-label="Projeto anterior"><ArrowLeft /></button>
            <div className="carousel-dots" aria-label="Selecionar projeto">
              {buildingProjects.map((project, index) => (
                <button key={project.slug} type="button" aria-label={`Mostrar ${project.title}`} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} />
              ))}
            </div>
            <button type="button" className="carousel-arrow" onClick={() => move(1)} aria-label="Próximo projeto"><ArrowRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
