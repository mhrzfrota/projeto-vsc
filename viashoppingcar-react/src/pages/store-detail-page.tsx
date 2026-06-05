import {
  ArrowLeft,
  ArrowRight,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  Phone,
  Store,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { createStoreWhatsappLink, storesCatalog } from '../site-data'

export function StoreDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const store = storesCatalog.find((item) => item.slug === slug)

  if (!store) {
    return (
      <main>
        <section className="page-hero">
          <div className="container page-hero-wrap reveal">
            <p className="eyebrow">Loja não encontrada</p>
            <h1>Não encontramos esta loja</h1>
            <p>O link pode ter expirado ou a loja não está cadastrada na vitrine atual.</p>
            <div className="page-hero-actions">
              <Link className="btn btn-primary" to="/lojas">
                <ArrowLeft size={16} /> Voltar para todas as lojas
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const olxHref = store.olxUrl?.trim() ? store.olxUrl : '#'
  const hasOlx = Boolean(store.olxUrl?.trim())
  const instagramHref = store.instagramUrl?.trim() ? store.instagramUrl : '#'
  const hasInstagram = Boolean(store.instagramUrl?.trim())

  return (
    <main>
      <section className="page-hero store-detail-hero">
        <div className="container page-hero-wrap reveal">
          <Link className="page-hero-back" to="/lojas">
            <ArrowLeft size={16} /> Todas as lojas
          </Link>

          <div className="store-detail-header">
            <div className="store-detail-identity">
              <div className="store-detail-logo">
                {store.logo ? (
                  <img
                    src={store.logo}
                    alt={`Logo ${store.name}`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                ) : (
                  <span className="store-detail-logo-fallback" aria-hidden="true">
                    <Store size={40} />
                  </span>
                )}
              </div>
              <div className="store-detail-titles">
                <p className="eyebrow">Loja parceira</p>
                <h1>{store.name}</h1>
                <p className="store-detail-tagline">{store.tagline}</p>
              </div>
            </div>

            {(store.city || store.phone || store.hours) && (
              <ul className="store-detail-meta">
                {store.city && (
                  <li>
                    <span className="store-detail-meta-icon" aria-hidden="true">
                      <MapPin size={16} />
                    </span>
                    <div>
                      <span className="store-detail-meta-label">Localização</span>
                      <strong>{store.city}</strong>
                    </div>
                  </li>
                )}
                {store.phone && (
                  <li>
                    <span className="store-detail-meta-icon" aria-hidden="true">
                      <Phone size={16} />
                    </span>
                    <div>
                      <span className="store-detail-meta-label">Telefone</span>
                      <strong>{store.phone}</strong>
                    </div>
                  </li>
                )}
                {store.hours && (
                  <li>
                    <span className="store-detail-meta-icon" aria-hidden="true">
                      <Clock size={16} />
                    </span>
                    <div>
                      <span className="store-detail-meta-label">Horário</span>
                      <strong>{store.hours}</strong>
                    </div>
                  </li>
                )}
              </ul>
            )}

            {store.description && (
              <p className="store-detail-description">{store.description}</p>
            )}

            {store.specialties && store.specialties.length > 0 && (
              <ul className="store-detail-specialties">
                {store.specialties.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            <div className="page-hero-actions store-detail-actions">
              <a
                className="btn btn-primary"
                href={olxHref}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!hasOlx}
                onClick={(event) => {
                  if (!hasOlx) event.preventDefault()
                }}
              >
                Ver catálogo completo na OLX <ExternalLink size={16} />
              </a>
              <a
                className="btn btn-light"
                href={createStoreWhatsappLink(
                  store.name,
                  `Olá ${store.name}! Vim pelo site do Via Shopping Car e quero ver os veículos disponíveis.`,
                )}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp da loja
              </a>
              {hasInstagram && (
                <a
                  className="btn btn-secondary"
                  href={instagramHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram size={16} /> Instagram da loja
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="store-detail section">
        <div className="container">
          <div className="store-detail-section-header reveal">
            <h2>Veículos em destaque</h2>
            <p>Confira uma seleção do que a {store.name} preparou para o site.</p>
          </div>

          <div className="store-detail-grid">
            {store.vehicles.map((vehicle, index) => (
              <a
                key={`${store.slug}-${index}`}
                className="store-detail-card reveal"
                style={{ animationDelay: `${index * 80}ms` }}
                href={olxHref}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!hasOlx}
                onClick={(event) => {
                  if (!hasOlx) event.preventDefault()
                }}
              >
                <div className="store-detail-media">
                  <img src={vehicle.image} alt={vehicle.title} loading="lazy" />
                </div>
                <div className="store-detail-body">
                  <h3>{vehicle.title}</h3>
                  <p>{vehicle.subtitle}</p>
                  <div className="store-detail-foot">
                    <span className="store-detail-price">{vehicle.price}</span>
                    <span className="store-detail-link">
                      Ver na OLX <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {!hasOlx && (
            <p className="store-detail-note">
              Os links para o catálogo da loja na OLX serão atualizados em breve.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
