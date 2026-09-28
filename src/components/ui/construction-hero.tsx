"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "../icons";

export function ConstructionHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(true);
  const manuallyPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const syncPlayback = () => {
      if (preference.matches || !visible || document.hidden || manuallyPaused.current) video.pause();
      else void video.play().catch(() => undefined);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncPlayback(); }, { threshold: .15 });
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    preference.addEventListener("change", syncPlayback);
    syncPlayback();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", syncPlayback); preference.removeEventListener("change", syncPlayback); video.pause(); };
  }, []);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { manuallyPaused.current = false; void video.play().catch(() => undefined); }
    else { manuallyPaused.current = true; video.pause(); }
  }

  return (
    <section className="construction-hero" ref={sectionRef} aria-labelledby="hero-title">
      <div className="shell hero-layout">
        <div className="hero-meta"><span>(Engenharia civil)</span><span>Distrito Federal · Bahia</span><a href="#empresa">Explore ↓</a></div>
        <div className="hero-copy">
          <h1 id="hero-title" tabIndex={-1}><span className="hero-line"><span>Engenharia que</span></span><span className="hero-line"><span>dá forma ao</span></span><span className="hero-line"><span className="hero-accent">seu projeto<span className="hero-period">.</span></span></span></h1>
          <div className="hero-intent"><p className="hero-description">Infraestrutura e construção predial.<br />Do preparo do solo à entrega da obra.</p><div className="hero-actions"><Link className="button button--outline" href="/#obras">Explore nossas obras <ArrowRight /></Link><Link className="button button--accent button--arrow" href="/#orcamento">Solicitar orçamento <span><ArrowUpRight /></span></Link></div></div>
        </div>
      </div>
      <div className="hero-media-scene">
        <div className="hero-film">
          <div className="hero-film-image" aria-hidden="true"><Image src="/images/hero-rodovia-poster.jpg" alt="" fill preload sizes="100vw" className="hero-poster" /><video ref={videoRef} muted loop playsInline preload="metadata" poster="/images/hero-rodovia-poster.jpg" onPlay={() => setPaused(false)} onPause={() => setPaused(true)} tabIndex={-1}><source src="/videos/gama-galvao-hero.mp4" type="video/mp4" /></video><div className="hero-shade" /></div>
          <div className="hero-film-heading" aria-hidden="true"><span>DA IDEIA</span><span>À EXECUÇÃO<span>.</span></span></div>
          <div className="hero-bottom"><span>Terraplanagem · Pavimentação · Drenagem</span><a href="#empresa" className="hero-scroll">Conheça a Gama Galvão <span aria-hidden="true">↓</span></a><button className="video-control" type="button" onClick={toggleVideo} aria-label={paused ? "Reproduzir vídeo da obra" : "Pausar vídeo da obra"}>{paused ? <svg viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z" /></svg> : <svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14" /></svg>}<span>{paused ? "Reproduzir" : "Pausar vídeo"}</span></button></div>
        </div>
      </div>
    </section>
  );
}
