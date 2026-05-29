import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  CarFront,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Phone,
  Star,
  Store,
} from 'lucide-react'
import {
  aboutHighlights,
  createWhatsappLink,
  customerTestimonials,
  mapsLink,
  publicVerificationNote,
  shoppingAddress,
  shoppingFeatures,
  shoppingGallery,
  wazeLink,
  type ShoppingFeature,
  type Testimonial,
} from '../site-data'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Via+Shopping+Car/@-3.777371,-38.4839154,17z'

export function AboutPage() {
  const featuredGallery = shoppingGallery[0]
  const brandGallery = shoppingGallery[1]

  return (
    <main>
      <section className="page-hero about-page-hero">
        <div className="container page-hero-wrap reveal">
          <p className="eyebrow">Sobre o Via Shopping Car</p>
          <h1>O shopping de veículos na Washington Soares</h1>
          <p>
            Na <strong>{shoppingAddress}</strong>, o Via Shopping Car reúne lojas multimarcas,
            atendimento presencial e uma experiência pensada para quem quer comparar opções antes de
            decidir o próximo carro.
          </p>
        </div>
      </section>

      <section className="about-intro section">
        <div className="container about-intro-wrap">
          <div className="about-intro-copy reveal">
            <p className="eyebrow eyebrow-dark">Quem somos</p>
            <h2>Um endereço só para quem vive de carro em Fortaleza</h2>
            <p>
              O Via Shopping Car nasceu para reunir, em um único lugar, as lojas multimarcas que mais
              vendem na cidade. A ideia é simples: você chega, compara modelos lado a lado, conversa
              com vendedores diferentes e sai com a melhor escolha — sem precisar atravessar
              Fortaleza inteira.
            </p>
            <p>
              É a forma mais prática de comprar, trocar ou avaliar seu usado, com estrutura física
              real para receber o cliente, estacionamento e atendimento presencial seis dias por
              semana.
            </p>
          </div>

          <ul className="about-intro-highlights reveal delay-1">
            {aboutHighlights.map((item) => (
              <li key={item.label}>
                <span className="about-intro-highlights-value">{item.value}</span>
                <strong>{item.label}</strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shopping-preview section">
        <div className="container">
          <div className="section-header reveal">
            <p className="eyebrow eyebrow-dark">Estrutura física</p>
            <h2>Pensada para uma visita prática</h2>
            <p>{publicVerificationNote}</p>
          </div>

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
        </div>
      </section>

      <section className="about-conveniences section">
        <div className="container">
          <div className="section-header reveal">
            <p className="eyebrow eyebrow-dark">O que você encontra</p>
            <h2>Conveniências para uma boa visita</h2>
            <p>
              Pontos confirmados publicamente que ajudam a transformar curiosidade em visita
              presencial.
            </p>
          </div>

          <div className="about-conveniences-grid">
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
      </section>

      <TestimonialsSection />

      <section className="about section">
        <div className="about-overlay" />
        <div className="container about-grid">
          <div className="about-mark reveal">
            <img src={brandGallery.image} alt="Marca Via Shopping Car" />
          </div>
          <div className="about-content reveal delay-1">
            <p className="eyebrow">Visite o shopping</p>
            <h2>Agende sua visita e conheça o mix de perto</h2>
            <p>
              Atendimento digital, estrutura física e equipe pronta para receber você. Marque um
              horário ou apareça em qualquer dia útil.
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

function TestimonialsSection() {
  const testimonials = customerTestimonials
  const total = testimonials.length
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const average = useMemo(() => {
    if (total === 0) return 0
    const sum = testimonials.reduce((acc, item) => acc + item.rating, 0)
    return Math.round((sum / total) * 10) / 10
  }, [testimonials, total])

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return
      const normalized = ((next % total) + total) % total
      setIndex(normalized)
    },
    [total],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (isPaused || total <= 1) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, 6500)
    return () => window.clearInterval(id)
  }, [isPaused, total])

  if (total === 0) return null

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="section-header reveal">
          <p className="eyebrow eyebrow-dark">O que nossos clientes dizem</p>
          <h2>Depoimentos de quem já passou pelo Via Shopping Car</h2>
          <div className="testimonials-summary">
            <span className="testimonials-summary-rating">
              <Star size={18} fill="currentColor" strokeWidth={0} /> {average.toFixed(1)}
            </span>
            <span className="testimonials-summary-meta">
              Baseado em avaliações públicas no Google
            </span>
            <a
              className="testimonials-summary-link"
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
            >
              Ver no Google <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div
          className="testimonials-carousel reveal"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <button
            type="button"
            className="testimonials-nav testimonials-nav-prev"
            onClick={prev}
            aria-label="Depoimento anterior"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="testimonials-viewport" aria-live="polite">
            <div
              className="testimonials-track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((item) => (
                <TestimonialCard key={item.id} testimonial={item} />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="testimonials-nav testimonials-nav-next"
            onClick={next}
            aria-label="Próximo depoimento"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="testimonials-dots" role="tablist" aria-label="Depoimentos">
          {testimonials.map((item, dotIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Ir para o depoimento de ${item.author}`}
              className={`testimonials-dot${dotIndex === index ? ' is-active' : ''}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="testimonial-card" aria-roledescription="slide">
      <header className="testimonial-card-header">
        <span
          className="testimonial-avatar"
          style={{ backgroundColor: testimonial.avatarColor }}
          aria-hidden="true"
        >
          {testimonial.initials}
        </span>
        <div className="testimonial-author">
          <strong>{testimonial.author}</strong>
          <span>
            Avaliação no Google · {testimonial.date}
          </span>
        </div>
        <span className="testimonial-google" aria-label="Origem: Google">
          <GoogleGlyph />
        </span>
      </header>

      <div className="testimonial-rating" aria-label={`Nota ${testimonial.rating} de 5`}>
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star
            key={starIndex}
            size={16}
            fill={starIndex < testimonial.rating ? '#fbbc04' : 'transparent'}
            color={starIndex < testimonial.rating ? '#fbbc04' : '#d2d5db'}
            strokeWidth={starIndex < testimonial.rating ? 0 : 1.5}
          />
        ))}
      </div>

      <p className="testimonial-body">{testimonial.body}</p>
    </article>
  )
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961l3.007 2.332C4.672 5.166 6.656 3.58 9 3.58Z"
      />
    </svg>
  )
}
