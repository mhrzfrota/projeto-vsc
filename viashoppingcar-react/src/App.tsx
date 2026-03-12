import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Facebook,
  Fuel,
  Gauge,
  HandCoins,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
} from 'lucide-react'
import './App.css'

type Vehicle = {
  id: number
  brand: string
  model: string
  year: number
  price: number
  km: number
  fuel: string
  transmission: string
  image: string
  tag: string
}

type Service = {
  title: string
  description: string
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Corolla XEi',
    year: 2023,
    price: 128900,
    km: 24100,
    fuel: 'Flex',
    transmission: 'Automático',
    image: '/assets/cars/car-1.jpg',
    tag: 'Destaque',
  },
  {
    id: 2,
    brand: 'Jeep',
    model: 'Compass Longitude',
    year: 2022,
    price: 152900,
    km: 31500,
    fuel: 'Flex',
    transmission: 'Automático',
    image: '/assets/cars/car-2.jpg',
    tag: 'SUV',
  },
  {
    id: 3,
    brand: 'Honda',
    model: 'Civic Touring',
    year: 2021,
    price: 137500,
    km: 39800,
    fuel: 'Flex',
    transmission: 'CVT',
    image: '/assets/cars/car-3.jpg',
    tag: 'Premium',
  },
  {
    id: 4,
    brand: 'Volkswagen',
    model: 'T-Cross Comfortline',
    year: 2024,
    price: 143900,
    km: 9000,
    fuel: 'Flex',
    transmission: 'Automático',
    image: '/assets/cars/car-4.jpg',
    tag: 'Semi novo',
  },
  {
    id: 5,
    brand: 'Chevrolet',
    model: 'Onix Premier',
    year: 2023,
    price: 102900,
    km: 19800,
    fuel: 'Flex',
    transmission: 'Automático',
    image: '/assets/cars/car-5.jpg',
    tag: 'Oportunidade',
  },
  {
    id: 6,
    brand: 'BMW',
    model: '320i GP',
    year: 2022,
    price: 239900,
    km: 26200,
    fuel: 'Gasolina',
    transmission: 'Automático',
    image: '/assets/cars/car-6.jpg',
    tag: 'Top de linha',
  },
]

const services: Service[] = [
  {
    title: 'Financiamento',
    description:
      'Condições competitivas com bancos parceiros para aprovar seu crédito com agilidade.',
  },
  {
    title: 'Seguros',
    description:
      'Cotação rápida com cobertura sob medida para proteger seu veículo e sua tranquilidade.',
  },
  {
    title: 'Localização',
    description:
      'Shopping automobilístico em Fortaleza com estrutura completa, conforto e estacionamento amplo.',
  },
]

