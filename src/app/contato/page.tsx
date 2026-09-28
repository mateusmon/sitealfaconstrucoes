import type { Metadata } from "next";
import { QuoteRequest } from "@/components/quote-request";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Gama Galvão Engenharia e solicite uma conversa sobre sua obra.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ servico?: string; assunto?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <QuoteRequest key={`${params.servico || ""}-${params.assunto || ""}`} standalone initialService={typeof params.servico === "string" ? params.servico : ""} initialSubject={typeof params.assunto === "string" ? params.assunto : ""} />
      <section className="contact-details" aria-label="Canais de contato"><div className="shell contact-details-grid"><div><h2>Telefones</h2>{site.phones.map((phone,index) => <a key={phone} href={site.phoneLinks[index]}>{phone}</a>)}</div><div><h2>Nas redes</h2><a href={site.instagram} target="_blank" rel="noreferrer">@gamagalvaoengenharia ↗</a></div><div><h2>Nosso escritório</h2><p>{site.address}</p></div></div></section>
    </>
  );
}
