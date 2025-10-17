import React, { useState } from 'react';
import { MapPin, Users, TrendingUp, AlertCircle } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  x: number;
  y: number;
  sentiment: number;
  population?: number;
  mainParty?: string;
}

const serbianRegions: Region[] = [
  // Belgrade Region
  { id: 'BELGRADE', name: 'Beograd', x: 50, y: 45, sentiment: 0.58, population: 1690000, mainParty: 'SSP' },

  // Vojvodina
  { id: 'NS', name: 'Novi Sad', x: 48, y: 30, sentiment: 0.62, population: 380000, mainParty: 'SNS' },
  { id: 'SUBOTICA', name: 'Subotica', x: 47, y: 18, sentiment: 0.55, population: 140000, mainParty: 'SVM' },
  { id: 'ZRENJANIN', name: 'Zrenjanin', x: 52, y: 32, sentiment: 0.48, population: 120000, mainParty: 'SNS' },
  { id: 'PANCEVO', name: 'Pančevo', x: 53, y: 42, sentiment: 0.51, population: 90000, mainParty: 'SNS' },
  { id: 'SOMBOR', name: 'Sombor', x: 43, y: 25, sentiment: 0.46, population: 85000, mainParty: 'SNS' },

  // Central Serbia
  { id: 'KRAGUJEVAC', name: 'Kragujevac', x: 52, y: 55, sentiment: 0.52, population: 180000, mainParty: 'SNS' },
  { id: 'CACAK', name: 'Čačak', x: 48, y: 58, sentiment: 0.49, population: 115000, mainParty: 'SNS' },
  { id: 'KRALJEVO', name: 'Kraljevo', x: 51, y: 62, sentiment: 0.45, population: 125000, mainParty: 'SNS' },
  { id: 'SMEDEREVO', name: 'Smederevo', x: 54, y: 48, sentiment: 0.47, population: 108000, mainParty: 'SNS' },
  { id: 'VALJEVO', name: 'Valjevo', x: 46, y: 50, sentiment: 0.50, population: 90000, mainParty: 'SNS' },
  { id: 'UZICE', name: 'Užice', x: 45, y: 62, sentiment: 0.48, population: 78000, mainParty: 'SNS' },

  // Southern Serbia
  { id: 'NIS', name: 'Niš', x: 58, y: 68, sentiment: 0.54, population: 260000, mainParty: 'SNS' },
  { id: 'LESKOVAC', name: 'Leskovac', x: 57, y: 75, sentiment: 0.43, population: 140000, mainParty: 'SNS' },
  { id: 'VRANJE', name: 'Vranje', x: 58, y: 80, sentiment: 0.41, population: 83000, mainParty: 'SNS' },
  { id: 'PIROT', name: 'Pirot', x: 62, y: 70, sentiment: 0.44, population: 57000, mainParty: 'SNS' },
  { id: 'ZAJECAR', name: 'Zaječar', x: 60, y: 58, sentiment: 0.46, population: 59000, mainParty: 'SNS' },
  { id: 'BOR', name: 'Bor', x: 62, y: 52, sentiment: 0.42, population: 48000, mainParty: 'SNS' },

  // Western Serbia
  { id: 'SABAC', name: 'Šabac', x: 45, y: 43, sentiment: 0.51, population: 115000, mainParty: 'SNS' },
  { id: 'LOZNICA', name: 'Loznica', x: 43, y: 48, sentiment: 0.47, population: 79000, mainParty: 'SNS' }
];

export default function SerbiaMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.6) return '#3b82f6'; // Blue - Pro-opposition
    if (sentiment > 0.5) return '#10b981'; // Green - Moderate opposition
    if (sentiment > 0.4) return '#eab308'; // Yellow - Balanced
    return '#f97316'; // Orange - Pro-government
  };

  const getPartyColor = (party?: string) => {
    switch(party) {
      case 'SNS': return '#2563eb';
      case 'SPS': return '#dc2626';
      case 'SSP': return '#16a34a';
      case 'SVM': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Mapa Srbije - Politički Sentiment
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Regionalni pregled političke podrške
        </p>
      </div>

      <div className="relative">
        {/* SVG Map */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-96 border border-gray-200 rounded-lg bg-gradient-to-b from-blue-50 to-green-50"
        >
          {/* Serbia Outline (simplified) */}
          <path
            d="M 40 15 L 45 12 L 52 13 L 58 15 L 62 18 L 65 25 L 64 35 L 66 45 L 65 55 L 63 65 L 60 75 L 58 82 L 55 85 L 50 87 L 45 85 L 42 80 L 40 70 L 38 60 L 37 50 L 38 40 L 40 30 L 40 20 Z"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1"
            className="opacity-50"
          />

          {/* Vojvodina Border */}
          <line x1="38" y1="38" x2="65" y2="38" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2,2" />

          {/* Central/Southern Serbia Border */}
          <line x1="38" y1="60" x2="65" y2="60" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2,2" />

          {/* Region Dots */}
          {serbianRegions.map((region) => (
            <g key={region.id}>
              <circle
                cx={region.x}
                cy={region.y}
                r="3"
                fill={getSentimentColor(region.sentiment)}
                stroke="white"
                strokeWidth="1.5"
                className="cursor-pointer transition-all hover:r-4"
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => setSelectedRegion(region)}
              />
              {hoveredRegion === region.id && (
                <text
                  x={region.x}
                  y={region.y - 5}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700"
                >
                  {region.name}
                </text>
              )}
            </g>
          ))}

          {/* Legend */}
          <g transform="translate(5, 90)">
            <text className="text-xs fill-gray-600" x="0" y="0">Legenda:</text>
            <circle cx="50" cy="0" r="2" fill="#3b82f6" />
            <text className="text-xs fill-gray-500" x="55" y="2">Opozicija</text>
            <circle cx="50" cy="10" r="2" fill="#f97316" />
            <text className="text-xs fill-gray-500" x="55" y="12">Vlast</text>
          </g>
        </svg>

        {/* Selected Region Details */}
        {selectedRegion && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 text-lg">
                {selectedRegion.name}
              </h4>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Stanovništvo</div>
                <div className="text-sm font-medium text-gray-900 flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {selectedRegion.population?.toLocaleString('sr-RS')}
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Vodeća Stranka</div>
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: getPartyColor(selectedRegion.mainParty) }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedRegion.mainParty}
                  </span>
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Sentiment Index</div>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${selectedRegion.sentiment * 100}%`,
                        backgroundColor: getSentimentColor(selectedRegion.sentiment)
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {(selectedRegion.sentiment * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 mr-1 mt-0.5 text-gray-400" />
                <span>
                  {selectedRegion.sentiment > 0.5
                    ? 'Region pokazuje sklonost ka opozicionim strankama'
                    : 'Region pokazuje podršku vladajućoj koaliciji'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Regional Summary */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-xs text-blue-600 font-medium mb-1">Beograd</div>
            <div className="text-2xl font-bold text-blue-700">58%</div>
            <div className="text-xs text-blue-600">Opoziciona podrška</div>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-xs text-green-600 font-medium mb-1">Vojvodina</div>
            <div className="text-2xl font-bold text-green-700">52%</div>
            <div className="text-xs text-green-600">Mešovita podrška</div>
          </div>

          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-xs text-orange-600 font-medium mb-1">Centralna/Južna</div>
            <div className="text-2xl font-bold text-orange-700">47%</div>
            <div className="text-xs text-orange-600">Vladajuća podrška</div>
          </div>
        </div>
      </div>
    </div>
  );
}