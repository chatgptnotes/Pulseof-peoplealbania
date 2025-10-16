import { useState } from 'react';

interface AngolaMapProps {
  data?: Array<{
    id: string;
    title: string;
    value: number;
    sentiment?: number;
  }>;
  height?: number;
}

// Angola provinces with approximate positions on the map (in percentages)
const provinces = [
  { id: 'CAB', name: 'Cabinda', x: 20, y: 12, sentiment: 0.60 },
  { id: 'ZAI', name: 'Zaire', x: 25, y: 20, sentiment: 0.56 },
  { id: 'UIG', name: 'Uíge', x: 38, y: 22, sentiment: 0.71 },
  { id: 'LUA', name: 'Luanda', x: 22, y: 32, sentiment: 0.75 },
  { id: 'BEN', name: 'Bengo', x: 28, y: 28, sentiment: 0.65 },
  { id: 'CNO', name: 'Cuanza Norte', x: 32, y: 35, sentiment: 0.68 },
  { id: 'CSU', name: 'Cuanza Sul', x: 28, y: 45, sentiment: 0.62 },
  { id: 'MAL', name: 'Malanje', x: 42, y: 35, sentiment: 0.63 },
  { id: 'LNO', name: 'Lunda Norte', x: 55, y: 28, sentiment: 0.40 },
  { id: 'LSU', name: 'Lunda Sul', x: 58, y: 42, sentiment: 0.48 },
  { id: 'BEN2', name: 'Benguela', x: 22, y: 55, sentiment: 0.55 },
  { id: 'HUA', name: 'Huambo', x: 35, y: 55, sentiment: 0.72 },
  { id: 'BIE', name: 'Bié', x: 45, y: 52, sentiment: 0.70 },
  { id: 'MOX', name: 'Moxico', x: 60, y: 55, sentiment: 0.52 },
  { id: 'NAM', name: 'Namibe', x: 18, y: 68, sentiment: 0.66 },
  { id: 'HUI', name: 'Huíla', x: 32, y: 65, sentiment: 0.58 },
  { id: 'CNN', name: 'Cunene', x: 35, y: 75, sentiment: 0.50 },
  { id: 'CCU', name: 'Cuando Cubango', x: 55, y: 72, sentiment: 0.45 }
];

export default function AngolaMap({ data = [], height = 500 }: AngolaMapProps) {
  const [selectedProvinces, setSelectedProvinces] = useState<Set<string>>(new Set());
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const getSentimentColor = (sentiment: number): string => {
    if (sentiment >= 0.7) return "rgba(16, 185, 129, 0.7)"; // green
    if (sentiment >= 0.5) return "rgba(245, 158, 11, 0.7)"; // yellow
    if (sentiment >= 0.3) return "rgba(249, 115, 22, 0.7)"; // orange
    return "rgba(239, 68, 68, 0.7)"; // red
  };

  const handleProvinceClick = (provinceId: string) => {
    const newSelected = new Set(selectedProvinces);
    if (newSelected.has(provinceId)) {
      newSelected.delete(provinceId);
    } else {
      newSelected.add(provinceId);
    }
    setSelectedProvinces(newSelected);
  };

  // Merge provided data with default provinces
  const provincesWithData = provinces.map(province => {
    const providedData = data.find(d => d.id === province.id);
    return {
      ...province,
      sentiment: providedData?.sentiment ?? province.sentiment,
      value: providedData?.value ?? 0
    };
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Regional Sentiment Map - Angola</h3>
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

      <div
        style={{ width: '100%', height: `${height}px`, position: 'relative' }}
        className="border border-gray-100 rounded overflow-hidden"
      >
        {/* Background map image */}
        <img
          src="/angola-map.png"
          alt="Angola Map"
          className="w-full h-full object-contain"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />

        {/* Interactive province overlays */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {provincesWithData.map(province => (
            <div
              key={province.id}
              style={{
                position: 'absolute',
                left: `${province.x}%`,
                top: `${province.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: hoveredProvince === province.id ? 20 : 10
              }}
              onClick={() => handleProvinceClick(province.id)}
              onMouseEnter={() => setHoveredProvince(province.id)}
              onMouseLeave={() => setHoveredProvince(null)}
            >
              {/* Province marker */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: selectedProvinces.has(province.id)
                    ? 'rgba(29, 78, 216, 0.8)'
                    : getSentimentColor(province.sentiment),
                  border: `3px solid ${hoveredProvince === province.id ? '#1e40af' : '#fff'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: hoveredProvince === province.id
                    ? '0 4px 12px rgba(0,0,0,0.3)'
                    : '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  transform: hoveredProvince === province.id ? 'scale(1.2)' : 'scale(1)'
                }}
              >
                <span className="text-white font-bold text-xs">
                  {Math.round(province.sentiment * 100)}%
                </span>
              </div>

              {/* Province name label */}
              <div
                className="text-xs font-semibold text-gray-800 bg-white px-1 py-0.5 rounded shadow-sm mt-1 whitespace-nowrap"
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  opacity: hoveredProvince === province.id ? 1 : 0.8
                }}
              >
                {province.name}
              </div>
            </div>
          ))}
        </div>

        {/* Hover tooltip */}
        {hoveredProvince && (
          <div
            className="absolute bg-white p-3 rounded-lg shadow-xl border border-gray-200"
            style={{
              top: '10px',
              right: '10px',
              zIndex: 30,
              minWidth: '200px'
            }}
          >
            <div className="font-bold text-gray-900 mb-1">
              {provincesWithData.find(p => p.id === hoveredProvince)?.name}
            </div>
            <div className="text-sm text-gray-600">
              Sentiment: {Math.round((provincesWithData.find(p => p.id === hoveredProvince)?.sentiment || 0) * 100)}%
            </div>
            <div className="text-sm text-gray-600">
              Voters: {(provincesWithData.find(p => p.id === hoveredProvince)?.value || 0).toLocaleString()}k
            </div>
            {selectedProvinces.has(hoveredProvince) && (
              <div className="text-blue-600 text-xs mt-2 font-semibold">✓ Selected</div>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Click on province markers to select/deselect them. Hover for detailed sentiment information.
      </p>

      {selectedProvinces.size > 0 && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-semibold mb-1">
            Selected provinces ({selectedProvinces.size}):
          </p>
          <p className="text-xs text-blue-700">
            {Array.from(selectedProvinces).map(id =>
              provincesWithData.find(p => p.id === id)?.name
            ).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}