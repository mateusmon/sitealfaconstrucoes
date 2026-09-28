# QA — design e motion do arquivo Maré

Referência examinada: `C:/design/mare-importadora (3).zip` (HTML, CSS e JS). Sua preview local foi usada somente para estudar composição e comportamento. Nenhum formulário da referência foi enviado.

## Implementado

- Hero tipográfico em três linhas deslocadas, acento itálico, chamada e CTAs antes do filme.
- Reveals de linhas coordenados ao encerramento da intro MP4 já existente.
- Filme com recorte expansivo e profundidade moderada na rolagem. Poster e controle de reprodução preservados.
- Faixa de disciplinas com direção/impulso da rolagem, continuidade espacial, pausa e suspensão fora da tela.
- Mensagem institucional iluminada palavra a palavra na rolagem, mantendo o texto sem duplicação semântica.
- Serviços em accordion amplo, conteúdo fechado `inert`, imagens e links de orçamento reais.
- Portfólio com galeria manual e trilho fotográfico horizontal com snap; seleção de miniatura reorienta à cena principal quando ela ficou acima da tela.
- Cortina do menu, feedback de botões, magnetismo interno da seta e marca tipográfica do rodapé com entrada em sequência.
- Sistema compartilhado também aplicado às páginas de projetos, notícias, notícia e contato.

## Conferência

- Build e lint concluídos sem erros; TypeScript verificado separadamente e no build.
- Desktop 1440 × 900: chamada, portfólio, faixa, empresa, rodapé e detalhe da notícia de equipamentos observados.
- Celular 390 × 844: chamada, vídeo, menu, accordion de drenagem e acesso ao orçamento observados.
- Celular 320 × 740: revisão do orçamento legível; largura do documento igual à largura útil, sem overflow horizontal global.
- Tablet 768 × 1024: serviços em expansão e duas colunas de apoio; largura do documento igual à largura útil.
- Pausa da faixa: botão mudou para retomar e transformação permaneceu estável entre observações; retomada acionada.
- Galeria: categoria predial e próximo projeto exibem Residencial Aquarius e seus dados reais.
- Orçamento: chegada com drenagem pré-selecionada, erros obrigatórios, preenchimento sintético e revisão. Destino `mailto` confirmado como `gamagalvaodf@gmail.com` com todos os campos. Nenhum e-mail foi enviado.
- Console da preview na navegação à notícia sem erros/avisos capturados.
- Movimento reduzido conferido no código, não emulado no navegador desta sessão. Nenhum teste Lighthouse foi executado.

## Preservação

Rotas, âncoras, contatos, nomes/escopos de obras, dados do responsável técnico, notícias, intro real e sistema de orçamento permanecem. Não foram importados os dados de exemplo nem o envio fictício da Maré. Não há novos pacotes, cursor substituído ou captura global da rolagem.

Preview: http://localhost:3105/. CSS da adaptação: `src/app/mare-design.css`; controlador: `src/components/mare-motion.tsx`.
