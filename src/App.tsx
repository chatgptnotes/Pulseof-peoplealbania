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
import PoliticalPolling from './pages/PoliticalPolling'
import PoliticalChoice from './pages/PoliticalChoice'
import VoterDatabase from './pages/VoterDatabase'
import FieldWorkers from './pages/FieldWorkers'
import SocialMedia from './pages/SocialMedia'
import CompetitorAnalysis from './pages/CompetitorAnalysis'
import AIInsights from './pages/AIInsights'

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
                <Route path="/political-polling" element={<PoliticalPolling />} />
                <Route path="/political-choice" element={<PoliticalChoice />} />
                <Route path="/voter-database" element={<VoterDatabase />} />
                <Route path="/field-workers" element={<FieldWorkers />} />
                <Route path="/social-media" element={<SocialMedia />} />
                <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
                <Route path="/ai-insights" element={<AIInsights />} />
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