const stores = [
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

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

function createWhatsappLink(vehicleName?: string) {
  const message = vehicleName
    ? `Olá! Tenho interesse no ${vehicleName}.`
    : 'Olá! Quero saber mais sobre os veículos disponíveis no Via Shopping Car.'

  return `https://api.whatsapp.com/send?phone=5585999833126&text=${encodeURIComponent(message)}`
}

function App() {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isNewsletterSent, setIsNewsletterSent] = useState(false)

  const brands = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.brand))].sort(),
    [],
  )

  const models = useMemo(
    () =>
      [...new Set(vehicles
        .filter((vehicle) => !brand || vehicle.brand === brand)
        .map((vehicle) => vehicle.model))],
    [brand],
  )

  const years = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.year))].sort((a, b) => b - a),
    [],
  )

  const filteredVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) => {
        const passesBrand = !brand || vehicle.brand === brand
        const passesModel = !model || vehicle.model === model
        const passesYearFrom = !yearFrom || vehicle.year >= Number(yearFrom)
        const passesYearTo = !yearTo || vehicle.year <= Number(yearTo)

        return passesBrand && passesModel && passesYearFrom && passesYearTo
      }),
    [brand, model, yearFrom, yearTo],
  )

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    document.getElementById('estoque')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!newsletterEmail.trim()) {
      return
    }

    setNewsletterEmail('')
    setIsNewsletterSent(true)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="utility-bar">
          <div className="container utility-wrap">
            <a className="utility-link" href="tel:+558530373036">
              <Phone size={16} />
              <span>(85) 3037-3036</span>
            </a>
            <a className="utility-link" href="https://api.whatsapp.com/send?phone=5585999833126" target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              <span>Atendimento via WhatsApp</span>
            </a>
            <div className="utility-social">
              <a href="https://facebook.com/ViaShoppingCar/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com/viashoppingcar/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="container nav-wrap">
          <a className="brand" href="#inicio">
            <img src="/assets/logo-header.png" alt="Via Shopping Car" />
          </a>
          <nav className="main-nav">
            <a href="#inicio">Home</a>
            <a href="#estoque">Estoque</a>
            <a href="#sobre">Sobre nós</a>
            <a href="#servicos">Serviços</a>
            <a href="#contato">Contato</a>
          </nav>
          <a className="btn btn-primary nav-cta" href={createWhatsappLink()} target="_blank" rel="noreferrer">
            Fale agora
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-layer" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">Via Shopping Car</p>
              <h1>Seminovos selecionados com segurança e atendimento diferenciado</h1>
              <p>
                Um novo site para uma experiência mais rápida, elegante e intuitiva na busca pelo seu
                próximo carro em Fortaleza.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#estoque">
                  Ver estoque <ArrowRight size={16} />
                </a>
                <a className="btn btn-light" href={createWhatsappLink()} target="_blank" rel="noreferrer">
                  WhatsApp <MessageCircle size={16} />
                </a>
              </div>
              <div className="hero-metrics">
                <div>
                  <strong>+10</strong>
                  <span>Lojas no shopping</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Foco em confiança</span>
                </div>
                <div>
                  <strong>Fortaleza</strong>
                  <span>Av. Washington Soares</span>
                </div>
              </div>
            </div>

            <form className="search-card reveal delay-1" onSubmit={handleSearchSubmit}>
              <h2>
                <Search size={18} />
                Encontre seu veículo
              </h2>
              <p>Filtre por marca, modelo e ano para ver as melhores opções no estoque.</p>

              <div className="form-grid">
                <label>
                  Marca
                  <select
                    value={brand}
                    onChange={(event) => {
                      setBrand(event.target.value)
                      setModel('')
                    }}
                  >
                    <option value="">Todas</option>
                    {brands.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Modelo
                  <select value={model} onChange={(event) => setModel(event.target.value)}>
                    <option value="">Todos</option>
                    {models.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Ano de
                  <select value={yearFrom} onChange={(event) => setYearFrom(event.target.value)}>
                    <option value="">Qualquer</option>
                    {years.map((item) => (
                      <option key={`de-${item}`} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Até
                  <select value={yearTo} onChange={(event) => setYearTo(event.target.value)}>
                    <option value="">Qualquer</option>
                    {years.map((item) => (
                      <option key={`ate-${item}`} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button type="submit" className="btn btn-primary full-width">
                Buscar no estoque
              </button>
            </form>
          </div>
        </section>

        <section className="inventory section" id="estoque">
          <div className="container">
            <div className="section-header reveal">
              <p className="eyebrow eyebrow-dark">Estoque atualizado</p>
              <h2>Veículos em destaque</h2>
              <p>
                Interface simplificada para comparar opções rapidamente, com informações claras em cada card.
              </p>
            </div>

            {filteredVehicles.length > 0 ? (
              <div className="inventory-grid">
                {filteredVehicles.map((vehicle, index) => (
                  <article
                    key={vehicle.id}
                    className="vehicle-card reveal"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="vehicle-media">
                      <img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} loading="lazy" />
                      <span className="vehicle-tag">{vehicle.tag}</span>
                    </div>
                    <div className="vehicle-body">
                      <h3>
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <p className="vehicle-price">{formatCurrency(vehicle.price)}</p>
                      <ul className="vehicle-specs">
                        <li>
                          <CalendarDays size={16} />
                          {vehicle.year}
                        </li>
                        <li>
                          <Gauge size={16} />
                          {vehicle.km.toLocaleString('pt-BR')} km
                        </li>
                        <li>
                          <Fuel size={16} />
                          {vehicle.fuel}
                        </li>
                      </ul>
                      <a
                        className="vehicle-link"
                        href={createWhatsappLink(`${vehicle.brand} ${vehicle.model} ${vehicle.year}`)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Quero esse veículo <ArrowRight size={16} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="inventory-empty">
                <p>Nenhum veículo encontrado com esse filtro.</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setBrand('')
                    setModel('')
                    setYearFrom('')
                    setYearTo('')
                  }}
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="strip-banner">
          <img src="/assets/strip-cars.jpg" alt="Faixa de veículos do Via Shopping Car" />
        </section>

        <section className="about section" id="sobre">
          <div className="about-overlay" />
          <div className="container about-grid">
            <div className="about-mark reveal">
              <img src="/assets/about-mark.png" alt="Marca Via Shopping Car" />
            </div>
            <div className="about-content reveal delay-1">
              <p className="eyebrow">Sobre o Via Shopping Car</p>
              <h2>Shopping automobilístico em uma das áreas mais nobres de Fortaleza</h2>
              <p>
                Aqui prezamos por confiança, segurança e conforto. Reunimos mais de 10 lojas selecionadas,
                financeiras e serviços em um só lugar para facilitar sua compra, venda ou troca.
              </p>
              <a className="btn btn-light" href="#contato">
                Agendar visita <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="services section" id="servicos">
          <div className="container">
            <div className="section-header reveal">
              <p className="eyebrow eyebrow-dark">Nossos serviços</p>
              <h2>Mais do que venda de carros</h2>
              <p>Soluções pensadas para simplificar toda a jornada da sua negociação.</p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <article key={service.title} className="service-card reveal" style={{ animationDelay: `${index * 110}ms` }}>
                  <div className="service-icon">
                    {service.title === 'Financiamento' && <HandCoins size={24} />}
                    {service.title === 'Seguros' && <ShieldCheck size={24} />}
                    {service.title === 'Localização' && <MapPin size={24} />}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="newsletter" id="promocoes">
          <div className="container newsletter-wrap">
            <div className="newsletter-copy reveal">
              <p className="eyebrow">Promoções</p>
              <h2>Receba oportunidades antes de todo mundo</h2>
              <p>Cadastre seu e-mail e receba novidades, ofertas e veículos recém-chegados.</p>
            </div>
            <form className="newsletter-form reveal delay-1" onSubmit={handleNewsletterSubmit}>
              <label htmlFor="newsletter-email">Seu melhor e-mail</label>
              <div className="newsletter-field">
                <input
                  id="newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) => {
                    setNewsletterEmail(event.target.value)
                    setIsNewsletterSent(false)
                  }}
                  placeholder="Digite aqui seu e-mail"
                  required
                />
                <button type="submit" className="btn btn-dark">
                  Quero receber
                </button>
              </div>
              {isNewsletterSent && <p className="newsletter-success">Cadastro enviado com sucesso.</p>}
            </form>
          </div>
        </section>

        <section className="stores section" id="lojas">
          <div className="container">
            <div className="section-header reveal">
              <p className="eyebrow eyebrow-dark">Todas as lojas</p>
              <h2>Um ecossistema completo para negociar seu carro</h2>
              <p>Várias lojas em um único local, com experiência centralizada e atendimento coordenado.</p>
            </div>
            <div className="stores-grid">
              {stores.map((store) => (
                <div key={store} className="store-chip">
                  <CarFront size={16} />
                  <span>{store}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contato">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo-footer.png" alt="Via Shopping Car" />
            <p>
              Av. Washington Soares, 2100 - Edson Queiroz
              <br />
              Fortaleza - CE, 60810-350
            </p>
          </div>

          <div className="footer-col">
            <h3>Contato</h3>
            <a href="tel:+558530373036">
              <Phone size={16} />
              (85) 3037-3036
            </a>
            <a href={createWhatsappLink()} target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href="https://www.google.com/maps/place/Via+Shopping+Car/@-3.7771077,-38.4818214,17z/"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={16} />
              Ver no mapa
            </a>
          </div>

          <div className="footer-col">
            <h3>Navegação</h3>
            <a href="#estoque">Estoque</a>
            <a href="#servicos">Serviços</a>
            <a href="#promocoes">Promoções</a>
            <a href="#sobre">Sobre nós</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Via Shopping Car. Todos os direitos reservados.</p>
          <p>Aviso de cookies e política de privacidade disponíveis mediante solicitação.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
