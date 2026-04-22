import { Task } from '../types';
import { PRIORITY_CONFIG } from '../utils/constants';
import { formatDate, isOverdue } from '../utils/helpers';
import { Calendar, User, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onDragStart }: TaskCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const priority = PRIORITY_CONFIG[task.priority];
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className="group bg-white border border-slate-200 rounded-lg p-4 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-slate-300 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h4 className="font-medium text-slate-800 text-sm leading-snug line-clamp-2">
          {task.title}
        </h4>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded transition-all"
          >
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-6 z-20 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-32">
                <button
                  onClick={() => {
                    onEdit(task);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {task.description && (
        <p className="text-slate-500 text-xs mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${priority.bgColor} ${priority.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dotColor}`} />
          {priority.label}
        </span>
        {overdue && (
          <span className="text-xs text-red-500 font-medium">Overdue</span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <User className="w-3.5 h-3.5" />
          <span className="truncate max-w-24">{task.assignee}</span>
        </div>
        <div className={`flex items-center gap-1 ${overdue ? 'text-red-500' : ''}`}>
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
      </div>
    </div>
  );
};