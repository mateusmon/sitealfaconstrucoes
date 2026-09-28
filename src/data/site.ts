export const site = {
  name: "Gama Galvão Engenharia",
  shortName: "Gama Galvão",
  email: "gamagalvaodf@gmail.com",
  phones: ["(61) 98259-4843", "(61) 3333-6069"],
  phoneLinks: ["tel:+5561982594843", "tel:+556133336069"],
  address:
    "Rua 09 Norte — Rua das Pitangueiras, lotes 5/6, lojas 11/12, Edifício Easy, Parte 134 — Águas Claras/DF",
  instagram: "https://www.instagram.com/gamagalvaoengenharia/",
  url: "https://gamagalvao.com.br",
};

export const navigation = [
  { label: "Empresa", href: "/#empresa" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Obras", href: "/projetos" },
  { label: "Notícias", href: "/noticias" },
  { label: "Contato", href: "/contato" },
];

export const services = [
  {
    index: "01",
    title: "Terraplanagem",
    description: "Preparação, conformação e movimentação de solo para obras de diferentes escalas.",
  },
  {
    index: "02",
    title: "Pavimentação",
    description: "Execução e recuperação de vias em TSD, CBUQ, microrevestimento e piso intertravado.",
  },
  {
    index: "03",
    title: "Drenagem e saneamento",
    description: "Redes pluviais, caixas de retenção e soluções de drenagem superficial e profunda.",
  },
  {
    index: "04",
    title: "Infraestrutura condominial",
    description: "Urbanização integrada com redes, pavimentos e apoio técnico à implantação.",
  },
  {
    index: "05",
    title: "Construção predial",
    description: "Obras residenciais, comerciais e institucionais, da fundação ao acabamento.",
  },
  {
    index: "06",
    title: "Projetos e fiscalização",
    description: "Planejamento, orçamento, acompanhamento e controle técnico de obras.",
  },
  {
    index: "07",
    title: "Avaliações e perícias",
    description: "Avaliação de imóveis, relatórios, laudos e assistência técnica extrajudicial.",
  },
  {
    index: "08",
    title: "Reformas e fachadas",
    description: "Revitalização, ampliação e adequação de edificações em uso.",
  },
];

export const quoteServices = [
  { id: "terraplanagem", title: "Terraplanagem", description: "Preparo, nivelamento e movimentação do solo." },
  { id: "pavimentacao", title: "Pavimentação", description: "Implantação e recuperação de vias e pavimentos." },
  { id: "drenagem", title: "Drenagem e saneamento", description: "Redes pluviais e soluções de infraestrutura." },
  { id: "infraestrutura", title: "Infraestrutura condominial", description: "Urbanização e implantação de redes e acessos." },
  { id: "construcao", title: "Construção predial e reformas", description: "Edificações residenciais, comerciais e institucionais." },
  { id: "projetos", title: "Projetos e serviços técnicos", description: "Fiscalização, avaliações, perícias e laudos." },
];

export type ProjectCategory = "Infraestrutura" | "Obras prediais" | "Reformas";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "linha-branca-correntina",
    title: "Estrada Linha Branca",
    category: "Infraestrutura",
    location: "Correntina/BA",
    summary: "Terraplanagem, drenagem e pavimentação",
    detail: "Coordenação técnica dos serviços necessários à implantação da estrada.",
    image: "/images/projeto-linha-branca.jpeg",
    imageAlt: "Máquinas executando terraplanagem na Estrada Linha Branca, em Correntina",
    featured: true,
  },
  {
    slug: "caixa-retencao-drenagem",
    title: "Caixa de retenção e rede de drenagem",
    category: "Infraestrutura",
    location: "Obra Paulo Octávio",
    summary: "Escavação e rede de drenagem de 600 mm",
    detail: "Serviço registrado durante a fase de execução da escavação e implantação da rede.",
    image: "/images/projeto-drenagem.jpeg",
    imageAlt: "Canteiro com escavação e máquinas durante obra de drenagem",
    featured: true,
  },
  {
    slug: "rodovia-da-soja",
    title: "Rodovia da Soja",
    category: "Infraestrutura",
    location: "Luís Eduardo Magalhães/BA",
    summary: "Aplicação de microrevestimento",
    detail: "Coordenação técnica dos serviços para a ABAPA — Associação Baiana dos Produtores de Algodão.",
    image: "/images/projeto-rodovia-soja.jpeg",
    imageAlt: "Trecho da Rodovia da Soja após aplicação de microrevestimento",
    featured: true,
  },
  {
    slug: "fazenda-doalnara",
    title: "Fazenda Doalnara",
    category: "Infraestrutura",
    location: "Formosa do Rio Preto/BA",
    summary: "100.000 m² de pista e 985 m de drenagem",
    detail: "Urbanização com pavimentação, drenagem e redes de infraestrutura para o conjunto.",
    image: "/images/projeto-doalnara.jpg",
    imageAlt: "Vista aérea da urbanização da Fazenda Doalnara",
  },
  {
    slug: "residencial-vivedere",
    title: "Residencial Vivedere",
    category: "Infraestrutura",
    location: "Lago Sul/DF",
    summary: "Pavimentação em piso intertravado",
    detail: "Execução registrada no acervo de obras residenciais da empresa.",
    image: "/images/projeto-vivedere.jpeg",
    imageAlt: "Pavimentação em piso intertravado no Residencial Vivedere",
  },
  {
    slug: "reforma-crm-df",
    title: "Reforma e ampliação do CRM/DF",
    category: "Reformas",
    location: "Brasília/DF",
    summary: "Reforma de ambientes administrativos",
    detail: "Adequação e ampliação de espaços internos para uso institucional.",
    image: "/images/projeto-crm-df.jpg",
    imageAlt: "Ambiente administrativo após reforma e ampliação do CRM do Distrito Federal",
  },
];

