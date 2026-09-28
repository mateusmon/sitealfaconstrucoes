# Perfil de motion — Gama Galvão Engenharia

Leia este perfil apenas ao trabalhar no site da Gama Galvão. Ele traduz as referências visuais fornecidas pelo cliente em uma linguagem de movimento própria para engenharia e portfólio de obras; não é um roteiro para reproduzir literalmente outros sites.

## Direção

- **Maré Importadora:** aproveitar a escala editorial dos títulos, a composição espaçosa, a navegação compacta e a continuidade entre capítulos.
- **Solartech:** aproveitar o protagonismo de fotografia panorâmica, as camadas e a sensação cinematográfica de avanço da cena.
- **Gama Galvão:** combinar precisão de engenharia, grafite `#293644` e laranja `#E89A5D`. No hero atual, a logo oficial fornecida é a imagem protagonista; fotos documentais continuam no portfólio. O gesto recorrente é a identidade da marca revelada por uma cortina horizontal, repetida em escala menor nos recortes e links.
- **Ritmo:** uma abertura com presença, movimentos ligados à rolagem em trechos editoriais selecionados e feedback breve nas interações. Deixar espaços de repouso entre cenas; não animar todos os componentes.

## Storyboard e biblioteca aplicável

| Momento | Movimento adequado | Base para implementar | Mobile e movimento reduzido |
|---|---|---|---|
| Entrada do hero | Cortina grafite revela a logo oficial fornecida; o título, resumo e ações entram em sequência curta, sem alterar o texto ou empurrar o layout. | Cortina ~900–1100 ms; título ~700–900 ms; apoio/CTA em cascata até ~700 ms. Usar arquivo original com dimensões explícitas e `object-fit: contain`. | Em mobile, manter logo e chamada legíveis na composição empilhada sem atrasar acesso ao orçamento. Com `prefers-reduced-motion`, mostrar logo, texto e ações no estado final imediatamente. |
| Profundidade de mídia | Zoom/parallax muito leve pode conectar uma foto panorâmica de obra à rolagem quando a fotografia for de fato o elemento principal; a animação termina junto com a cena e nunca prende o scroll. | Escala modesta (~1.06 → 1) com progresso limitado à seção; transformar somente `transform` quando possível. Não ampliar a logo quadrada além da nitidez do arquivo original. | Reduzir ou remover parallax em telas pequenas e em movimento reduzido. |
| Passagem por seções | Títulos, listas e blocos fotográficos entram no campo de leitura com pequeno deslocamento/fade; alternar recorte, direção ou camada para evitar o mesmo preset repetido. | Uma entrada por elemento/seção; cascata sutil apenas em grupos curtos. Usar `view-timeline` quando suportado, com fallback visível e estático. Nunca deixar conteúdo essencial escondido à espera de JavaScript. | Não retirar nem truncar conteúdo para ajustar a animação. Com movimento reduzido, revelar tudo sem deslocamento. |
| Lista de soluções | Linhas respondem ao foco/hover com ênfase de borda, indicação laranja e pequeno movimento de seta. Uma expansão suave só é apropriada se houver conteúdo adicional real e acionável. | Feedback ~150–250 ms; expansão ~250–400 ms. Usar botão semântico com estado expandido quando for disclosure. | Pressionar, focar por teclado e tocar devem dar o mesmo acesso; sem depender de hover. Manter alvos confortáveis. |
| Projetos e notícias | Imagem faz um zoom discreto no hover/foco e a seta acompanha poucos pixels; entrada de projeto revela local e escopo junto com a imagem. | `transform` de poucos pontos percentuais em ~300–650 ms; metadados permanecem no layout, nunca só em hover. Não animar tamanho que altere o grid. | No toque, deixar dados visíveis e dispensar zoom persistente. Movimento reduzido desativa escala, mantendo feedback de cor/foco. |
| Galeria predial | Cartas avançam com continuidade espacial, leve perspectiva e mola controlada; indicador e nome acompanham o item selecionado. | Usar a galeria existente como base. Navegação anterior/próximo, pontos e teclado; sem reprodução automática. Transição curta (~350–550 ms), `aria-live` com parcimônia e conteúdo não selecionado fora da árvore de foco. | Cartas cabem na largura do aparelho; setas têm alvos de toque; preservar navegação sem gesto de arrastar. Com movimento reduzido, troca imediata, sem perspectiva. |
| Blocos verticais de infraestrutura | Deslocamento vertical pode criar uma vitrine de registros de obra, com ritmo lento e paradas perceptíveis. | Se houver movimento automático contínuo, oferecer pausa/retomada acessível e pausar ao focar ou interagir. Não duplicar cartões de modo que leitores de tela anunciem itens repetidos. | Preferir pilha estática ou rolagem nativa no mobile. Desligar o loop com movimento reduzido. |
| Menu e formulário | Menu móvel abre/fecha com transição curta; formulário confirma foco, validação, erro e sucesso sem mudar o sentido da navegação. | Menu ~180–280 ms; feedback do formulário imediato, com estado anunciado e foco previsível. Links e botões usam a transição curta da marca. | Teclado e toque acessam o mesmo conteúdo. Não animar erros de modo a deslocar o campo fora de vista. Estado reduzido continua claro. |

## Usos que não cabem sem conteúdo confirmado

As referências apresentam simuladores de custo/retorno, métricas animadas, mapas de rotas, depoimentos e números de demonstração. Não os transferir para a Gama sem dados reais, fonte e autorização. Não animar contagens para fabricar prova. Um mapa, calculadora ou depoimento só entra quando houver conteúdo próprio confirmado e uma tarefa clara que justifique a interação.

## Regras de implementação e revisão

1. Manter a identidade e a mensagem institucional, incluindo contraste de texto grafite sobre laranja; nunca usar branco como texto normal sobre laranja.
2. Preferir CSS e Framer Motion já disponível no projeto; evitar nova dependência, autoplay obrigatório, scroll hijacking, cursor customizado, blur decorativo e parallax contínuo.
3. A primeira pintura deve continuar útil se animações ou JavaScript não executarem. Respeitar `prefers-reduced-motion` em cada assinatura, lista, galeria e loop.
4. Verificar entrada, repouso final, rolagem e controles por teclado/toque em desktop e celular; conferir corte, foco, layout shift, overflow, repetição acessível e carregamento de imagem.
5. Tratar a lista acima como biblioteca de opções. Selecionar movimentos que ajudem orientação, escala ou feedback para a página em questão; não implementar todos simultaneamente.

## Referências visuais fornecidas pelo cliente

- [Maré Importadora](https://mare-importadora.vercel.app/) — composição editorial e navegação compacta.
- [Solartech](https://solartech-site-mu.vercel.app/) — hero fotográfico amplo e progressão cinematográfica.
