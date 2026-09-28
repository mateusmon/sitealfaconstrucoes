---
name: caly-ux
description: Cria e implementa interfaces web premium com identidade visual própria a partir de um briefing curto, mesmo que o usuário só diga o contexto do site. Use para criar sites, landing pages, páginas de produto, lojas, portfólios, dashboards e para redesenhar interfaces existentes quando o usuário pedir UX/UI, design system, visual high-end, aparência premium ou um site menos genérico. Evita por padrão degradês, fontes serifadas e clichês visuais de sites gerados por IA.
---

# CalyUX

Transforme o contexto do negócio em um site real, utilizável e visualmente singular. Atue como diretor de arte, designer de produto e implementador front-end. O resultado deve ter uma ideia visual reconhecível, conteúdo que faça sentido para o público e acabamento em desktop e mobile. “Premium” não significa necessariamente preto, brilho e animações: encontre a linguagem adequada à marca.

## Contrato de execução

- Se o usuário pedir para **criar um site**, entregue a implementação funcionando no projeto, além da direção visual. Se pedir apenas conceito, avaliação ou design system, limite a entrega ao que foi pedido.
- Aceite um briefing de uma frase, como “um site para uma provedora de internet em Minas Gerais”. Infira público, objetivo, páginas e tom a partir do contexto. Não bloqueie o trabalho com questionário. Pergunte somente quando uma informação indispensável não puder ser inferida; continue o trabalho independente enquanto aguarda.
- Inspecione primeiro o projeto, a stack, o conteúdo e os arquivos de marca disponíveis. Preserve requisitos funcionais e identidade existente que o usuário queira manter. Em projeto vazio, escolha uma implementação simples e compatível com o ambiente.
- Trate nomes, preços, números, avaliações, depoimentos, certificações e promessas como fatos: nunca os invente. Use texto provisório claramente identificável quando necessário. Não publique nem finja integrar formulários, pagamentos ou agendamentos sem infraestrutura real.
- Siga preferências explícitas do usuário acima dos padrões desta skill. O padrão CalyUX rejeita fontes serifadas e degradês; só os use se o usuário solicitar expressamente.

## 1. Formular a direção antes de desenhar

Registre mentalmente ou em notas breves: **quem visita → o que precisa entender → o que precisa fazer → por que confiar**. Determine o caráter da marca (por exemplo: técnico e preciso, acolhedor e humano, cultural e expressivo) e as restrições de conteúdo. Se o briefing for escasso, faça suposições razoáveis e explicite apenas as que afetam a entrega.

Considere pelo menos duas direções visualmente diferentes, escolha uma com base no público e no objetivo e defina:

1. Uma frase de direção de arte: “Esta marca parece ___ porque ___”.
2. Um **gesto visual próprio**: composição, recorte de imagem, tipografia, estrutura editorial, textura, tratamento de dados ou interação que pertença àquele contexto.
3. A hierarquia de atenção: o que a pessoa deve notar em 3 segundos, em 15 segundos e ao explorar.

Não reutilize a mesma estrutura para negócios diferentes. Uma clínica pode exigir calma e clareza; um restaurante pode depender da fotografia e do cardápio; um software operacional pode priorizar demonstração de interface e prova técnica. Esse raciocínio define o sistema visual, não um catálogo fixo de templates.

## 2. Projetar a experiência e o conteúdo

- Organize as páginas e seções pela jornada do visitante. Escreva um título que diga o que é oferecido e para quem; evite slogans vazios como “Transformando o futuro” ou “Soluções inovadoras para você”. Use texto curto, específico e legível.
- Dê uma ação principal evidente e ações secundárias honestas. Deixe claro o destino de cada botão. Navegação, links, filtros, menus e estados devem funcionar; não adicione controles decorativos que simulem funcionalidade.
- Escolha seções conforme o serviço. Prova social, FAQ, tabela de preços, galeria ou números entram somente quando houver conteúdo real e ajudarem uma decisão. Não force hero centralizado + três cards + depoimentos + CTA em toda página.
- Projete estados de navegação, hover, foco, carregamento, vazio, erro e sucesso quando pertinentes. Em mobile, adapte a ordem e a densidade do conteúdo; não apenas empilhe a versão desktop.
- Escreva no idioma do usuário ou do público indicado. Revise títulos, microtexto e labels para eliminar jargão genérico de IA.

## 3. Definir um design system próprio para o projeto

Antes de espalhar estilos pelos componentes, estabeleça tokens no código (CSS custom properties, tema ou sistema equivalente) e aplique-os com consistência. Documente de forma concisa as decisões relevantes no projeto quando a escala justificar.

