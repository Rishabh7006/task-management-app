import type { TaskStatus, TaskPriority } from "../types";

export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; bgColor: string }> = {
  'backlog': { label: 'Backlog', color: 'text-slate-600', bgColor: 'bg-slate-100' },
  'in-progress': { label: 'In Progress', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  'in-review': { label: 'In Review', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  'done': { label: 'Done', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
};

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string; bgColor: string; dotColor: string }> = {
  'low': { label: 'Low', color: 'text-slate-600', bgColor: 'bg-slate-50', dotColor: 'bg-slate-400' },
  'medium': { label: 'Medium', color: 'text-blue-600', bgColor: 'bg-blue-50', dotColor: 'bg-blue-400' },
  'high': { label: 'High', color: 'text-orange-600', bgColor: 'bg-orange-50', dotColor: 'bg-orange-400' },
  'urgent': { label: 'Urgent', color: 'text-red-600', bgColor: 'bg-red-50', dotColor: 'bg-red-500' },
};

export const ASSIGNEES = [
  'Sarah Chen',
  'Marcus Johnson',
  'Emily Rodriguez',
  'David Kim',
  'Alex Thompson',
];

// helper
const today = new Date();
const format = (date: Date) => date.toISOString().split("T")[0];
const daysAgo = (d: number) => new Date(today.getTime() - d * 24 * 60 * 60 * 1000);
const daysFromNow = (d: number) => new Date(today.getTime() + d * 24 * 60 * 60 * 1000);

export const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Design system documentation',
    description: 'Create comprehensive documentation for the design system including components, patterns, and usage guidelines.',
    assignee: 'Sarah Chen',
    priority: 'high' as TaskPriority,
    status: 'in-progress' as TaskStatus,
    dueDate: format(daysFromNow(5)),
    createdAt: daysAgo(2).toISOString(),
  },
  {
    id: '2',
    title: 'API integration for user dashboard',
    description: 'Integrate the analytics API endpoints with the user dashboard component.',
    assignee: 'Marcus Johnson',
    priority: 'medium' as TaskPriority,
    status: 'in-review' as TaskStatus,
    dueDate: format(daysFromNow(3)),
    createdAt: daysAgo(4).toISOString(),
  },
  {
    id: '3',
    title: 'Mobile responsive fixes',
    description: 'Fix layout issues on mobile devices for the main application views.',
    assignee: 'Emily Rodriguez',
    priority: 'low' as TaskPriority,
    status: 'backlog' as TaskStatus,
    dueDate: format(daysFromNow(7)),
    createdAt: daysAgo(1).toISOString(),
  },
  {
    id: '4',
    title: 'Performance optimization',
    description: 'Optimize bundle size and implement lazy loading for better performance.',
    assignee: 'David Kim',
    priority: 'urgent' as TaskPriority,
    status: 'in-progress' as TaskStatus,
    dueDate: format(daysFromNow(2)),
    createdAt: daysAgo(6).toISOString(),
  },
  {
    id: '5',
    title: 'User authentication flow',
    description: 'Implement OAuth2 authentication with proper session management.',
    assignee: 'Alex Thompson',
    priority: 'high' as TaskPriority,
    status: 'done' as TaskStatus,
    dueDate: format(daysAgo(2)),
    createdAt: daysAgo(10).toISOString(),
  },
  {
    id: '6',
    title: 'Database migration scripts',
    description: 'Create migration scripts for the new database schema changes.',
    assignee: 'Marcus Johnson',
    priority: 'medium' as TaskPriority,
    status: 'backlog' as TaskStatus,
    dueDate: format(daysFromNow(10)),
    createdAt: daysAgo(3).toISOString(),
  },
];