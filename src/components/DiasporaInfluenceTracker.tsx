import React, { useState, useEffect } from 'react';
import { Globe, Users, TrendingUp, ArrowUpRight, MessageCircle, Share2, Heart, MapPin } from 'lucide-react';
import { diasporaTracker, DiasporaPost, DiasporaMetrics, DiasporaLocation } from '../services/diasporaTracker';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

export default function DiasporaInfluenceTracker() {
  const [posts, setPosts] = useState<DiasporaPost[]>([]);
  const [metrics, setMetrics] = useState<DiasporaMetrics | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<DiasporaLocation | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    // Generate sample data for demonstration
    const samplePosts = diasporaTracker.generateSampleData();
    setPosts(samplePosts);

    const calculatedMetrics = diasporaTracker.getMetrics(samplePosts);
    setMetrics(calculatedMetrics);
  }, [timeRange]);

  const locations = diasporaTracker.getLocations();

  const locationChartData = {
    labels: locations.map(l => l.country),
    datasets: [{
      data: locations.map(l => l.population),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#FF6384'
      ],
      borderWidth: 1
    }]
  };

  const sentimentChartData = metrics ? {
    labels: ['Pozitive', 'Negative', 'Neutrale'],
    datasets: [{
      label: 'Sentiment Distribution',
      data: [
        metrics.sentimentBreakdown.positive,
        metrics.sentimentBreakdown.negative,
        metrics.sentimentBreakdown.neutral
      ],
      backgroundColor: ['#10B981', '#EF4444', '#6B7280'],
      borderWidth: 1
    }]
  } : null;

  const narrativeFlowData = metrics ? {
    labels: metrics.crossBorderFlows.map(f => `${f.origin} → ${f.destination}`),
    datasets: [{
      label: 'Narrative Flow Strength',
      data: metrics.crossBorderFlows.map(f => f.strength),
      backgroundColor: '#3B82F6',
      borderColor: '#2563EB',
      borderWidth: 1
    }]
  } : null;

  const getLocationColor = (influence: string) => {
    switch(influence) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Diaspora Influence Tracker
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Monitorimi i ndikimit të diasporës shqiptare në diskursin politik
            </p>
          </div>
          <div className="flex space-x-2">
            {(['7d', '30d', '90d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range === '7d' ? '7 Ditë' : range === '30d' ? '30 Ditë' : '90 Ditë'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        {metrics && (
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-xs text-blue-600">Popullsia Totale</div>
              <div className="text-2xl font-bold text-blue-900">
                {(metrics.totalPopulation / 1000000).toFixed(1)}M
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-xs text-green-600">Përdorues Aktivë</div>
              <div className="text-2xl font-bold text-green-900">
                {metrics.activeUsers}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-xs text-purple-600">Shkalla e Angazhimit</div>
              <div className="text-2xl font-bold text-purple-900">
                {metrics.engagementRate.toFixed(1)}%
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="text-xs text-orange-600">Indeksi i Ndikimit</div>
              <div className="text-2xl font-bold text-orange-900">
                {metrics.influenceIndex.toFixed(0)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Location Distribution & Sentiment */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Shpërndarja Gjeografike
          </h4>
          <div className="h-64">
            <Doughnut data={locationChartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right'
                }
              }
            }} />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Analiza e Sentimentit
          </h4>
          {sentimentChartData && (
            <div className="h-64">
              <Bar data={sentimentChartData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              }} />
            </div>
          )}
        </div>
      </div>

      {/* Diaspora Locations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          Komunitetet e Diasporës
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {locations.map(location => (
            <button
              key={location.countryCode}
              onClick={() => setSelectedLocation(location)}
              className={`p-4 rounded-lg border transition-all text-left ${
                selectedLocation?.countryCode === location.countryCode
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold">{location.country}</span>
                <span className={`text-xs px-2 py-1 rounded ${getLocationColor(location.influence)}`}>
                  {location.influence === 'high' ? 'Ndikim i Lartë' :
                   location.influence === 'medium' ? 'Ndikim Mesatar' : 'Ndikim i Ulët'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <div>Popullsia: {location.population.toLocaleString()}</div>
                <div>Qytetet: {location.mainCities.slice(0, 2).join(', ')}</div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {location.socialPlatforms.map(platform => (
                  <span key={platform} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {platform}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Narratives */}
      {metrics && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Narrativat Kryesore
          </h4>
          <div className="space-y-3">
            {metrics.topNarratives.map((narrative, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900">{narrative}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cross-Border Narrative Flows */}
      {metrics && metrics.crossBorderFlows.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
            <Share2 className="w-4 h-4 mr-2" />
            Flukset Narrative Ndërkufitare
          </h4>
          {narrativeFlowData && (
            <div className="h-64">
              <Bar data={narrativeFlowData} options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                  x: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              }} />
            </div>
          )}
        </div>
      )}

      {/* Recent Posts Sample */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
          <MessageCircle className="w-4 h-4 mr-2" />
          Postimet e Fundit nga Diaspora
        </h4>
        <div className="space-y-3">
          {posts.slice(0, 5).map(post => (
            <div key={post.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {post.location.country}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{post.platform}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    post.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                    post.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {post.sentiment === 'positive' ? 'Pozitiv' :
                     post.sentiment === 'negative' ? 'Negativ' : 'Neutral'}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    {post.engagement.likes}
                  </span>
                  <span className="flex items-center">
                    <Share2 className="w-3 h-3 mr-1" />
                    {post.engagement.shares}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    {post.engagement.comments}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{post.content}</p>
              <div className="flex items-center mt-2 space-x-2">
                {post.topics.map(topic => (
                  <span key={topic} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}