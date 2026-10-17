// Menu móvel: mantém o estado acessível e fecha ao escolher uma seção.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function setMenuOpen(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Campo de partículas estático: traduz o motivo visual do dna-DESIGN.md
// para branco e amarelo, sem animação contínua ou custo por frame.
const particleCanvas = document.querySelector('#particle-field');
const particleContext = particleCanvas.getContext('2d');
let resizeFrame = 0;

function drawParticleField() {
  const bounds = particleCanvas.getBoundingClientRect();
  const width = bounds.width;
  const height = bounds.height;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  particleCanvas.width = Math.round(width * pixelRatio);
  particleCanvas.height = Math.round(height * pixelRatio);
  particleContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  particleContext.clearRect(0, 0, width, height);

  const rows = 100;
  const columns = width < 500 ? 45 : 73;
  for (let row = 0; row < rows; row += 1) {
    const progress = row / (rows - 1);
    const ribbonCenter = width * (0.54 + 0.24 * Math.sin(progress * 5.2 - 0.9));
    const ribbonWidth = width * (0.24 + 0.07 * Math.cos(progress * 4.1));

    for (let column = 0; column < columns; column += 1) {
      const across = (column / (columns - 1)) * 2 - 1;
      const texture = Math.sin(row * 14.73 + column * 27.19) * 43758.5453;
      const noise = texture - Math.floor(texture);
      if (noise < 0.15) continue;

      const x = ribbonCenter + across * ribbonWidth;
      const y = (progress * 1.3 - 0.15) * height + Math.sin(across * 3.5 + progress * 7) * height * 0.075;
      if (x < 0 || x > width || y < 0 || y > height) continue;

      const edgeFade = Math.pow(1 - Math.abs(across), 1.3);
      const alpha = (0.18 + noise * 0.72) * edgeFade;
      const yellow = progress > 0.35 && (noise > 0.42 || Math.abs(across) < 0.32);
      const size = (noise > 0.82 ? 1.9 : 1.15) * (width < 500 ? 0.8 : 1);
      particleContext.fillStyle = yellow
        ? `rgba(244,196,48,${alpha})`
        : `rgba(255,255,255,${alpha * 0.78})`;
      particleContext.beginPath();
      particleContext.arc(x, y, size, 0, Math.PI * 2);
      particleContext.fill();
    }
  }
}

drawParticleField();
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(drawParticleField);
});

// Orçamento em três etapas. Os dados ficam no navegador até o visitante copiá-los.
const quoteForm = document.querySelector('#contact-form');
const quotePanels = [...quoteForm.querySelectorAll('[data-quote-step]')];
const quoteSteps = [...document.querySelectorAll('.quote-steps li')];
const quoteStatus = document.querySelector('#copy-feedback');
const quoteValues = () => Object.fromEntries(new FormData(quoteForm).entries());
let activeQuoteStep = 0;

function updateQuoteSummary() {
  const values = quoteValues();
  const selectedService = quoteForm.querySelector('input[name="servico"]:checked')?.value || 'A escolher';
  document.querySelector('#summary-servico').textContent = selectedService;
  document.querySelector('#summary-local').textContent = values.local?.trim() || 'A informar';
  document.querySelector('#summary-etapa').textContent = values.etapa || 'A informar';
  document.querySelector('#summary-previsao').textContent = values.previsao || 'A combinar';
}

