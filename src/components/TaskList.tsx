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
      imprescindibles: filteredTasks.filter(task => task.description.includes('Verificar vigencia') || task.description.includes('Verificar requisitos') || task.description.includes('Contratar seguro') || task.description.includes('Confirmar vuelos') || task.description.includes('Confirmar hoteles')),
      salud: filteredTasks.filter(task => task.description.includes('Verificar y aplicar vacunas') || task.description.includes('Llevar medicamentos') || task.description.includes('Preparar kit')),
      dinero: filteredTasks.filter(task => task.description.includes('Notificar al banco') || task.description.includes('Cambiar dinero') || task.description.includes('Calcular gastos')),
      equipaje: filteredTasks.filter(task => task.description.includes('Verificar restricciones') || task.description.includes('Revisar pronóstico') || task.description.includes('Llevar adaptadores')),
      otros: filteredTasks.filter(task => 
        !task.description.includes('Verificar vigencia') && 
        !task.description.includes('Verificar requisitos') && 
        !task.description.includes('Contratar seguro') && 
        !task.description.includes('Confirmar vuelos') && 
        !task.description.includes('Confirmar hoteles') &&
        !task.description.includes('Verificar y aplicar vacunas') && 
        !task.description.includes('Llevar medicamentos') && 
        !task.description.includes('Preparar kit') &&
        !task.description.includes('Notificar al banco') && 
        !task.description.includes('Cambiar dinero') && 
        !task.description.includes('Calcular gastos') &&
        !task.description.includes('Verificar restricciones') && 
        !task.description.includes('Revisar pronóstico') && 
        !task.description.includes('Llevar adaptadores')
      )
    };

    return (
      <div className="space-y-6">
        <AddTaskForm onAddTask={(title, description) => onAddTask(title, description, type)} />
        
        <CategorySection
          title="🚨 Imprescindibles"
          tasks={categorizedTasks.imprescindibles}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
        />
        
        <CategorySection
          title="🏥 Salud"
          tasks={categorizedTasks.salud}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
        />
        
        <CategorySection
          title="💰 Dinero"
          tasks={categorizedTasks.dinero}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
        />
        
        <CategorySection
          title="🧳 Equipaje"
          tasks={categorizedTasks.equipaje}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
        />
        
        {categorizedTasks.otros.length > 0 && (
          <CategorySection
            title="📝 Otros"
            tasks={categorizedTasks.otros}
            onToggleCompletion={onToggleCompletion}
            onDelete={onDelete}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AddTaskForm onAddTask={(title, description) => onAddTask(title, description, type)} />
      {filteredTasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;