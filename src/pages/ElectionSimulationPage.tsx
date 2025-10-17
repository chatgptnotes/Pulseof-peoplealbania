import React from 'react';
import ElectionSimulation from '../components/ElectionSimulation';
import SerbiaMap from '../components/SerbiaMap';
import { BarChart3, Map } from 'lucide-react';

export default function ElectionSimulationPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="w-6 h-6 mr-3" />
          Serbia/Balkans Election Analysis
        </h1>
        <p className="text-gray-600 mt-2">
          Comprehensive election simulation and political analysis for Serbia and the Balkan region
        </p>
      </div>

      {/* Serbia Map Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Map className="w-5 h-5 mr-2" />
          Regional Political Sentiment
        </h2>
        <SerbiaMap />
      </div>

      {/* Election Simulation Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Election Simulation & Predictions
        </h2>
        <ElectionSimulation />
      </div>
    </div>
  );
}