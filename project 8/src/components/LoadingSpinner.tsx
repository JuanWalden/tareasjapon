import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
      <p className="text-gray-600">Cargando tareas...</p>
    </div>
  );
};

export default LoadingSpinner;