# Animações da ALFA

A implementação fica em `motion.js` e `motion.css`, carregados pelo `index.html`. A página continua usando HTML, CSS e JavaScript, com a identidade do `dna-DESIGN.md`.

## Integração e alvos

| Efeito | Alvo escolhido | Comportamento |
| --- | --- | --- |
| Smooth scroll | `window` / `document.documentElement` | Lenis 1.3.27 local, `lerp: 0.1`, multiplicador de wheel 1, sem duração concorrente e sem CSS smooth. Touch nativo (`syncTouch: false`); dispositivos sem mouse e movimento reduzido não recebem instância. |
| Motion path | `.hero-orbit-dot` dentro de `.hero-orbit` | Bézier calculada por proporções do contêiner; 1200 ms; início em 0%, repouso em 100%. Recomeça quando a hero volta ao viewport. O círculo não precisa de rotação tangencial. |
| Etapa ativa | `.services-story`, etapas `.service-card` | Em telas amplas, `IntersectionObserver` destaca o serviço mais próximo do centro da leitura. Os quatro serviços continuam no fluxo normal da página. |

O acompanhamento da etapa ativa exige largura de pelo menos 1000 px, altura de pelo menos 700 px, três etapas ou mais e conteúdo suficiente. Em celular, tela baixa, conteúdo curto ou movimento reduzido, os serviços seguem em sequência vertical. Os textos nunca são ocultados; apenas os ícones têm transições decorativas.

## Valores ajustáveis

No início de `motion.js`, `CONFIG` reúne os seletores, `scrollLerp`, `wheelMultiplier`, `pathDuration`, `pathEasing` e `stageMedia`. O valor 0.1 suaviza sem prolongar demais a resposta; valores maiores respondem mais rápido. A curva pode ser alterada nas quatro proporções de `layoutPath()`. `--motion-detail-duration` em `motion.css` controla as transições dos ícones (220 ms).

Ao mudar `stageMedia`, mantenha a media query correspondente em `motion.css` alinhada. Não reative `scroll-behavior: smooth` no `html`.

Para reiniciar a trajetória: `window.AlfaMotion.replayPath()` ou dispare `alfa:replay-path` na hero. A animação anterior é cancelada antes de outra começar. Sem suporte a offset-path, a mesma Bézier vira keyframes de transform/opacity; com movimento reduzido, o objeto fica diretamente na posição final.

## Ciclo de vida

`window.AlfaMotion.init()` reinicializa com limpeza prévia. `destroy()` remove listeners, observers, RAFs pendentes, animações e a instância Lenis criada por esta integração. `dispose()` também remove os dois listeners de navegação. `pagehide` limpa; `pageshow` restaura ao voltar pelo cache do navegador. Uma instância compartilhada real é reutilizada e não é destruída por este módulo.

Âncoras mantêm hash, histórico e foco no destino. Teclado e foco interrompem a inércia sem bloquear o comportamento nativo. Scrolls nativos programáticos vencem a suavização. Contêineres internos, textarea e diálogos rolam nativamente; `data-native-scroll` permite marcar outros contêineres. Diálogos visíveis e bloqueios de overflow pausam a instância. O visualizador das fotografias usa um dialog nativo: a pausa ao abrir e a retomada ao fechar foram verificadas junto com o retorno do foco à foto de origem.

Lenis foi obtido do pacote oficial `lenis@1.3.27` e está em `vendor/`, sem CDN ou mudança nas dependências do outro site Next.js do workspace. Licença MIT preservada. Fonte da API: https://github.com/darkroomengineering/lenis

## Teste manual curto

1. Desktop com mouse: role e inverta a direção. Confira resposta imediata e desaceleração curta. Em Serviços, passe pelas quatro etapas e confirme o destaque da etapa ativa e a continuação normal após a última.
2. Mobile real: deslize com o dedo, abra o menu, escolha Serviços e use o formulário. A rolagem deve ser nativa e os serviços devem seguir em sequência. Redimensionar a janela não deve causar overflow.
3. Teclado: use Tab, Enter, PageDown, Home e End. Confira foco visível, acesso ao formulário e destinos abaixo do cabeçalho. Use voltar/avançar depois de navegar por âncoras.
4. Movimento reduzido: ative a preferência no sistema/navegador antes de abrir e também durante a sessão. A classe Lenis deve desaparecer e a partícula deve permanecer na posição final. Textos, menu e formulário devem continuar disponíveis imediatamente.
5. Compatibilidade: em um navegador sem offset-path, confira a trajetória com transform. Para remover a integração, chame `destroy()` e confirme a rolagem nativa; chame `init()` para restaurar sem duplicar instâncias.

Verificado anteriormente na prévia: desktop 1280×720, viewport móvel 390×844, wheel com estado suave e repouso, trajetória de 0% a 100%, quatro etapas, âncoras com foco, menu móvel, PageDown, voltar/avançar e ausência de rolagem lateral. O navegador de verificação não oferece emulação de touch ou prefers-reduced-motion; esses testes em dispositivo/sistema e o fallback sem offset-path seguem como roteiro acima.
