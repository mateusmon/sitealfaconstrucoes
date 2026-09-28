---
name: calyanimation
description: Analisa um site ou aplicação web de ponta a ponta e implementa animações autorais, sofisticadas e coerentes com a identidade visual. Use quando o usuário pedir CalyAnimation, motion design, animações premium/high-end/cinematográficas, microinterações, transições, ou disser apenas para analisar o projeto e dar outra cara ao site com movimento. Também atende pedidos abertos como “deixe o site mais premium” quando a experiência visual e as animações forem parte clara da intenção. Works for React, Next.js, Vue, Svelte and static HTML/CSS.
---

# CalyAnimation

Atue como diretor de motion design **e** engenheiro de front-end. Descubra a linguagem do projeto, crie uma direção de movimento específica para ela, implemente essa direção no código e verifique a experiência funcionando. Um pedido como “analise e deixe mais premium” autoriza a implementação. Se o usuário pedir **somente** uma avaliação, entregue apenas a avaliação.

## Resultado esperado

- Faça o site parecer deliberadamente dirigido, com ritmo, profundidade, continuidade espacial e resposta refinada às ações; busque um momento memorável e um sistema coeso no restante da interface.
- Use o briefing e o gosto do usuário para definir a intensidade. “Insano”, “cinematográfico” e “high-end” pedem ambição criativa, mas mantenha leitura, conversão, usabilidade e desempenho. Evite movimento em todos os elementos por reflexo.
- Entregue mudanças reais em páginas e componentes, não só conceitos, pseudocódigo, um plano ou uma coleção de animações avulsas. Não altere textos, marca, rotas ou fluxos de negócio sem necessidade para a composição.

## 1. Faça a leitura do projeto antes de animar

1. Localize instruções do projeto, estrutura de rotas, páginas, layouts compartilhados, sistema visual, fontes, tokens, imagens, componentes, estados interativos, breakpoints, dependências, animações existentes e scripts de build. Identifique a stack e versões instaladas. Use busca no código; não suponha que tudo está na homepage.
2. Inventarie todas as rotas e modelos de página relevantes. Observe no navegador os modelos principais em desktop e mobile, incluindo entrada, rolagem, hover/foco e mudança de estado. Em projetos grandes, inspecione cada modelo distinto e seus componentes compartilhados; registre o que ficou fora do alcance.
3. Determine a promessa do site, o público, a ordem de atenção, a principal ação desejada, o tom visual e o que já funciona. Identifique animações genéricas, desconectadas, repetidas ou que causam saltos e travamentos.
4. Respeite a direção atual. Se houver material de marca, use-o; se não houver, infira a linguagem dos elementos existentes. Registre internamente, em poucas linhas: **3 traços visuais**, **1 ideia de movimento** e **1 regra de ritmo** que tornarão o resultado reconhecível como parte deste site.

Se o usuário delimitar uma página ou componente, examine o contexto compartilhado e concentre as edições no escopo pedido. Se pedir o site inteiro, distribua o sistema pelas rotas relevantes; não confunda “projeto inteiro” com animar cada elemento.

## 2. Dirija uma experiência, não uma lista de efeitos

Desenhe um pequeno *motion storyboard* antes de editar: o que o visitante percebe na entrada, como a cena evolui na rolagem, o que acontece quando interage e como os estados se conectam. Defina para cada trecho: gatilho, elementos, ordem, trajetória, duração aproximada, estado final, comportamento mobile e alternativa de movimento reduzido.

Esboce mentalmente pelo menos duas direções distintas e escolha a que melhor expressa o conteúdo real. Se a assinatura pudesse ser copiada sem alterações para outro site, refine-a. Uma assinatura forte costuma coordenar duas ou mais camadas em fases (antecipação, transformação, repouso), com um motivo visual que se repete em escala menor nas interações. Não use blur, brilho, partículas ou animações intermináveis como substitutos de uma ideia.

Em pedidos amplos, distribua o trabalho por:

- **Assinatura:** um momento com personalidade, preferencialmente no hero ou em uma seção narrativa importante. Pode combinar máscara editorial, mudança de enquadramento, camadas e tipografia, transição de composição, revelação progressiva de mídia ou progressão visual ligada à rolagem.
- **Linguagem recorrente:** 2–4 motivos discretos reutilizados entre seções ou modelos de página, com a mesma lógica espacial da assinatura.
- **Resposta funcional:** estados de botões, cards, menus, filtros, formulários, navegação ou carregamento. A interação deve confirmar a ação e preservar orientação.

Escalone de acordo com o projeto: uma landing page curta pode precisar apenas de uma assinatura e algumas interações; um site com várias rotas deve compartilhar componentes e tokens de movimento. Adapte, não copie estas possibilidades:

