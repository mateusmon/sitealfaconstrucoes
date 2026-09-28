"use client";

import { ArrowRight } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ReplayIntro() {
  const pathname = usePathname();
  if (pathname !== "/") return <Link className="replay-intro" href="/?intro">Assistir à abertura <ArrowRight /></Link>;
  return <button type="button" className="replay-intro" onClick={() => window.dispatchEvent(new Event("gama:replay-intro"))}>Rever abertura <ArrowRight /></button>;
}
