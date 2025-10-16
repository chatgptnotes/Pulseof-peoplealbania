import React from 'react';
import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import AngolaMap from '../components/AngolaMap';

export default function RegionalMap() {
  // Sample data for provinces with sentiment scores
  const provinceData = [
    { id: 'LUA', title: 'Luanda', value: 75, sentiment: 0.75 },
    { id: 'BEN', title: 'Bengo', value: 65, sentiment: 0.65 },
    { id: 'BGO', title: 'Benguela', value: 55, sentiment: 0.55 },
    { id: 'BIE', title: 'Bié', value: 70, sentiment: 0.70 },
    { id: 'CAB', title: 'Cabinda', value: 60, sentiment: 0.60 },
    { id: 'CCU', title: 'Cuando Cubango', value: 45, sentiment: 0.45 },
    { id: 'CNO', title: 'Cuanza Norte', value: 68, sentiment: 0.68 },
    { id: 'CSU', title: 'Cuanza Sul', value: 62, sentiment: 0.62 },
    { id: 'CNN', title: 'Cunene', value: 50, sentiment: 0.50 },
    { id: 'HUA', title: 'Huambo', value: 72, sentiment: 0.72 },
    { id: 'HUI', title: 'Huíla', value: 58, sentiment: 0.58 },
    { id: 'LNO', title: 'Lunda Norte', value: 40, sentiment: 0.40 },
    { id: 'LSU', title: 'Lunda Sul', value: 48, sentiment: 0.48 },
    { id: 'MAL', title: 'Malanje', value: 63, sentiment: 0.63 },
    { id: 'MOX', title: 'Moxico', value: 52, sentiment: 0.52 },
    { id: 'NAM', title: 'Namibe', value: 66, sentiment: 0.66 },
    { id: 'UIG', title: 'Uíge', value: 71, sentiment: 0.71 },
    { id: 'ZAI', title: 'Zaire', value: 56, sentiment: 0.56 }
  ];

  const topPerformingProvinces = provinceData
    .sort((a, b) => b.sentiment - a.sentiment)
    .slice(0, 5);

  const needAttentionProvinces = provinceData
    .sort((a, b) => a.sentiment - b.sentiment)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Regional Sentiment Map</h1>
        <p className="text-gray-600">
          Interactive geographical visualization of voter sentiment across Angolan provinces.
          Click on provinces to select them and view detailed sentiment information.
        </p>
      </div>

      {/* Interactive Map Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Regional Sentiment Map
          </h3>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
              <span>Positive (70%+)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
              <span>Neutral (50-70%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
              <span>Negative (30-50%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
              <span>Very Negative (&lt;30%)</span>
            </div>
          </div>
        </div>
        
        {/* Angola Map */}
        <AngolaMap data={provinceData} height={600} />
      </div>

      {/* Province Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performing Provinces */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            🏆 Top Performing Provinces
          </h3>
          <div className="space-y-3">
            {topPerformingProvinces.map((province, index) => (
              <div key={province.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">{province.title}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {Math.round(province.sentiment * 100)}%
                  </div>
                  <div className="text-xs text-gray-500">sentiment</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Provinces Needing Attention */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            ⚠️ Provinces Needing Attention
          </h3>
          <div className="space-y-3">
            {needAttentionProvinces.map((province, index) => (
              <div key={province.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">{province.title}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">
                    {Math.round(province.sentiment * 100)}%
                  </div>
                  <div className="text-xs text-gray-500">sentiment</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-1">Average Sentiment</h4>
          <div className="text-2xl font-bold text-blue-600">
            {Math.round((provinceData.reduce((sum, province)=> sum + state.sentiment, 0) / provinceData.length) * 100)}%
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-1">Positive Provinces</h4>
          <div className="text-2xl font-bold text-green-600">
            {provinceData.filter(province =>state.sentiment >= 0.7).length}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-1">Neutral Provinces</h4>
          <div className="text-2xl font-bold text-yellow-600">
            {provinceData.filter(province =>state.sentiment >= 0.5 && state.sentiment < 0.7).length}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-1">Critical Provinces</h4>
          <div className="text-2xl font-bold text-red-600">
            {provinceData.filter(province =>state.sentiment < 0.5).length}
          </div>
        </div>
      </div>

      {/* Map Features */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Map Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Interactive Features:</h4>
            <ul className="space-y-1">
              <li>• Click provinces to select/deselect</li>
              <li>• Hover for detailed information</li>
              <li>• Pan and zoom controls</li>
              <li>• Export map as image</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Color Coding:</h4>
            <ul className="space-y-1">
              <li>• <span className="inline-block w-3 h-3 bg-green-500 rounded mr-1"></span>Green: Positive sentiment (70%+)</li>
              <li>• <span className="inline-block w-3 h-3 bg-yellow-500 rounded mr-1"></span>Yellow: Neutral sentiment (50-70%)</li>
              <li>• <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-1"></span>Orange: Negative sentiment (30-50%)</li>
              <li>• <span className="inline-block w-3 h-3 bg-red-500 rounded mr-1"></span>Red: Critical sentiment (&lt;30%)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}