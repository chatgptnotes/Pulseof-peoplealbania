import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Clock,
  Plus,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Globe,
  Building,
  Users,
  BarChart3,
  MessageCircle,
  Shield,
  Zap,
  Database,
  Flag,
  TrendingUp,
  Activity,
  Edit,
  Save,
  X,
  Download,
  Upload
} from 'lucide-react';

interface Feature {
  section: number;
  module: string;
  action: 'keep' | 'add' | 'change' | 'upgrade';
  description: string;
  status: 'completed' | 'partial' | 'pending';
  link?: string;
  icon?: any;
}

export default function FeaturesRoadmap() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Feature | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load features from localStorage or use defaults
  useEffect(() => {
    const savedFeatures = localStorage.getItem('albanianFeatures');
    if (savedFeatures) {
      setFeatures(JSON.parse(savedFeatures));
    } else {
      setFeatures(defaultFeatures);
    }
  }, []);

  // Save features to localStorage whenever they change
  const saveFeatures = (updatedFeatures: Feature[]) => {
    setFeatures(updatedFeatures);
    localStorage.setItem('albanianFeatures', JSON.stringify(updatedFeatures));
  };

  const defaultFeatures: Feature[] = [
    {
      section: 1,
      module: 'Survey & Panel Engine',
      action: 'keep',
      description: 'Add Albanian (Shqip) + optional English; quotas by prefecture, gender, age, education, rural/urban; "Trust in institutions" question bank; INSTAT integration',
      status: 'partial',
      link: '/political-polling',
      icon: BarChart3
    },
    {
      section: 1,
      module: 'Diaspora Influence Tracker',
      action: 'add',
      description: 'Track online participation of Albanian diaspora (Italy, Greece, Switzerland, Germany, UK); separate domestic vs external discourse; detect re-entry of narratives',
      status: 'completed',
      link: '/albanian-features',
      icon: Globe
    },
    {
      section: 1,
      module: 'Political Landscape Ontology',
      action: 'add',
      description: 'Map parties/leaders (PS, PD, LSI, Basha, Meta, etc.); cluster issues (EU accession, corruption, migration, energy); sentiment by party/topic',
      status: 'completed',
      link: '/albanian-features',
      icon: Building
    },
    {
      section: 2,
      module: 'Social Listening & News Graph',
      action: 'change',
      description: 'Prioritise Facebook, Instagram, TikTok, YouTube; reduce X/Twitter weight; ingest Top Channel, Syri.net, BalkanWeb, Exit.al, Euronews Albania, Report TV; add cross-border narrative detector',
      status: 'partial',
      link: '/social-media',
      icon: MessageCircle
    },
    {
      section: 3,
      module: 'Constituency & Demography Lens',
      action: 'add',
      description: 'Map 12 prefectures + 61 municipalities; include urban migration (Tirana vs others); turnout overlay (CEC data); youth out-migration risk index (INSTAT + Eurostat)',
      status: 'partial',
      link: '/regional-map',
      icon: Users
    },
    {
      section: 4,
      module: 'Issue Tracker / Public Pulse Map',
      action: 'keep',
      description: 'Rename for Albania branding; focus on cost of living, corruption, EU progress, jobs, education, emigration, environment; add Corruption Sentiment Index',
      status: 'completed',
      link: '/albanian-features',
      icon: Activity
    },
    {
      section: 5,
      module: 'Message Testing Lab',
      action: 'add',
      description: 'Add dialect variation (north/south), religious neutrality sensitivity, perceived authenticity score',
      status: 'pending',
      link: null,
      icon: MessageCircle
    },
    {
      section: 6,
      module: 'Influencer & Media Planner',
      action: 'add',
      description: 'Build database of journalists, TikTok creators, civic NGOs (Open Data Albania, BIRN, Youth Act); add trust/credibility rating',
      status: 'pending',
      link: '/influencer-tracking',
      icon: Users
    },
    {
      section: 7,
      module: 'Field Ops & Feedback Loop',
      action: 'keep',
      description: 'Add offline kiosk / QR mode for markets & youth fairs; integrate civil society partners for sampling',
      status: 'partial',
      link: '/field-workers',
      icon: Users
    },
    {
      section: 8,
      module: 'War-Room Views',
      action: 'add',
      description: 'Add EU-Lens tab (reform, corruption, judiciary), Youth Pulse (migration intent, job optimism), Media Manipulation Alerts (bot/coordinated posting)',
      status: 'partial',
      link: '/dashboard',
      icon: Shield
    },
    {
      section: 9,
      module: 'Model Hub',
      action: 'upgrade',
      description: 'Build Albanian-language transformer on political discourse; add stance detection (pro/anti-EU, pro/anti-government); multilingual embeddings (Albanian-Italian-Greek)',
      status: 'partial',
      link: '/ai-insights',
      icon: Zap
    },
    {
      section: 10,
      module: 'Integrity & Compliance',
      action: 'change',
      description: 'Align with GDPR; data-localisation toggle (EU/Albania servers); Transparency Portal with aggregated public results',
      status: 'partial',
      link: '/dpdp-compliance',
      icon: Shield
    },
    {
      section: 11,
      module: 'Storyboards & Exports',
      action: 'keep',
      description: 'Export reports in English + Albanian for media, EU NGOs',
      status: 'completed',
      link: '/export-manager',
      icon: Database
    },
    {
      section: 12,
      module: 'Alerts & Playbooks',
      action: 'add',
      description: 'Add protest sentiment alerts; corruption rumor playbook; templates for EU debate week, energy crisis, local elections',
      status: 'partial',
      link: '/alerts',
      icon: AlertCircle
    },
    {
      section: 13,
      module: 'Roles & Tenants',
      action: 'keep',
      description: 'Tenant per client (party, NGO, think-tank); add observer mode for EU monitors/civic media',
      status: 'partial',
      link: '/settings',
      icon: Users
    },
    {
      section: 14,
      module: 'Integrations',
      action: 'add',
      description: 'Connect CEC Albania API, Open Data Albania CSV feeds, Linkist PRM for press briefs, Facebook Public Page API',
      status: 'pending',
      link: null,
      icon: Zap
    },
    {
      section: 15,
      module: 'Albania Pack',
      action: 'add',
      description: 'Geospatial (prefecture/municipality GeoJSON), INSTAT demographics, economic indicators (inflation, energy, remittances), CEC political metadata, migration heatmap visual',
      status: 'partial',
      link: '/albanian-features',
      icon: Flag
    },
    {
      section: 16,
      module: 'Pricing & Partnerships',
      action: 'add',
      description: 'Collaborate with UT, Epoka, NY Tirana; NGO clients (Co-PLAN, BIRN, Partners Albania); donors (EU Delegation, OSCE, USAID)',
      status: 'pending',
      link: null,
      icon: Users
    },
    {
      section: 17,
      module: 'Branding & Tone',
      action: 'add',
      description: 'Bilingual UI (Shqip/English); tagline "Pulse of People — Zëri i Vërtetë i Shqipërisë"; keep animated palette with Albanian red/grey accents',
      status: 'completed',
      link: null,
      icon: Flag
    }
  ];

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...features[index] });
  };

  const handleSave = () => {
    if (editForm && editingIndex !== null) {
      const updatedFeatures = [...features];
      updatedFeatures[editingIndex] = editForm;
      saveFeatures(updatedFeatures);
      setEditingIndex(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  const handleStatusChange = (index: number, status: 'completed' | 'partial' | 'pending') => {
    const updatedFeatures = [...features];
    updatedFeatures[index].status = status;
    saveFeatures(updatedFeatures);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(features, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'features-roadmap.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          saveFeatures(imported);
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset to default features? This will overwrite your current changes.')) {
      saveFeatures(defaultFeatures);
    }
  };

  const getActionColor = (action: string) => {
    switch(action) {
      case 'keep': return 'bg-green-100 text-green-800 border-green-300';
      case 'add': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'change': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'upgrade': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'partial': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'pending': return <Plus className="w-5 h-5 text-gray-400" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getActionIcon = (action: string) => {
    switch(action) {
      case 'keep': return '✅';
      case 'add': return '🆕';
      case 'change': return '🔄';
      case 'upgrade': return '⬆️';
      default: return '📋';
    }
  };

  const stats = {
    total: features.length,
    completed: features.filter(f => f.status === 'completed').length,
    partial: features.filter(f => f.status === 'partial').length,
    pending: features.filter(f => f.status === 'pending').length
  };

  const completionRate = features.length > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-black text-white rounded-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Zëri i Vërtetë i Shqipërisë - Features Roadmap
            </h1>
            <p className="text-red-100">
              Comprehensive Albanian political and social analytics platform
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                isEditMode
                  ? 'bg-white text-red-600 hover:bg-red-50'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditMode ? 'Exit Edit Mode' : 'Edit Mode'}
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm text-red-100">Total Features</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-sm text-red-100">Completed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold text-yellow-400">{stats.partial}</div>
            <div className="text-sm text-red-100">In Progress</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold text-gray-300">{stats.pending}</div>
            <div className="text-sm text-red-100">Pending</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-red-100">Overall Progress</span>
            <span className="text-sm font-medium text-white">{completionRate}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Data Management Tools */}
      {isEditMode && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Data Management</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={exportData}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Download className="w-3 h-3 mr-1" />
                Export
              </button>
              <label className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center cursor-pointer">
                <Upload className="w-3 h-3 mr-1" />
                Import
                <input
                  type="file"
                  accept="application/json"
                  onChange={importData}
                  className="hidden"
                />
              </label>
              <button
                onClick={resetToDefaults}
                className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access Links */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-4 gap-4">
          <Link
            to="/albanian-features"
            className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center">
              <Flag className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">Albanian Analytics</span>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-600" />
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-medium text-green-900">Dashboard</span>
            </div>
            <ChevronRight className="w-4 h-4 text-green-600" />
          </Link>
          <Link
            to="/election-simulation"
            className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-medium text-purple-900">Election Simulation</span>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-600" />
          </Link>
          <Link
            to="/regional-map"
            className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-orange-600 mr-2" />
              <span className="font-medium text-orange-900">Regional Map</span>
            </div>
            <ChevronRight className="w-4 h-4 text-orange-600" />
          </Link>
        </div>
      </div>

      {/* Features Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Features Implementation Status</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module / Feature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link
                </th>
                {isEditMode && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {features.map((feature, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {editingIndex === index ? (
                    // Edit Row
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editForm?.section}
                          onChange={(e) => setEditForm({ ...editForm!, section: parseInt(e.target.value) })}
                          className="w-16 px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          value={editForm?.module}
                          onChange={(e) => setEditForm({ ...editForm!, module: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={editForm?.action}
                          onChange={(e) => setEditForm({ ...editForm!, action: e.target.value as any })}
                          className="px-2 py-1 border rounded"
                        >
                          <option value="keep">Keep</option>
                          <option value="add">Add</option>
                          <option value="change">Change</option>
                          <option value="upgrade">Upgrade</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <textarea
                          value={editForm?.description}
                          onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                          rows={2}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={editForm?.status}
                          onChange={(e) => setEditForm({ ...editForm!, status: e.target.value as any })}
                          className="px-2 py-1 border rounded"
                        >
                          <option value="completed">Completed</option>
                          <option value="partial">Partial</option>
                          <option value="pending">Pending</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          value={editForm?.link || ''}
                          onChange={(e) => setEditForm({ ...editForm!, link: e.target.value || undefined })}
                          placeholder="Optional"
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    // Display Row
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {feature.section}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{feature.module}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getActionColor(feature.action)}`}>
                          <span className="mr-1">{getActionIcon(feature.action)}</span>
                          {feature.action.charAt(0).toUpperCase() + feature.action.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="max-w-md truncate" title={feature.description}>
                          {feature.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditMode ? (
                          <select
                            value={feature.status}
                            onChange={(e) => handleStatusChange(index, e.target.value as any)}
                            className="px-2 py-1 text-sm border rounded"
                          >
                            <option value="completed">Completed</option>
                            <option value="partial">Partial</option>
                            <option value="pending">Pending</option>
                          </select>
                        ) : (
                          <div className="flex items-center">
                            {getStatusIcon(feature.status)}
                            <span className="ml-2 text-sm text-gray-600 capitalize">
                              {feature.status}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {feature.link ? (
                          <Link
                            to={feature.link}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            View
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      {isEditMode && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleEdit(index)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Legend</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Actions</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="mr-2">✅</span>
                <span className="text-gray-600">Keep - Maintain existing feature with localization</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2">🆕</span>
                <span className="text-gray-600">Add - New feature to be implemented</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2">🔄</span>
                <span className="text-gray-600">Change - Modify existing functionality</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2">⬆️</span>
                <span className="text-gray-600">Upgrade - Enhance with advanced capabilities</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Status</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-gray-600">Completed - Fully implemented</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-gray-600">Partial - In progress</span>
              </div>
              <div className="flex items-center text-sm">
                <Plus className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Pending - Not started</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}