import { Routes, Route } from 'react-router-dom'
import { RealTimeProvider } from './contexts/RealTimeContext'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Reports from './pages/Reports'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import DataCaptureKit from './pages/DataCaptureKit'
import DataSubmission from './pages/DataSubmission'
import DataTracking from './pages/DataTracking'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RealTimeProvider>
          <Layout>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/data-kit" element={<DataCaptureKit />} />
                <Route path="/submit-data" element={<DataSubmission />} />
                <Route path="/data-tracking" element={<DataTracking />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </ErrorBoundary>
          </Layout>
        </RealTimeProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App