# Gama Galvão Engenharia — redesign

Redesign institucional construído em Next.js com a identidade grafite e laranja da marca, conteúdo baseado no site atual e imagens verificadas do acervo público da empresa.

## Executar localmente

```bash
pnpm install
pnpm dev
```

Acesse o endereço informado pelo servidor. Para esta revisão, use `pnpm dev --port 3106`; a prévia de produção está em `http://localhost:3105`.

## Verificações

```bash
pnpm lint
pnpm typecheck
pnpm build
```

A revisão atual usa inspeção do navegador em desktop, tablet e celular, incluindo intro, menu, seleção de serviços, galeria, filtros e orçamento. O roteiro anterior `scripts/visual-qa.cjs` foi escrito para a versão antiga do formulário.

## Estrutura principal

- `src/app`: páginas, metadados, sitemap e estilos globais.
- `src/components`: cabeçalho, rodapé, cards, filtro e formulário.
- `src/components/construction-home.tsx`: composição atual da página inicial.
- `src/components/quote-request.tsx`: orçamento por etapas, compartilhado entre home e contato.
- `src/app/design.css`: sistema visual base.
- `src/app/mare-design.css`: adaptação atual do design do arquivo Maré, sobre a base.
- `src/components/mare-motion.tsx`: movimentos compartilhados, recortes na rolagem e entradas editoriais.
- `src/components/engineering-marquee.tsx`: faixa com direção/velocidade da rolagem, pausa e movimento reduzido.
- `public/videos/intro.mp4`: abertura com vídeo de obra da empresa, 4,2 segundos.
- `src/data/site.ts`: conteúdo institucional centralizado.
- `public/images`: imagens selecionadas para o projeto.
- `docs`: contrato de design e origem das imagens.
- `design-system`: especificação visual gerada para a marca.

O fluxo de orçamento prepara um e-mail para `gamagalvaodf@gmail.com`, com opções para abrir o aplicativo padrão, o Gmail ou copiar a mensagem. O visitante conclui o envio no serviço de e-mail escolhido.
