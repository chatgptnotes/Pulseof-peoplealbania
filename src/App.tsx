import { Routes, Route } from 'react-router-dom'
import { RealTimeProvider } from './contexts/RealTimeContext'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import LandingLayout from './components/LandingLayout'
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
import LandingPage from './pages/LandingPage'
import PressMediaMonitoring from './pages/PressMediaMonitoring'
import TVBroadcastAnalysis from './pages/TVBroadcastAnalysis'
import SocialMediaChannels from './pages/SocialMediaChannels'
import InfluencerTracking from './pages/InfluencerTracking'
import ConversationBot from './pages/ConversationBot'
import EnhancedWardHeatmap from './components/EnhancedWardHeatmap'
import ManifestoMatch from './components/ManifestoMatch'
import FeedbackChatbot from './components/FeedbackChatbot'
import MyConstituency from './components/MyConstituencyApp'
import Subscription from './pages/Subscription'
import AgenticPlatform from './components/AgenticPlatform'
import { MobileContactBar } from './components/MobileResponsive'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RealTimeProvider>
          <ErrorBoundary>
            <Routes>
              {/* Landing Page with minimal layout */}
              <Route path="/" element={
                <LandingLayout>
                  <LandingPage />
                </LandingLayout>
              } />
              
              {/* Dashboard and other pages with full layout */}
              <Route path="/dashboard" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
              <Route path="/analytics" element={
                <Layout>
                  <Analytics />
                </Layout>
              } />
              <Route path="/reports" element={
                <Layout>
                  <Reports />
                </Layout>
              } />
              <Route path="/alerts" element={
                <Layout>
                  <Alerts />
                </Layout>
              } />
              <Route path="/data-kit" element={
                <Layout>
                  <DataCaptureKit />
                </Layout>
              } />
              <Route path="/submit-data" element={
                <Layout>
                  <DataSubmission />
                </Layout>
              } />
              <Route path="/data-tracking" element={
                <Layout>
                  <DataTracking />
                </Layout>
              } />
              <Route path="/political-polling" element={
                <Layout>
                  <PoliticalPolling />
                </Layout>
              } />
              <Route path="/political-choice" element={
                <Layout>
                  <PoliticalChoice />
                </Layout>
              } />
              <Route path="/voter-database" element={
                <Layout>
                  <VoterDatabase />
                </Layout>
              } />
              <Route path="/field-workers" element={
                <Layout>
                  <FieldWorkers />
                </Layout>
              } />
              <Route path="/social-media" element={
                <Layout>
                  <SocialMedia />
                </Layout>
              } />
              <Route path="/competitor-analysis" element={
                <Layout>
                  <CompetitorAnalysis />
                </Layout>
              } />
              <Route path="/ai-insights" element={
                <Layout>
                  <AIInsights />
                </Layout>
              } />
              <Route path="/settings" element={
                <Layout>
                  <Settings />
                </Layout>
              } />
              
              {/* New Feature Pages */}
              <Route path="/heatmap" element={
                <Layout>
                  <EnhancedWardHeatmap />
                </Layout>
              } />
              <Route path="/manifesto" element={
                <Layout>
                  <ManifestoMatch />
                </Layout>
              } />
              <Route path="/feedback" element={
                <Layout>
                  <FeedbackChatbot />
                </Layout>
              } />
              <Route path="/constituency" element={
                <Layout>
                  <MyConstituency />
                </Layout>
              } />
              <Route path="/subscription" element={
                <Layout>
                  <Subscription />
                </Layout>
              } />
              <Route path="/pulse" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
              <Route path="/agents" element={
                <Layout>
                  <AgenticPlatform />
                </Layout>
              } />
              
              {/* Data Collection Pages */}
              <Route path="/press-media-monitoring" element={
                <Layout>
                  <PressMediaMonitoring />
                </Layout>
              } />
              <Route path="/tv-broadcast-analysis" element={
                <Layout>
                  <TVBroadcastAnalysis />
                </Layout>
              } />
              <Route path="/social-media-channels" element={
                <Layout>
                  <SocialMediaChannels />
                </Layout>
              } />
              <Route path="/influencer-tracking" element={
                <Layout>
                  <InfluencerTracking />
                </Layout>
              } />
              <Route path="/conversation-bot" element={
                <Layout>
                  <ConversationBot />
                </Layout>
              } />
            </Routes>
            <MobileContactBar />
          </ErrorBoundary>
        </RealTimeProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App