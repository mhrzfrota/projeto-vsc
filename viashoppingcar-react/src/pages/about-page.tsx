import { ArrowRight, CarFront, MapPin, Phone, Store } from 'lucide-react'
import {
  createWhatsappLink,
  facebookLink,
  mapsLink,
  publicVerificationNote,
  shoppingAddress,
  shoppingFeatures,
  shoppingGallery,
  siteLink,
  wazeLink,
  type ShoppingFeature,
} from '../site-data'

export function AboutPage() {
  const featuredGallery = shoppingGallery[0]
  const brandGallery = shoppingGallery[1]

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-wrap reveal">
          <p className="eyebrow">Sobre o Via Shopping Car</p>
          <h1>Conheça o shopping</h1>
          <p>
            O endereço público está em <strong>{shoppingAddress}</strong>. Aqui você confere o
            espaço, a estrutura e os detalhes que tornam o Via Shopping Car um destino real para
            quem vai comprar, trocar ou conhecer o mix de lojas.
          </p>
        </div>
      </section>

      <section className="shopping-preview section">
        <div className="container">
          <div className="section-header reveal">
            <p className="eyebrow eyebrow-dark">Conheça o shopping</p>
            <h2>Estrutura física pensada para uma visita prática</h2>
            <p>{publicVerificationNote}</p>
          </div>

          <div className="shopping-preview-grid">
            <article className="shopping-showcase-card reveal">
              <div className="shopping-showcase-media">
                <img src={featuredGallery.image} alt={featuredGallery.title} loading="lazy" />
                <span className="shopping-showcase-badge">{featuredGallery.badge}</span>
              </div>
              <div className="shopping-showcase-body">
                <h3>{featuredGallery.title}</h3>
                <p>{featuredGallery.description}</p>
                <div className="shopping-showcase-actions">
                  <a className="btn btn-secondary" href={mapsLink} target="_blank" rel="noreferrer">
                    Abrir no Google Maps
                  </a>
                  <a
                    className="btn btn-outline-light"
                    href={wazeLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Traçar rota no Waze
                  </a>
                </div>
              </div>
            </article>

            <div className="shopping-feature-stack">
              {shoppingFeatures.map((feature, index) => (
                <article
                  key={feature.title}
                  className="shopping-feature-card reveal"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="shopping-feature-icon">{renderFeatureIcon(feature)}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  {feature.href && feature.ctaLabel && (
                    <a
                      className="shopping-feature-link"
                      href={feature.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {feature.ctaLabel} <ArrowRight size={16} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="shopping-brand-band reveal delay-1">
            <img src={brandGallery.image} alt={brandGallery.title} loading="lazy" />
            <div className="shopping-brand-copy">
              <span className="shopping-brand-tag">{brandGallery.badge}</span>
              <h3>{brandGallery.title}</h3>
              <p>{brandGallery.description}</p>
            </div>
            <div className="shopping-brand-actions">
              <a className="btn btn-secondary" href={siteLink} target="_blank" rel="noreferrer">
                Abrir site oficial
              </a>
              <a
                className="btn btn-outline-light"
                href={facebookLink}
                target="_blank"
                rel="noreferrer"
              >
                Ver Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="about section">
        <div className="about-overlay" />
        <div className="container about-grid">
          <div className="about-mark reveal">
            <img src={brandGallery.image} alt="Marca Via Shopping Car" />
          </div>
          <div className="about-content reveal delay-1">
            <p className="eyebrow">Visite o shopping</p>
            <h2>Uma jornada clara para compra, troca e visita presencial</h2>
            <p>
              Atendimento digital, estrutura física e pronta evolução para páginas dedicadas por
              loja. Agende sua visita e conheça o mix multimarcas de perto.
            </p>
            <a
              className="btn btn-light"
              href={createWhatsappLink('Olá! Quero agendar uma visita ao Via Shopping Car.')}
              target="_blank"
              rel="noreferrer"
            >
              Agendar visita <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function renderFeatureIcon(feature: ShoppingFeature) {
  if (feature.kind === 'contact') return <Phone size={20} />
  if (feature.kind === 'location') return <MapPin size={20} />
  if (feature.kind === 'parking') return <CarFront size={20} />
  return <Store size={20} />
}
