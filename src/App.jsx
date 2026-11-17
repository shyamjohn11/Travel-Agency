import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './Layouts/Home/Home'
import Packages from './Layouts/Packages/Packages'
import About from './Layouts/About/About'
import Contact from './Layouts/Contact/Contact'
import Trips from './Layouts/Trips/Trips'
import SmoothScroll from './Shared-Components/SmoothScroll/SmoothScroll'
import DomesticDestination from './Layouts/DomesticDestination/DomesticDestination'
import InternationalDestination from './Layouts/InternationalDestination/InternationalDestination'
import PackageCategory from './Layouts/PackageCategory/PackageCategory'
import PackageDetail from './Layouts/PackageDetail/PackageDetail'
import Legal from './Layouts/Legal/Legal'
import LocalSEO from './Layouts/LocalSEO/LocalSEO'
import Preloader from './Shared-Components/Preloader/Preloader'
import ErrorBoundary from './Shared-Components/ErrorBoundary/ErrorBoundary'
import ScrollProgress from './Shared-Components/ScrollProgress/ScrollProgress'
import AnnouncementBar from './Shared-Components/AnnouncementBar/AnnouncementBar'
import FloatingActions from './Shared-Components/FloatingActions/FloatingActions'
import CookieConsent from './Shared-Components/CookieConsent/CookieConsent'
import LeadPopup from './Shared-Components/LeadPopup/LeadPopup'
import MarketingScripts from './Shared-Components/MarketingScripts/MarketingScripts'

const AdminApp = lazy(() => import('./Layouts/Admin/AdminApp'))

function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      <Preloader />
      {!isAdmin && <SmoothScroll />}
      {!isAdmin && <ScrollProgress />}
      <AnnouncementBar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:category" element={<PackageCategory />} />
          <Route path="/package/:slug" element={<PackageDetail />} />
          <Route path="/offers" element={<Navigate to="/packages" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/domestic-packages/:destination" element={<DomesticDestination />} />
          <Route path="/international-packages/:destination" element={<InternationalDestination />} />
          <Route path="/travel-agency-in/:city" element={<LocalSEO />} />
          <Route path="/privacy-policy" element={<Legal doc="privacy" />} />
          <Route path="/terms-and-conditions" element={<Legal doc="terms" />} />
          <Route path="/cookie-policy" element={<Legal doc="cookies" />} />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div style={{ padding: 40 }}>Loading admin...</div>}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
      <FloatingActions />
      <CookieConsent />
      <LeadPopup />
      <MarketingScripts />
    </>
  )
}

export default App
