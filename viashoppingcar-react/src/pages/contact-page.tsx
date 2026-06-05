import { Facebook, Globe, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react'
import {
  businessHours,
  businessHoursSummary,
  contactPhone,
  contactPhoneHref,
  createWhatsappLink,
  mapsLink,
  shoppingAddress,
  visitChannels,
  type VisitChannel,
} from '../site-data'

export function ContactPage() {
  return (
    <main>
      <section className="page-hero contact-page-hero">
        <div className="container page-hero-wrap reveal">
          <p className="eyebrow">Contato e visita</p>
          <h1>Planeje sua visita e fale com a equipe</h1>
          <p>
            {businessHoursSummary} Endereço público: <strong>{shoppingAddress}</strong>.
          </p>
          <div className="page-hero-actions">
            <a className="btn btn-primary" href={contactPhoneHref}>
              <Phone size={16} /> {contactPhone}
            </a>
            <a
              className="btn btn-light"
              href={createWhatsappLink('Olá! Quero falar com a equipe do Via Shopping Car.')}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} /> WhatsApp oficial
            </a>
          </div>
        </div>
      </section>

      <section className="visit section">
        <div className="container visit-grid">
          <article className="visit-card reveal">
            <p className="eyebrow eyebrow-dark">Planeje a visita</p>
            <h2>Horários e localização</h2>
            <p className="visit-summary">
              {businessHoursSummary} Estacionamento disponível para clientes no local.
            </p>
            <div className="visit-hours">
              {businessHours.map((item) => (
                <div key={item.day} className="visit-hour-row">
                  <span>{item.day}</span>
                  <strong>{item.hours}</strong>
                </div>
              ))}
            </div>
            <a
              className="btn btn-secondary"
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={16} /> Abrir no Google Maps
            </a>
          </article>

          <article className="visit-card reveal delay-1">
            <p className="eyebrow eyebrow-dark">Canais oficiais</p>
            <h2>Fale com a gente onde for mais prático</h2>
            <div className="visit-channel-list">
              {visitChannels.map((channel) => (
                <div key={channel.title} className="visit-channel-card">
                  <div className="visit-channel-icon">{renderChannelIcon(channel)}</div>
                  <div className="visit-channel-copy">
                    <strong>{channel.title}</strong>
                    <p>{channel.description}</p>
                  </div>
                  <a
                    className="visit-channel-link"
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {channel.ctaLabel}
                  </a>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

function renderChannelIcon(channel: VisitChannel) {
  if (channel.kind === 'whatsapp') return <MessageCircle size={18} />
  if (channel.kind === 'instagram') return <Instagram size={18} />
  if (channel.kind === 'facebook') return <Facebook size={18} />
  if (channel.kind === 'site') return <Globe size={18} />
  return <MapPin size={18} />
}
