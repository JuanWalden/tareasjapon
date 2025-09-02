import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface AddTaskFormProps {
  type: 'pending' | 'review';
  onAddTask: (title: string, description: string, type: 'pending' | 'review') => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ type, onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), description.trim(), type);
      setTitle('');
      setDescription('');
      setIsOpen(false);
    }
  };

  const buttonColor = type === 'pending' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600';
  const buttonText = type === 'pending' ? 'Agregar Tarea' : 'Agregar Revisión';

  const formBg = type === 'review' ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200';
  const textColor = type === 'review' ? 'text-white' : 'text-gray-900';
  const inputBg = type === 'review' ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-300 text-gray-900';

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full ${buttonColor} text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105`}
      >
        <Plus className="h-5 w-5" />
        <span>{buttonText}</span>
      </button>
    );
  }

  return (
    <div className={`${formBg} rounded-xl shadow-lg border-2 p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${textColor}`}>
          {type === 'pending' ? 'Nueva Tarea' : 'Nueva Revisión'}
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className={`${type === 'review' ? 'text-slate-400 hover:text-slate-200' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-200`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className={`block text-sm font-medium ${type === 'review' ? 'text-slate-300' : 'text-gray-700'} mb-1`}>
            Título *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Verificar documentos de viaje"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${inputBg}`}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className={`block text-sm font-medium ${type === 'review' ? 'text-slate-300' : 'text-gray-700'} mb-1`}>
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalles adicionales..."
            rows={3}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 ${inputBg}`}
          />
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className={`flex-1 ${buttonColor} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105`}
          >
            Crear {type === 'pending' ? 'Tarea' : 'Revisión'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-200 ${
              type === 'review' 
                ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;