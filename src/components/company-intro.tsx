"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ArrowRight } from "./icons";

const SESSION_KEY = "gama-intro-v2";

export function CompanyIntro() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.classList.contains("is-leaving")) return;
    dialog.classList.add("is-leaving");
    if (playTimer.current) clearTimeout(playTimer.current);
    videoRef.current?.pause();
    try { sessionStorage.setItem(SESSION_KEY, "seen"); } catch { /* Storage may be disabled. */ }
    closeTimer.current = setTimeout(() => {
      dialog.close();
      document.documentElement.classList.remove("company-intro-active");
      window.dispatchEvent(new Event("gama:intro-finished"));
      document.querySelector<HTMLElement>("#hero-title")?.focus({ preventScroll: true });
    }, 420);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!dialog || !video) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function start() {
      if (motionPreference.matches || dialog!.open) return;
      dialog!.classList.remove("is-leaving");
      window.scrollTo({ top: 0, behavior: "instant" });
      dialog!.showModal();
      document.documentElement.classList.add("company-intro-active");
      video!.currentTime = 0;
      void video!.play().catch((error: DOMException) => { if (error.name !== "AbortError") finish(); });
      if (playTimer.current) clearTimeout(playTimer.current);
      playTimer.current = setTimeout(finish, 4700);
    }
    function preferenceChanged() { if (motionPreference.matches) finish(); }
    let seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === "seen"; } catch { /* Intro still remains optional. */ }
    const forced = new URLSearchParams(window.location.search).has("intro");
    if (forced || (!seen && !window.location.hash)) start();
    window.addEventListener("gama:replay-intro", start);
    motionPreference.addEventListener("change", preferenceChanged);
    return () => {
      if (playTimer.current) clearTimeout(playTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      video.pause(); dialog.close();
      document.documentElement.classList.remove("company-intro-active");
      window.removeEventListener("gama:replay-intro", start);
      motionPreference.removeEventListener("change", preferenceChanged);
    };
  }, [finish]);

  return (
    <dialog ref={dialogRef} className="company-intro" aria-labelledby="intro-title" onCancel={event => { event.preventDefault(); finish(); }}>
      <video ref={videoRef} muted playsInline preload="none" poster="/images/hero-rodovia-poster.jpg" onEnded={finish} onError={finish} aria-hidden="true" tabIndex={-1}><source src="/videos/intro.mp4" type="video/mp4" /></video>
      <div className="intro-shade" />
      <div className="intro-top"><span>Gama Galvão Engenharia</span><span>Distrito Federal · Bahia</span></div>
      <div className="intro-brand">
        <Image src="/images/logo-reference.png" alt="" width={240} height={240} className="intro-logo" />
        <p>Do planejamento à execução.</p><h2 id="intro-title">Engenharia em movimento.</h2><span>Infraestrutura. Construção. Responsabilidade.</span>
      </div>
      <button className="intro-skip" type="button" autoFocus onClick={finish}>Pular abertura <ArrowRight /></button>
      <div className="intro-progress" aria-hidden="true"><span /></div>
    </dialog>
  );
}
