import { useState, useEffect, useCallback } from 'react';
import type { Task, TaskStatus, TaskFormData, ActivityLog } from "../types";
import { INITIAL_TASKS } from './constants';
import { generateId, saveToLocalStorage, loadFromLocalStorage, createActivityLog } from './helpers';

const TASKS_KEY = 'taskflow_tasks';
const ACTIVITY_KEY = 'taskflow_activity';

export const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTasks = loadFromLocalStorage<Task[]>(TASKS_KEY, INITIAL_TASKS);
    const savedActivity = loadFromLocalStorage<ActivityLog[]>(ACTIVITY_KEY, []);
    setTasks(savedTasks);
    setActivityLog(savedActivity);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveToLocalStorage(TASKS_KEY, tasks);
    }
  }, [tasks, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveToLocalStorage(ACTIVITY_KEY, activityLog);
    }
  }, [activityLog, isLoading]);

  const addActivity = useCallback((taskId: string, action: string, details?: string) => {
    const log = createActivityLog(taskId, action, details);
    setActivityLog(prev => [log, ...prev].slice(0, 100));
  }, []);

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

  const updateTask = useCallback((id: string, data: Partial<TaskFormData>) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== id) return task;
      const updated = { ...task, ...data };
      
      if (data.status && data.status !== task.status) {
        addActivity(id, 'Status changed', `Moved from "${task.status}" to "${data.status}"`);
      } else {
        addActivity(id, 'Task updated', `Updated "${task.title}"`);
      }
      
      return updated;
    }));
  }, [addActivity]);

  const deleteTask = useCallback((id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    if (task) {
      addActivity(id, 'Task deleted', `Deleted "${task.title}"`);
    }
  }, [tasks, addActivity]);

  const moveTask = useCallback((id: string, newStatus: TaskStatus) => {
    updateTask(id, { status: newStatus });
  }, [updateTask]);

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