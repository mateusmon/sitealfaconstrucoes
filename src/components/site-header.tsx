"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/site";
import { ArrowUpRight } from "./icons";
import { Brand } from "./brand";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLButtonElement>(null);
  const quoteHref = pathname === "/" ? "/#orcamento" : "/contato#orcamento";

  useEffect(() => {
    if (!open) return;
    function close(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); menuRef.current?.focus(); }
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand onClick={() => setOpen(false)} />
        <nav className="desktop-nav" aria-label="Navegação principal"><ul>{navigation.map(item => <li key={item.href}><Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link></li>)}</ul></nav>
        <div className="header-actions">
          <Link className="button button--accent header-quote" href={quoteHref} onClick={() => setOpen(false)}>Solicitar orçamento <ArrowUpRight /></Link>
          <button ref={menuRef} className="menu-trigger" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span className={open ? "menu-line menu-line--open" : "menu-line"} /><span className={open ? "menu-line menu-line--open" : "menu-line"} /></button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav shell" aria-label="Navegação móvel" hidden={!open}><ul>{navigation.map(item => <li key={item.href}><Link href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight /></Link></li>)}</ul><Link className="button button--accent" href={quoteHref} onClick={() => setOpen(false)}>Solicitar orçamento <ArrowUpRight /></Link></nav>
    </header>
  );
}