| Camada | Decisão necessária |
| --- | --- |
| Cor | Fundo, superfície, texto, texto secundário, borda, ação, feedback e seus contrastes. Escolha uma paleta ligada à marca, com acentos raros e intencionais. |
| Tipografia | Família **sem serifa** com boa legibilidade e acentos do idioma, escala responsiva, pesos, largura, espaçamento e entrelinha. Crie hierarquia por composição, não por troca automática para uma serifa “luxuosa”. |
| Grid e ritmo | Larguras máximas, margens fluidas, colunas, alinhamentos, espaços e respiros. Misture densidade e silêncio de forma deliberada. |
| Forma | Raio, bordas, divisores, sombras e tratamento de imagens. Defina uma família coerente; evite aplicar o mesmo card arredondado a tudo. |
| Componentes | Botões, campos, navegação, cards quando necessários, alertas e seus estados; todos derivados dos tokens. |
| Movimento | Transições úteis, discretas e coerentes com a marca. Inclua `prefers-reduced-motion`; não esconda informação atrás de animação. |

Faça uma verificação de consistência: cores e espaçamentos recorrentes devem virar tokens; variações pontuais precisam ter propósito. Legibilidade e contraste têm prioridade sobre atmosfera. Escolha luz, textura e profundidade compatíveis com o conteúdo; uma interface clara também pode ser high-end.

## 4. Evitar o visual genérico de IA

Por padrão, **não use**: fundos com degradê roxo/azul, glow neon, blobs, glassmorphism, fontes serifadas de “editorial premium”, pilhas de cards cinzas iguais, ícones emoji, fotos de banco de imagens sem relação com a oferta, mockups falsos, headlines intercambiáveis, excesso de cantos arredondados ou animações que disputem atenção com o conteúdo.

Essa lista é um diagnóstico de escolhas automáticas, não um banimento de recursos úteis. Um card pode organizar informação; uma sombra pode distinguir camadas. Use cada recurso apenas quando houver uma razão visual ou funcional específica. Não resolva a falta de identidade trocando o degradê por fundo preto com botões dourados: direção premium vem de composição, detalhe, tipografia, conteúdo e acabamento.

Priorize imagens e materiais fornecidos pelo usuário. Se houver ferramentas para buscar ou gerar ativos, selecione imagens pertinentes e utilizáveis, respeite direitos de uso e otimize tamanho/formato. Se não houver ativos adequados, crie uma linguagem visual intencional com layout, cor, tipografia, formas ou ilustração original em código. Não use URLs aleatórias nem invente fotos do negócio.

## 5. Implementar e revisar

1. Construa a UI na stack do projeto com componentes reutilizáveis e tokens centralizados. Se criar um projeto, deixe comandos e arquivos suficientes para executá-lo.
2. Garanta HTML semântico, headings em ordem, texto alternativo adequado, labels de campos, navegação por teclado, foco visível, contraste suficiente e alvos de toque confortáveis.
3. Cuide de performance: imagens dimensionadas e otimizadas, fontes com fallback, efeitos leves e ausência de dependências apenas para decoração. Não troque a usabilidade por um efeito de vitrine.
4. Abra a página e examine o resultado renderizado nas larguras aproximadas de 1440, 768 e 390 px, usando as ferramentas disponíveis. Corrija quebras, overflow, contrastes ruins, hierarquia fraca e regiões vazias. Teste a ação principal e os controles importantes. Se não houver preview disponível, verifique o que puder no código e informe esse limite.
5. Faça uma crítica visual final: **a marca é reconhecível sem ler o nome?**; **o primeiro bloco explica a oferta?**; **há ritmo entre seções?**; **mobile parece projetado?**; **cada elemento visual tem função?** Revise o que falhar antes de encerrar.

Na resposta final, mostre o resultado e resuma em poucas linhas a direção visual, o design system, o caminho para executar e o que foi efetivamente verificado. Evite apresentar uma longa proposta antes de produzir o site quando o usuário pediu implementação.

## Exemplos de interpretação de briefing mínimo

- “Site para uma provedora regional”: destacar cobertura, planos reais quando fornecidos e contato; comunicar estabilidade com estrutura precisa, mapas ou formas ligadas à rede, sem estética SaaS roxa genérica.
- “Site para um restaurante autoral”: fazer cardápio, horário, localização e reserva acessíveis; dar protagonismo a fotografias reais e composição editorial sem depender de fonte serifada.
- “Dashboard financeiro pessoal”: privilegiar saldo, compromissos e próximas ações; usar densidade informativa controlada e estados claros, em vez de decorar cada número com um card idêntico.
