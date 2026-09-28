import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { formatDate, news } from "@/data/site";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Atualizações sobre obras, frota e serviços da Gama Galvão Engenharia.",
};

export default function NewsPage() {
  return (
    <>
      <section className="page-hero dark-surface">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow eyebrow--light"><span aria-hidden="true" />Gama Galvão News</p>
            <h1>Engenharia acompanhada de perto.</h1>
          </div>
          <p>Registros de campo, atualizações de obras e soluções disponíveis para novos projetos.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell news-list">
          {news.map((item) => (
            <article key={item.slug} className="news-row">
              <Link className="news-row-media" href={`/noticias/${item.slug}`}>
                <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 800px) 100vw, 38vw" />
              </Link>
              <div className="news-row-copy">
                <div className="news-meta">
                  <span>{item.category}</span>
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </div>
                <h2><Link href={`/noticias/${item.slug}`}>{item.title}</Link></h2>
                <p>{item.excerpt}</p>
                <Link className="text-link" href={`/noticias/${item.slug}`}>Ler notícia <ArrowRight /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
