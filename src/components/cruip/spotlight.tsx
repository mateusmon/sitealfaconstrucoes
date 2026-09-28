"use client";

import type { MouseEvent, ReactNode } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
};

export default function Spotlight({ children, className = "" }: SpotlightProps) {
  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    const container = event.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    for (const card of Array.from(container.children)) {
      const cardRect = card.getBoundingClientRect();
      (card as HTMLElement).style.setProperty("--mouse-x", `${x - cardRect.left + containerRect.left}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y - cardRect.top + containerRect.top}px`);
    }
  }

  return <div className={className} onMouseMove={onMouseMove}>{children}</div>;
}
