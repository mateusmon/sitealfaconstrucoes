# Contrato de design

> Atualização: a direção visual atual transpõe o design e motion do arquivo Maré fornecido pelo usuário. Fonte detalhada: `design-system/gama-galvao-engenharia/pages/mare-adaptation.md`. A estrutura e os fluxos descritos neste contrato permanecem, com novos enquadramentos, escala e movimentos. CSS da adaptação: `src/app/mare-design.css`.

## Tarefa

Apresentar a Gama Galvão como uma empresa de engenharia capaz de executar e coordenar obras de infraestrutura, edificações e serviços técnicos, conduzindo o visitante a conhecer projetos ou solicitar orçamento.

## Público e contexto

Contratantes, incorporadoras, condomínios e responsáveis por obras que precisam verificar áreas de atuação, experiência e canais de contato em desktop ou celular.

## Direção escolhida

**Instrumento técnico + galeria imersiva.** O grafite organiza e transmite solidez; fotografia documental prova execução; tipografia ampla cria presença sem depender de efeitos; o laranja do logotipo fica reservado a ações e sinalização.

Uma direção alternativa mais clara e corporativa foi descartada porque enfraquecia a personalidade do logotipo e aproximava o site de um template genérico de serviços.

## Hierarquia

1. Compromisso da empresa e escopo de atuação.
2. Serviços reconhecíveis e projetos reais.
3. Responsabilidade técnica e atualizações.
4. Solicitação de orçamento e contatos diretos.

## Sistema

- Grafite `#293644`, laranja `#E89A5D`, papel `#F2F3EF`, branco e cinzas frios.
- Space Grotesk nos títulos e Archivo na leitura e interface, carregadas com `next/font`.
- Containers fluidos até 80rem, grandes blocos fotográficos, divisores finos e sombras evitadas.
- Abertura com `public/videos/intro.mp4`: trecho real da obra, marca em camadas, opção de pular, Escape e reprodução uma vez por sessão. Pode ser revista no rodapé ou com `/?intro`. Sem abertura automática quando o visitante prefere movimento reduzido.
- Hero com vídeo real, título e CTAs estáveis, controle de pausa e pausa automática fora da tela. Sem travar a rolagem.
- Orçamento em três etapas inspirado no agendamento do Malu Odonto: seleção, obra/contato e revisão. Resumo grafite lateral no desktop, abaixo no celular. Envio preparado em aplicativo de e-mail ou Gmail, com cópia de mensagem como alternativa.

## Adaptação

No mobile, textos saem de sobreposições frágeis, grids viram sequência de uma coluna, metadados permanecem sempre visíveis e o menu ganha uma camada dedicada. A ordem semântica não depende de reordenação visual.

## Comportamento e prova

- Filtro de projetos precisa alterar resultados e anunciar a quantidade.
- Menu móvel deve abrir, fechar e manter estado acessível.
- Formulário deve preservar entradas, mostrar erros ligados aos campos e preparar um e-mail sem alegar envio automático.
- Conferir desktop, celular e tablet, além de build, lint e checagem de tipos. Registro atual em `docs/QA_REDESIGN_V2.md`.
- Galeria manual, navegação por teclado e fotos originais corretamente associadas aos oito projetos prediais. Fontes registradas em `docs/IMAGE_PROVENANCE.md`.
