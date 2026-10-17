# ALFA Construções — site demonstrativo

Site estático em HTML, CSS e JavaScript. Abra `index.html` no navegador ou sirva esta pasta em um servidor local para testar o botão de cópia do formulário.

## Arquivos

- `index.html`: conteúdo e estrutura semântica.
- `dna-style.css`: layout, cores, responsividade e estados visuais inspirados no `dna-DESIGN.md`.
- `script.js`: menu móvel, validação do orçamento, mensagem para WhatsApp e cópia do resumo.
- `motion.js` e `motion.css`: smooth scroll, trajetória curva e destaque da etapa de serviço ativa.
- `MOTION.md`: seletores, parâmetros, ciclo de vida e roteiro de teste das animações.
- `vendor/`: Lenis 1.3.27 e licença MIT, servidos localmente.
- `gallery.js`: ampliação das fotos, navegação por teclado e retorno de foco.
- `assets/obras/`: as 11 fotografias originais em JPEG e versões WebP otimizadas usadas pela galeria.
- Os quatro PNGs antigos que não eram usados foram preservados em `../artifacts/alfa-legacy-assets/`, fora da pasta publicável.

## Antes de publicar

Preencha os campos de endereço e redes sociais com os dados oficiais da ALFA. O fluxo de orçamento valida os dados e abre o WhatsApp da ALFA com a mensagem preenchida; a pessoa revisa e envia pelo aplicativo.

A página aplica uma CSP básica e uma política de referência via metadados. Configure também no provedor de hospedagem os cabeçalhos HTTP de produção, incluindo HSTS, `X-Content-Type-Options`, `Permissions-Policy` e `frame-ancestors`/`X-Frame-Options`. Defina cache e compressão para arquivos estáticos conforme o provedor.
