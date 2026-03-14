import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Facebook, Instagram, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { navItems, mapsLink, createWhatsappLink, privacyHighlights } from '../site-data'

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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen || isPolicyModalOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, isPolicyModalOpen])

  function handleOpenPolicyModal() {
    setIsMobileMenuOpen(false)
    onOpenPolicyModal()
  }

  function handleNavClick() {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="utility-bar">
          <div className="container utility-wrap">
            <a className="utility-link" href="tel:+558530373036">
              <Phone size={16} />
              <span>(85) 3037-3036</span>
            </a>
            <a
              className="utility-link"
              href={createWhatsappLink()}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} />
              <span>Atendimento via WhatsApp</span>
            </a>
            <div className="utility-social">
              <a
                href="https://facebook.com/ViaShoppingCar/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/viashoppingcar/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="container nav-wrap">
          <a className="brand" href="/" onClick={handleNavClick}>
            <img src="/assets/logo-header.png" alt="Via Shopping Car" />
          </a>

          <nav className="main-nav" aria-label="Navegação principal">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              className="btn btn-primary nav-cta"
              href={createWhatsappLink()}
              target="_blank"
              rel="noreferrer"
            >
              Fale agora
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
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={handleNavClick}>
                    {item.label}
                  </a>
                ))}
              </nav>
              <a
                className="btn btn-primary full-width"
                href={createWhatsappLink()}
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

      {children}

      <footer className="site-footer" id="contato">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo-footer.png" alt="Via Shopping Car" />
            <p>
              Av. Washington Soares, 2100 - Edson Queiroz
              <br />
              Fortaleza - CE, 60810-350
            </p>
          </div>

          <div className="footer-col">
            <h3>Contato</h3>
            <a href="tel:+558530373036">
              <Phone size={16} />
              (85) 3037-3036
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
            {navItems.slice(1).map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <button type="button" className="footer-link-button" onClick={handleOpenPolicyModal}>
              Política de privacidade
            </button>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Via Shopping Car. Todos os direitos reservados.</p>
          <p>Consentimento de cookies e política de privacidade disponíveis neste site.</p>
        </div>
      </footer>

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
            <button type="button" className="btn btn-primary" onClick={onAcceptCookies}>
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
                Ao preencher formulários, você concorda com o uso dos dados para atendimento e pode revogar
                esse consentimento a qualquer momento por solicitação ao estabelecimento.
              </p>
            </div>

            <div className="policy-modal-footer">
              {!hasCookieConsent && (
                <button type="button" className="btn btn-primary" onClick={onAcceptCookies}>
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
    </div>
  )
}
