import type { Task, TaskStatus, FilterState, ActivityLog } from "../types";

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

export const isOverdue = (dueDate: string, status: TaskStatus): boolean => {
  if (status === 'done') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

export const filterTasks = (tasks: Task[], filters: FilterState): Task[] => {
  return tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesAssignee = !filters.assignee || filters.assignee === 'all' || task.assignee === filters.assignee;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    
    return matchesSearch && matchesAssignee && matchesPriority;
  });
};

export const groupTasksByStatus = (tasks: Task[]): Record<TaskStatus, Task[]> => {
  return {
    'backlog': tasks.filter(t => t.status === 'backlog'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    'in-review': tasks.filter(t => t.status === 'in-review'),
    'done': tasks.filter(t => t.status === 'done'),
  };
};

export const createActivityLog = (taskId: string, action: string, details?: string): ActivityLog => ({
  id: generateId(),
  taskId,
  action,
  timestamp: new Date().toISOString(),
  details,
});

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};