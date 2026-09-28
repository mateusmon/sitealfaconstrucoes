import Link from "next/link";
import { navigation, site } from "@/data/site";
import { Brand } from "./brand";
import { ReplayIntro } from "./replay-intro";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand"><Brand /><p>Engenharia aplicada à infraestrutura, edificações e desenvolvimento urbano.</p><ReplayIntro /></div>
          <div><h2 className="footer-label">Explore</h2><ul className="footer-links">{navigation.map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}<li><Link href="/politica-de-privacidade">Privacidade</Link></li></ul></div>
          <div><h2 className="footer-label">Vamos conversar</h2><ul className="footer-links">{site.phones.map((phone,index) => <li key={phone}><a href={site.phoneLinks[index]}>{phone}</a></li>)}<li><a href={`mailto:${site.email}`}>{site.email}</a></li><li><a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></li></ul></div>
        </div>
        <div className="footer-word" aria-hidden="true">{"GAMA GALVÃO".split("").map((letter,index) => <span key={index}>{letter === " " ? "\u00a0" : letter}</span>)}<span className="footer-period">.</span></div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} {site.name}</p><p>Distrito Federal · Bahia</p></div>
      </div>
    </footer>
  );
}