| Contexto | Direção possível |
| --- | --- |
| Editorial / portfólio | Imagens entram por recorte conectado à composição; títulos revelam linhas em ritmo de leitura; navegação preserva o enquadramento. |
| Educação / institucional | Capítulos conduzem da situação inicial à conquista; fotos e tipografia avançam em camadas; CTA mantém presença clara. |
| Produto / e-commerce | A imagem do item mantém continuidade entre vitrine e detalhe; seleção e carrinho respondem com transformações legíveis. |
| Dashboard / SaaS | Filtros, números e gráficos transitam entre estados sem perder contexto; carregamento comunica progresso real. |

Se o usuário pedir um efeito específico, dê prioridade a ele e encaixe o restante na mesma linguagem. Uma ideia ousada exige composição, sequência e motivo visual; apenas aumentar duração, blur ou amplitude não a torna premium.

### Perfil de motion da Gama Galvão

Quando o projeto for o site da Gama Galvão Engenharia, leia [references/gama-galvao-motion.md](references/gama-galvao-motion.md) antes de decidir a direção ou adicionar efeitos. Esse perfil combina composição editorial ampla e navegação compacta, inspiradas na Maré Importadora, com fotografia de obra cinematográfica e progressão visual, inspiradas na Solartech. Adapte os padrões à marca grafite e laranja, ao conteúdo confirmado e à implementação atual; não copie os sites de referência.

## 3. Implemente no código existente

1. Use a solução mais adequada à stack: CSS para transições e estados simples, Web Animations API ou biblioteca **já presente** para timelines, gestos e sequências complexas. Adicione dependência apenas se o ganho justificar peso, manutenção e compatibilidade; verifique a API da versão usada. Evite CDN e soluções que conflitem com SSR ou hidratação.
2. Crie tokens compartilhados de duração, curvas, distância e atraso onde forem úteis. Coordene origem, direção e profundidade de modo que o movimento pareça ligado à hierarquia visual. Como pontos de partida, use ~120–250 ms para feedback, ~250–600 ms para transições de componentes e ~600–1200 ms para um momento de entrada; ajuste pela sensação real no navegador. Evite atrasar texto essencial e CTA.
3. Dê à assinatura um início e fim nítidos. Faça mídia, tipografia e plano de fundo dialogarem entre si. Use mudanças de máscara, recorte, enquadramento, escala moderada, continuidade entre estados e sequências com sobreposição quando elas servirem à composição. Evite aplicar em série a mesma receita `opacity: 0; translateY(20px)` em todos os blocos.
4. Associe efeitos de rolagem à progressão real e mantenha limites claros. Revele conteúdo uma única vez quando fizer sentido; não prenda o scroll, não force smooth scrolling global, não crie parallax incessante nem deixe elementos essenciais escondidos esperando um gatilho que pode falhar.
5. Faça as interações funcionarem para mouse, toque e teclado. Hover pode ter refinamentos extras em dispositivos `hover: hover`, mas foco, clique e estado final precisam ser compreensíveis sem hover. Não mova o alvo interativo para fora do alcance do ponteiro.
6. Preserve conteúdo semanticamente acessível ao animar texto: evite letras duplicadas anunciadas por leitores de tela, saltos de layout e mudanças da ordem de leitura. Respeite `prefers-reduced-motion`: retire deslocamentos, parallax, flashes e sequências longas; mantenha a informação e o feedback necessários. Não dependa de JavaScript para o conteúdo começar visível.
7. Priorize `transform` e `opacity` para movimento contínuo. Use `clip-path`, filtros, canvas ou vídeo quando o impacto visual compensar o custo medido. Evite leituras e escritas alternadas de layout em cada frame; limpe observers, listeners, timelines e `requestAnimationFrame`; previna CLS, vazamentos e animações duplicadas ao trocar de rota ou remontar componentes.

## 4. Revise até parecer pronto

1. Execute os comandos existentes de build, lint e testes relevantes. Corrija falhas introduzidas pelas alterações.
2. Confira no navegador ao menos os modelos de página alterados em mobile e desktop, do primeiro frame ao estado final: entrada, rolagem, interação, navegação, retorno e carregamento. Compare com a versão inicial quando possível.
3. Confira movimento reduzido, foco por teclado, texto e CTA acessíveis, ausência de corte/overflow, imagens estáveis, telas pequenas e dispositivos sem hover. Inspecione especialmente travamentos durante rolagem e carregamento lento. Ajuste timing e composição após observar o resultado; código compilado não prova qualidade visual.
4. Se não houver navegador disponível, faça a melhor verificação possível no código e declare com precisão o que não pôde observar. Não afirme que viu uma animação funcionar sem tê-la visto.
5. Entregue um resumo curto: direção criada, páginas/componentes modificados, interações implementadas, validação realizada e qualquer limitação concreta.

## Critério de qualidade

Pergunte ao concluir: “Se eu removesse esta animação, perderia uma parte da personalidade, compreensão ou resposta do site?” Se não, simplifique ou substitua. O resultado deve impressionar nos primeiros segundos, continuar coerente após vários cliques e permanecer agradável numa sessão longa.
