# Revisão integral — 28/09/2026

Esta revisão implementa o novo pedido do usuário: UI/UX Pro Max, abertura MP4 institucional e orçamento com o fluxo/layout do agendamento em `C:/maluodonto/`. As decisões abaixo substituem, para as páginas atuais, as escolhas visuais anteriores do MASTER. O arquivo MASTER permanece como histórico.

## Direção aplicada

- Consulta UI/UX Pro Max: `construction engineering portfolio cinematic`, variance 7, motion 7, density 3. Resultado pertinente: hero com uma ação dominante, composição espaçosa, cinza industrial e laranja, tipografia Archivo / Space Grotesk.
- Paleta ajustada à marca real: grafite `#293644`, grafite profundo `#1F2933`, laranja `#E89A5D`, superfícies de leitura `#F2F3EF` / `#E9ECE9`. Texto grafite nos botões laranja.
- Títulos Space Grotesk; texto e interface Archivo. Fontes locais servidas pelo Next.js, corpo de 16 px, campos de 16 px para preservar uso no celular.
- Container de até 1280 px, margens fluidas, divisores finos, imagens documentais, raios de 8–22 px. Navegação grafite consistente em todas as páginas.
- Estilos ativos centralizados em `src/app/design.css`. Os estilos anteriores não são importados pelo layout atual.

## Percurso

Abertura opcional → proposta e vídeo de obra → empresa → serviços navegáveis → uma galeria com categorias → responsabilidade técnica → notícias → orçamento.

## Movimento

- Abertura de 4,2 segundos, vista uma vez por sessão, botão de pular, Escape e opção de repetir. Sem áudio. Movimento reduzido pula a abertura.
- Hero com vídeo local, pausa manual, pausa fora de vista/aba e poster estático com movimento reduzido.
- Entradas editoriais com CSS view-timeline e fallback visível. Galeria manual; nenhum carrossel automático ou coluna infinita.
- Mudanças de etapa em 350 ms, sem perder dados ou deslocar campos com erro para fora do campo de leitura.

## Orçamento, derivado da referência odontológica

- Mesma estrutura: formulário de três etapas à esquerda e resumo grafite à direita, fixo durante a rolagem no desktop.
- 1. Serviço; 2. Obra e contato; 3. Revisão.
- Campos de orçamento: nome, e-mail, telefone opcional, empresa opcional, local, etapa, previsão de início opcional e descrição.
- Erros junto ao campo e foco no primeiro erro. Voltar/editar preserva entradas. Novo pedido reinicia o fluxo.
- E-mail preenchido destinado a `gamagalvaodf@gmail.com`: aplicativo padrão, Gmail ou copiar mensagem. Nenhum estado alega envio concluído.
- Home e `/contato` usam o mesmo componente. Links de serviços pré-selecionam a opção; links de obras preenchem o contexto.

## Conteúdo

Fotos dos oito projetos prediais recuperadas das galerias originais. Portfólio completo inclui os oito projetos e os seis registros anteriormente presentes. Informações institucionais e contatos conferidos no site oficial em 28/09/2026.
