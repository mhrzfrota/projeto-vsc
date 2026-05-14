import { ArrowRight, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { storesCatalog } from '../site-data'

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
            {storesCatalog.map((store, index) => (
              <Link
                key={store.slug}
                to={`/lojas/${store.slug}`}
                className="store-catalog-card reveal"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="store-catalog-card-top">
                  <span className="store-catalog-card-icon" aria-hidden="true">
                    <Store size={20} />
                  </span>
                  <h3>{store.name}</h3>
                </div>
                <p>{store.tagline}</p>
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
