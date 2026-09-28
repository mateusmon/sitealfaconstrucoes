import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="not-found dark-surface">
      <div className="shell">
        <p className="eyebrow eyebrow--light"><span aria-hidden="true" />Erro 404</p>
        <h1>Página não encontrada.</h1>
        <p>O endereço pode ter mudado durante a reorganização do site.</p>
        <Link className="button button--accent" href="/">Voltar para a página inicial <ArrowRight /></Link>
      </div>
    </section>
  );
}