export const buildingProjects = [
  { slug: "residencial-salvador", title: "Residencial Salvador", detail: "8.000 m² de obra", location: "Samambaia/DF", image: "/images/predial-residencial-salvador.jpg" },
  { slug: "residencial-aquarius", title: "Residencial Aquarius", detail: "22.000 m² de obra", location: "Águas Claras/DF", image: "/images/predial-residencial-aquarius.jpg" },
  { slug: "tower-club-residence", title: "Tower Club Residence", detail: "32.000 m² de obra", location: "Águas Claras/DF", image: "/images/predial-tower-club-residence.jpg" },
  { slug: "sagitarius-resort", title: "Sagitarius Resort", detail: "30.000 m² de obra", location: "Águas Claras/DF", image: "/images/predial-sagitarius-resort.jpg" },
  { slug: "portal-do-sol", title: "Portal do Sol", detail: "25.000 m² de obra", location: "Samambaia/DF", image: "/images/predial-portal-do-sol.jpg" },
  { slug: "vila-doalnara", title: "Vila Doalnara", detail: "220 casas, escola e refeitório · 19.000 m²", location: "Formosa do Rio Preto/BA", image: "/images/predial-vila-doalnara.jpg" },
  { slug: "centro-esportivo-doalnara", title: "Centro Esportivo Doalnara", detail: "1.052 m² de construção", location: "Formosa do Rio Preto/BA", image: "/images/predial-centro-esportivo-doalnara.jpg" },
  { slug: "igreja-central-doalnara", title: "Igreja Central Doalnara", detail: "5.500 m² de construção", location: "Formosa do Rio Preto/BA", image: "/images/predial-igreja-central-doalnara.jpg" },
] as const;

export const portfolioProjects: Project[] = [
  ...projects,
  ...buildingProjects.map(project => ({
    slug: project.slug,
    title: project.title,
    category: "Obras prediais" as const,
    location: project.location,
    summary: project.detail,
    detail: project.detail,
    image: project.image,
    imageAlt: `${project.title}, ${project.location}`,
  })),
];

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
};

export const news: NewsItem[] = [
  {
    slug: "aluguel-de-equipamentos",
    title: "Aluguel de equipamentos",
    date: "2026-05-26",
    category: "Frota",
    excerpt: "Frota pesada pronta para apoiar terraplanagem, escavação, compactação e pavimentação.",
    paragraphs: [
      "A Gama Galvão disponibiliza máquinas e equipamentos para diferentes etapas de obras de infraestrutura.",
      "O catálogo contempla soluções para nivelamento, escavação, rompimento, compactação e apoio à pavimentação.",
    ],
    image: "/images/noticia-equipamentos.jpg",
    imageAlt: "Retroescavadeira integrante da frota de equipamentos da Gama Galvão",
  },
  {
    slug: "coordenacao-linha-branca",
    title: "Coordenação de serviços na Estrada Linha Branca",
    date: "2025-09-02",
    category: "Obras",
    excerpt: "Coordenação técnica de terraplanagem, pavimentação e drenagem em Correntina, Bahia.",
    paragraphs: [
      "A Gama Galvão Engenharia coordenou os serviços de terraplanagem, pavimentação e drenagem da Estrada Linha Branca, em Correntina, Bahia.",
      "O trabalho reuniu as frentes necessárias à preparação do terreno, execução da drenagem e implantação do pavimento.",
    ],
    image: "/images/projeto-linha-branca.jpeg",
    imageAlt: "Máquinas trabalhando na Estrada Linha Branca, em Correntina",
  },
  {
    slug: "escavacao-rede-drenagem",
    title: "Escavação de caixa de retenção e rede de drenagem",
    date: "2025-09-01",
    category: "Em execução",
    excerpt: "Escavação da caixa de retenção e implantação de rede de drenagem de 600 mm.",
    paragraphs: [
      "A obra registrou a fase de escavação da caixa de retenção e a instalação da rede de drenagem de 600 mm.",
      "A execução integra o conjunto de soluções da empresa para manejo de águas pluviais e infraestrutura urbana.",
    ],
    image: "/images/hero-drenagem.jpeg",
    imageAlt: "Vista elevada da escavação para caixa de retenção e rede de drenagem",
  },
];

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}
