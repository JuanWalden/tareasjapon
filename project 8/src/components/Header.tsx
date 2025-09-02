import React from 'react';
import { Plane, Users } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tareas de Viaje</h1>
              <p className="text-sm text-gray-500">Organización grupal</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">4 viajeros</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;