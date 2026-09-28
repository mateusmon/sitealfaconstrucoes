"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Motion adapted from the supplied Maré archive, without global scroll interception. */
export function MareMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const root = document.documentElement;
    const running = new Set<Animation>();
    const cleanups: (() => void)[] = [];
    let frame = 0;
    let heroEntered = false;
    root.classList.add("mare-motion-ready");

    function play(element: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
      if (preference.matches) return;
      const animation = element.animate(keyframes, options);
      running.add(animation);
      void animation.finished.then(() => running.delete(animation)).catch(() => undefined);
    }
    function enterHero() {
      if (heroEntered || document.querySelector(".company-intro[open]")) return;
      heroEntered = true;
      document.querySelectorAll(".hero-line > span").forEach((element,index) => play(element,[{ transform: "translateY(110%) rotate(2deg)" },{ transform: "translateY(0) rotate(0)" }],{ duration: 1150, delay: index * 90, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
      document.querySelectorAll(".hero-meta, .hero-intent").forEach(element => play(element,[{ opacity: 0, transform: "translateY(12px)" },{ opacity: 1, transform: "none" }],{ duration: 850, delay: 250, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
    }
    const introEnded = () => enterHero();
    window.addEventListener("gama:intro-finished", introEnded);
    const entryFrame = requestAnimationFrame(enterHero);

    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const element = entry.target;
      if (element.matches(".footer-word")) {
        element.querySelectorAll("span").forEach((letter,index) => play(letter,[{ transform: "translateY(100%)", opacity: 0 },{ transform: "none", opacity: 1 }],{ duration: 1000, delay: index * 38, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
      } else if (element.matches(".company-image, .article-media")) {
        play(element,[{ clipPath: "inset(0 12% 0 12% round 24px)" },{ clipPath: "inset(0 0% 0 0% round 12px)" }],{ duration: 1100, easing: "cubic-bezier(.16,1,.3,1)" });
      } else if (element.matches(".expertise-timeline")) {
        element.querySelectorAll("li").forEach((row,index) => play(row,[{ transform: "translateX(24px)", opacity: .4 },{ transform: "none", opacity: 1 }],{ duration: 700, delay: index * 75, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
      } else {
        play(element,[{ clipPath: "inset(0 0 100% 0)", transform: "translateY(30px)" },{ clipPath: "inset(0 0 0% 0)", transform: "none" }],{ duration: 950, easing: "cubic-bezier(.16,1,.3,1)" });
      }
    }),{ threshold: .12, rootMargin: "0px 0px -25px 0px" });
    document.querySelectorAll(".chapter-heading h2, .expertise-grid h2, .expertise-timeline, .company-image, .news-card, .page-hero h1, .article-media, .quote-main > h1, .quote-main > h2, .footer-word").forEach(element => observer.observe(element));

    const media = document.querySelector<HTMLElement>(".hero-media-scene");
    const statement = document.querySelector<HTMLElement>(".word-statement");
    const words = statement ? [...statement.querySelectorAll<HTMLElement>("span")] : [];
    function updateScroll() {
      frame = 0;
      root.style.setProperty("--page-progress", String(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)));
      if (preference.matches) return;
      if (media) {
        const rect = media.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight) {
          const progress = Math.max(0,Math.min(1,(innerHeight * .9 - rect.top) / (innerHeight * .8)));
          media.style.setProperty("--film-inset", `${(1 - progress) * (innerWidth > 760 ? 6 : 2)}%`);
          media.style.setProperty("--film-radius", `${(1 - progress) * 24}px`);
          media.style.setProperty("--film-parallax", `${innerWidth > 760 ? (1 - progress) * -4 : 0}%`);
        }
      }
      if (statement) {
        const rect = statement.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight) {
          const progress = Math.max(0,Math.min(1,(innerHeight * .85 - rect.top) / (innerHeight * .45 + rect.height * .4)));
          words.forEach((word,index) => word.style.setProperty("--word-lit", progress >= index / words.length ? "1" : ".48"));
        }
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateScroll); };
    window.addEventListener("scroll",schedule,{ passive: true });
    window.addEventListener("resize",schedule,{ passive: true });
    const resetMotion = () => {
      running.forEach(animation => animation.cancel()); running.clear();
      media?.style.removeProperty("--film-inset"); media?.style.removeProperty("--film-radius"); media?.style.removeProperty("--film-parallax");
      words.forEach(word => word.style.removeProperty("--word-lit"));
      schedule();
    };
    preference.addEventListener("change",resetMotion);
    updateScroll();

    // Move only the inner arrow, not the click target, for pointer magnetism.
    document.querySelectorAll<HTMLElement>(".button--arrow").forEach(button => {
      const inner = button.querySelector<HTMLElement>(":scope > span");
      if (!inner) return;
      const move = (event: PointerEvent) => {
        if (preference.matches || !finePointer.matches) return;
        const rect = button.getBoundingClientRect();
        inner.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .055}px, ${(event.clientY - rect.top - rect.height / 2) * .15}px)`;
      };
      const leave = () => { inner.style.transform = ""; };
      button.addEventListener("pointermove",move); button.addEventListener("pointerleave",leave);
      cleanups.push(() => { button.removeEventListener("pointermove",move); button.removeEventListener("pointerleave",leave); leave(); });
    });
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame); cancelAnimationFrame(entryFrame);
      running.forEach(animation => animation.cancel()); cleanups.forEach(cleanup => cleanup());
      window.removeEventListener("scroll",schedule); window.removeEventListener("resize",schedule);
      window.removeEventListener("gama:intro-finished",introEnded); preference.removeEventListener("change",resetMotion);
      root.classList.remove("mare-motion-ready"); root.style.removeProperty("--page-progress");
      media?.style.removeProperty("--film-inset"); media?.style.removeProperty("--film-radius"); media?.style.removeProperty("--film-parallax");
      words.forEach(word => word.style.removeProperty("--word-lit"));
    };
  },[pathname]);
  return <div className="page-progress" aria-hidden="true"><span /></div>;
}
