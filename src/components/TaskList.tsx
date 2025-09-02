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
  const [predefinedTasksAdded, setPredefinedTasksAdded] = React.useState(false);

  // Add predefined review tasks when switching to review tab
  useEffect(() => {
    if (type === 'review' && filteredTasks.length === 0 && !predefinedTasksAdded) {
      setPredefinedTasksAdded(true);
      const predefinedTasks = [
        // IMPRESCINDIBLES
        { title: 'Pasaporte, DNI y copias de ambos', description: 'Verificar vigencia y hacer copias físicas y digitales', category: 'imprescindibles' },
        { title: 'Visa (si es necesaria)', description: 'Verificar requisitos de visa para el país de destino', category: 'imprescindibles' },
        { title: 'Seguro de viaje', description: 'Contratar seguro médico y de cancelación', category: 'imprescindibles' },
        { title: 'Reservas de vuelos', description: 'Confirmar vuelos y hacer check-in online', category: 'imprescindibles' },
        { title: 'Reservas de alojamiento', description: 'Confirmar hoteles/alojamientos y guardar confirmaciones', category: 'imprescindibles' },
        
        // SALUD
        { title: 'Vacunas requeridas', description: 'Verificar y aplicar vacunas necesarias según destino', category: 'salud' },
        { title: 'Medicamentos personales', description: 'Llevar medicamentos suficientes y recetas médicas', category: 'salud' },
        { title: 'Botiquín de primeros auxilios', description: 'Preparar kit básico de medicamentos', category: 'salud' },
        
        // DINERO
        { title: 'Tarjetas de crédito/débito', description: 'Notificar al banco sobre el viaje y verificar límites', category: 'dinero' },
        { title: 'Efectivo local', description: 'Cambiar dinero o planificar dónde obtener efectivo', category: 'dinero' },
        { title: 'Presupuesto de viaje', description: 'Calcular gastos estimados y reservar fondos', category: 'dinero' },
        
        // EQUIPAJE
        { title: 'Maletas y equipaje de mano', description: 'Verificar restricciones de peso y tamaño', category: 'equipaje' },
        { title: 'Ropa apropiada para el clima', description: 'Revisar pronóstico del tiempo y empacar accordingly', category: 'equipaje' },
        { title: 'Adaptadores de corriente', description: 'Llevar adaptadores según el país de destino', category: 'equipaje' }
      ];

      predefinedTasks.forEach((task, index) => {
        setTimeout(() => {
          onAddTask(task.title, task.description, 'review');
        }, index * 100);
      });
    }
  }, [type, filteredTasks.length, onAddTask, predefinedTasksAdded]);

  if (type === 'review') {
    const categorizedTasks = {
      imprescindibles: filteredTasks.filter(task => 
        task.description?.includes('Verificar vigencia') || 
        task.description?.includes('Verificar requisitos') || 
        task.description?.includes('Contratar seguro') || 
        task.description?.includes('Confirmar vuelos') || 
        task.description?.includes('Confirmar hoteles')
      ),
      salud: filteredTasks.filter(task => 
        task.description?.includes('Verificar y aplicar vacunas') || 
        task.description?.includes('Llevar medicamentos') || 
        task.description?.includes('Preparar kit')
      ),
      dinero: filteredTasks.filter(task => 
        task.description?.includes('Notificar al banco') || 
        task.description?.includes('Cambiar dinero') || 
        task.description?.includes('Calcular gastos')
      ),
      equipaje: filteredTasks.filter(task => 
        task.description?.includes('Verificar restricciones') || 
        task.description?.includes('Revisar pronóstico') || 
        task.description?.includes('Llevar adaptadores')
      ),
      otros: filteredTasks.filter(task => {
        const desc = task.description || '';
        return !desc.includes('Verificar vigencia') && 
               !desc.includes('Verificar requisitos') && 
               !desc.includes('Contratar seguro') && 
               !desc.includes('Confirmar vuelos') && 
               !desc.includes('Confirmar hoteles') &&
               !desc.includes('Verificar y aplicar vacunas') && 
               !desc.includes('Llevar medicamentos') && 
               !desc.includes('Preparar kit') &&
               !desc.includes('Notificar al banco') && 
               !desc.includes('Cambiar dinero') && 
               !desc.includes('Calcular gastos') &&
               !desc.includes('Verificar restricciones') && 
               !desc.includes('Revisar pronóstico') && 
               !desc.includes('Llevar adaptadores');
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
              title="SALUD"
              icon="🏥"
              tasks={categorizedTasks.salud}
              onToggleCompletion={onToggleCompletion}
              onDelete={onDelete}
              onAddTask={onAddTask}
              accentColor="green"
            />
            
            <CategorySection
              title="DINERO"
              icon="💰"
              tasks={categorizedTasks.dinero}
              onToggleCompletion={onToggleCompletion}
              onDelete={onDelete}
              onAddTask={onAddTask}
              accentColor="blue"
            />
            
            <CategorySection
              title="EQUIPAJE"
              icon="🧳"
              tasks={categorizedTasks.equipaje}
              onToggleCompletion={onToggleCompletion}
              onDelete={onDelete}
              onAddTask={onAddTask}
              accentColor="purple"
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
            <AddTaskForm onAddTask={(title, description) => onAddTask(title, description, 'review')} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <AddTaskForm onAddTask={(title, description) => onAddTask(title, description, 'pending')} />
      
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