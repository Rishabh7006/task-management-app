import { useState, useEffect, useCallback } from 'react';
import type { Task, TaskStatus, TaskFormData, ActivityLog } from "../types";
import { INITIAL_TASKS } from './constants';
import { generateId, saveToLocalStorage, loadFromLocalStorage, createActivityLog } from './helpers';

// @RK - Keys used to store tasks and activity logs in localStorage
const TASKS_KEY = 'taskflow_tasks';
const ACTIVITY_KEY = 'taskflow_activity';

// @RK - Custom hook to manage all task data and actions (acts like a central store)
export const useTaskStore = () => {

  // @RK - Main state for tasks, activity history, and loading flag
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // @RK - Load tasks and activity data from localStorage on first render
  useEffect(() => {
    const savedTasks = loadFromLocalStorage<Task[]>(TASKS_KEY, INITIAL_TASKS);
    const savedActivity = loadFromLocalStorage<ActivityLog[]>(ACTIVITY_KEY, []);
    setTasks(savedTasks);
    setActivityLog(savedActivity);
    setIsLoading(false);
  }, []);

  // @RK - Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (!isLoading) {
      saveToLocalStorage(TASKS_KEY, tasks);
    }
  }, [tasks, isLoading]);

  // @RK - Save activity log to localStorage whenever activity changes
  useEffect(() => {
    if (!isLoading) {
      saveToLocalStorage(ACTIVITY_KEY, activityLog);
    }
  }, [activityLog, isLoading]);

  // @RK - Adds a new activity log entry (keeps only latest 100 logs)
  const addActivity = useCallback((taskId: string, action: string, details?: string) => {
    const log = createActivityLog(taskId, action, details);
    setActivityLog(prev => [log, ...prev].slice(0, 100));
  }, []);

  // @RK - Creates a new task, updates state, and logs activity
  const createTask = useCallback((data: TaskFormData): Task => {
    const newTask: Task = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    addActivity(newTask.id, 'Task created', `Created "${data.title}"`);
    return newTask;
  }, [addActivity]);

  // @RK - Updates an existing task and logs whether status changed or general update
  const updateTask = useCallback((id: string, data: Partial<TaskFormData>) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== id) return task;
      // const updated = { ...task, ...data };
      const updated = {
        ...task,
        ...data,
        status: data.status || task.status, // @RK - prevent empty status breaking board
      };
      
      if (data.status && data.status !== task.status) {
        addActivity(id, 'Status changed', `Moved from "${task.status}" to "${data.status}"`);
      } else {
        addActivity(id, 'Task updated', `Updated "${task.title}"`);
      }
      
      return updated;
    }));
  }, [addActivity]);

  // @RK - Deletes a task and logs the deletion activity
  const deleteTask = useCallback((id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    if (task) {
      addActivity(id, 'Task deleted', `Deleted "${task.title}"`);
    }
  }, [tasks, addActivity]);

  // @RK - Moves a task between columns by updating its status
  const moveTask = useCallback((id: string, newStatus: TaskStatus) => {
    updateTask(id, { status: newStatus });
  }, [updateTask]);

  // @RK - Exposing state and actions to be used across the app
  return {
    tasks,
    activityLog,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
  };
};