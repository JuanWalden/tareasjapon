import React, { useState } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import TaskList from './components/TaskList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import FirebasePrompt from './components/FirebasePrompt';
import { useTasks } from './hooks/useTasks';
import { isFirebaseConfigured } from './lib/firebase';
import { Traveler } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'pending' | 'review'>('pending');
  const { tasks, loading, error, usingLocalStorage, addTask, toggleTaskCompletion, deleteTask, refetch } = useTasks();

  if (!isFirebaseConfigured() && !usingLocalStorage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <FirebasePrompt usingLocalStorage={false} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => task.type === 'pending');
  const reviewTasks = tasks.filter(task => task.type === 'review');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {usingLocalStorage && (
        <div className="bg-amber-100 border-b border-amber-200 py-2">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-amber-800 text-sm">
              📱 Funcionando en modo local - Configura Firebase para sincronización en la nube
            </p>
          </div>
        </div>
      )}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingCount={pendingTasks.length}
        reviewCount={reviewTasks.length}
      />
      
      <main className="pb-8">
        <TaskList
          tasks={tasks}
          type={activeTab}
          onToggleCompletion={toggleTaskCompletion}
          onDelete={deleteTask}
          onAddTask={addTask}
        />
      </main>
    </div>
  );
}

export default App;