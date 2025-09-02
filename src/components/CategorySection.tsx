@@ .. @@
   const travelers: Traveler[] = ['maria', 'juan', 'javier', 'helena'];
   
   const completedTasks = tasks.filter(task => {
-    return travelers.every(traveler => task[`${traveler}_completed`]);
+    return travelers.every(traveler => task[`${traveler}_completed` as keyof Task]);
   }).length;
 
   const accentColors = {
@@ .. @@
                 className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                   isTaskCompleted 
                     ? 'border-green-400 bg-green-900/30 shadow-lg shadow-green-500/20' 
                     : 'border-slate-600 bg-slate-700/50 hover:bg-slate-700/70 hover:border-slate-500'
                 }`}
               >
                 <div className="flex items-start justify-between mb-4">
                   <div className="flex items-start space-x-4 flex-1">
                     <div className={`w-6 h-6 mt-1 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                       isTaskCompleted 
                         ? 'bg-green-500 border-green-400 shadow-lg shadow-green-500/30' 
                         : 'border-slate-400 bg-slate-600 hover:border-slate-300'
                     }`}>
                       {isTaskCompleted && (
                         <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                         </svg>
                       )}
                     </div>
                     <div className="flex-1">
                       <h4 className={`font-semibold text-lg transition-all duration-200 ${
                         isTaskCompleted ? 'text-green-300 line-through' : 'text-white'
                       }`}>
                         {task.title}
                       </h4>
                       {task.description && (
                         <p className={`text-sm mt-2 transition-colors duration-200 ${
                           isTaskCompleted ? 'text-green-400/70 line-through' : 'text-slate-300'
                         }`}>
                           {task.description}
                         </p>
                       )}
                     </div>
                   </div>
                   <button
                     onClick={() => onDelete(task.id)}
                     className="text-slate-400 hover:text-red-400 transition-colors duration-200 p-2 ml-2 rounded-lg hover:bg-slate-600"
                   >
                     <Trash2 className="h-5 w-5" />
                   </button>
                 </div>
 
                 <div className="grid grid-cols-4 gap-3">
                   {travelers.map((traveler) => {
                     const travelerInfo = TRAVELERS[traveler];
-                    const completed = task[`${traveler}_completed`];
+                    const completed = task[`${traveler}_completed` as keyof Task];
                     
                     return (
                       <button
                         key={traveler}
                         onClick={() => onToggleCompletion(task.id, traveler, !completed)}
                         className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                           completed
                             ? `${travelerInfo.color} border-transparent text-white shadow-lg transform scale-105`
                             : 'border-slate-500 bg-slate-600 hover:border-slate-400 hover:bg-slate-500 text-slate-200'
                         }`}
                       >
                         <span className="text-2xl">{travelerInfo.avatar}</span>
                         <span className="text-sm font-medium">{travelerInfo.name}</span>
                       </button>
                     );
                   })}
                 </div>
               </div>
             );
           })}
 
           {/* Formulario para agregar nueva tarea a esta categoría */}
           {showAddForm ? (
             <div className="p-5 rounded-xl border-2 border-slate-500 bg-slate-700/50">
               <form onSubmit={handleAddTask} className="space-y-4">
                 <div>
                   <input
                     type="text"
                     value={newTaskTitle}
                     onChange={(e) => setNewTaskTitle(e.target.value)}
                     placeholder="Título de la tarea..."
                     className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors duration-200"
                     required
                   />
                 </div>
                 <div>
                   <textarea
                     value={newTaskDescription}
                     onChange={(e) => setNewTaskDescription(e.target.value)}
                     placeholder="Descripción (opcional)..."
                     rows={2}
                     className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 resize-none transition-colors duration-200"
                   />
                 </div>
                 <div className="flex space-x-3">
                   <button
                     type="submit"
                     className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                   >
                     Agregar
                   </button>
                   <button
                     type="button"
                     onClick={() => setShowAddForm(false)}
                     className="px-4 py-2 border-2 border-slate-500 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                   >
                     Cancelar
                   </button>
                 </div>
               </form>
             </div>
           ) : (
             <button
               onClick={() => setShowAddForm(true)}
               className="w-full p-4 border-2 border-dashed border-slate-500 rounded-xl text-slate-400 hover:text-slate-200 hover:border-slate-400 transition-all duration-200 flex items-center justify-center space-x-2"
             >
               <Plus className="h-5 w-5" />
               <span className="font-medium">Agregar a {title}</span>
             </button>
           )}
         </div>
       )}
     </div>
   );
 };
 
 export default CategorySection;