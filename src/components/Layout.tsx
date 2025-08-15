import React, { useState } from 'react'
import { BarChart3, Users, AlertCircle, TrendingUp, Map, Settings } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">BETTROI</h1>
                  <p className="text-xs text-gray-500">Voter Sentiment Dashboard</p>
                </div>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'dashboard' 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => setActiveTab('geomap')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'geomap' 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>Geo Map</span>
              </button>
              <button 
                onClick={() => setActiveTab('influencers')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'influencers' 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Influencers</span>
              </button>
              <button 
                onClick={() => setActiveTab('alerts')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'alerts' 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span>Alerts</span>
              </button>
              <button 
                onClick={() => setActiveTab('reports')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'reports' 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Reports</span>
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 active:bg-gray-200 active:scale-95">
                <AlertCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 active:bg-gray-200 active:scale-95">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}