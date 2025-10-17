import React, { useState } from 'react';
import { Users, Building, Target, TrendingUp, AlertCircle, Shield, GitBranch } from 'lucide-react';
import { albanianPoliticalOntology, PoliticalParty, PoliticalIssue } from '../services/albanianPoliticalOntology';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Radar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement);

export default function AlbanianPoliticalLandscape() {
  const [selectedParty, setSelectedParty] = useState<PoliticalParty | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<PoliticalIssue | null>(null);
  const [viewMode, setViewMode] = useState<'parties' | 'issues' | 'coalitions'>('parties');

  const parties = albanianPoliticalOntology.getParties();
  const issues = albanianPoliticalOntology.getIssues();
  const leaders = albanianPoliticalOntology.getLeaders();
  const coalitionPossibilities = albanianPoliticalOntology.getCoalitionPossibilities();

  const partySeatsData = {
    labels: parties.map(p => p.acronym),
    datasets: [{
      data: parties.map(p => p.seats),
      backgroundColor: parties.map(p => p.color),
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const issueSentimentData = {
    labels: issues.slice(0, 6).map(i => i.name.sq),
    datasets: [{
      label: 'Sentimenti Publik',
      data: issues.slice(0, 6).map(i => i.publicSentiment * 100),
      backgroundColor: issues.slice(0, 6).map(i =>
        i.publicSentiment > 0 ? '#10B981' : '#EF4444'
      ),
      borderWidth: 1
    }]
  };

  const getPositionColor = (position: string) => {
    switch(position) {
      case 'government': return 'bg-red-100 text-red-800';
      case 'opposition': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Peizazhi Politik Shqiptar
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Hartëzimi i partive, liderëve dhe çështjeve politike
            </p>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('parties')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'parties'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Partitë Politike
          </button>
          <button
            onClick={() => setViewMode('issues')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'issues'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Çështjet Kryesore
          </button>
          <button
            onClick={() => setViewMode('coalitions')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'coalitions'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Skenarët e Koalicionit
          </button>
        </div>
      </div>

      {/* Parties View */}
      {viewMode === 'parties' && (
        <>
          {/* Parliamentary Seats Distribution */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">
                Shpërndarja e Vendeve në Parlament
              </h4>
              <div className="h-64">
                <Pie data={partySeatsData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right'
                    }
                  }
                }} />
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Total: 140 vende parlamentare
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">
                Liderët Kryesorë
              </h4>
              <div className="space-y-3">
                {leaders.slice(0, 4).map(leader => (
                  <div key={leader.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{leader.name}</div>
                      <div className="text-sm text-gray-600">
                        {leader.position} • {leader.party}
                      </div>
                    </div>
                    {leader.approvalRating && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {leader.approvalRating}%
                        </div>
                        <div className="text-xs text-gray-500">Aprovimi</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Party Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              Partitë Politike
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {parties.map(party => (
                <button
                  key={party.id}
                  onClick={() => setSelectedParty(party)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedParty?.id === party.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: party.color }}
                      />
                      <span className="font-semibold text-gray-900">
                        {party.acronym}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getPositionColor(party.position)}`}>
                      {party.position === 'government' ? 'Qeveri' :
                       party.position === 'opposition' ? 'Opozitë' : 'Neutral'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{party.fullName.sq}</div>
                    <div className="mt-1">
                      Lider: {party.leader} • Vende: {party.seats}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {party.ideology.slice(0, 2).map(ideology => (
                      <span key={ideology} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {ideology}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Issues View */}
      {viewMode === 'issues' && (
        <>
          {/* Issue Sentiment Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              Sentimenti Publik për Çështjet Kryesore
            </h4>
            <div className="h-64">
              <Bar data={issueSentimentData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    min: -100,
                    max: 100
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

          {/* Issue Categories */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              Çështjet Politike sipas Kategorisë
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {issues.map(issue => (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedIssue?.id === issue.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">
                      {issue.name.sq}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(issue.priority)}`}>
                      {issue.priority === 'critical' ? 'Kritike' :
                       issue.priority === 'high' ? 'E Lartë' :
                       issue.priority === 'medium' ? 'Mesatare' : 'E Ulët'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Kategoria: {
                      issue.category === 'domestic' ? 'Brendshme' :
                      issue.category === 'foreign' ? 'E Jashtme' :
                      issue.category === 'economic' ? 'Ekonomike' :
                      issue.category === 'social' ? 'Sociale' : 'Mjedisore'
                    }</div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span>Sentimenti:</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                issue.publicSentiment > 0 ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.abs(issue.publicSentiment) * 100}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            issue.publicSentiment > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {(issue.publicSentiment * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {issue.keywords.slice(0, 3).map(keyword => (
                      <span key={keyword} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Coalitions View */}
      {viewMode === 'coalitions' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
            <GitBranch className="w-4 h-4 mr-2" />
            Skenarët e Mundshëm të Koalicionit
          </h4>
          <div className="space-y-4">
            {coalitionPossibilities.slice(0, 6).map((coalition, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {coalition.parties.map(partyId => {
                      const party = parties.find(p => p.id === partyId);
                      return party ? (
                        <div key={partyId} className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-1"
                            style={{ backgroundColor: party.color }}
                          />
                          <span className="font-medium text-gray-900">
                            {party.acronym}
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {coalition.seats} vende
                    </div>
                    <div className={`text-xs ${
                      coalition.seats >= 71 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {coalition.seats >= 71 ? 'Shumicë' : 'Jo shumicë'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-gray-600">
                      Përputhja: {(coalition.ideologicalAlignment * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    coalition.ideologicalAlignment > 0.7 ? 'bg-green-100 text-green-800' :
                    coalition.ideologicalAlignment > 0.5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {coalition.ideologicalAlignment > 0.7 ? 'E Qëndrueshme' :
                     coalition.ideologicalAlignment > 0.5 ? 'E Mundshme' : 'E Vështirë'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}