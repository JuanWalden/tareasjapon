import React from 'react';
import { Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Task, Traveler } from '../types';
import TravelerCheckbox from './TravelerCheckbox';

interface TaskCardProps {
  task: Task;
  onToggleCompletion: (taskId: string, traveler: Traveler, completed: boolean) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleCompletion, onDelete }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const travelers: Traveler[] = ['maria', 'juan', 'javier', 'helena'];
  const completedCount = travelers.reduce((count, traveler) => {
    return count + (task[`${traveler}_completed`] ? 1 : 0);
  }, 0);

  const isFullyCompleted = completedCount === 4;

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
      isFullyCompleted ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
              isFullyCompleted 
                ? 'bg-green-500 border-green-500' 
                : 'border-gray-300 hover:border-gray-400'
            }`}>
              {isFullyCompleted && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold transition-all duration-200 ${
                isFullyCompleted ? 'text-green-800 line-through' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 transition-colors duration-200 ${
                  isFullyCompleted ? 'text-green-600 line-through' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isFullyCompleted 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {completedCount}/4
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
            >
              {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Estado por viajero:</h4>
            <div className="grid grid-cols-2 gap-3">
              {travelers.map((traveler) => (
                <TravelerCheckbox
                  key={traveler}
                  traveler={traveler}
                  completed={task[`${traveler}_completed`]}
                  onToggle={(completed) => onToggleCompletion(task.id, traveler, completed)}
                />
              ))}
            </div>
          </div>
        )}

        {!isExpanded && completedCount > 0 && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  isFullyCompleted ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${(completedCount / 4) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;