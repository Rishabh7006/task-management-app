// @RK - Defines task stages and priority levels used across the app
export type TaskStatus = 'backlog' | 'in-progress' | 'in-review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

// @RK - Main task object structure used for storing and displaying tasks
export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

// @RK - Form data structure used while creating or editing a task
export interface TaskFormData {
  title: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

// @RK - Stores filter values for search, assignee, and priority filtering
export interface FilterState {
  search: string;
  assignee: string;
  priority: TaskPriority | 'all';
}

// @RK - Tracks activity history like create, update, delete actions
export interface ActivityLog {
  id: string;
  taskId: string;
  action: string;
  timestamp: string;
  details?: string;
}