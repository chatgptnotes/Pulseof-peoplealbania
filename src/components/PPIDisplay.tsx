import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Info, Activity, BarChart3, Users, Building } from 'lucide-react';
import { ppiCalculator, PPIResult, PPIFactors } from '../services/ppiCalculator';

export default function PPIDisplay() {
  const [ppiData, setPpiData] = useState<PPIResult | null>(null);
  const [historicalData, setHistoricalData] = useState<PPIResult[]>([]);
  const [selectedView, setSelectedView] = useState<'current' | 'components' | 'factors'>('current');

  useEffect(() => {
    // Calculate current PPI with sample data for Albania
    const currentFactors: PPIFactors = {
      // Economic Indicators
      outputGap: -1.8,           // Slightly below potential
      unemploymentRate: 11.2,    // Albania's unemployment rate
      inflationRate: 2.4,        // Moderate inflation
      gdpGrowthRate: 3.2,       // Steady growth

      // Media & Public Sentiment
      mediaConfidence: 62,
      socialMediaSentiment: 58,
      pollApproval: 55,

      // Social Indicators
      corruptionIndex: 38,      // Albania's corruption perception
      safetyIndex: 72,
      healthcareAccess: 65,

      // Governance Indicators
      policyEffectiveness: 58,
      transparencyScore: 52
    };

    const result = ppiCalculator.calculate(currentFactors);
    setPpiData(result);

    // Get historical data for the last 6 months
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    const historical = ppiCalculator.getHistoricalPPI(startDate, endDate);
    setHistoricalData(historical);
  }, []);

  const getStatusColor = (category: string) => {
    switch (category) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-orange-600';
      case 'Critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (category: string) => {
    switch (category) {
      case 'Excellent':
      case 'Good':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'Fair':
        return <Info className="w-6 h-6 text-yellow-500" />;
      case 'Poor':
      case 'Critical':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      default:
        return <Info className="w-6 h-6 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'declining':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!ppiData) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            People Pulse Index (PPI)
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Matja gjithëpërfshirëse e besimit në qeveri
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Besueshmëria:</span>
          <span className="text-xs font-medium text-gray-700">{ppiData.confidence}%</span>
        </div>
      </div>

      {/* Main Score Display */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="text-5xl font-bold text-gray-900">
                {ppiData.index}
              </div>
              <div className="flex flex-col">
                {getTrendIcon(ppiData.trend)}
                <span className="text-xs text-gray-500 capitalize">{ppiData.trend}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              {getStatusIcon(ppiData.category)}
              <span className={`text-lg font-medium ${getStatusColor(ppiData.category)}`}>
                {ppiData.category}
              </span>
            </div>
          </div>

          {/* PPI Gauge */}
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={
                  ppiData.index >= 80 ? '#10b981' :
                  ppiData.index >= 65 ? '#3b82f6' :
                  ppiData.index >= 50 ? '#eab308' :
                  ppiData.index >= 35 ? '#f97316' : '#ef4444'
                }
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(ppiData.index / 100) * 251.33} 251.33`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{ppiData.index}</div>
                <div className="text-xs text-gray-500">nga 100</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setSelectedView('current')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'current'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Aktual
        </button>
        <button
          onClick={() => setSelectedView('components')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'components'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Komponentët
        </button>
        <button
          onClick={() => setSelectedView('factors')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedView === 'factors'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Faktorët
        </button>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'current' && (
        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              PPI është një indeks gjithëpërfshirës që mat besimin publik në qeveri duke kombinuar:
            </p>
            <ul className="space-y-1 ml-4">
              <li>• Treguesit ekonomikë (40%)</li>
              <li>• Sentimenti mediatik dhe publik (30%)</li>
              <li>• Treguesit socialë (20%)</li>
              <li>• Treguesit e qeverisjes (10%)</li>
            </ul>
          </div>
        </div>
      )}

      {selectedView === 'components' && (
        <div className="space-y-3">
          {/* Economic Component */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Ekonomik</div>
                <div className="text-xs text-gray-500">40% e peshës</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">
                {ppiData.components.economic}
              </div>
              <div className="text-xs text-gray-500">pikë</div>
            </div>
          </div>

          {/* Sentiment Component */}
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-purple-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Sentimenti</div>
                <div className="text-xs text-gray-500">30% e peshës</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-purple-600">
                {ppiData.components.sentiment}
              </div>
              <div className="text-xs text-gray-500">pikë</div>
            </div>
          </div>

          {/* Social Component */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Social</div>
                <div className="text-xs text-gray-500">20% e peshës</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                {ppiData.components.social}
              </div>
              <div className="text-xs text-gray-500">pikë</div>
            </div>
          </div>

          {/* Governance Component */}
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center">
              <Building className="w-5 h-5 text-orange-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Qeverisje</div>
                <div className="text-xs text-gray-500">10% e peshës</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-orange-600">
                {ppiData.components.governance}
              </div>
              <div className="text-xs text-gray-500">pikë</div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'factors' && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Hendeku i Prodhimit:</span>
              <span className="ml-2 font-medium">{ppiData.factors.outputGap}%</span>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Papunësia:</span>
              <span className="ml-2 font-medium">{ppiData.factors.unemploymentRate}%</span>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Inflacioni:</span>
              <span className="ml-2 font-medium">{ppiData.factors.inflationRate}%</span>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Rritja e PBB:</span>
              <span className="ml-2 font-medium">{ppiData.factors.gdpGrowthRate}%</span>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Besimi Mediatik:</span>
              <span className="ml-2 font-medium">{ppiData.factors.mediaConfidence}</span>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Aprovimi:</span>
              <span className="ml-2 font-medium">{ppiData.factors.pollApproval}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Historical Trend Mini Chart */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-2">Trendi 6-mujor</div>
        <div className="flex items-end space-x-1" style={{ height: '40px' }}>
          {historicalData.slice(-20).map((data, index) => (
            <div
              key={index}
              className="flex-1 bg-blue-400 hover:bg-blue-500 rounded-t transition-colors"
              style={{
                height: `${(data.index / 100) * 40}px`,
                opacity: 0.6 + (index / 20) * 0.4
              }}
              title={`${data.timestamp.toLocaleDateString()}: ${data.index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}