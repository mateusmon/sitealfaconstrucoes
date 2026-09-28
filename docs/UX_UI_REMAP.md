# Remapeamento de UX/UI — Gama Galvão Engenharia

> Registro histórico do remapeamento anterior. O redesign atual substitui a composição descrita abaixo por abertura MP4, hero com vídeo real, serviços navegáveis, galeria editorial e orçamento em três etapas inspirado no Malu Odonto. Fonte atual: `docs/DESIGN_CONTRACT.md` e `design-system/gama-galvao-engenharia/pages/redesign-v2.md`. Tipografia atual: Space Grotesk / Archivo. As oito imagens prediais já foram substituídas pelas fotos originais verificadas.

## Objetivo

Dar mais presença contemporânea ao site e ajudar uma pessoa que chega pela primeira vez a entender rapidamente o que a Gama executa, ver obras reais e iniciar um pedido de orçamento. A identidade grafite e laranja, os textos institucionais, os projetos e os contatos existentes permanecem a fonte de verdade.

## Diagnóstico da experiência anterior

- A animação do primeiro bloco reservava quase duas telas para ampliar uma foto, com uma pausa visual longa antes da narrativa institucional.
- O cabeçalho grafite de largura total e os links no mesmo peso visual criavam pouca distinção entre navegação, marca e ação principal.
- A fotografia aparecia em cartões arredondados semelhantes entre si, sem uma imagem que conduzisse a primeira impressão.
- Havia vários caminhos logo no início sem uma hierarquia clara entre conhecer a empresa, entender serviços, analisar obras e solicitar contato.

## Percurso proposto

1. **Entender a empresa:** hero com a logo oficial fornecida em destaque, a mensagem de compromisso original, resumo da atuação e localização.
2. **Escolher uma próxima ação:** CTA principal para solicitar orçamento e alternativa para navegar pelos projetos.
3. **Entender a capacidade:** apresentação institucional e áreas de atuação em lista escaneável, sem formulário ou simulador que presuma preço, prazo ou escopo.
4. **Ver evidências:** projetos de infraestrutura e edificações com nomes, locais, escopos e imagens do acervo existente.
5. **Conhecer a responsabilidade técnica:** qualificação e serviços técnicos apresentados antes das notícias e do contato final.
6. **Entrar em contato:** manter formulário, telefones, e-mail e endereço nas rotas atuais.

## Direção visual aplicada

- Referência editorial da Maré: títulos grandes, mais espaço negativo, navegação compacta e hierarquia tipográfica mais nítida.
- Referência cinematográfica da Solartech: fotografia ampla, contraste e ação principal visível de imediato.
- Adaptação à Gama: grafite `#293644`, laranja `#E89A5D`, cinza claro `#F3F4F5`, Lexend e Source Sans 3. Não importar o verde da Solartech nem a identidade náutica da Maré.
- Hero usa a logo oficial como imagem principal em uma composição editorial; a entrada por cortina e a sequência tipográfica preservam o movimento sem esticar o arquivo nem prender a rolagem.
- Alternância de superfícies claras e grafite mantém a leitura leve e dá destaque às seções de portfólio.

## Conteúdo e confiança

- Manter apenas fatos e dados que já constam do conteúdo institucional. Não copiar depoimentos, valores, simulações ou métricas de demonstração das referências.
- Usar fotos locais já existentes; não apresentar imagens genéricas como obras da empresa.
- Manter as rotas, os identificadores de seção, o carrossel de obras prediais e o acesso por teclado.
- No celular, empilhar a chamada e o apoio, manter as ações alcançáveis, simplificar o bloco fotográfico e evitar rolagem horizontal.
- Respeitar `prefers-reduced-motion`; conteúdo e CTAs devem permanecer disponíveis sem animação.

## Próximos incrementos de conteúdo

- Substituir fotos comprimidas somente após obter originais e confirmar origem/autorização, idealmente do acervo da empresa ou Instagram oficial.
- Rever as imagens associadas às obras prediais: algumas entradas reutilizam fotos de referência do acervo e podem não retratar a edificação nomeada.
- Validar nomes, escopos e contatos antes da publicação em produção.
