import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin, Menu, MessageCircle, Phone, PhoneCall, X } from 'lucide-react'
import {
  businessHoursSummary,
  contactPhone,
  contactPhoneHref,
  createWhatsappLink,
  mapsLink,
  navItems,
  privacyHighlights,
  shoppingAddress,
} from '../site-data'

type SiteFrameProps = {
  children: ReactNode
  hasCookieConsent: boolean
  isPolicyModalOpen: boolean
  onAcceptCookies: () => void
  onClosePolicyModal: () => void
  onOpenPolicyModal: () => void
}

export function SiteFrame({
  children,
  hasCookieConsent,
  isPolicyModalOpen,
  onAcceptCookies,
  onClosePolicyModal,
  onOpenPolicyModal,
}: SiteFrameProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false)
  const [activeBanner, setActiveBanner] = useState(0)
  const location = useLocation()
  const shouldShowPromoBanner = location.pathname === '/'
  const headerNavItems = navItems.filter((item) => item.href !== '/servicos')

  // Para o mobile, basta criar um recorte mais "alto" (ex.: 1080x1080 ou 1080x1350)
  // e informar o caminho em `mobileSrc`. Enquanto não existir, usamos a versão larga.
  const promoBanners: {
    src: string
    mobileSrc?: string
    href: string | null
  }[] = [
    {
      src: '/assets/banner14.png',
      mobileSrc: '/assets/banner9.png',
      href: createWhatsappLink('Olá! Vim pelo banner de ofertas do Via Shopping Car.'),
    },
    {
      src: '/assets/banner13.png',
      mobileSrc: '/assets/banner10.png',
      href: null,
    },
    {
      src: '/assets/banner11.png',
      href: null,
    },
  ]

  function goToBanner(index: number) {
    const total = promoBanners.length
    setActiveBanner(((index % total) + total) % total)
  }

  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen || isPolicyModalOpen || isCookieModalOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isCookieModalOpen, isMobileMenuOpen, isPolicyModalOpen])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  function handleOpenPolicyModal() {
    setIsMobileMenuOpen(false)
    setIsCookieModalOpen(false)
    onOpenPolicyModal()
  }

  function handleOpenCookieModal() {
    setIsMobileMenuOpen(false)
    setIsCookieModalOpen(true)
  }

  function handleAcceptCookies() {
    setIsCookieModalOpen(false)
    onAcceptCookies()
  }

  function handleNavClick() {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className={`site-shell${!hasCookieConsent ? ' has-cookie-banner' : ''}`}>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand" to="/" onClick={handleNavClick}>
            <img src="/assets/logo-header.png" alt="Via Shopping Car" />
          </Link>

          <nav className="main-nav" aria-label="Navegação principal">
            {headerNavItems.map((item) => renderNavItem(item, 'main-nav-link', handleNavClick))}
          </nav>

          <div className="nav-actions">
            <a
              className="btn btn-primary nav-cta"
              href={contactPhoneHref}
              aria-label={`Ligar para o Via Shopping Car no ${contactPhone}`}
            >
              <Phone size={16} strokeWidth={2.5} />
              <span className="nav-cta-label">Ligar agora</span>
            </a>
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            <button
              type="button"
              className="mobile-nav-backdrop"
              aria-label="Fechar menu"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="container mobile-nav-panel">
              <nav className="mobile-nav" aria-label="Navegação mobile">
                {headerNavItems.map((item) => renderNavItem(item, 'mobile-nav-link', handleNavClick))}
              </nav>
              <a
                className="btn btn-primary full-width"
                href={createWhatsappLink('Olá! Quero falar com a equipe do Via Shopping Car.')}
                target="_blank"
                rel="noreferrer"
                onClick={handleNavClick}
              >
                Falar com a equipe
              </a>
            </div>
          </>
        )}
      </header>

      {shouldShowPromoBanner && (
        <div className="promo-banner-carousel" aria-label="Ofertas Via Shopping Car">
          <div
            className="promo-banner-track"
            style={{ transform: `translateX(-${activeBanner * 100}%)` }}
          >
            {promoBanners.map((banner, index) => {
              const media = banner.mobileSrc ? (
                <picture>
                  <source media="(max-width: 760px)" srcSet={banner.mobileSrc} />
                  <img src={banner.src} alt="Via Shopping Car" />
                </picture>
              ) : (
                <img src={banner.src} alt="Via Shopping Car" />
              )

              return banner.href ? (
                <a
                  key={banner.src}
                  className="promo-banner promo-banner-slide"
                  href={banner.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={index === activeBanner ? 0 : -1}
                  aria-hidden={index !== activeBanner}
                  aria-label="Abrir WhatsApp pelo banner de ofertas do Via Shopping Car"
                >
                  {media}
                </a>
              ) : (
                <div
                  key={banner.src}
                  className="promo-banner promo-banner-slide"
                  aria-hidden={index !== activeBanner}
                >
                  {media}
                </div>
              )
            })}
          </div>

          <button
            type="button"
            className="promo-banner-arrow promo-banner-arrow-left"
            onClick={() => goToBanner(activeBanner - 1)}
            aria-label="Banner anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            className="promo-banner-arrow promo-banner-arrow-right"
            onClick={() => goToBanner(activeBanner + 1)}
            aria-label="Próximo banner"
          >
            <ChevronRight size={22} />
          </button>

          <div className="promo-banner-dots">
            {promoBanners.map((banner, index) => (
              <button
                key={banner.src}
                type="button"
                className={`promo-banner-dot${index === activeBanner ? ' is-active' : ''}`}
                aria-label={`Ir para o banner ${index + 1}`}
                onClick={() => goToBanner(index)}
              />
            ))}
          </div>
        </div>
      )}

      {children}

      <footer className="site-footer" id="contato">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo-footer.png" alt="Via Shopping Car" />
            <p>
              {shoppingAddress}
              <br />
              {businessHoursSummary}
            </p>
          </div>

          <div className="footer-col">
            <h3>Contato</h3>
            <a href={contactPhoneHref}>
              <Phone size={16} />
              {contactPhone}
            </a>
            <a href={createWhatsappLink()} target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a href={mapsLink} target="_blank" rel="noreferrer">
              <MapPin size={16} />
              Ver no mapa
            </a>
          </div>

          <div className="footer-col">
            <h3>Navegação</h3>
            {navItems.slice(1).map((item) => renderNavItem(item, 'footer-nav-link'))}
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Via Shopping Car. Todos os direitos reservados.</p>
          <div className="footer-legal-actions" aria-label="Políticas do site">
            <button type="button" className="footer-legal-button" onClick={handleOpenPolicyModal}>
              Política de privacidade
            </button>
            <button type="button" className="footer-legal-button" onClick={handleOpenCookieModal}>
              Cookies
            </button>
          </div>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={createWhatsappLink('Olá! Quero falar com a equipe do Via Shopping Car.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Fale agora com a gente pelo WhatsApp"
      >
        <span className="floating-whatsapp-icon" aria-hidden="true">
          <MessageCircle size={42} strokeWidth={2.25} />
          <PhoneCall size={17} strokeWidth={3} />
        </span>
        <span>Fale agora com a gente!</span>
      </a>

      {!hasCookieConsent && (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
          <p>
            Este site usa cookies locais para lembrar consentimentos e melhorar sua experiência de
            navegação.
          </p>
          <div className="cookie-actions">
            <button type="button" className="btn btn-secondary" onClick={handleOpenPolicyModal}>
              Política de privacidade
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAcceptCookies}>
              Ok, entendi
            </button>
          </div>
        </div>
      )}

      {isPolicyModalOpen && (
        <div className="policy-modal-shell" role="dialog" aria-modal="true" aria-labelledby="policy-title">
          <button
            type="button"
            className="policy-modal-backdrop"
            aria-label="Fechar política de privacidade"
            onClick={onClosePolicyModal}
          />
          <div className="policy-modal">
            <div className="policy-modal-header">
              <div>
                <p className="eyebrow eyebrow-dark">Privacidade</p>
                <h2 id="policy-title">Política de privacidade e termos de uso</h2>
              </div>
              <button
                type="button"
                className="policy-close"
                aria-label="Fechar política de privacidade"
                onClick={onClosePolicyModal}
              >
                <X size={18} />
              </button>
            </div>

            <div className="policy-modal-content">
              <p>
                Este resumo segue a base do site anterior: o tratamento de dados serve para contato
                comercial, envio de informações sobre veículos, financiamento, seguros e relacionamento com
                clientes.
              </p>
              <ul className="policy-list">
                {privacyHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Ao preencher formulários, você concorda com o uso dos dados para atendimento e pode
                revogar esse consentimento a qualquer momento por solicitação ao estabelecimento.
              </p>
            </div>

            <div className="policy-modal-footer">
              {!hasCookieConsent && (
                <button type="button" className="btn btn-primary" onClick={handleAcceptCookies}>
                  Aceitar cookies
                </button>
              )}
              <button type="button" className="btn btn-secondary" onClick={onClosePolicyModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {isCookieModalOpen && (
        <div className="policy-modal-shell" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
          <button
            type="button"
            className="policy-modal-backdrop"
            aria-label="Fechar tela de cookies"
            onClick={() => setIsCookieModalOpen(false)}
          />
          <div className="policy-modal">
            <div className="policy-modal-header">
              <div>
                <p className="eyebrow eyebrow-dark">Cookies</p>
                <h2 id="cookie-title">Consentimento e uso de cookies</h2>
              </div>
              <button
                type="button"
                className="policy-close"
                aria-label="Fechar tela de cookies"
                onClick={() => setIsCookieModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="policy-modal-content">
              <p>
                Este site usa cookies locais para lembrar seu consentimento e melhorar a experiência de
                navegação. Esses cookies ajudam a evitar que o aviso apareça repetidamente depois do aceite.
              </p>
              <ul className="policy-list">
                <li>O consentimento fica salvo apenas neste navegador.</li>
                <li>Você pode limpar os cookies e dados do site nas configurações do navegador.</li>
                <li>Ao aceitar, o site registra essa preferência localmente.</li>
              </ul>
              <p>
                Status atual:{' '}
                <strong>{hasCookieConsent ? 'cookies aceitos' : 'consentimento pendente'}</strong>.
              </p>
            </div>

            <div className="policy-modal-footer">
              {!hasCookieConsent && (
                <button type="button" className="btn btn-primary" onClick={handleAcceptCookies}>
                  Aceitar cookies
                </button>
              )}
              <button type="button" className="btn btn-secondary" onClick={() => setIsCookieModalOpen(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function renderNavItem(
  item: { label: string; href: string },
  className: string,
  onNavigate?: () => void,
) {
  if (item.href.startsWith('/#') || item.href.startsWith('#')) {
    return (
      <a key={item.href} href={item.href} className={className} onClick={onNavigate}>
        {item.label}
      </a>
    )
  }

  return (
    <NavLink
      key={item.href}
      to={item.href}
      end={item.href === '/'}
      className={({ isActive }) => `${className}${isActive ? ' is-active' : ''}`}
      onClick={onNavigate}
    >
      {item.label}
    </NavLink>
  )
}
