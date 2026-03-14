import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { SiteFrame } from './components/site-frame'
import { HomePage } from './pages/home-page'
import { InventoryPage } from './pages/inventory-page'
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
        <Route path="/estoque" element={<InventoryPage />} />
      </Routes>
    </SiteFrame>
  )
}

export default App
