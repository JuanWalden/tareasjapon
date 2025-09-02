@@ .. @@
   const toggleTaskCompletion = async (taskId: string, traveler: Traveler, completed: boolean) => {
     if (usingLocalStorage) {
       try {
         localStorageService.toggleTaskCompletion(taskId, traveler, completed);
         setTasks(prev => prev.map(task => 
           task.id === taskId 
-            ? { ...task, [`${traveler}_completed`]: completed }
+            ? { ...task, [`${traveler}_completed`]: completed } as Task
             : task
         ));
       } catch (err) {
         setError('Error al actualizar la tarea');
       }
       return;
     }
 
     try {
       await firebaseService.updateTaskCompletion(taskId, traveler, completed);
     } catch (err) {
       setError(err instanceof Error ? err.message : 'Error updating task');
     }
   };