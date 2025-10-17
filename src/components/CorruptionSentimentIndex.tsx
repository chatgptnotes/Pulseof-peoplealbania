import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingDown, TrendingUp, Minus, Shield, Gavel, Building2, Activity } from 'lucide-react';
import { corruptionSentimentIndex, CorruptionSentiment, CorruptionCase } from '../services/corruptionSentimentIndex';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { Bar, Radar, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement);

export default function CorruptionSentimentIndexComponent() {
  const [sentiment, setSentiment] = useState<CorruptionSentiment | null>(null);
  const [highProfileCases, setHighProfileCases] = useState<CorruptionCase[]>([]);
  const [selectedView, setSelectedView] = useState<'overview' | 'institutions' | 'cases' | 'trends'>('overview');

  useEffect(() => {
    const data = corruptionSentimentIndex.getSentiment();
    setSentiment(data);

    const cases = corruptionSentimentIndex.getHighProfileCases();
    setHighProfileCases(cases);
  }, []);

  const getSeverityColor = (severity: number) => {
    if (severity >= 80) return 'text-red-600 bg-red-50';
    if (severity >= 60) return 'text-orange-600 bg-orange-50';
    if (severity >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const categoryData = sentiment ? {
    labels: ['Institucional', 'Sektorial', 'Politik', 'Gjyqësor'],
    datasets: [{
      label: 'Perceptimi i Korrupsionit',
      data: [
        sentiment.byCategory.institutional,
        sentiment.byCategory.sectoral,
        sentiment.byCategory.political,
        sentiment.byCategory.judicial
      ],
      backgroundColor: [
        'rgba(239, 68, 68, 0.5)',
        'rgba(245, 158, 11, 0.5)',
        'rgba(59, 130, 246, 0.5)',
        'rgba(139, 92, 246, 0.5)'
      ],
      borderColor: [
        'rgb(239, 68, 68)',
        'rgb(245, 158, 11)',
        'rgb(59, 130, 246)',
        'rgb(139, 92, 246)'
      ],
      borderWidth: 2
    }]
  } : null;

  const institutionTrustData = sentiment ? {
    labels: sentiment.byInstitution.map(i => i.institution),
    datasets: [
      {
        label: 'Niveli i Besimit',
        data: sentiment.byInstitution.map(i => i.trustLevel),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2
      },
      {
        label: 'Perceptimi i Korrupsionit',
        data: sentiment.byInstitution.map(i => i.corruptionPerception),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2
      }
    ]
  } : null;

  const trends = corruptionSentimentIndex.getTrends();

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'worsening': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Indeksi i Sentimentit të Korrupsionit
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Perceptimi publik i korrupsionit nëpër institucione dhe sektorë
            </p>
          </div>
          {sentiment && (
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full ${getSeverityColor(sentiment.overall)}`}>
                <span className="text-2xl font-bold mr-2">{sentiment.overall}</span>
                <span className="text-sm">/100</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Renditja: {sentiment.internationalRanking.rank}/{sentiment.internationalRanking.total}
              </div>
            </div>
          )}
        </div>

        {/* View Selector */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSelectedView('overview')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedView === 'overview'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Përmbledhje
          </button>
          <button
            onClick={() => setSelectedView('institutions')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedView === 'institutions'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Institucionet
          </button>
          <button
            onClick={() => setSelectedView('cases')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedView === 'cases'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Rastet
          </button>
          <button
            onClick={() => setSelectedView('trends')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedView === 'trends'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Trendet
          </button>
        </div>
      </div>

      {/* Overview View */}
      {selectedView === 'overview' && sentiment && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {/* Public Mood */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Gjendja Publike
              </h4>
              <div className={`text-center p-6 rounded-lg ${
                sentiment.publicMood === 'optimistic' ? 'bg-green-50' :
                sentiment.publicMood === 'pessimistic' ? 'bg-red-50' :
                'bg-yellow-50'
              }`}>
                <div className={`text-3xl font-bold ${
                  sentiment.publicMood === 'optimistic' ? 'text-green-600' :
                  sentiment.publicMood === 'pessimistic' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {sentiment.publicMood === 'optimistic' ? 'Optimiste' :
                   sentiment.publicMood === 'pessimistic' ? 'Pesimiste' :
                   'Neutrale'}
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">
                Sipas Kategorisë
              </h4>
              {categoryData && (
                <div className="h-48">
                  <Doughnut data={categoryData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }} />
                </div>
              )}
            </div>

            {/* Top Concerns */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">
                Shqetësimet Kryesore
              </h4>
              <div className="space-y-2">
                {sentiment.topConcerns.slice(0, 5).map((concern, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">{concern}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Institutions View */}
      {selectedView === 'institutions' && sentiment && (
        <>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              Besimi vs Korrupsioni në Institucione
            </h4>
            {institutionTrustData && (
              <div className="h-96">
                <Bar data={institutionTrustData} options={{
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

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              Detaje të Institucioneve
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {sentiment.byInstitution.map(inst => (
                <div key={inst.institution} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">{inst.institution}</span>
                    {getTrendIcon(inst.trend)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Besimi:</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${inst.trustLevel}%` }}
                          />
                        </div>
                        <span className="font-medium">{inst.trustLevel}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Korrupsioni:</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="h-2 rounded-full bg-red-500"
                            style={{ width: `${inst.corruptionPerception}%` }}
                          />
                        </div>
                        <span className="font-medium">{inst.corruptionPerception}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Raste të fundit:</span>
                      <span className="font-medium">{inst.recentCases}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Cases View */}
      {selectedView === 'cases' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
            <Gavel className="w-4 h-4 mr-2" />
            Rastet me Interes të Lartë Publik
          </h4>
          <div className="space-y-4">
            {highProfileCases.map(case_ => (
              <div key={case_.id} className="border-l-4 border-red-500 pl-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-gray-900">{case_.title}</h5>
                  <span className={`text-xs px-2 py-1 rounded ${
                    case_.status === 'convicted' ? 'bg-green-100 text-green-800' :
                    case_.status === 'prosecuted' ? 'bg-blue-100 text-blue-800' :
                    case_.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                    case_.status === 'reported' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {case_.status === 'convicted' ? 'I Dënuar' :
                     case_.status === 'prosecuted' ? 'Në Gjykatë' :
                     case_.status === 'investigating' ? 'Në Hetim' :
                     case_.status === 'reported' ? 'I Raportuar' :
                     'I Mbyllur'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{case_.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Building2 className="w-3 h-3 mr-1" />
                    {case_.institution}
                  </span>
                  {case_.amount && (
                    <span>
                      Shuma: {case_.currency} {case_.amount.toLocaleString()}
                    </span>
                  )}
                  <span>Interesi: {case_.publicInterest}%</span>
                  <span>Media: {case_.mediaCoverage}%</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {case_.source.map(src => (
                    <span key={src} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trends View */}
      {selectedView === 'trends' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trendet e Korrupsionit
          </h4>
          <div className="grid grid-cols-3 gap-6">
            {/* Improving */}
            <div className="bg-green-50 rounded-lg p-4">
              <h5 className="font-semibold text-green-900 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Përmirësim
              </h5>
              <div className="space-y-2">
                {trends.improving.map((item, index) => (
                  <div key={index} className="text-sm text-green-700">
                    • {item}
                  </div>
                ))}
                {trends.improving.length === 0 && (
                  <div className="text-sm text-green-600 italic">Asnjë sektor</div>
                )}
              </div>
            </div>

            {/* Stable */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h5 className="font-semibold text-yellow-900 mb-3 flex items-center">
                <Minus className="w-4 h-4 mr-2" />
                I Qëndrueshëm
              </h5>
              <div className="space-y-2">
                {trends.stable.map((item, index) => (
                  <div key={index} className="text-sm text-yellow-700">
                    • {item}
                  </div>
                ))}
                {trends.stable.length === 0 && (
                  <div className="text-sm text-yellow-600 italic">Asnjë sektor</div>
                )}
              </div>
            </div>

            {/* Worsening */}
            <div className="bg-red-50 rounded-lg p-4">
              <h5 className="font-semibold text-red-900 mb-3 flex items-center">
                <TrendingDown className="w-4 h-4 mr-2" />
                Përkeqësim
              </h5>
              <div className="space-y-2">
                {trends.worsening.map((item, index) => (
                  <div key={index} className="text-sm text-red-700">
                    • {item}
                  </div>
                ))}
                {trends.worsening.length === 0 && (
                  <div className="text-sm text-red-600 italic">Asnjë sektor</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}