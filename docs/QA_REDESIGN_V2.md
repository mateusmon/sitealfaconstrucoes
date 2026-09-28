# QA — redesign Gama Galvão, 28/09/2026

Preview final de produção: http://localhost:3105/. A porta 3000 pertence a outro projeto e não foi alterada.

## Verificações realizadas

- Build de produção, lint e TypeScript concluídos sem erros.
- Home, intro e formulário conferidos visualmente em desktop 1440 × 900; home/formulário em celular 390 × 844; galeria em 320 × 740; serviços em tablet 768 × 1024.
- Largura do documento igual à largura útil em 320 e 768 px, sem overflow horizontal global. Faixa de seleção de obras tem sua própria rolagem horizontal.
- Intro MP4 real com marca, opção de pular, foco no diálogo e encerramento automático. Reprodução via `/?intro` e botão do rodapé verificada. Respeito a movimento reduzido implementado, não emulado nesta sessão.
- Menu móvel abre e fecha; seu CTA chega ao orçamento.
- Serviços: seleção manual e setas do teclado mudam o painel; links levam ao serviço pré-selecionado no orçamento.
- Galeria: categoria predial mostra oito obras; próximo item exibe Residencial Aquarius com nome, local e imagem corretos.
- Portfólio completo: 14 projetos; filtro predial reduz a oito. Vivedere classificado como infraestrutura pela execução de pavimentação.
- Orçamento: seleção, erros obrigatórios e foco no primeiro campo inválido, revisão com dados, edição preservando entradas e novo pedido limpando a seleção.
- `mailto` e link de composição do Gmail incluem destinatário, assunto e todos os campos. Teste com dados sintéticos; nenhum e-mail foi enviado.
- Consulta ao console da preview de produção sem avisos ou erros capturados na conferência final.
- Overrides de viewport removidos ao terminar. Servidores temporários de desenvolvimento e da referência foram encerrados; preview final mantida.

## Limites do envio

O formulário prepara a mensagem. O visitante revisa e envia no aplicativo de e-mail ou no Gmail. Não há API de envio automático, armazenamento do pedido nem mensagem falsa de entrega. A opção de copiar o texto é uma alternativa se o visitante não tiver cliente de e-mail configurado.
