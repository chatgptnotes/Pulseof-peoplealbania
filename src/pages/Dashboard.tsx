import SentimentByIssue from '../components/SentimentByIssue'
import SentimentTrends from '../components/SentimentTrends'
import SentimentDistribution from '../components/SentimentDistribution'
import IssueImportance from '../components/IssueImportance'
import CompetitorComparison from '../components/CompetitorComparison'
import SentimentHeatmap from '../components/SentimentHeatmap'
import InfluencerTracking from '../components/InfluencerTracking'
import AlertsPanel from '../components/AlertsPanel'
import { TrendingUp, Users, AlertTriangle, Target, Calendar } from 'lucide-react'

export default function Dashboard() {
  const kpis = [
    { label: 'Overall Sentiment', value: '67%', change: '+5%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Active Conversations', value: '12.5K', change: '+15%', icon: Users, color: 'text-blue-600' },
    { label: 'Critical Alerts', value: '3', change: '-2', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Top Issue', value: 'Jobs', change: '25%', icon: Target, color: 'text-purple-600' },
    { label: 'Last Updated', value: '2 min', change: 'ago', icon: Calendar, color: 'text-gray-600' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Voter Sentiment Dashboard</h1>
          <p className="text-gray-600">Real-time political intelligence and sentiment analysis</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md">
            Export Report
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md">
            Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className={`text-sm ${kpi.color}`}>{kpi.change}</p>
              </div>
              <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <SentimentByIssue />
        <SentimentTrends />
        <SentimentDistribution />
        <IssueImportance />
        <CompetitorComparison />
        <SentimentHeatmap />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfluencerTracking />
        <AlertsPanel />
      </div>
    </div>
  )
}