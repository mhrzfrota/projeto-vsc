export type VehicleType = 'SUV' | 'Sedan' | 'Pickup' | 'Hatch'

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
  type: VehicleType
}

export const vehicleTypes: VehicleType[] = ['SUV', 'Sedan', 'Pickup', 'Hatch']

export type Service = {
  title: string
  description: string
  ctaLabel: string
  href: string
}

export type HeroFact = {
  value: string
  label: string
}

export type ShoppingFeature = {
  title: string
  description: string
  ctaLabel?: string
  href?: string
  kind: 'contact' | 'location' | 'parking' | 'structure' | 'food'
}

export type ShoppingGalleryItem = {
  badge: string
  title: string
  description: string
  image: string
}

export type BusinessHour = {
  day: string
  hours: string
}

export type VisitChannel = {
  title: string
  description: string
  href: string
  ctaLabel: string
  kind: 'whatsapp' | 'instagram' | 'facebook' | 'site' | 'map'
}

export type StoreVehicleTeaser = {
  title: string
  subtitle: string
  image: string
  price: string
}

export type StoreCatalogItem = {
  slug: string
  name: string
  tagline: string
  olxUrl: string
  vehicles: StoreVehicleTeaser[]
  logo?: string
  city?: string
  phone?: string
  hours?: string
  description?: string
  specialties?: string[]
}

export type Testimonial = {
  id: string
  author: string
  initials: string
  avatarColor: string
  rating: number
  date: string
  body: string
  source: 'google'
}

export type AboutHighlight = {
  value: string
  label: string
  description: string
}

export type EventNews = {
  id: string
  title: string
  summary: string
  category: string
  date: string
  dateLabel: { day: string; month: string }
  location: string
  image: string
  href: string
}

export const COOKIE_CONSENT_KEY = 'vsc-cookie-consent'

export const contactPhone = '(85) 3037-3036'
export const contactPhoneHref = 'tel:+558530373036'
export const shoppingAddress = 'Av. Washington Soares, 2100, Fortaleza - CE'
export const instagramLink = 'https://instagram.com/viashoppingcar'
export const facebookLink = 'https://www.facebook.com/ViaShoppingCar/'
export const siteLink = 'http://www.viashoppingcar.com.br/'
export const mapsLink =
  'https://www.google.com/maps/place/Via+Shopping+Car/@-3.777371,-38.4839154,17z/data=!3m1!4b1!4m5!3m4!1s0x7c745f9d74d3431:0x8b8dd7fbb51b3bc3!8m2!3d-3.7773764!4d-38.4817267'
export const wazeLink =
  'https://www.waze.com/live-map/directions/via-shopping-car-av.-washington-soares-2100-fortaleza?to=place.w.210700002.2107131094.375846'
export const businessHoursSummary = 'Segunda a sexta, das 08h às 19h. Sábado, das 08h às 14h.'
export const publicVerificationNote =
  'Informações públicas conferidas em março de 2026 com base no Waze e nos canais oficiais do Via Shopping Car.'

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Estoque', href: '/estoque' },
  { label: 'Anuncie aqui', href: '/anuncie-aqui' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Todas as lojas', href: '/lojas' },
  { label: 'Contato', href: '/contato' },
]

export const heroFacts: HeroFact[] = [
  {
    value: 'Av. Washington Soares, 2100',
    label: 'Fortaleza - CE',
  },
  {
    value: 'Seg. a sex. 08h-19h',
    label: 'Sábado das 08h às 14h',
  },
  {
    value: 'Estacionamento',
    label: 'Disponível para clientes',
  },
]

export const shoppingGallery: ShoppingGalleryItem[] = [
  {
    badge: 'Foto pública do local',
    title: 'Fachada e área coberta para atendimento',
    description:
      'Imagem pública associada ao Via Shopping Car no Waze, útil para o dono visualizar o site já conectando o espaço físico à experiência digital.',
    image: '/assets/shopping-exterior.jpg',
  },
  {
    badge: 'Marca oficial',
    title: 'Identidade visual já aplicada na prévia',
    description:
      'O logotipo público do perfil oficial entra como reforço institucional e ajuda a dar cara de operação real desde a primeira dobra.',
    image: '/assets/shopping-avatar.jpg',
  },
]

