import { Task, TaskStatus } from '../types';
import { STATUS_CONFIG } from '../utils/constants';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: TaskStatus) => void;
  onAddTask: (status: TaskStatus) => void;
}

export const TaskColumn = ({
  status,
  tasks,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop,
  onAddTask,
}: TaskColumnProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <div
      className="flex flex-col h-full"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.color}`}>
            {config.label}
          </span>
          <span className="text-slate-400 text-sm font-medium">{tasks.length}</span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          title="Add task"
        >
          <Plus className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 -mr-1 min-h-0">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-slate-400">
            <div className="w-12 h-12 border-2 border-dashed border-slate-200 rounded-lg mb-2" />
            <p className="text-sm">No tasks</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
};