function showQuoteStep(step) {
  activeQuoteStep = step;
  quotePanels.forEach((panel, index) => { panel.hidden = index !== step; });
  quoteSteps.forEach((item, index) => {
    item.classList.toggle('is-current', index <= step);
    if (index === step) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
  quoteStatus.textContent = '';
  updateQuoteSummary();
  requestAnimationFrame(() => {
    quotePanels[step].querySelector('h3')?.focus({ preventScroll: true });
    if (matchMedia('(max-width: 850px)').matches) quotePanels[step].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  });
}

function markError(fieldName, message) {
  const control = quoteForm.elements.namedItem(fieldName);
  const error = quoteForm.querySelector(`[data-error="${fieldName}"]`);
  if (error) {
    if (!error.id) error.id = `quote-error-${fieldName}`;
    error.textContent = message;
    error.hidden = !message;
  }
  if (control && 'setAttribute' in control) {
    if (message) {
      control.setAttribute('aria-invalid', 'true');
      if (error) control.setAttribute('aria-describedby', error.id);
    } else {
      control.removeAttribute('aria-invalid');
      control.removeAttribute('aria-describedby');
    }
  }
}

function validateService() {
  const selected = quoteForm.querySelector('input[name="servico"]:checked');
  const error = quoteForm.querySelector('[data-error="servico"]');
  error.hidden = Boolean(selected);
  quoteForm.querySelector('.quote-options').setAttribute('aria-invalid', String(!selected));
  if (!error.id) error.id = 'quote-error-servico';
  if (selected) quoteForm.querySelector('.quote-options').removeAttribute('aria-describedby');
  else quoteForm.querySelector('.quote-options').setAttribute('aria-describedby', error.id);
  if (!selected) quoteForm.querySelector('input[name="servico"]')?.focus();
  return Boolean(selected);
}

function validateProject() {
  const values = quoteValues();
  const problems = {
    nome: values.nome.trim().length >= 2 ? '' : 'Informe seu nome.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ? '' : 'Informe um e-mail válido para retorno.',
    local: values.local.trim().length >= 3 ? '' : 'Informe a cidade e o estado da obra.',
    etapa: values.etapa ? '' : 'Selecione a etapa atual da obra.',
    mensagem: values.mensagem.trim().length >= 10 ? '' : 'Descreva o projeto em pelo menos 10 caracteres.'
  };
  Object.entries(problems).forEach(([field, message]) => markError(field, message));
  const firstInvalid = Object.keys(problems).find(field => problems[field]);
  if (firstInvalid) quoteForm.elements.namedItem(firstInvalid).focus();
  return !firstInvalid;
}

function prepareQuoteReview() {
  const values = quoteValues();
  const service = quoteForm.querySelector('input[name="servico"]:checked')?.value || '';
  const rows = [
    ['Serviço', service], ['Nome', values.nome.trim()], ['E-mail', values.email.trim()],
    ['Telefone', values.telefone.trim() || 'Não informado'], ['Local da obra', values.local.trim()],
    ['Etapa', values.etapa], ['Previsão de início', values.previsao || 'A combinar']
  ];
  const recap = document.querySelector('#quote-recap');
  recap.replaceChildren(...rows.map(([label, value]) => {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    row.append(term, description);
    return row;
  }));
  document.querySelector('#quote-message-review').textContent = values.mensagem.trim();
  document.querySelector('#quote-copy-text').textContent = [
    'SOLICITAÇÃO DE ORÇAMENTO — ALFA CONSTRUÇÕES', '',
    ...rows.map(([label, value]) => `${label}: ${value}`), '',
    'Descrição da obra:', values.mensagem.trim()
  ].join('\n');
  const whatsappMessage = [
    'Olá, ALFA Construções! Gostaria de solicitar um orçamento.', '',
    ...rows.map(([label, value]) => `*${label}:* ${value}`), '',
    '*Descrição do projeto:*', values.mensagem.trim()
  ].join('\n');
  document.querySelector('#send-whatsapp').href = `https://wa.me/556481188459?text=${encodeURIComponent(whatsappMessage)}`;
  updateQuoteSummary();
}

quoteForm.addEventListener('input', (event) => {
  const field = event.target;
  if (field.name && field.getAttribute('aria-invalid') === 'true') markError(field.name, '');
  updateQuoteSummary();
});
quoteForm.addEventListener('change', updateQuoteSummary);
quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (activeQuoteStep === 0 && validateService()) showQuoteStep(1);
  else if (activeQuoteStep === 1 && validateProject()) {
    prepareQuoteReview();
    showQuoteStep(2);
  }
});
quoteForm.querySelectorAll('[data-quote-back]').forEach((button) => button.addEventListener('click', () => showQuoteStep(Math.max(0, activeQuoteStep - 1))));
document.querySelector('#copy-summary').addEventListener('click', async () => {
  const text = document.querySelector('#quote-copy-text').textContent;
  try {
    await navigator.clipboard.writeText(text);
    quoteStatus.textContent = 'Resumo copiado.';
  } catch {
    quoteStatus.textContent = 'A cópia automática não está disponível. Selecione o resumo acima e use Ctrl+C.';
    document.querySelector('#quote-copy-text').focus();
  }
});
updateQuoteSummary();
