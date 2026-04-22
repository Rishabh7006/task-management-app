import { Clock, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';

interface HeaderProps {
  onAddTask: () => void;
  onToggleActivity: () => void;
}

export const Header = ({ onAddTask, onToggleActivity }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800">TaskFlow</h1>
            <p className="text-xs text-slate-500">Manage your workflow</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleActivity}
            className="gap-2"
          >
            <Clock className="w-4 h-4" />
            Activity
          </Button>
          <Button
            size="sm"
            onClick={onAddTask}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>
      </div>
    </header>
  );
};