import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  TrendingUp,
  AlertTriangle,
  Shield,
  Handshake,
  Map,
  Calendar,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import {
  electionSimulator,
  SimulationResult,
  Party,
  serbianParties,
  CoalitionScenario
} from '../services/electionSimulator';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ElectionSimulation() {
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<CoalitionScenario | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'belgrade' | 'vojvodina' | 'central'>('all');

  useEffect(() => {
    runSimulation();
  }, []);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const result = electionSimulator.runSimulation();
      setSimulation(result);
      if (result.coalitionScenarios.length > 0) {
        setSelectedScenario(result.coalitionScenarios[0]);
      }
      setIsSimulating(false);
    }, 1000);
  };

  if (!simulation) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: simulation.results.map(r => r.party.acronym),
    datasets: [{
      data: simulation.results.map(r => r.seats),
      backgroundColor: simulation.results.map(r => r.party.color),
      borderColor: simulation.results.map(r => r.party.color),
      borderWidth: 1
    }]
  };

  const voteShareData = {
    labels: simulation.results.map(r => r.party.acronym),
    datasets: [{
      label: 'Vote Share %',
      data: simulation.results.map(r => r.voteShare),
      backgroundColor: simulation.results.map(r => r.party.color + '80'),
      borderColor: simulation.results.map(r => r.party.color),
      borderWidth: 1
    }]
  };

  const getConfidenceColor = (confidence: string) => {
    switch(confidence) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Simulacija Izbora - Srbija 2024
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Projekcija rezultata na osnovu trenutnih trendova
            </p>
          </div>
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isSimulating ? 'animate-spin' : ''}`} />
            Nova Simulacija
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500">Datum Izbora</div>
            <div className="text-sm font-medium text-gray-900 flex items-center mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(simulation.metadata.electionDate).toLocaleDateString('sr-RS')}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500">Ukupno Mesta</div>
            <div className="text-sm font-medium text-gray-900">250</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500">Izlaznost</div>
            <div className="text-sm font-medium text-gray-900">
              {Math.round(simulation.metadata.turnout * 100)}%
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500">Pouzdanost</div>
            <div className={`text-sm font-medium px-2 py-1 rounded inline-block ${getConfidenceColor(simulation.metadata.confidence)}`}>
              {simulation.metadata.confidence === 'high' ? 'Visoka' :
               simulation.metadata.confidence === 'medium' ? 'Srednja' : 'Niska'}
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Seat Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Raspodela Mesta u Skupštini
          </h4>
          <div className="h-64">
            <Pie data={chartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    generateLabels: (chart) => {
                      const data = chart.data;
                      if (data.labels && data.datasets.length) {
                        return data.labels.map((label, i) => {
                          const dataset = data.datasets[0];
                          const value = dataset.data[i];
                          const party = simulation.results[i].party;
                          return {
                            text: `${label}: ${value} mesta`,
                            fillStyle: dataset.backgroundColor[i],
                            hidden: false,
                            index: i
                          };
                        });
                      }
                      return [];
                    }
                  }
                }
              }
            }} />
          </div>
        </div>

        {/* Vote Share */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Procenat Glasova
          </h4>
          <div className="h-64">
            <Bar data={voteShareData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 50
                }
              },
              plugins: {
                legend: {
                  display: false
                }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Party Results Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Detaljni Rezultati po Strankama
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stranka
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Glasova %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mesta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Promena
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {simulation.results.map((result) => (
                <tr key={result.party.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: result.party.color }}></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {result.party.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {result.party.acronym}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.voteShare.toFixed(1)}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{result.seats}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm flex items-center ${
                      result.change > 0 ? 'text-green-600' : result.change < 0 ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {result.change > 0 ? '+' : ''}{result.change}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {result.seats > 125 ? (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        Većina
                      </span>
                    ) : result.seats > 0 ? (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        U Skupštini
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                        Ispod Cenzusa
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coalition Scenarios */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
          <Handshake className="w-4 h-4 mr-2" />
          Mogući Koalicioni Scenariji
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {simulation.coalitionScenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={() => setSelectedScenario(scenario)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedScenario === scenario
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {scenario.name}
                </span>
                {scenario.viable && (
                  <Shield className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                {scenario.parties.map(p => p.acronym).join(' + ')}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  {scenario.totalSeats} mesta
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  scenario.totalSeats > 125
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {scenario.totalSeats > 125 ? 'Većina' : 'Manjina'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {selectedScenario && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">
              {selectedScenario.name} - Analiza
            </h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Ukupno mesta:</span>
                <span className="ml-2 font-medium">{selectedScenario.totalSeats}/250</span>
              </div>
              <div>
                <span className="text-gray-500">Stabilnost:</span>
                <span className={`ml-2 font-medium ${
                  selectedScenario.stability === 'stable' ? 'text-green-600' :
                  selectedScenario.stability === 'moderate' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {selectedScenario.stability === 'stable' ? 'Stabilna' :
                   selectedScenario.stability === 'moderate' ? 'Umerena' :
                   'Nestabilna'}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">Učesnici koalicije:</div>
              <div className="flex flex-wrap gap-2">
                {selectedScenario.parties.map(party => (
                  <div key={party.id} className="flex items-center bg-white px-2 py-1 rounded border border-gray-200">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: party.color }}></div>
                    <span className="text-xs font-medium">{party.acronym}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Regional Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
          <Map className="w-4 h-4 mr-2" />
          Regionalna Raspodela
        </h4>
        <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
          {['all', 'belgrade', 'vojvodina', 'central'].map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region as any)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedRegion === region
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {region === 'all' ? 'Svi Regioni' :
               region === 'belgrade' ? 'Beograd' :
               region === 'vojvodina' ? 'Vojvodina' :
               'Centralna/Južna Srbija'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {simulation.regionalBreakdown
            .filter(r => selectedRegion === 'all' || r.region === selectedRegion)
            .map((regional) => (
            <div key={regional.region} className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-3 capitalize">
                {regional.region === 'belgrade' ? 'Beograd' :
                 regional.region === 'vojvodina' ? 'Vojvodina' :
                 'Centralna/Južna Srbija'}
              </h5>
              <div className="space-y-2">
                {regional.results.slice(0, 5).map((result) => (
                  <div key={result.partyId} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: serbianParties.find(p => p.id === result.partyId)?.color }}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {result.partyId}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${result.voteShare * 2}%`,
                            backgroundColor: serbianParties.find(p => p.id === result.partyId)?.color
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {result.voteShare.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}