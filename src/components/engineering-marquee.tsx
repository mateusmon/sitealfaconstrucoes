"use client";

import { useEffect, useRef, useState } from "react";

const disciplines = ["Terraplanagem", "Pavimentação", "Drenagem", "Construção predial"];

export function EngineeringMarquee() {
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const group = track?.firstElementChild;
    if (!section || !track || !group) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let width = group.getBoundingClientRect().width;
    let frame = 0;
    let visible = false;
    let direction = 1;
    let velocity = 0;
    let previousScroll = scrollY;
    let previousTime = 0;
    const tick = (time: number) => {
      if (!visible || document.hidden || paused || preference.matches) { frame = 0; previousTime = 0; return; }
      const delta = previousTime ? Math.min((time - previousTime) / 1000,.05) : 0;
      previousTime = time;
      velocity *= .94;
      offset.current -= (38 + Math.min(velocity * 5,180)) * direction * delta;
      if (width > 0) offset.current = ((offset.current % width) - width) % width;
      track.style.transform = `translate3d(${offset.current}px,0,0)`;
      frame = requestAnimationFrame(tick);
    };
    const resume = () => { if (!frame && !paused && !preference.matches && visible && !document.hidden) frame = requestAnimationFrame(tick); };
    const onScroll = () => { const delta = scrollY - previousScroll; previousScroll = scrollY; if (Math.abs(delta) > 2) direction = Math.sign(delta); velocity = Math.min(Math.abs(delta),40); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    const resize = new ResizeObserver(() => { width = group.getBoundingClientRect().width; });
    observer.observe(section); resize.observe(group);
    window.addEventListener("scroll",onScroll,{ passive: true });
    document.addEventListener("visibilitychange",resume);
    preference.addEventListener("change",resume);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); window.removeEventListener("scroll",onScroll); document.removeEventListener("visibilitychange",resume); preference.removeEventListener("change",resume); };
  },[paused]);
  return <section ref={sectionRef} className={`engineering-marquee${paused ? " is-paused" : ""}`} aria-label="Áreas da engenharia Gama Galvão"><div className="marquee-window"><div ref={trackRef} className="marquee-track">{[0,1].map(group => <div className="marquee-group" key={group} aria-hidden={group === 1 ? true : undefined}>{disciplines.map(item => <span key={item}>{item}<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" /></svg></span>)}</div>)}</div></div><button type="button" className="marquee-control" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Retomar faixa" : "Pausar faixa"}<span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button></section>;
}
