import { useState } from 'react';

interface AlbaniaMapProps {
  data?: Array<{
    id: string;
    title: string;
    value: number;
    sentiment?: number;
  }>;
  height?: number;
}

// Albanian counties (qarku) with their districts
const counties = [
  // Shkodër County (Blue - North)
  { id: 'SHK', name: 'Shkodër', x: 25, y: 15, sentiment: 0.72, color: '#2563eb' },
  { id: 'KOP', name: 'Koplik', x: 15, y: 12, sentiment: 0.68, color: '#2563eb' },
  { id: 'PUK', name: 'Pukë', x: 35, y: 20, sentiment: 0.65, color: '#60a5fa' },

  // Kukës County (Orange - Northeast)
  { id: 'KUK', name: 'Kukës', x: 50, y: 15, sentiment: 0.70, color: '#ea580c' },
  { id: 'BJC', name: 'Bajram Curri', x: 45, y: 10, sentiment: 0.66, color: '#ea580c' },
  { id: 'KRM', name: 'Krumë', x: 55, y: 18, sentiment: 0.63, color: '#fb923c' },

  // Lezhë County (Yellow - Northwest)
  { id: 'LEZ', name: 'Lezhë', x: 22, y: 28, sentiment: 0.74, color: '#eab308' },
  { id: 'RES', name: 'Rreshen', x: 32, y: 30, sentiment: 0.69, color: '#fbbf24' },
  { id: 'LAC', name: 'Laç', x: 25, y: 33, sentiment: 0.71, color: '#fde047' },

  // Dibër County (Pink - East Central)
  { id: 'DIB', name: 'Dibër', x: 50, y: 35, sentiment: 0.67, color: '#ec4899' },
  { id: 'PSK', name: 'Peshkopi', x: 55, y: 32, sentiment: 0.64, color: '#f472b6' },
  { id: 'BUL', name: 'Bulqizë', x: 48, y: 40, sentiment: 0.61, color: '#f9a8d4' },
  { id: 'BUR', name: 'Burrel', x: 42, y: 37, sentiment: 0.66, color: '#ec4899' },

  // Durrës County (Green - West Central)
  { id: 'DUR', name: 'Durrës', x: 15, y: 42, sentiment: 0.78, color: '#16a34a' },
  { id: 'KRU', name: 'Krujë', x: 28, y: 38, sentiment: 0.73, color: '#22c55e' },

  // Tirana County (Dark Blue - Central)
  { id: 'TIR', name: 'Tirana', x: 30, y: 45, sentiment: 0.80, color: '#1e3a8a' },
  { id: 'KAV', name: 'Kavajë', x: 18, y: 48, sentiment: 0.72, color: '#2563eb' },

  // Elbasan County (Light Orange - Central)
  { id: 'ELB', name: 'Elbasan', x: 35, y: 50, sentiment: 0.75, color: '#fb923c' },
  { id: 'PEQ', name: 'Peqin', x: 28, y: 52, sentiment: 0.70, color: '#fdba74' },
  { id: 'LIB', name: 'Librazhd', x: 50, y: 48, sentiment: 0.68, color: '#fed7aa' },
  { id: 'GRA', name: 'Gramsh', x: 45, y: 55, sentiment: 0.65, color: '#fb923c' },

  // Fier County (Purple - Southwest)
  { id: 'FIE', name: 'Fier', x: 20, y: 62, sentiment: 0.71, color: '#9333ea' },
  { id: 'LUS', name: 'Lushnja', x: 25, y: 58, sentiment: 0.69, color: '#a855f7' },
  { id: 'BAL', name: 'Ballsh', x: 28, y: 65, sentiment: 0.64, color: '#c084fc' },

  // Berat County (Green - South Central)
  { id: 'BER', name: 'Berat', x: 38, y: 65, sentiment: 0.73, color: '#16a34a' },
  { id: 'KUC', name: 'Kuçovë', x: 35, y: 60, sentiment: 0.68, color: '#22c55e' },
  { id: 'COR', name: 'Çorovodë', x: 48, y: 68, sentiment: 0.66, color: '#4ade80' },

  // Korçë County (Red - Southeast)
  { id: 'KOR', name: 'Korçë', x: 58, y: 65, sentiment: 0.76, color: '#dc2626' },
  { id: 'POG', name: 'Pogradec', x: 65, y: 58, sentiment: 0.72, color: '#ef4444' },
  { id: 'ERS', name: 'Ersekë', x: 62, y: 72, sentiment: 0.68, color: '#f87171' },
  { id: 'BIL', name: 'Bilisht', x: 68, y: 65, sentiment: 0.70, color: '#fca5a5' },

  // Gjirokastër County (Orange - South)
  { id: 'GJI', name: 'Gjirokastër', x: 40, y: 78, sentiment: 0.69, color: '#ea580c' },
  { id: 'TEP', name: 'Tepelenë', x: 35, y: 75, sentiment: 0.65, color: '#fb923c' },
  { id: 'PER', name: 'Përmet', x: 50, y: 76, sentiment: 0.67, color: '#fdba74' },

  // Vlorë County (Blue - Southwest Coast)
  { id: 'VLO', name: 'Vlorë', x: 20, y: 75, sentiment: 0.74, color: '#2563eb' },
  { id: 'SAR', name: 'Sarandë', x: 28, y: 85, sentiment: 0.77, color: '#3b82f6' },
  { id: 'DEL', name: 'Delvinë', x: 32, y: 82, sentiment: 0.70, color: '#60a5fa' }
];

