import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Fuel,
  Gauge,
  HandCoins,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
} from 'lucide-react'
import {
  createWhatsappLink,
  formatCurrency,
  mapsLink,
  persistNewsletterLead,
  services,
  stores,
  vehicles,
} from '../site-data'

type Feedback = {
  kind: 'success' | 'error' | 'info'
  message: string
}

type HomePageProps = {
  onOpenPolicyModal: () => void
}

export function HomePage({ onOpenPolicyModal }: HomePageProps) {
  const navigate = useNavigate()
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterConsent, setNewsletterConsent] = useState(false)
  const [newsletterFeedback, setNewsletterFeedback] = useState<Feedback | null>(null)
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)

  const brands = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.brand))].sort(),
    [],
  )

  const models = useMemo(
    () =>
      [
        ...new Set(
          vehicles
            .filter((vehicle) => !brand || vehicle.brand === brand)
            .map((vehicle) => vehicle.model),
        ),
      ],
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

  const hasActiveFilters = Boolean(brand || model || yearFrom || yearTo)
  const inventoryCountLabel =
    filteredVehicles.length === 1
      ? '1 destaque encontrado'
      : `${filteredVehicles.length} destaques encontrados`

  function buildInventoryRoute(vehicleId?: number) {
    const params = new URLSearchParams()

    if (vehicleId) {
      params.set('focus', String(vehicleId))
    }

    if (brand) {
      params.set('brand', brand)
    }

    if (model) {
      params.set('model', model)
    }

    if (yearFrom) {
      params.set('yearFrom', yearFrom)
    }

    if (yearTo) {
      params.set('yearTo', yearTo)
    }

    const query = params.toString()
    return query ? `/estoque?${query}` : '/estoque'
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(buildInventoryRoute())
  }

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const email = newsletterEmail.trim().toLowerCase()

    if (!email) {
      return
    }

    if (!newsletterConsent) {
      setNewsletterFeedback({
        kind: 'error',
        message: 'Confirme o aceite de privacidade para continuar.',
      })
      return
    }

    setIsNewsletterSubmitting(true)

    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT?.trim()
    const payload = {
      email,
      acceptedAt: new Date().toISOString(),
      source: 'site-promocoes',
    }

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error('newsletter submission failed')
        }

        setNewsletterFeedback({
          kind: 'success',
          message: 'Cadastro enviado com sucesso.',
        })
      } else {
        persistNewsletterLead(email)

        const whatsappLink = createWhatsappLink(
          `Olá! Quero receber promoções do Via Shopping Car. Meu e-mail é ${email}.`,
        )
        const popup = window.open(whatsappLink, '_blank', 'noopener,noreferrer')

        if (!popup) {
          window.location.href = whatsappLink
        }

        setNewsletterFeedback({
          kind: 'info',
          message: 'Abrimos o WhatsApp para concluir seu cadastro com a equipe.',
        })
      }

      setNewsletterEmail('')
      setNewsletterConsent(false)
    } catch {
      setNewsletterFeedback({
        kind: 'error',
        message:
          'Não foi possível concluir o cadastro agora. Tente novamente ou fale conosco pelo WhatsApp.',
      })
    } finally {
      setIsNewsletterSubmitting(false)
    }
  }

  return (
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
                Ver destaques <ArrowRight size={16} />
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
            <p>Filtre por marca, modelo e ano e abra a vitrine completa do showroom.</p>
            <p className="search-note">A listagem interna agora abre em uma rota dedicada e mais completa.</p>

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
              {hasActiveFilters ? `Abrir ${inventoryCountLabel}` : 'Abrir showroom'}
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
              A seleção abaixo funciona como vitrine rápida. Ao clicar em qualquer carro, você entra na
              tela completa de estoque com filtros, ordenação e comparação.
            </p>
          </div>

          <div className="section-actions reveal delay-1">
            <p className="inventory-count">{inventoryCountLabel}</p>
            <div className="inventory-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(buildInventoryRoute())}
              >
                Abrir catálogo completo
              </button>
              <a
                className="btn btn-outline-light"
                href={createWhatsappLink('Olá! Quero consultar o estoque completo do Via Shopping Car.')}
                target="_blank"
                rel="noreferrer"
              >
                Consultar no WhatsApp
              </a>
            </div>
          </div>

          {filteredVehicles.length > 0 ? (
            <div className="inventory-grid">
              {filteredVehicles.map((vehicle, index) => (
                <article
                  key={vehicle.id}
                  className="vehicle-card reveal"
                  style={{ animationDelay: `${index * 80}ms` }}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(buildInventoryRoute(vehicle.id))}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      navigate(buildInventoryRoute(vehicle.id))
                    }
                  }}
                >
                  <div className="vehicle-media">
                    <img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} loading="lazy" />
                    <span className="vehicle-tag">{vehicle.tag}</span>
                  </div>
                  <div className="vehicle-body">
                    <h3>
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="vehicle-subtitle">{vehicle.subtitle}</p>
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
                      <li>
                        <CarFront size={16} />
                        {vehicle.transmission}
                      </li>
                    </ul>
                    <div className="vehicle-actions">
                      <button
                        type="button"
                        className="vehicle-link vehicle-link-button"
                        onClick={(event) => {
                          event.stopPropagation()
                          navigate(buildInventoryRoute(vehicle.id))
                        }}
                      >
                        Ver showroom <ArrowRight size={16} />
                      </button>
                      <a
                        className="vehicle-link vehicle-link-primary"
                        href={createWhatsappLink(
                          `Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                      >
                        Estou interessado
                      </a>
                    </div>
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
              Aqui prezamos por confiança, segurança e conforto. Reunimos mais de 10 lojas
              selecionadas, financeiras e serviços em um só lugar para facilitar sua compra, venda ou
              troca.
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
              <article
                key={service.title}
                className="service-card reveal"
                style={{ animationDelay: `${index * 110}ms` }}
              >
                <div className="service-icon">
                  {service.title === 'Financiamento' && <HandCoins size={24} />}
                  {service.title === 'Seguros' && <ShieldCheck size={24} />}
                  {service.title === 'Localização' && <MapPin size={24} />}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a className="service-link" href={service.href} target="_blank" rel="noreferrer">
                  {service.ctaLabel} <ArrowRight size={16} />
                </a>
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
                  setNewsletterFeedback(null)
                }}
                placeholder="Digite aqui seu e-mail"
                required
              />
              <button type="submit" className="btn btn-dark" disabled={isNewsletterSubmitting}>
                {isNewsletterSubmitting ? 'Enviando...' : 'Quero receber'}
              </button>
            </div>
            <label className="checkbox-row" htmlFor="newsletter-consent">
              <input
                id="newsletter-consent"
                type="checkbox"
                checked={newsletterConsent}
                onChange={(event) => {
                  setNewsletterConsent(event.target.checked)
                  setNewsletterFeedback(null)
                }}
              />
              <span>
                Aceito receber ofertas e promoções por e-mail e WhatsApp, conforme a política de
                privacidade.
              </span>
            </label>
            <button type="button" className="text-link" onClick={onOpenPolicyModal}>
              Ler política de privacidade
            </button>
            {newsletterFeedback && (
              <p className={`newsletter-feedback newsletter-feedback-${newsletterFeedback.kind}`}>
                {newsletterFeedback.message}
              </p>
            )}
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
          <div className="section-actions stores-actions reveal delay-1">
            <a
              className="btn btn-secondary"
              href={createWhatsappLink('Olá! Quero conhecer melhor as lojas disponíveis no Via Shopping Car.')}
              target="_blank"
              rel="noreferrer"
            >
              Falar sobre as lojas
            </a>
            <a className="btn btn-outline-light" href={mapsLink} target="_blank" rel="noreferrer">
              Como chegar
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
