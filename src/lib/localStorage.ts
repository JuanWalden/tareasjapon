@@ .. @@
   updateTask: (taskId: string, updates: Partial<Task>): void => {
     const tasks = localStorageService.getTasks();
     const taskIndex = tasks.findIndex(task => task.id === taskId);
     
     if (taskIndex !== -1) {
-      tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
+      tasks[taskIndex] = { ...tasks[taskIndex], ...updates } as Task;
       localStorageService.saveTasks(tasks);
     }
   },
 
   deleteTask: (taskId: string): void => {
     const tasks = localStorageService.getTasks();
     const filteredTasks = tasks.filter(task => task.id !== taskId);
     localStorageService.saveTasks(filteredTasks);
   },
 
   toggleTaskCompletion: (taskId: string, traveler: Traveler, completed: boolean): void => {
     localStorageService.updateTask(taskId, {
-      [`${traveler}_completed`]: completed
-    });
+      [`${traveler}_completed`]: completed
+    } as Partial<Task>);
   }
 };