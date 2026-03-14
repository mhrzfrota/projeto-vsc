export type Vehicle = {
  id: number
  brand: string
  model: string
  subtitle: string
  year: number
  price: number
  km: number
  fuel: string
  transmission: string
  color: string
  store: string
  city: string
  phone: string
  photos: number
  description: string
  image: string
  tag: string
}

export type Service = {
  title: string
  description: string
  ctaLabel: string
  href: string
}

export const COOKIE_CONSENT_KEY = 'vsc-cookie-consent'
export const NEWSLETTER_LEADS_KEY = 'vsc-newsletter-leads'
export const mapsLink =
  'https://www.google.com/maps/place/Via+Shopping+Car/@-3.7771077,-38.4818214,17z/'

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Sobre nós', href: '/#sobre' },
  { label: 'Estoque', href: '/estoque' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Todas as lojas', href: '/#lojas' },
  { label: 'Contato', href: '/#contato' },
]

export const vehicles: Vehicle[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Corolla XEi',
    subtitle: '2.0 Flex 16V, central multimídia, bancos em couro e pacote safety.',
    year: 2023,
    price: 128900,
    km: 24100,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Branco Lunar',
    store: 'Pulse Car',
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    photos: 12,
    description:
      'Sedã equilibrado para quem quer conforto no uso diário, acabamento acima da média e revenda forte.',
    image: '/assets/cars/car-1.jpg',
    tag: 'Destaque',
  },
  {
    id: 2,
    brand: 'Jeep',
    model: 'Compass Longitude',
    subtitle: '1.3 Turbo Flex, teto panorâmico, painel digital e pacote ADAS.',
    year: 2022,
    price: 152900,
    km: 31500,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Cinza Graphite',
    store: 'JMG Veículos',
    city: 'Fortaleza / CE',
    phone: '(85) 3122-5590',
    photos: 10,
    description:
      'SUV com postura premium, excelente acerto urbano e ótimo pacote tecnológico para a faixa de preço.',
    image: '/assets/cars/car-2.jpg',
    tag: 'SUV',
  },
  {
    id: 3,
    brand: 'Honda',
    model: 'Civic Touring',
    subtitle: '1.5 Turbo, interior refinado, som premium e pacote touring completo.',
    year: 2021,
    price: 137500,
    km: 39800,
    fuel: 'Flex',
    transmission: 'CVT',
    color: 'Preto Cristal',
    store: 'Lopes Veículos',
    city: 'Fortaleza / CE',
    phone: '(85) 3122-5590',
    photos: 9,
    description:
      'Modelo para quem valoriza desempenho linear, cabine silenciosa e assinatura visual mais executiva.',
    image: '/assets/cars/car-3.jpg',
    tag: 'Premium',
  },
  {
    id: 4,
    brand: 'Volkswagen',
    model: 'T-Cross Comfortline',
    subtitle: '1.0 TSI, rodas diamantadas, conectividade sem fio e revisão em dia.',
    year: 2024,
    price: 143900,
    km: 9000,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Azul Biscay',
    store: 'Ares Automóveis',
    city: 'Fortaleza / CE',
    phone: '(85) 3038-0550',
    photos: 14,
    description:
      'SUV compacto com perfil urbano, excelente ergonomia e espaço inteligente para a rotina da família.',
    image: '/assets/cars/car-4.jpg',
    tag: 'Semi novo',
  },
  {
    id: 5,
    brand: 'Chevrolet',
    model: 'Onix Premier',
    subtitle: '1.0 Turbo, chave presencial, câmera de ré e pacote connect total.',
    year: 2023,
    price: 102900,
    km: 19800,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Vermelho Carmim',
    store: 'Fort Car',
    city: 'Fortaleza / CE',
    phone: '(85) 3038-0550',
    photos: 8,
    description:
      'Hatch prático, econômico e muito bem equipado para quem quer tecnologia sem abrir mão de custo-benefício.',
    image: '/assets/cars/car-5.jpg',
    tag: 'Oportunidade',
  },
  {
    id: 6,
    brand: 'BMW',
    model: '320i GP',
    subtitle: '2.0 Turbo, interior sport, teto solar e experiência de condução premium.',
    year: 2022,
    price: 239900,
    km: 26200,
    fuel: 'Gasolina',
    transmission: 'Automático',
    color: 'Cinza Brooklyn',
    store: 'Top Premium',
    city: 'Fortaleza / CE',
    phone: '(85) 99833-1260',
    photos: 16,
    description:
      'Sedã para quem quer imagem forte, acabamento de alto padrão e dinâmica acima do segmento tradicional.',
    image: '/assets/cars/car-6.jpg',
    tag: 'Top de linha',
  },
]

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

export function createWhatsappLink(message?: string) {
  const content =
    message ?? 'Olá! Quero saber mais sobre os veículos disponíveis no Via Shopping Car.'

  return `https://api.whatsapp.com/send?phone=5585999833126&text=${encodeURIComponent(content)}`
}

export const services: Service[] = [
  {
    title: 'Financiamento',
    description:
      'Condições competitivas com bancos parceiros para aprovar seu crédito com agilidade.',
    ctaLabel: 'Solicitar simulação',
    href: createWhatsappLink('Olá! Quero informações sobre financiamento no Via Shopping Car.'),
  },
  {
    title: 'Seguros',
    description:
      'Cotação rápida com cobertura sob medida para proteger seu veículo e sua tranquilidade.',
    ctaLabel: 'Falar sobre seguros',
    href: createWhatsappLink('Olá! Quero falar sobre seguros no Via Shopping Car.'),
  },
  {
    title: 'Localização',
    description:
      'Shopping automobilístico em Fortaleza com estrutura completa, conforto e estacionamento amplo.',
    ctaLabel: 'Ver no mapa',
    href: mapsLink,
  },
]

export const stores = [
  'Pulse Car',
  'JMG Veículos',
  'Lopes Veículos',
  'Ares Automóveis',
  'Fort Car',
  'Master Motors',
  'Prime Auto',
  'Top Premium',
  'Fast Seminovos',
  'Drive Center',
]

export const privacyHighlights = [
  'Os dados enviados em formulários são usados para contato comercial, relacionamento e atendimento.',
  'As informações podem ser compartilhadas com parceiros envolvidos na jornada de compra, venda ou seguro.',
  'O titular pode solicitar confirmação, correção, portabilidade ou eliminação dos dados, conforme a LGPD.',
  'Os cookies locais deste site são usados para lembrar consentimentos e melhorar a experiência de navegação.',
]

export function readCookieConsent() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted'
}

export function persistNewsletterLead(email: string) {
  if (typeof window === 'undefined') {
    return
  }

  const nextLead = {
    email,
    createdAt: new Date().toISOString(),
  }

  try {
    const raw = window.localStorage.getItem(NEWSLETTER_LEADS_KEY)
    const current = raw ? (JSON.parse(raw) as Array<{ email: string; createdAt: string }>) : []
    const deduped = current.filter((lead) => lead.email.toLowerCase() !== email.toLowerCase())

    window.localStorage.setItem(
      NEWSLETTER_LEADS_KEY,
      JSON.stringify([nextLead, ...deduped].slice(0, 50)),
    )
  } catch {
    window.localStorage.setItem(NEWSLETTER_LEADS_KEY, JSON.stringify([nextLead]))
  }
}
