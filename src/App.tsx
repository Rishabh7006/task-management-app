import { useState, useCallback } from 'react';
import { Task, TaskStatus, FilterState, TaskFormData } from './types';
import { useTaskStore } from './utils/useTaskStore';
import { filterTasks, groupTasksByStatus } from './utils/helpers';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { TaskColumn } from './components/TaskColumn';
import { TaskModal } from './components/TaskModal';
import { ActivityLogPanel } from './components/ActivityLog';

const STATUS_ORDER: TaskStatus[] = ['backlog', 'in-progress', 'in-review', 'done'];

export default function App() {
  const { tasks, activityLog, isLoading, createTask, updateTask, deleteTask, moveTask } = useTaskStore();
  const [filters, setFilters] = useState<FilterState>({ search: '', assignee: 'all', priority: 'all' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('backlog');
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const filteredTasks = filterTasks(tasks, filters);
  const groupedTasks = groupTasksByStatus(filteredTasks);

  const handleAddTask = useCallback((status: TaskStatus = 'backlog') => {
    setEditingTask(null);
    setDefaultStatus(status);
    setIsModalOpen(true);
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleSaveTask = useCallback((data: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      createTask(data);
    }
  }, [editingTask, createTask, updateTask]);

  const handleDragStart = useCallback((e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      moveTask(draggedTask.id, status);
    }
    setDraggedTask(null);
  }, [draggedTask, moveTask]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        onAddTask={() => handleAddTask()} 
        onToggleActivity={() => setIsActivityOpen(true)}
      />
      
      <FilterBar filters={filters} onFilterChange={setFilters} />
      
      <main className="flex-1 p-6 overflow-hidden">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <div className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-2xl mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No tasks yet</h3>
            <p className="text-sm mb-4">Get started by creating your first task</p>
            <button
              onClick={() => handleAddTask()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Task
            </button>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <div className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl mb-3" />
            <p className="text-sm">No tasks match your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
            {STATUS_ORDER.map(status => (
              <TaskColumn
                key={status}
                status={status}
                tasks={groupedTasks[status]}
                onEditTask={handleEditTask}
                onDeleteTask={deleteTask}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onAddTask={handleAddTask}
              />
            ))}
          </div>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
        defaultStatus={defaultStatus}
      />

      <ActivityLogPanel
        activities={activityLog}
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
      />
    </div>
  );
}