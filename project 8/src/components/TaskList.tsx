import React, { useEffect } from 'react';
import { Task, Traveler } from '../types';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import CategorySection from './CategorySection';

interface TaskListProps {
  tasks: Task[];
  type: 'pending' | 'review';
  onToggleCompletion: (taskId: string, traveler: Traveler, completed: boolean) => void;
  onDelete: (taskId: string) => void;
  onAddTask: (title: string, description: string, type: 'pending' | 'review') => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  type,
  onToggleCompletion,
  onDelete,
  onAddTask
}) => {
  const filteredTasks = tasks.filter(task => task.type === type);

  // Add predefined review tasks when switching to review tab
  useEffect(() => {
    if (type === 'review' && filteredTasks.length === 0) {
      const predefinedTasks = [
        // IMPRESCINDIBLES
        { title: 'Pasaporte, DNI y copias de ambos', description: 'Verificar vigencia y hacer copias físicas y digitales', category: 'imprescindibles' },
        { title: 'Móvil cargado y cargador', description: 'Batería al 100% y cargador en equipaje de mano', category: 'imprescindibles' },
        { title: 'Tarjetas Revolut y dinero en efectivo', description: 'Verificar saldo y tener efectivo local', category: 'imprescindibles' },
        { title: 'Medicinas esenciales', description: 'Ibuprofeno, paracetamol, medicinas personales', category: 'imprescindibles' },
        
        // EQUIPAJE
        { title: 'Ropa interior para 7 días', description: 'Suficiente ropa interior limpia', category: 'equipaje' },
        { title: '2-3 camisetas térmicas', description: 'Para capas según el clima', category: 'equipaje' },
        { title: '2 pares de vaqueros', description: 'Pantalones cómodos para el viaje', category: 'equipaje' },
        { title: '1 chaqueta ligera', description: 'Para cambios de temperatura', category: 'equipaje' },
        { title: 'Calzado cómodo para caminar', description: 'Zapatos rotos y cómodos', category: 'equipaje' },
        
        // HIGIENE
        { title: 'Cepillo y pasta de dientes', description: 'Kit básico de higiene dental', category: 'higiene' },
        { title: 'Desodorante', description: 'Formato de viaje permitido', category: 'higiene' },
        { title: 'Champú y gel (formato viaje)', description: 'Envases de menos de 100ml', category: 'higiene' }
      ];

      // Add tasks with a small delay to avoid overwhelming the UI
      predefinedTasks.forEach((task, index) => {
        setTimeout(() => {
          onAddTask(task.title, task.description, 'review');
        }, index * 100);
      });
    }
  }, [type, filteredTasks.length, onAddTask]);

  if (type === 'review') {
    const categorizedTasks = {
      imprescindibles: filteredTasks.filter(task => 
        task.title.toLowerCase().includes('pasaporte') ||
        task.title.toLowerCase().includes('móvil') ||
        task.title.toLowerCase().includes('tarjetas') ||
        task.title.toLowerCase().includes('medicinas')
      ),
      equipaje: filteredTasks.filter(task => 
        task.title.toLowerCase().includes('ropa') ||
        task.title.toLowerCase().includes('camisetas') ||
        task.title.toLowerCase().includes('vaqueros') ||
        task.title.toLowerCase().includes('chaqueta') ||
        task.title.toLowerCase().includes('calzado')
      ),
      higiene: filteredTasks.filter(task => 
        task.title.toLowerCase().includes('cepillo') ||
        task.title.toLowerCase().includes('desodorante') ||
        task.title.toLowerCase().includes('champú')
      ),
      otros: filteredTasks.filter(task => {
        const title = task.title.toLowerCase();
        return !title.includes('pasaporte') && !title.includes('móvil') && 
               !title.includes('tarjetas') && !title.includes('medicinas') &&
               !title.includes('ropa') && !title.includes('camisetas') &&
               !title.includes('vaqueros') && !title.includes('chaqueta') &&
               !title.includes('calzado') && !title.includes('cepillo') &&
               !title.includes('desodorante') && !title.includes('champú');
      })
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
              CHECK LIST EQUIPAJE
            </h1>
            <p className="text-slate-300 text-lg">Revisión final antes del viaje</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategorySection
              title="IMPRESCINDIBLES"
              icon="🔥"
              tasks={categorizedTasks.imprescindibles}
              onToggleCompletion={onToggleCompletion}
              onDelete={onDelete}
              onAddTask={onAddTask}
              accentColor="red"
            />
            
            <CategorySection
              title="EQUIPAJE"
              icon="🧳"
              tasks={categorizedTasks.equipaje}
              onToggleCompletion={onToggleCompletion}
              onDelete={onDelete}
              onAddTask={onAddTask}
              accentColor="blue"
            />
            
            <CategorySection
              title="HIGIENE"
              icon="🧴"
              tasks={categorizedTasks.higiene}
              onToggleCompletion={onToggleCompletion}
              onDelete={onDelete}
              onAddTask={onAddTask}
              accentColor="green"
            />
            
            {categorizedTasks.otros.length > 0 && (
              <CategorySection
                title="OTROS"
                icon="📦"
                tasks={categorizedTasks.otros}
                onToggleCompletion={onToggleCompletion}
                onDelete={onDelete}
                onAddTask={onAddTask}
                accentColor="purple"
              />
            )}
          </div>

          <div className="mt-8">
            <AddTaskForm type={type} onAddTask={onAddTask} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <AddTaskForm type={type} onAddTask={onAddTask} />
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay tareas pendientes
          </h3>
          <p className="text-gray-500">
            Crea la primera tarea para comenzar la organización del viaje
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleCompletion={onToggleCompletion}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;