export const shoppingFeatures: ShoppingFeature[] = [
  {
    kind: 'contact',
    title: 'Atendimento oficial por telefone e WhatsApp',
    description:
      'O contato público confirmado hoje é o número (85) 3037-3036, o que permite transformar a home em um ponto de conversão de verdade.',
    ctaLabel: 'Falar com a equipe',
    href: `https://api.whatsapp.com/send?phone=558530373036&text=${encodeURIComponent(
      'Olá! Quero agendar uma visita ao Via Shopping Car.',
    )}`,
  },
  {
    kind: 'location',
    title: 'Endereço forte para visita presencial',
    description:
      'O shopping aparece publicamente na Av. Washington Soares, 2100, em Fortaleza, o que permite vender bem a ideia de visita e localização.',
    ctaLabel: 'Abrir no mapa',
    href: mapsLink,
  },
  {
    kind: 'parking',
    title: 'Estacionamento para clientes',
    description:
      'O Waze lista estacionamento no local, um detalhe simples que aumenta a percepção de conveniência e estrutura para o comprador.',
    ctaLabel: 'Traçar rota no Waze',
    href: wazeLink,
  },
  {
    kind: 'food',
    title: 'Lanchonete no local',
    description:
      'Café da manhã, almoço e lanches na Av. Washington Soares, 2100. Segunda a sexta, das 07:30 às 18h; sábado até 14h.',
  },
]

export const businessHours: BusinessHour[] = [
  { day: 'Segunda', hours: '08:00 - 19:00' },
  { day: 'Terça', hours: '08:30 - 19:00' },
  { day: 'Quarta', hours: '08:00 - 19:00' },
  { day: 'Quinta', hours: '08:00 - 19:00' },
  { day: 'Sexta', hours: '08:00 - 19:00' },
  { day: 'Sábado', hours: '08:00 - 14:00' },
]

export const visitChannels: VisitChannel[] = [
  {
    kind: 'whatsapp',
    title: 'WhatsApp oficial',
    description: 'Canal mais direto para consulta de estoque, visita e atendimento comercial.',
    ctaLabel: 'Abrir conversa',
    href: `https://api.whatsapp.com/send?phone=558530373036&text=${encodeURIComponent(
      'Olá! Quero saber mais sobre os veículos disponíveis no Via Shopping Car.',
    )}`,
  },
  {
    kind: 'instagram',
    title: 'Instagram',
    description: 'Perfil público usado como referência no Waze e no Linktree oficial.',
    ctaLabel: 'Ver perfil',
    href: instagramLink,
  },
  {
    kind: 'facebook',
    title: 'Facebook',
    description: 'Canal institucional público já listado no Linktree oficial do empreendimento.',
    ctaLabel: 'Abrir página',
    href: facebookLink,
  },
  {
    kind: 'site',
    title: 'Site oficial',
    description: 'Endereço atual divulgado publicamente no Linktree do Via Shopping Car.',
    ctaLabel: 'Abrir site',
    href: siteLink,
  },
  {
    kind: 'map',
    title: 'Google Maps e rota',
    description: 'Botão útil para transformar interesse em visita presencial com menos fricção.',
    ctaLabel: 'Como chegar',
    href: mapsLink,
  },
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
    type: 'Sedan',
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
    type: 'SUV',
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
    type: 'Sedan',
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
    tag: 'Seminovo',
    type: 'SUV',
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
    type: 'Hatch',
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
    type: 'Sedan',
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

  return `https://api.whatsapp.com/send?phone=558530373036&text=${encodeURIComponent(content)}`
}

export function getStorePhoneDigits(storeName: string) {
  const vehicleFromStore = vehicles.find((vehicle) => vehicle.store === storeName)

  if (!vehicleFromStore) {
    return null
  }

  return vehicleFromStore.phone.replace(/\D/g, '')
}

export function createStoreWhatsappLink(storeName: string, message?: string) {
  const phoneDigits = getStorePhoneDigits(storeName)
  const content =
    message ?? `Olá! Quero falar com a loja ${storeName} no Via Shopping Car.`

  if (!phoneDigits) {
    return createWhatsappLink(content)
  }

  const normalized = phoneDigits.startsWith('55') ? phoneDigits : `55${phoneDigits}`
  return `https://api.whatsapp.com/send?phone=${normalized}&text=${encodeURIComponent(content)}`
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
      'Shopping automobilístico na Av. Washington Soares, 2100, com estacionamento para clientes e visita mais prática.',
    ctaLabel: 'Ver no mapa',
    href: mapsLink,
  },
]

