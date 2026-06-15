import { ArrowRight, Instagram, MessageCircle, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { storesCatalog, type StoreCatalogItem } from '../site-data'

type StoreCatalogItemWithLogo = StoreCatalogItem & { logo: string }

const storesWithLogo = storesCatalog.filter(
  (store): store is StoreCatalogItemWithLogo => Boolean(store.logo),
)

export function StoresPage() {
  return (
    <main>
      <section className="page-hero stores-page-hero">
        <div className="container page-hero-wrap reveal">
          <p className="eyebrow">Todas as lojas</p>
          <h1>Lojas parceiras do Via Shopping Car</h1>
        </div>
      </section>

      <section className="stores-catalog section">
        <div className="container">
          <div className="stores-catalog-grid">
            {storesWithLogo.map((store, index) => {
              const hasInstagram = Boolean(store.instagramUrl?.trim())
              const hasOlx = Boolean(store.olxUrl?.trim())

              return (
                <article
                  key={store.slug}
                  className="store-catalog-card reveal"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <Link
                    to={`/lojas/${store.slug}`}
                    className="store-catalog-card-inner"
                  >
                    <div className="store-catalog-card-logo">
                      <img
                        src={store.logo}
                        alt={`Logo ${store.name}`}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                    <div className="store-catalog-card-content">
                      <h3>{store.name}</h3>
                      {store.city && (
                        <span className="store-catalog-card-city">{store.city}</span>
                      )}
                      <p>{store.tagline}</p>
                    </div>
                    <span className="store-catalog-card-cta">
                      Ver veículos da loja <ArrowRight size={16} />
                    </span>
                  </Link>

                  <div className="store-catalog-card-links">
                    <a
                      href={store.contactLink}
                      target="_blank"
                      rel="noreferrer"
                      className="store-link-chip store-link-whatsapp"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                    {hasInstagram && (
                      <a
                        href={store.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="store-link-chip store-link-instagram"
                        aria-label={`Instagram da ${store.name}`}
                      >
                        <Instagram size={16} />
                        Instagram
                      </a>
                    )}
                    {hasOlx && (
                      <a
                        href={store.olxUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="store-link-chip store-link-olx"
                        aria-label={`Anúncios da ${store.name} na OLX`}
                      >
                        <Tag size={16} />
                        OLX
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
