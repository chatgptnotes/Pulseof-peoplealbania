import SentimentByIssue from '../components/SentimentByIssue'
import SentimentTrends from '../components/SentimentTrends'
import SentimentDistribution from '../components/SentimentDistribution'
import IssueImportance from '../components/IssueImportance'
import CompetitorComparison from '../components/CompetitorComparison'
import SentimentHeatmap from '../components/SentimentHeatmap'
import InfluencerTracking from '../components/InfluencerTracking'
import AlertsPanel from '../components/AlertsPanel'
import IndiaMap from '../components/IndiaMap'
import { TrendingUp, Users, AlertTriangle, Target, Calendar } from 'lucide-react'

export default function Dashboard() {
  const kpis = [
    { label: 'Overall Sentiment', value: '67%', change: '+5%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Active Conversations', value: '12.5K', change: '+15%', icon: Users, color: 'text-blue-600' },
    { label: 'Critical Alerts', value: '3', change: '-2', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Top Issue', value: 'Jobs', change: '25%', icon: Target, color: 'text-purple-600' },
    { label: 'Last Updated', value: '2 min', change: 'ago', icon: Calendar, color: 'text-gray-600' }
  ]

  const indiaMapData = [
    { id: 'IN-UP', title: 'Uttar Pradesh', value: 68, sentiment: 0.68 },
    { id: 'IN-MH', title: 'Maharashtra', value: 72, sentiment: 0.72 },
    { id: 'IN-BR', title: 'Bihar', value: 45, sentiment: 0.45 },
    { id: 'IN-WB', title: 'West Bengal', value: 61, sentiment: 0.61 },
    { id: 'IN-MP', title: 'Madhya Pradesh', value: 58, sentiment: 0.58 },
    { id: 'IN-TN', title: 'Tamil Nadu', value: 74, sentiment: 0.74 },
    { id: 'IN-RJ', title: 'Rajasthan', value: 52, sentiment: 0.52 },
    { id: 'IN-KA', title: 'Karnataka', value: 69, sentiment: 0.69 },
    { id: 'IN-GJ', title: 'Gujarat', value: 71, sentiment: 0.71 },
    { id: 'IN-AP', title: 'Andhra Pradesh', value: 63, sentiment: 0.63 },
    { id: 'IN-OR', title: 'Odisha', value: 56, sentiment: 0.56 },
    { id: 'IN-TG', title: 'Telangana', value: 67, sentiment: 0.67 },
    { id: 'IN-KL', title: 'Kerala', value: 78, sentiment: 0.78 },
    { id: 'IN-JH', title: 'Jharkhand', value: 49, sentiment: 0.49 },
    { id: 'IN-AS', title: 'Assam', value: 54, sentiment: 0.54 },
    { id: 'IN-PB', title: 'Punjab', value: 65, sentiment: 0.65 },
    { id: 'IN-CT', title: 'Chhattisgarh', value: 51, sentiment: 0.51 },
    { id: 'IN-HR', title: 'Haryana', value: 66, sentiment: 0.66 },
    { id: 'IN-DL', title: 'Delhi', value: 73, sentiment: 0.73 },
    { id: 'IN-HP', title: 'Himachal Pradesh', value: 62, sentiment: 0.62 }
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="xl:col-span-2">
          <IndiaMap data={indiaMapData} height={400} />
        </div>
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