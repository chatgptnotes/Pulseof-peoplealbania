import React, { useState } from 'react';
import { Globe, Building, AlertTriangle, Activity, TrendingUp, Users } from 'lucide-react';
import DiasporaInfluenceTracker from '../components/DiasporaInfluenceTracker';
import AlbanianPoliticalLandscape from '../components/AlbanianPoliticalLandscape';
import CorruptionSentimentIndexComponent from '../components/CorruptionSentimentIndex';
import PPIDisplay from '../components/PPIDisplay';
import AlbaniaMap from '../components/AlbaniaMap';

export default function AlbanianFeatures() {
  const [activeTab, setActiveTab] = useState<'ppi' | 'diaspora' | 'political' | 'corruption'>('ppi');

  const albaniaMapData = [
    { id: 'TIR', title: 'Tirana', value: 80, sentiment: 0.80 },
    { id: 'DUR', title: 'Durrës', value: 78, sentiment: 0.78 },
    { id: 'KOR', title: 'Korçë', value: 76, sentiment: 0.76 },
    { id: 'ELB', title: 'Elbasan', value: 75, sentiment: 0.75 },
    { id: 'VLO', title: 'Vlorë', value: 74, sentiment: 0.74 },
    { id: 'LEZ', title: 'Lezhë', value: 74, sentiment: 0.74 },
    { id: 'BER', title: 'Berat', value: 73, sentiment: 0.73 },
    { id: 'SHK', title: 'Shkodër', value: 72, sentiment: 0.72 },
    { id: 'FIE', title: 'Fier', value: 71, sentiment: 0.71 },
    { id: 'KUK', title: 'Kukës', value: 70, sentiment: 0.70 },
    { id: 'GJI', title: 'Gjirokastër', value: 69, sentiment: 0.69 },
    { id: 'DIB', title: 'Dibër', value: 67, sentiment: 0.67 }
  ];

  const tabs = [
    {
      id: 'ppi',
      label: 'People Pulse Index',
      icon: Activity,
      description: 'Indeksi gjithëpërfshirës i besimit në qeveri'
    },
    {
      id: 'diaspora',
      label: 'Diaspora Influence',
      icon: Globe,
      description: 'Monitorimi i ndikimit të diasporës'
    },
    {
      id: 'political',
      label: 'Political Landscape',
      icon: Building,
      description: 'Peizazhi politik shqiptar'
    },
    {
      id: 'corruption',
      label: 'Corruption Sentiment',
      icon: AlertTriangle,
      description: 'Perceptimi i korrupsionit'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Zëri i Vërtetë i Shqipërisë - Analitika e Avancuar
        </h1>
        <p className="text-gray-600">
          Platforma gjithëpërfshirëse për analizën politike dhe sociale të Shqipërisë
        </p>
      </div>

      {/* Albania Map Overview */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <AlbaniaMap data={albaniaMapData} height={400} />
        </div>
        <div>
          <PPIDisplay />
        </div>
      </div>

      {/* Feature Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className={`mr-2 h-5 w-5 ${
                  activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                }`} />
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className="text-xs text-gray-400 font-normal">{tab.description}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'ppi' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  People Pulse Index (PPI)
                </h3>
                <p className="text-sm text-blue-800">
                  PPI është një kornizë matematikore që kuantifikon "frymën kafshërore" të Keynes - forcat kolektive të besimit dhe
                  emocionale që drejtojnë vendimet ekonomike përtej llogaritjes racionale. Modeli integron sentimentin social,
                  performancën e qeverisjes dhe bazat ekonomike në një tregues të vetëm besimi.
                </p>
              </div>
              <PPIDisplay />
            </div>
          )}

          {activeTab === 'diaspora' && <DiasporaInfluenceTracker />}
          {activeTab === 'political' && <AlbanianPoliticalLandscape />}
          {activeTab === 'corruption' && <CorruptionSentimentIndexComponent />}
        </div>
      </div>

      {/* EU Integration Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Progresi i Integrimit në BE
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-xs text-blue-600 font-medium">Kapitujt e Hapur</div>
            <div className="text-2xl font-bold text-blue-900">0/35</div>
            <div className="text-xs text-blue-600">Duke negociuar</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-xs text-green-600 font-medium">Reforma në Drejtësi</div>
            <div className="text-2xl font-bold text-green-900">65%</div>
            <div className="text-xs text-green-600">E përfunduar</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-xs text-purple-600 font-medium">Vetting i Gjyqtarëve</div>
            <div className="text-2xl font-bold text-purple-900">78%</div>
            <div className="text-xs text-purple-600">I përfunduar</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-xs text-orange-600 font-medium">Mbështetja Publike</div>
            <div className="text-2xl font-bold text-orange-900">91%</div>
            <div className="text-xs text-orange-600">Pro BE</div>
          </div>
        </div>
      </div>

      {/* Youth Migration Risk Index */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Indeksi i Riskut të Migrimit të të Rinjve
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { region: 'Tirana', risk: 45, trend: 'stable' },
            { region: 'Durrës', risk: 52, trend: 'increasing' },
            { region: 'Vlorë', risk: 58, trend: 'increasing' },
            { region: 'Shkodër', risk: 65, trend: 'high' },
            { region: 'Korçë', risk: 61, trend: 'high' },
            { region: 'Gjirokastër', risk: 70, trend: 'critical' }
          ].map(item => (
            <div key={item.region} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{item.region}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.trend === 'critical' ? 'bg-red-100 text-red-800' :
                  item.trend === 'high' ? 'bg-orange-100 text-orange-800' :
                  item.trend === 'increasing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.trend === 'critical' ? 'Kritik' :
                   item.trend === 'high' ? 'I Lartë' :
                   item.trend === 'increasing' ? 'Në Rritje' : 'Stabil'}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.risk >= 70 ? 'bg-red-500' :
                      item.risk >= 60 ? 'bg-orange-500' :
                      item.risk >= 50 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${item.risk}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{item.risk}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}