import type { Task, TaskStatus, FilterState, ActivityLog } from "../types";

// @RK - Generates a unique ID for tasks and activity logs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// @RK - Formats date into a readable format (e.g., Jan 10, 2026)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// @RK - Formats date with time for activity logs
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

// @RK - Checks if a task is overdue (only if not already completed)
export const isOverdue = (dueDate: string, status: TaskStatus): boolean => {
  if (status === 'done') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

// @RK - Filters tasks based on search text, assignee, and priority
export const filterTasks = (tasks: Task[], filters: FilterState): Task[] => {
  return tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesAssignee = !filters.assignee || filters.assignee === 'all' || task.assignee === filters.assignee;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    
    return matchesSearch && matchesAssignee && matchesPriority;
  });
};

// @RK - Groups tasks into columns based on their status for Kanban board
export const groupTasksByStatus = (tasks: Task[]): Record<TaskStatus, Task[]> => {
  return {
    'backlog': tasks.filter(t => t.status === 'backlog'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    'in-review': tasks.filter(t => t.status === 'in-review'),
    'done': tasks.filter(t => t.status === 'done'),
  };
};

// @RK - Creates an activity log entry for tracking task actions
export const createActivityLog = (taskId: string, action: string, details?: string): ActivityLog => ({
  id: generateId(),
  taskId,
  action,
  timestamp: new Date().toISOString(),
  details,
});

// @RK - Saves data to localStorage with error handling
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// @RK - Loads data from localStorage or returns default value if not found
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};