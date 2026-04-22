import { FilterState, TaskPriority } from '../types';
import { ASSIGNEES } from '../utils/constants';
import { Search, X } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  const hasActiveFilters = filters.search || (filters.assignee && filters.assignee !== 'all') || (filters.priority && filters.priority !== 'all');

  const clearFilters = () => {
    onFilterChange({ search: '', assignee: 'all', priority: 'all' });
  };

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        <Select
          value={filters.assignee || 'all'}
          onValueChange={(value) => onFilterChange({ ...filters, assignee: value })}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All assignees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All assignees</SelectItem>
            {ASSIGNEES.map(name => (
              <SelectItem key={name} value={name}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.priority || 'all'}
          onValueChange={(value: TaskPriority | 'all') => onFilterChange({ ...filters, priority: value })}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};