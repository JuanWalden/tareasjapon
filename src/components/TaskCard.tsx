@@ .. @@
   const [isExpanded, setIsExpanded] = React.useState(false);
   const travelers: Traveler[] = ['maria', 'juan', 'javier', 'helena'];
   const completedCount = travelers.reduce((count, traveler) => {
-    return count + (task[`${traveler}_completed`] ? 1 : 0);
+    return count + (task[`${traveler}_completed` as keyof Task] ? 1 : 0);
   }, 0);
 
   const isFullyCompleted = completedCount === 4;
@@ .. @@
             <div className="grid grid-cols-2 gap-3">
               {travelers.map((traveler) => (
                 <TravelerCheckbox
                   key={traveler}
                   traveler={traveler}
-                  completed={task[`${traveler}_completed`]}
+                  completed={task[`${traveler}_completed` as keyof Task] as boolean}
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