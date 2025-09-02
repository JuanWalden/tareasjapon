import { useState, useEffect } from 'react';
import { firebaseService } from '../lib/firebaseService';
import { isFirebaseConfigured } from '../lib/firebase';
import { localStorageService } from '../lib/localStorage';
import { Task, Traveler } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingLocalStorage, setUsingLocalStorage] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      // Use localStorage as fallback
      setUsingLocalStorage(true);
      const localTasks = localStorageService.getTasks();
      setTasks(localTasks);
      setLoading(false);
      return;
    }

    setUsingLocalStorage(false);
    
    // Subscribe to real-time updates from Firebase
    const unsubscribe = firebaseService.subscribeToTasks((tasks) => {
      setTasks(tasks);
      setLoading(false);
      setError(null);
    });

    // Handle initial load errors
    firebaseService.getTasks().catch((err) => {
      setError(err instanceof Error ? err.message : 'Error connecting to Firebase');
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const addTask = async (title: string, description: string, type: 'pending' | 'review') => {
    if (usingLocalStorage) {
      try {
        const newTask = localStorageService.addTask(title, description, type);
        setTasks(prev => [newTask, ...prev]);
      } catch (err) {
        setError('Error al guardar la tarea localmente');
      }
      return;
    }

    try {
      await firebaseService.addTask(title, description, type);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding task');
    }
  };

  const toggleTaskCompletion = async (taskId: string, traveler: Traveler, completed: boolean) => {
    if (usingLocalStorage) {
      try {
        localStorageService.toggleTaskCompletion(taskId, traveler, completed);
        setTasks(prev => prev.map(task => 
          task.id === taskId 
            ? { ...task, [`${traveler}_completed`]: completed }
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

  const deleteTask = async (taskId: string) => {
    if (usingLocalStorage) {
      try {
        localStorageService.deleteTask(taskId);
        setTasks(prev => prev.filter(task => task.id !== taskId));
      } catch (err) {
        setError('Error al eliminar la tarea');
      }
      return;
    }

    try {
      await firebaseService.deleteTask(taskId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting task');
    }
  };

  const refetch = async () => {
    if (usingLocalStorage) {
      const localTasks = localStorageService.getTasks();
      setTasks(localTasks);
      return;
    }

    try {
      setLoading(true);
      const tasks = await firebaseService.getTasks();
      setTasks(tasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    usingLocalStorage,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    refetch
  };
};