export default function AlbaniaMap({ data = [], height = 600 }: AlbaniaMapProps) {
  const [selectedCounties, setSelectedCounties] = useState<Set<string>>(new Set());
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);

  const getSentimentColor = (sentiment: number): string => {
    if (sentiment >= 0.7) return "rgba(16, 185, 129, 0.8)"; // green
    if (sentiment >= 0.5) return "rgba(245, 158, 11, 0.8)"; // yellow
    if (sentiment >= 0.3) return "rgba(249, 115, 22, 0.8)"; // orange
    return "rgba(239, 68, 68, 0.8)"; // red
  };

  const handleCountyClick = (countyId: string) => {
    const newSelected = new Set(selectedCounties);
    if (newSelected.has(countyId)) {
      newSelected.delete(countyId);
    } else {
      newSelected.add(countyId);
    }
    setSelectedCounties(newSelected);
  };

  // Merge provided data with default counties
  const countiesWithData = counties.map(county => {
    const providedData = data.find(d => d.id === county.id);
    return {
      ...county,
      sentiment: providedData?.sentiment ?? county.sentiment,
      value: providedData?.value ?? Math.round(Math.random() * 100)
    };
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Zëri i Vërtetë i Shqipërisë - Harta Rajonale
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Analiza e sentimentit të votuesve në të gjithë qarqet e Shqipërisë
          </p>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
            <span>Pozitiv (70%+)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
            <span>Neutral (50-70%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
            <span>Negativ (30-50%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
            <span>Kritik (&lt;30%)</span>
          </div>
        </div>
      </div>

      <div
        style={{ width: '100%', height: `${height}px`, position: 'relative' }}
        className="border border-gray-100 rounded overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50"
      >
        {/* SVG Map Background - Simplified Albania Shape */}
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Albania outline */}
          <path
            d="M 25 5 L 55 5 L 60 10 L 65 8 L 70 15 L 72 25 L 75 35 L 70 45 L 72 55 L 68 65 L 70 75 L 65 85 L 55 90 L 40 92 L 30 88 L 25 85 L 20 75 L 18 65 L 15 55 L 12 45 L 10 35 L 15 25 L 18 15 L 22 10 Z"
            fill="#e5e7eb"
            stroke="#6b7280"
            strokeWidth="0.5"
          />
        </svg>

        {/* Interactive county overlays */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {countiesWithData.map(county => (
            <div
              key={county.id}
              style={{
                position: 'absolute',
                left: `${county.x}%`,
                top: `${county.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: hoveredCounty === county.id ? 20 : 10
              }}
              onClick={() => handleCountyClick(county.id)}
              onMouseEnter={() => setHoveredCounty(county.id)}
              onMouseLeave={() => setHoveredCounty(null)}
            >
              {/* County marker */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: selectedCounties.has(county.id)
                    ? 'rgba(29, 78, 216, 0.9)'
                    : getSentimentColor(county.sentiment),
                  border: `3px solid ${hoveredCounty === county.id ? '#1e40af' : '#fff'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: hoveredCounty === county.id
                    ? '0 4px 12px rgba(0,0,0,0.3)'
                    : '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  transform: hoveredCounty === county.id ? 'scale(1.15)' : 'scale(1)'
                }}
              >
                <span className="text-white font-bold text-xs">
                  {Math.round(county.sentiment * 100)}%
                </span>
              </div>

              {/* County name label */}
              <div
                className="text-xs font-semibold text-gray-800 bg-white/90 px-1.5 py-0.5 rounded shadow-sm mt-1 whitespace-nowrap backdrop-blur-sm"
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  opacity: hoveredCounty === county.id ? 1 : 0.85
                }}
              >
                {county.name}
              </div>
            </div>
          ))}
        </div>

        {/* Hover tooltip */}
        {hoveredCounty && (
          <div
            className="absolute bg-white p-3 rounded-lg shadow-xl border border-gray-200"
            style={{
              top: '10px',
              right: '10px',
              zIndex: 30,
              minWidth: '220px'
            }}
          >
            <div className="font-bold text-gray-900 mb-1">
              {countiesWithData.find(p => p.id === hoveredCounty)?.name}
            </div>
            <div className="text-sm text-gray-600">
              Sentimenti: {Math.round((countiesWithData.find(p => p.id === hoveredCounty)?.sentiment || 0) * 100)}%
            </div>
            <div className="text-sm text-gray-600">
              Votues: {(countiesWithData.find(p => p.id === hoveredCounty)?.value || 0).toLocaleString()}k
            </div>
            {selectedCounties.has(hoveredCounty) && (
              <div className="text-blue-600 text-xs mt-2 font-semibold">✓ E zgjedhur</div>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Klikoni në qarqet për t'i zgjedhur/çzgjedhur. Vendosni kursorin mbi to për informacion të detajuar.
      </p>

      {selectedCounties.size > 0 && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-semibold mb-1">
            Qarqet e zgjedhura ({selectedCounties.size}):
          </p>
          <p className="text-xs text-blue-700">
            {Array.from(selectedCounties).map(id =>
              countiesWithData.find(p => p.id === id)?.name
            ).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}