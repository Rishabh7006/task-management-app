import { useState, useEffect } from 'react';
import { Task, TaskFormData, TaskStatus, TaskPriority } from '../types';
import { ASSIGNEES } from '../utils/constants';
import { X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

// @RK - Props for controlling modal visibility, saving data, and handling edit mode
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
  task?: Task | null;
  defaultStatus?: TaskStatus;
}

// @RK - Modal component used for both creating and editing tasks
export const TaskModal = ({ isOpen, onClose, onSave, task, defaultStatus = 'backlog' }: TaskModalProps) => {

  // @RK - Form state to manage all input fields inside the modal
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    assignee: ASSIGNEES[0],
    priority: 'medium',
    status: defaultStatus,
    dueDate: new Date().toISOString().split('T')[0],
  });

  // @RK - Stores validation errors for form fields
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  // @RK - Updates form when editing an existing task or resetting for new task
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        assignee: ASSIGNEES[0],
        priority: 'medium',
        status: defaultStatus,
        dueDate: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [task, defaultStatus, isOpen]);

  // @RK - Simple validation to ensure required fields are filled before saving
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // @RK - Handles form submission, validates input, and sends data to parent
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  // @RK - Do not render modal if it is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* @RK - Background overlay to close modal on click */}
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* @RK - Main modal container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* @RK - Modal header with title and close button */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* @RK - Form section for input fields */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* @RK - Title input */}
          <div>
            <Label htmlFor="title" className="text-slate-700 font-medium">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title..."
              className={`mt-1.5 ${errors.title ? 'border-red-300 focus:border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* @RK - Description input */}
          <div>
            <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add a description..."
              rows={3}
              className="mt-1.5 resize-none"
            />
          </div>

          {/* @RK - Assignee and Priority selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-700 font-medium">Assignee</Label>
              <Select
                value={formData.assignee}
                onValueChange={(value) => setFormData({ ...formData, assignee: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {ASSIGNEES.map(name => (
                    <SelectItem key={name} value={name}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-slate-700 font-medium">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: TaskPriority) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* @RK - Status and Due Date selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-700 font-medium">Status</Label>
              <Select
                value={formData.status || defaultStatus} // @RK - fallback to avoid empty status
                onValueChange={(value: TaskStatus) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dueDate" className="text-slate-700 font-medium">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`mt-1.5 ${errors.dueDate ? 'border-red-300 focus:border-red-500' : ''}`}
              />
              {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
            </div>
          </div>

          {/* @RK - Action buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
              {task ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};