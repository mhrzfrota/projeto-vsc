import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { SiteFrame } from './components/site-frame'
import { AboutPage } from './pages/about-page'
import { ContactPage } from './pages/contact-page'
import { HomePage } from './pages/home-page'
import { InventoryPage } from './pages/inventory-page'
import { ServicesPage } from './pages/services-page'
import { StoreDetailPage } from './pages/store-detail-page'
import { StoresPage } from './pages/stores-page'
import { COOKIE_CONSENT_KEY, readCookieConsent } from './site-data'
import './App.css'

function App() {
  const [hasCookieConsent, setHasCookieConsent] = useState<boolean>(readCookieConsent)
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false)

  function handleAcceptCookies() {
    setHasCookieConsent(true)
    setIsPolicyModalOpen(false)
    window.localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
  }

  return (
    <SiteFrame
      hasCookieConsent={hasCookieConsent}
      isPolicyModalOpen={isPolicyModalOpen}
      onAcceptCookies={handleAcceptCookies}
      onClosePolicyModal={() => setIsPolicyModalOpen(false)}
      onOpenPolicyModal={() => setIsPolicyModalOpen(true)}
    >
      <Routes>
        <Route
          path="/"
          element={<HomePage onOpenPolicyModal={() => setIsPolicyModalOpen(true)} />}
        />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/servicos" element={<ServicesPage />} />
        <Route path="/lojas" element={<StoresPage />} />
        <Route path="/lojas/:slug" element={<StoreDetailPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/estoque" element={<InventoryPage />} />
      </Routes>
    </SiteFrame>
  )
}

export default App
