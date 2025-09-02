import React from 'react';
import { Check } from 'lucide-react';
import { TRAVELERS } from '../constants/travelers';
import { Traveler } from '../types';

interface TravelerCheckboxProps {
  traveler: Traveler;
  completed: boolean;
  onToggle: (completed: boolean) => void;
}

const TravelerCheckbox: React.FC<TravelerCheckboxProps> = ({
  traveler,
  completed,
  onToggle
}) => {
  const travelerInfo = TRAVELERS[traveler];

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onToggle(!completed)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
          completed
            ? `${travelerInfo.color} text-white scale-110 shadow-md`
            : 'border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        {completed && <Check className="h-4 w-4" />}
        {!completed && (
          <span className="text-sm">{travelerInfo.avatar}</span>
        )}
      </button>
      <span className={`text-sm font-medium transition-colors duration-200 ${
        completed ? 'text-gray-400 line-through' : 'text-gray-700'
      }`}>
        {travelerInfo.name}
      </span>
    </div>
  );
};

export default TravelerCheckbox;