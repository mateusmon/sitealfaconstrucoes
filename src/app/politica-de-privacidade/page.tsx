import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Política de privacidade" };

export default function PrivacyPage() {
  return (
    <article className="legal-page section">
      <div className="shell reading">
        <p className="eyebrow"><span aria-hidden="true" />Privacidade</p>
        <h1>Política de privacidade</h1>
        <p>
          Este site apresenta informações institucionais e oferece canais de contato com a Gama Galvão Engenharia.
          O formulário disponível prepara uma mensagem no aplicativo de e-mail do visitante e não armazena os dados no site.
        </p>
        <h2>Dados informados por você</h2>
        <p>
          Nome, e-mail, telefone, empresa, serviço desejado, local, etapa, previsão de início e descrição da obra serão incluídos somente no e-mail que você decidir enviar. Revise o conteúdo antes do envio. O site oferece opções para abrir o aplicativo de e-mail, o Gmail ou copiar a mensagem.
        </p>
        <h2>Abertura em vídeo</h2>
        <p>O navegador registra apenas que a abertura já foi vista nesta sessão. Esse registro não identifica você e é usado para evitar a repetição do vídeo durante a navegação.</p>
        <h2>Contato</h2>
        <p>
          Para dúvidas sobre privacidade ou sobre o uso das informações enviadas, escreva para <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p className="legal-note">Última atualização: 28 de setembro de 2026.</p>
      </div>
    </article>
  );
}
