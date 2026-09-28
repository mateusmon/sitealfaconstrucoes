# Design + motion — adaptação do arquivo Maré

Este override atende ao pedido de aplicar o design de `C:/design/mare-importadora (3).zip` preservando a estrutura institucional e o orçamento existentes. Tem precedência visual sobre `redesign-v2.md` para a implementação atual. O MASTER histórico permanece preservado.

## Direção

Editorial técnico em grande escala: a mesma composição de títulos em três linhas deslocadas, filme abaixo da chamada, navegação em cápsula, rótulos monoespaçados, serviços amplos e galeria horizontal fotográfica. Grafite e laranja substituem o preto e azul da Maré; fotos, vídeo e dados continuam sendo da Gama.

CSS-base: `src/app/design.css`; adaptação: `src/app/mare-design.css`, importada depois no layout. Mantidas Space Grotesk e Archivo, com itálico geométrico no acento do hero em vez da fonte serifada da referência.

## Transposição do código fornecido

| Maré | Gama |
|---|---|
| `.hero__title .line__inner` | `.hero-line > span`, revelação por máscara em cascata após a intro |
| `.hero__frame`, clip-path + parallax | `.hero-film`, enquadramento controlado pelo progresso da rolagem, sem interceptar scroll |
| `.marquee__track`, velocidade/direção | `EngineeringMarquee`, deslocamento contínuo, direção e impulso de scroll, pausa manual e fora da tela |
| `.js-words` | `.word-statement`, leitura progressiva da mensagem institucional |
| `.services .service` | Seis serviços em accordion com imagem documental, descrição e link de orçamento |
| `.cats__track` | Faixa horizontal de obras com snap nativo, toque, teclado e seleção ligada à galeria principal |
| `.magnetic` | Magnetismo somente na seta interna: alvo do botão permanece estável |
| `.footer__word` | Marca tipográfica gigante com entrada de letras em sequência |
| GSAP/Lenis globais | Web Animations API, IntersectionObserver e rAF, sem dependências ou CDN novos |

## Estrutura mantida

Intro MP4 → hero → empresa → soluções → obras → responsável técnico → notícias → orçamento → rodapé. Rotas, âncoras, conteúdo, contatos, projetos e as três etapas de orçamento permanecem. Faixa editorial é um complemento visual, não uma nova etapa de negócio.

## Limites intencionais

- Não importar simulador tributário, depoimentos, números fictícios, newsletter sem backend ou formulário que simula envio da Maré.
- Manter o cursor nativo e a rolagem nativa. A galeria não força uma longa seção presa à rolagem e permanece controlável por teclado e toque.
- Sem preloader de porcentagem falsa: manter a intro real já solicitada, com opção de pular.
- Todos os conteúdos começam visíveis sem JS. Animações são aprimoramento progressivo, nunca requisito para ler ou navegar.
- Movimento reduzido desliga máscaras, parallax, faixa contínua e entrada de letras; vídeo segue com poster e controle manual.
- Observers, listeners, animações e rAF têm limpeza na mudança de rota/desmontagem.
