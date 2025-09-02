import { Task, Traveler } from '../types';

const STORAGE_KEY = 'travel-tasks';

export const localStorageService = {
  getTasks: (): Task[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  addTask: (title: string, description: string, type: 'pending' | 'review'): Task => {
    const tasks = localStorageService.getTasks();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description: description || null,
      type,
      created_at: new Date().toISOString(),
      maria_completed: false,
      juan_completed: false,
      javier_completed: false,
      helena_completed: false
    };
    
    tasks.unshift(newTask);
    localStorageService.saveTasks(tasks);
    return newTask;
  },

  updateTask: (taskId: string, updates: Partial<Task>): void => {
    const tasks = localStorageService.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
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
      [`${traveler}_completed`]: completed
    });
  }
};