export const aboutHighlights: AboutHighlight[] = [
  {
    value: '15+',
    label: 'Lojas reunidas',
    description: 'Multimarcas que dividem o mesmo endereço, com mix amplo de seminovos e zero km.',
  },
  {
    value: 'Seg–Sáb',
    label: 'Atendimento presencial',
    description: 'Estrutura aberta seis dias por semana, com horários compatíveis para visita antes ou depois do trabalho.',
  },
  {
    value: '1 endereço',
    label: 'Visita prática',
    description: 'Compare carros, marcas e preços em poucos minutos sem precisar rodar a cidade inteira.',
  },
]

export const customerTestimonials: Testimonial[] = [
  {
    id: 'depoimento-1',
    author: 'Carlos Henrique',
    initials: 'CH',
    avatarColor: '#1a73e8',
    rating: 5,
    date: 'há 2 semanas',
    body: 'Atendimento excelente do início ao fim. Consegui comparar vários modelos no mesmo lugar e fechei negócio sem pressa. Recomendo demais o Via Shopping Car.',
    source: 'google',
  },
  {
    id: 'depoimento-2',
    author: 'Mariana Lopes',
    initials: 'ML',
    avatarColor: '#34a853',
    rating: 5,
    date: 'há 1 mês',
    body: 'Comprei meu SUV em uma das lojas do shopping. Processo de financiamento rápido, transferência sem complicação e equipe muito atenciosa. Voltarei nas próximas trocas.',
    source: 'google',
  },
  {
    id: 'depoimento-3',
    author: 'Rafael Sousa',
    initials: 'RS',
    avatarColor: '#fbbc04',
    rating: 4,
    date: 'há 1 mês',
    body: 'Gostei muito da estrutura. Várias lojas no mesmo endereço, estacionamento bom e pude negociar bem. Só achei que poderia ter mais sinalização interna.',
    source: 'google',
  },
  {
    id: 'depoimento-4',
    author: 'Juliana Albuquerque',
    initials: 'JA',
    avatarColor: '#ea4335',
    rating: 5,
    date: 'há 2 meses',
    body: 'Atendimento humanizado, sem aquela pressão típica de loja de carros. Entendi tudo do veículo antes de fechar. Saí com sensação de bom negócio.',
    source: 'google',
  },
  {
    id: 'depoimento-5',
    author: 'Pedro Vasconcelos',
    initials: 'PV',
    avatarColor: '#9334e6',
    rating: 5,
    date: 'há 3 meses',
    body: 'Excelente shopping de veículos em Fortaleza. Dá pra comparar várias marcas e ver vários modelos em uma única visita. Acabei trocando meu carro no mesmo dia.',
    source: 'google',
  },
  {
    id: 'depoimento-6',
    author: 'Aline Ferreira',
    initials: 'AF',
    avatarColor: '#0f9d58',
    rating: 5,
    date: 'há 4 meses',
    body: 'Equipe muito profissional. Avaliaram meu usado de forma justa e fizeram a entrega técnica direitinho. Recomendo para quem quer comprar com tranquilidade.',
    source: 'google',
  },
]

export const eventsNews: EventNews[] = [
  {
    id: 'feirao-aniversario',
    title: 'Feirão de Aniversário do Via Shopping Car',
    summary:
      'Três dias com ofertas exclusivas em todas as lojas do shopping, taxa zero em financiamento e bônus na avaliação do seu usado.',
    category: 'Feirão',
    date: '2026-06-13',
    dateLabel: { day: '13', month: 'Jun' },
    location: 'Av. Washington Soares, 2100 · Fortaleza',
    image: '/assets/strip-cars.jpg',
    href: createWhatsappLink('Olá! Quero saber mais sobre o Feirão de Aniversário.'),
  },
  {
    id: 'hora-do-upgrade',
    title: 'É hora do upgrade',
    summary:
      'Ação Mês do Trabalhador para zerar o estoque! Em parceria com o C6 Bank, taxas a partir de 1,39% e comprando hoje você tem 80 dias para começar a pagar.',
    category: 'Campanha',
    date: '2026-05-01',
    dateLabel: { day: '01', month: 'Mai' },
    location: 'Washington Soares, 2100 · Fortaleza',
    image: '/assets/evento1.png',
    href: createWhatsappLink('Olá! Quero saber mais sobre a campanha É hora do upgrade.'),
  },
  {
    id: 'maio-amarelo',
    title: 'Maio Amarelo: vá com segurança',
    summary:
      'Maio Amarelo é um movimento por consciência no trânsito. Escolhas que preservam vidas. O Via Shopping Car apoia a campanha e reforça: vá com segurança.',
    category: 'Campanha',
    date: '2026-05-01',
    dateLabel: { day: 'Mês', month: 'Maio' },
    location: 'Via Shopping Car · Fortaleza',
    image: '/assets/evento2.png',
    href: createWhatsappLink('Olá! Quero saber mais sobre a campanha Maio Amarelo no Via Shopping Car.'),
  },
]

