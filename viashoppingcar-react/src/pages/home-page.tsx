import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Car,
  CarFront,
  Clock,
  MapPin,
  MessageCircle,
  Search,
  Truck,
} from 'lucide-react'
import {
  businessHoursSummary,
  createWhatsappLink,
  heroFacts,
  storeLogos,
  vehicles,
  vehicleTypes,
  type VehicleType,
} from '../site-data'

export function HomePage() {
  const navigate = useNavigate()
  const [searchTab, setSearchTab] = useState<'tipo' | 'marca'>('tipo')
  const [searchBrand, setSearchBrand] = useState('')
  const [searchModel, setSearchModel] = useState('')

  const brands = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.brand))].sort(),
    [],
  )

  const locationAddress = 'Av. Washington Soares, 2100 - Edson Queiroz, Fortaleza - CE'
  const googleMapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `Via Shopping Car, ${locationAddress}`,
  )}&output=embed`

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
            <a
              href="https://www.instagram.com/viashoppingcar/"
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
                <img src="/assets/fotoinsta.png" alt="Post do Instagram 4" loading="lazy" />
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

          <div className="inventory-grid reveal delay-1">
            {vehicles.map((vehicle, index) => (
              <article
                key={vehicle.id}
                className="vehicle-card vehicle-card-soon"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="vehicle-media vehicle-media-soon">
                  <Car size={42} />
                </div>
                <div className="vehicle-body">
                  <span className="vehicle-soon-badge">
                    <Clock size={14} /> Em breve
                  </span>
                  <h3>Em breve</h3>
                  <p className="vehicle-subtitle">Novo veículo a caminho do estoque</p>
                </div>
              </article>
            ))}
          </div>
        </div>
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
