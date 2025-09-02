@@ .. @@
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
+  const [predefinedTasksAdded, setPredefinedTasksAdded] = React.useState(false);
 
   // Add predefined review tasks when switching to review tab
   useEffect(() => {
-    if (type === 'review' && filteredTasks.length === 0) {
+    if (type === 'review' && filteredTasks.length === 0 && !predefinedTasksAdded) {
+      setPredefinedTasksAdded(true);
       const predefinedTasks = [
         // IMPRESCINDIBLES
         { title: 'Pasaporte, DNI y copias de ambos', description: 'Verificar vigencia y hacer copias físicas y digitales', category: 'imprescindibles' },
@@ -49,7 +51,7 @@
         }, index * 100);
       });
     }
-  }, [type, filteredTasks.length, onAddTask]);
+  }, [type, filteredTasks.length, onAddTask, predefinedTasksAdded]);
 
   if (type === 'review') {
     const categorizedTasks = {