import React from 'react';
import { CheckSquare, Eye } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'pending' | 'review';
  onTabChange: (tab: 'pending' | 'review') => void;
  pendingCount: number;
  reviewCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  pendingCount,
  reviewCount
}) => {
  return (
    <div className={`border-b-2 transition-all duration-300 ${
      activeTab === 'review' 
        ? 'bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex space-x-8">
          <button
            onClick={() => onTabChange('pending')}
            className={`py-4 px-4 border-b-3 font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'pending'
                ? 'border-blue-500 text-blue-600 transform scale-105'
                : activeTab === 'review'
                  ? 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <CheckSquare className="h-4 w-4" />
            <span>Tareas Pendientes</span>
            {pendingCount > 0 && (
              <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {pendingCount}
              </span>
            )}
          </button>
          
          <button
            onClick={() => onTabChange('review')}
            className={`py-4 px-4 border-b-3 font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'review'
                ? 'border-orange-400 text-orange-300 transform scale-105'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>Revisión Final</span>
            {reviewCount > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {reviewCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;