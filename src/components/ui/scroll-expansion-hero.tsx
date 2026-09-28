"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

/** Scroll-linked expansion, adapted to the Gama Galvão home-page hero. */
export function ScrollExpansionHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [copyIsOut, setCopyIsOut] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const mediaStartWidth = viewportWidth === null || viewportWidth > 928 ? "52%" : viewportWidth <= 608 ? "78%" : "62%";
  const mediaWidth = useTransform(scrollYProgress, [0, 0.96], [mediaStartWidth, "100%"]);
  const mediaRadius = useTransform(scrollYProgress, [0, 0.96], ["24px 0px 0px 24px", "0px"]);
  const firstWordX = useTransform(scrollYProgress, [0.08, 0.66], ["0vw", "-6vw"]);
  const remainingTitleX = useTransform(scrollYProgress, [0.08, 0.66], ["0vw", "7vw"]);
  const copyOpacity = useTransform(scrollYProgress, [0.1, 0.64], [1, 0]);
  const promptOpacity = useTransform(scrollYProgress, [0, 0.2, 0.48], [1, 0.7, 0]);
  const sectionIsVisible = useInView(sectionRef, { once: true, amount: 0.1 });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setCopyIsOut(progress >= 0.64);
  });

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth, { passive: true });
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      video.currentTime = 2;
    } else if (sectionIsVisible) {
      void video.play().catch(() => undefined);
    }
  }, [reduceMotion, sectionIsVisible]);

  return (
    <section ref={sectionRef} className="scroll-expansion-shell" aria-label="Apresentação da Gama Galvão Engenharia">
      <div className="scroll-expansion-sticky">
        <motion.div
          className="scroll-expansion-media"
          style={reduceMotion ? undefined : { width: mediaWidth, borderRadius: mediaRadius }}
          aria-hidden="true"
        >
          <Image
            src="/images/hero-rodovia-poster.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
            className="scroll-expansion-poster"
          />
          <video
            ref={videoRef}
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-rodovia-poster.jpg"
            className="scroll-expansion-video"
            tabIndex={-1}
          >
            <source src="/videos/gama-galvao-hero.mp4" type="video/mp4" />
          </video>
          <div className="scroll-expansion-scrim" />
        </motion.div>

        <div className="scroll-expansion-content shell">
          <motion.div
            className="scroll-expansion-copy"
            style={reduceMotion ? undefined : { opacity: copyOpacity }}
            inert={copyIsOut}
          >
            <motion.p
              className="scroll-expansion-eyebrow"
              initial={false}
              animate={reduceMotion || sectionIsVisible ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              <span aria-hidden="true" /> Engenharia civil · Brasília/DF
            </motion.p>
            <h1 className="scroll-expansion-title" aria-label="Satisfação do cliente. Esse é o nosso principal compromisso.">
              <motion.span style={reduceMotion ? undefined : { x: firstWordX }}>Satisfação</motion.span>
              <motion.span style={reduceMotion ? undefined : { x: remainingTitleX }}>
                {"do cliente. Esse é o nosso principal compromisso."}
              </motion.span>
            </h1>
            <motion.div
              className="scroll-expansion-intro"
              initial={false}
              animate={reduceMotion || sectionIsVisible ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.32 }}
            >
              <p>Soluções em terraplanagem, pavimentação, drenagem, infraestrutura condominial e construção predial.</p>
              <div className="scroll-expansion-actions">
                <Link className="scroll-expansion-primary" href="/contato">
                  Solicitar orçamento <span aria-hidden="true"><ArrowUpRight /></span>
                </Link>
                <Link className="scroll-expansion-secondary" href="/projetos">
                  Conhecer nossas obras <ArrowRight />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.p className="scroll-expansion-prompt" style={reduceMotion ? undefined : { opacity: promptOpacity }} aria-hidden="true">
            Role para acompanhar a obra <span>↓</span>
          </motion.p>
          <div className="scroll-expansion-brandline" aria-hidden="true">
            <span>Obras de infraestrutura e construção predial</span>
            <span>Distrito Federal · Bahia</span>
          </div>
        </div>
      </div>
    </section>
  );
}
