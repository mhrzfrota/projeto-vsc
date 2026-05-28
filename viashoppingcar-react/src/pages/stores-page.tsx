import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { storesCatalog, type StoreCatalogItem } from '../site-data'

type StoreCatalogItemWithLogo = StoreCatalogItem & { logo: string }

const storesWithLogo = storesCatalog.filter(
  (store): store is StoreCatalogItemWithLogo => Boolean(store.logo),
)

export function StoresPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-wrap reveal">
          <p className="eyebrow">Todas as lojas</p>
          <h1>Lojas parceiras do Via Shopping Car</h1>
          <p>
            Conheça as operações que fazem parte do mix multimarcas do shopping. Clique em uma loja
            para ver veículos em destaque e acessar o catálogo completo.
          </p>
        </div>
      </section>

      <section className="stores-catalog section">
        <div className="container">
          <div className="stores-catalog-grid">
            {storesWithLogo.map((store, index) => (
              <Link
                key={store.slug}
                to={`/lojas/${store.slug}`}
                className="store-catalog-card reveal"
                style={{ animationDelay: `${index * 60}ms` }}
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
                  <div className="store-catalog-card-top">
                    <h3>{store.name}</h3>
                    {store.city && (
                      <span className="store-catalog-card-city">{store.city}</span>
                    )}
                  </div>
                  <p>{store.tagline}</p>
                  {store.specialties && store.specialties.length > 0 && (
                    <ul className="store-catalog-card-tags">
                      {store.specialties.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <span className="store-catalog-card-cta">
                  Ver veículos da loja <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
