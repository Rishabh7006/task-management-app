import { ActivityLog as ActivityLogType } from '../types';
import { formatDateTime } from '../utils/helpers';
import { Clock } from 'lucide-react';

interface ActivityLogProps {
  activities: ActivityLogType[];
  isOpen: boolean;
  onClose: () => void;
}

export const ActivityLogPanel = ({ activities, isOpen, onClose }: ActivityLogProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-slate-900/30" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-96 bg-white shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Activity Log</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Clock className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">No activity yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="relative pl-6 pb-4 border-l-2 border-slate-200 last:border-transparent"
                >
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white" />
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-slate-700">{activity.action}</p>
                    {activity.details && (
                      <p className="text-xs text-slate-500 mt-1">{activity.details}</p>
                    )}
                    <p className="text-xs text-slate-400 mt-2">{formatDateTime(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

import { X } from 'lucide-react';