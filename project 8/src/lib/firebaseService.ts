import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  orderBy, 
  query,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Task, Traveler } from '../types';

const COLLECTION_NAME = 'tasks';

export const firebaseService = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    if (!db) throw new Error('Firebase not configured');
    
    const q = query(collection(db, COLLECTION_NAME), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString()
    })) as Task[];
  },

  // Subscribe to real-time updates
  subscribeToTasks: (callback: (tasks: Task[]) => void) => {
    if (!db) throw new Error('Firebase not configured');
    
    const q = query(collection(db, COLLECTION_NAME), orderBy('created_at', 'desc'));
    
    return onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString()
      })) as Task[];
      
      callback(tasks);
    });
  },

  // Add new task
  addTask: async (title: string, description: string, type: 'pending' | 'review'): Promise<void> => {
    if (!db) throw new Error('Firebase not configured');
    
    await addDoc(collection(db, COLLECTION_NAME), {
      title,
      description: description || null,
      type,
      created_at: Timestamp.now(),
      maria_completed: false,
      juan_completed: false,
      javier_completed: false,
      helena_completed: false
    });
  },

  // Update task completion status
  updateTaskCompletion: async (taskId: string, traveler: Traveler, completed: boolean): Promise<void> => {
    if (!db) throw new Error('Firebase not configured');
    
    const taskRef = doc(db, COLLECTION_NAME, taskId);
    await updateDoc(taskRef, {
      [`${traveler}_completed`]: completed
    });
  },

  // Delete task
  deleteTask: async (taskId: string): Promise<void> => {
    if (!db) throw new Error('Firebase not configured');
    
    const taskRef = doc(db, COLLECTION_NAME, taskId);
    await deleteDoc(taskRef);
  }
};