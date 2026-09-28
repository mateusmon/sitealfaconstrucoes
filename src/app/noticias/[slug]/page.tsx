import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { formatDate, news } from "@/data/site";

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((entry) => entry.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: { type: "article", images: [item.image], publishedTime: item.date },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = news.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <article className="article-page">
      <header className="article-header dark-surface">
        <div className="shell article-header-inner">
          <Link className="back-link" href="/noticias">← Voltar para notícias</Link>
          <div className="news-meta news-meta--light">
            <span>{item.category}</span>
            <time dateTime={item.date}>{formatDate(item.date)}</time>
          </div>
          <h1>{item.title}</h1>
          <p>{item.excerpt}</p>
        </div>
      </header>
      <div className="shell article-media">
        <Image src={item.image} alt={item.imageAlt} fill sizes="100vw" priority />
      </div>
      <div className="shell article-layout">
        <div className="article-body">
          {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p>
            Para informações sobre escopo, disponibilidade ou serviços relacionados, fale diretamente com a equipe da Gama Galvão.
          </p>
          <Link className="button button--dark" href="/contato">Falar com a equipe <ArrowRight /></Link>
        </div>
        <aside className="article-aside">
          <p className="footer-label">Serviços relacionados</p>
          <ul>
            <li>Terraplanagem</li>
            <li>Pavimentação</li>
            <li>Drenagem</li>
            <li>Acompanhamento técnico</li>
          </ul>
        </aside>
      </div>
    </article>
  );
}