function placeholderVehicles(): StoreVehicleTeaser[] {
  return [
    {
      title: 'Modelo em destaque 1',
      subtitle: 'Confira no catálogo da loja',
      image: '/assets/cars/car-1.jpg',
      price: 'Sob consulta',
    },
    {
      title: 'Modelo em destaque 2',
      subtitle: 'Confira no catálogo da loja',
      image: '/assets/cars/car-2.jpg',
      price: 'Sob consulta',
    },
    {
      title: 'Modelo em destaque 3',
      subtitle: 'Confira no catálogo da loja',
      image: '/assets/cars/car-3.jpg',
      price: 'Sob consulta',
    },
    {
      title: 'Modelo em destaque 4',
      subtitle: 'Confira no catálogo da loja',
      image: '/assets/cars/car-4.jpg',
      price: 'Sob consulta',
    },
  ]
}

export const storesCatalog: StoreCatalogItem[] = [
  {
    slug: 'pulse-car',
    name: 'Pulse Car',
    tagline: 'Sedãs e SUVs com curadoria executiva.',
    description:
      'Atendimento consultivo com foco em modelos de alta procura e revenda forte. Curadoria executiva e processo de avaliação transparente.',
    specialties: ['Sedãs premium', 'SUVs executivos', 'Curadoria'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    logo: '/assets/logos/pulse.png',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'jmg-veiculos',
    name: 'JMG Veículos',
    tagline: 'SUVs e crossovers para o uso urbano.',
    description:
      'Foco em SUVs e crossovers com pacote tecnológico forte e revisões em dia. Boa opção para famílias que rodam diariamente.',
    specialties: ['SUVs', 'Crossovers', 'Famílias'],
    city: 'Fortaleza / CE',
    phone: '(85) 3122-5590',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    logo: '/assets/logos/jmg.png',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'lopes-veiculos',
    name: 'Lopes Veículos',
    tagline: 'Linha premium e seminovos selecionados.',
    description:
      'Tradição em seminovos selecionados, com avaliação criteriosa e foco em modelos de alta performance e linha premium.',
    specialties: ['Premium', 'Seminovos', 'Alta performance'],
    city: 'Fortaleza / CE',
    phone: '(85) 3122-5590',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    logo: '/assets/logos/lopes.png',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'lopes-premium-car',
    name: 'Lopes Premium Car',
    tagline: 'Linha premium com modelos europeus selecionados.',
    description:
      'Operação dedicada à linha premium da Lopes Veículos, com modelos europeus de baixa rodagem e padrão de acabamento elevado.',
    specialties: ['Importados', 'Linha premium', 'Baixa rodagem'],
    city: 'Fortaleza / CE',
    phone: '(85) 3122-5590',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    logo: '/assets/logos/lopes-premium.png',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'a2e2-veiculos',
    name: 'A2E2 Veículos',
    tagline: 'Multimarcas com financiamento facilitado.',
    description:
      'Multimarcas com mix amplo de hatches, sedãs e SUVs, oferecendo simulação rápida de financiamento e avaliação do usado na hora.',
    specialties: ['Multimarcas', 'Financiamento', 'Avalia usado'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    logo: '/assets/logos/a2e2.png',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'avent-veiculos',
    name: 'Avent Veículos',
    tagline: 'Seminovos revisados e prontos para entrega.',
    description:
      'Estoque com seminovos revisados, prontos para transferência e entrega no mesmo dia. Atendimento ágil e processo simplificado.',
    specialties: ['Seminovos', 'Pronta entrega', 'Atendimento ágil'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    logo: '/assets/logos/avent.png',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'direciona-veiculos',
    name: 'Direciona Veículos',
    tagline: 'Consultoria automotiva e veículos sob medida.',
    description:
      'Consultoria automotiva que direciona o cliente para o modelo certo, com busca personalizada e suporte completo na negociação.',
    specialties: ['Consultoria', 'Busca personalizada', 'Negociação'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    logo: '/assets/logos/direciona.png',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'gold-car',
    name: 'Gold Car',
    tagline: 'Veículos diferenciados e atendimento premium.',
    description:
      'Foco em modelos diferenciados, com atendimento premium, ambiente exclusivo e acompanhamento personalizado da compra.',
    specialties: ['Diferenciados', 'Atendimento premium', 'Exclusividade'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    logo: '/assets/logos/gold-car.png',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'idrive-car',
    name: 'iDrive Car',
    tagline: 'Tecnologia, conectividade e seminovos modernos.',
    description:
      'Seminovos recentes, com pacote tecnológico completo, conectividade e baixa rodagem. Ideal para quem busca modernidade.',
    specialties: ['Tecnologia', 'Conectividade', 'Seminovos recentes'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    logo: '/assets/logos/idrive.png',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'quality-premium-car',
    name: 'Quality Premium Car',
    tagline: 'Padrão premium em modelos selecionados.',
    description:
      'Quality controla cada veículo do estoque com padrão premium, focada em qualidade, procedência e modelos selecionados.',
    specialties: ['Premium', 'Procedência', 'Qualidade'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    logo: '/assets/logos/qaulity.png',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'ares-automoveis',
    name: 'Ares Automóveis',
    tagline: 'Hatches, sedãs e SUVs com revisão em dia.',
    description:
      'Mix variado com hatches, sedãs e SUVs revisados. Boa porta de entrada para quem quer mudar de carro com tranquilidade.',
    specialties: ['Hatches', 'Sedãs', 'SUVs'],
    city: 'Fortaleza / CE',
    phone: '(85) 3038-0550',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'fort-car',
    name: 'Fort Car',
    tagline: 'Custo-benefício e oportunidades semanais.',
    description:
      'Operação com giro rápido e ofertas semanais de oportunidade. Vale acompanhar o estoque, ele muda toda semana.',
    specialties: ['Oportunidades', 'Giro rápido', 'Custo-benefício'],
    city: 'Fortaleza / CE',
    phone: '(85) 3038-0550',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'master-motors',
    name: 'Master Motors',
    tagline: 'Multimarcas com foco em conforto e tecnologia.',
    description:
      'Multimarcas focada em conforto, tecnologia e pacotes completos de revisão. Boa opção para quem prioriza acabamento.',
    specialties: ['Multimarcas', 'Conforto', 'Tecnologia'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'prime-auto',
    name: 'Prime Auto',
    tagline: 'Modelos zero km e seminovos garantidos.',
    description:
      'Trabalha com zero km e seminovos garantidos pela loja, com processo de revisão e transferência sem burocracia.',
    specialties: ['Zero km', 'Seminovos garantidos', 'Sem burocracia'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'top-premium',
    name: 'Top Premium',
    tagline: 'Linha premium europeia com baixa rodagem.',
    description:
      'Especializada em linha premium europeia com baixa rodagem, manutenção em concessionária e procedência transparente.',
    specialties: ['Europeus', 'Baixa rodagem', 'Procedência'],
    city: 'Fortaleza / CE',
    phone: '(85) 99833-1260',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'fast-seminovos',
    name: 'Fast Seminovos',
    tagline: 'Giro rápido com preços competitivos.',
    description:
      'Foco em giro rápido com preços competitivos. Bom destino para quem busca uma negociação direta e prática.',
    specialties: ['Giro rápido', 'Preços competitivos', 'Negociação direta'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    vehicles: placeholderVehicles(),
  },
  {
    slug: 'drive-center',
    name: 'Drive Center',
    tagline: 'Variedade de marcas e financiamento facilitado.',
    description:
      'Mix amplo de marcas com financiamento facilitado, simulação rápida e atendimento focado em aprovar o crédito.',
    specialties: ['Multimarcas', 'Financiamento', 'Aprovação rápida'],
    city: 'Fortaleza / CE',
    phone: '(85) 3037-3036',
    hours: 'Seg. a sex. 08h-19h · Sáb. 08h-14h',
    olxUrl: '',
    vehicles: placeholderVehicles(),
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

export type StoreLogoEntry = {
  name: string
  image: string
}

export const storeLogos: StoreLogoEntry[] = [
  { name: 'Pulse Car', image: '/assets/logos/pulse.png' },
  { name: 'JMG Veículos', image: '/assets/logos/jmg.png' },
  { name: 'Lopes Veículos', image: '/assets/logos/lopes.png' },
  { name: 'Lopes Premium Car', image: '/assets/logos/lopes-premium.png' },
  { name: 'A2E2 Veículos', image: '/assets/logos/a2e2.png' },
  { name: 'Avent Veículos', image: '/assets/logos/avent.png' },
  { name: 'Direciona Veículos', image: '/assets/logos/direciona.png' },
  { name: 'Gold Car', image: '/assets/logos/gold-car.png' },
  { name: 'iDrive Car', image: '/assets/logos/idrive.png' },
  { name: 'Quality Premium Car', image: '/assets/logos/qaulity.png' },
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
