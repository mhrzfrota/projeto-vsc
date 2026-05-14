import { ArrowRight, HandCoins, MapPin, ShieldCheck } from 'lucide-react'
import { createWhatsappLink, services } from '../site-data'

export function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-wrap reveal">
          <p className="eyebrow">Nossos serviços</p>
          <h1>Mais do que venda de carros</h1>
          <p>
            Soluções pensadas para simplificar toda a jornada da sua negociação — do financiamento
            ao seguro, da visita à compra final.
          </p>
        </div>
      </section>

      <section className="services section">
        <div className="container">
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

          <div className="section-actions stores-actions reveal delay-1">
            <a
              className="btn btn-secondary"
              href={createWhatsappLink('Olá! Quero falar com a equipe do Via Shopping Car sobre serviços.')}
              target="_blank"
              rel="noreferrer"
            >
              Falar com a equipe <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
