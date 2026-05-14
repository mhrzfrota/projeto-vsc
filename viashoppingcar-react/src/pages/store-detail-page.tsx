import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
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

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-wrap reveal">
          <Link className="page-hero-back" to="/lojas">
            <ArrowLeft size={16} /> Todas as lojas
          </Link>
          <p className="eyebrow">{store.name}</p>
          <h1>Veículos em destaque na {store.name}</h1>
          <p>{store.tagline}</p>
          <div className="page-hero-actions">
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
          </div>
        </div>
      </section>

      <section className="store-detail section">
        <div className="container">
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
