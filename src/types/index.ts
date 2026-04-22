export type TaskStatus = 'backlog' | 'in-progress' | 'in-review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

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

export interface TaskFormData {
  title: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface FilterState {
  search: string;
  assignee: string;
  priority: TaskPriority | 'all';
}

export interface ActivityLog {
  id: string;
  taskId: string;
  action: string;
  timestamp: string;
  details?: string;
}