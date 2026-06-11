import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  Car,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Clock,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Search,
  Truck,
} from 'lucide-react'
import {
  businessHoursSummary,
  createStoreWhatsappLink,
  createWhatsappLink,
  formatCurrency,
  heroFacts,
  storeLogos,
  vehicles,
  vehicleTypes,
  type VehicleType,
} from '../site-data'

export function HomePage() {
  const navigate = useNavigate()
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [searchTab, setSearchTab] = useState<'tipo' | 'marca'>('tipo')
  const [searchBrand, setSearchBrand] = useState('')
  const [searchModel, setSearchModel] = useState('')
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState)
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    const el = carouselRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.vehicle-card')
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).gap) : 320
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
  }, [])

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
  const locationAddress = 'Av. Washington Soares, 2100 - Edson Queiroz, Fortaleza - CE'
  const googleMapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `Via Shopping Car, ${locationAddress}`,
  )}&output=embed`

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

  return (
    <main>
      <section className="hero" id="inicio">
        <div className="hero-layer" />
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">Via Shopping Car</p>
            <h1>O melhor Shopping de automóveis da cidade</h1>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => navigate('/sobre')}>
                Conhecer o shopping <ArrowRight size={16} />
              </button>
              <a
                className="btn btn-light"
                href={createWhatsappLink('Olá! Quero agendar uma visita ao Via Shopping Car.')}
                target="_blank"
                rel="noreferrer"
              >
                Agendar visita <MessageCircle size={16} />
              </a>
            </div>
            <div className="hero-metrics">
              {heroFacts.map((fact) => (
                <div key={fact.value}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="search-card reveal delay-1" onSubmit={handleSearchSubmit}>
            <h2>
              <Search size={18} />
              Encontre seu veículo
            </h2>
            <p>Filtre por marca, modelo e ano e abra o showroom completo desta prévia funcional.</p>
            <p className="search-note">
              Depois do filtro, o cliente já pode seguir para estoque, WhatsApp e visita presencial.
            </p>

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

      <section className="search-by section" id="pesquise">
        <div className="container">
          <div className="search-by-header reveal">
            <p className="search-by-eyebrow">Pesquise por:</p>
            <div className="search-by-tabs" role="tablist" aria-label="Modos de pesquisa">
              <button
                type="button"
                role="tab"
                aria-selected={searchTab === 'tipo'}
                className={`search-by-tab${searchTab === 'tipo' ? ' is-active' : ''}`}
                onClick={() => setSearchTab('tipo')}
              >
                Tipo
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={searchTab === 'marca'}
                className={`search-by-tab${searchTab === 'marca' ? ' is-active' : ''}`}
                onClick={() => setSearchTab('marca')}
              >
                Marca e Modelo
              </button>
            </div>
          </div>

          {searchTab === 'tipo' ? (
            <div className="search-by-types reveal delay-1" role="tabpanel">
              {vehicleTypes.map((type, index) => (
                <button
                  key={type}
                  type="button"
                  className="search-by-type-card"
                  style={{ animationDelay: `${index * 80}ms` }}
                  onClick={() => navigate(`/estoque?type=${encodeURIComponent(type)}`)}
                >
                  <span className="search-by-type-icon">{renderVehicleTypeIcon(type)}</span>
                  <span className="search-by-type-label">{type}</span>
                </button>
              ))}
            </div>
          ) : (
            <form
              className="search-by-brand reveal delay-1"
              role="tabpanel"
              onSubmit={(event) => {
                event.preventDefault()
                const params = new URLSearchParams()
                if (searchBrand) params.set('brand', searchBrand)
                if (searchModel) params.set('model', searchModel)
                const query = params.toString()
                navigate(query ? `/estoque?${query}` : '/estoque')
              }}
            >
              <label>
                Marca
                <select
                  value={searchBrand}
                  onChange={(event) => {
                    setSearchBrand(event.target.value)
                    setSearchModel('')
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
                <select
                  value={searchModel}
                  onChange={(event) => setSearchModel(event.target.value)}
                >
                  <option value="">Todos</option>
                  {vehicles
                    .filter((vehicle) => !searchBrand || vehicle.brand === searchBrand)
                    .map((vehicle) => vehicle.model)
                    .filter((value, index, array) => array.indexOf(value) === index)
                    .map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </label>

              <button type="submit" className="btn btn-primary search-by-brand-submit">
                Buscar <Search size={16} />
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="inventory section" id="estoque">
        <div className="container">
          <div className="section-header reveal">
            <p className="eyebrow eyebrow-dark">Estoque atualizado</p>
            <h2>Veículos em destaque</h2>
          </div>

          <div className="section-actions reveal delay-1">
            <p className="inventory-count">{inventoryCountLabel}</p>
            <div className="inventory-actions">
              <button
                type="button"
                className="btn inventory-catalog-button"
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
            <div className="inventory-carousel-wrap">
              <div className="inventory-grid" ref={carouselRef}>
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
                          href={createStoreWhatsappLink(
                            vehicle.store,
                            `Olá ${vehicle.store}! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year} do Via Shopping Car.`,
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
              {canScrollLeft && (
                <button
                  type="button"
                  className="carousel-arrow carousel-arrow-left"
                  onClick={() => scrollCarousel('left')}
                  aria-label="Ver carros anteriores"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {canScrollRight && (
                <button
                  type="button"
                  className="carousel-arrow carousel-arrow-right"
                  onClick={() => scrollCarousel('right')}
                  aria-label="Ver mais carros"
                >
                  <ChevronRight size={20} />
                </button>
              )}
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

      <section className="logo-marquee section" aria-label="Lojas parceiras">
        <div className="container">
          <div className="logo-marquee-header reveal">
            <p className="eyebrow eyebrow-dark">Lojas parceiras</p>
            <h2>Multimarcas reunidas em um só lugar</h2>
          </div>
        </div>
        <div className="logo-marquee-track-wrap reveal delay-1">
          <div className="logo-marquee-track">
            {[...storeLogos, ...storeLogos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="logo-marquee-item"
                aria-hidden={index >= storeLogos.length}
              >
                <StoreLogo name={logo.name} image={logo.image} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="insta-stories section" aria-label="Instagram">
        <div className="container">
          <div className="section-header reveal">
            <p className="eyebrow eyebrow-dark">Instagram</p>
            <h2>Acompanhe as redes sociais</h2>
          </div>
          <div className="insta-stories-grid reveal delay-1">
            <a
              href="https://www.instagram.com/reel/DZaXeNCxiTf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
              target="_blank"
              rel="noreferrer"
              className="insta-story-card"
            >
              <div className="insta-story-screen">
                <div className="insta-story-header">
                  <div className="insta-story-avatar">
                    <span>V</span>
                  </div>
                  <div className="insta-story-user">
                    <span className="insta-story-name">viashoppingcar</span>
                    <span className="insta-story-label">Patrocinado</span>
                  </div>
                </div>
                <img src="/assets/insta1.png" alt="Post do Instagram 1" loading="lazy" />
                <div className="insta-story-gradient" />
                <div className="insta-story-dots">
                  <span className="insta-story-dot is-active" />
                  <span className="insta-story-dot" />
                  <span className="insta-story-dot" />
                </div>
              </div>
            </a>
            <a
              href="https://www.instagram.com/p/DZXpCjXkQeV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
              target="_blank"
              rel="noreferrer"
              className="insta-story-card"
            >
              <div className="insta-story-screen">
                <div className="insta-story-header">
                  <div className="insta-story-avatar">
                    <span>V</span>
                  </div>
                  <div className="insta-story-user">
                    <span className="insta-story-name">viashoppingcar</span>
                    <span className="insta-story-label">Patrocinado</span>
                  </div>
                </div>
                <img src="/assets/insta2.png" alt="Post do Instagram 2" loading="lazy" />
                <div className="insta-story-gradient" />
                <div className="insta-story-dots">
                  <span className="insta-story-dot" />
                  <span className="insta-story-dot is-active" />
                  <span className="insta-story-dot" />
                </div>
              </div>
            </a>
            <a
              href="https://www.instagram.com/reel/DYpbrEyRShc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
              target="_blank"
              rel="noreferrer"
              className="insta-story-card"
            >
              <div className="insta-story-screen">
                <div className="insta-story-header">
                  <div className="insta-story-avatar">
                    <span>V</span>
                  </div>
                  <div className="insta-story-user">
                    <span className="insta-story-name">viashoppingcar</span>
                    <span className="insta-story-label">Patrocinado</span>
                  </div>
                </div>
                <img src="/assets/insta3.png" alt="Post do Instagram 3" loading="lazy" />
                <div className="insta-story-gradient" />
                <div className="insta-story-dots">
                  <span className="insta-story-dot" />
                  <span className="insta-story-dot" />
                  <span className="insta-story-dot is-active" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="strip-banner">
        <img src="/assets/strip-cars.jpg" alt="Faixa de veículos do Via Shopping Car" />
      </section>

      <section className="location-section section" id="localizacao" aria-label="Localização">
        <div className="container location-grid">
          <div className="location-copy reveal">
            <p className="eyebrow">Localização</p>
            <h2>Chegue fácil ao Via Shopping Car</h2>

            <div className="location-details">
              <div className="location-detail">
                <MapPin size={20} />
                <span>Endereço</span>
                <strong>{locationAddress}</strong>
              </div>
              <div className="location-detail">
                <Clock size={20} />
                <span>Funcionamento</span>
                <strong>{businessHoursSummary}</strong>
              </div>
            </div>
          </div>

          <div className="location-map-card reveal delay-1">
            <iframe
              title="Mapa do Via Shopping Car no Google Maps"
              src={googleMapsEmbedSrc}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="location-map-badge" aria-hidden="true">
              <MapPin size={22} />
              <strong>Via Shopping Car</strong>
              <span>Av. Washington Soares, 2100</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

function renderVehicleTypeIcon(type: VehicleType) {
  if (type === 'SUV') {
    return <CarFront size={36} strokeWidth={1.6} />
  }
  if (type === 'Sedan') {
    return <Car size={36} strokeWidth={1.6} />
  }
  if (type === 'Pickup') {
    return <Truck size={36} strokeWidth={1.6} />
  }
  return <Car size={36} strokeWidth={1.6} />
}

function StoreLogo({ name, image }: { name: string; image: string }) {
  return (
    <div className="store-logo" title={name}>
      <img
        className="store-logo-image"
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  )
}
