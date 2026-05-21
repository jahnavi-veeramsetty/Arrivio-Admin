import React, { useState } from 'react';
import { Calendar as CalendarIcon, List } from 'lucide-react';
import MoveCalendar from '../../components/b2c/move/MoveCalendar';
import MoveListView from '../../components/b2c/move/MoveListView';
import { useToast } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { mockMoveEvents } from '../../mockdata/b2cData';

export default function MovePage() {
  const canAction = useRole(['super_admin', 'ops_manager']);
  const { show, addToast } = useToast();
  const [viewMode, setViewMode] = useState('calendar');

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2C OPERATION | MOVE-INS & RENEWALS</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-white dark:bg-gray-800 p-1.5 rounded-[1.25rem] shadow-sm border border-gray-100 dark:border-gray-700 self-start md:self-end">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${viewMode === 'calendar' ? 'bg-[#1a6644] text-white shadow-md' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
          >
            <CalendarIcon size={16} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Calendar</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-[#1a6644] text-white shadow-md' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
          >
            <List size={16} />
            <span className="text-[10px] font-bold uppercase tracking-wider">List View</span>
          </button>
        </div>
      </div>
      
      {viewMode === 'calendar' ? (
        <MoveCalendar events={mockMoveEvents} />
      ) : (
        <MoveListView events={mockMoveEvents} />
      )}
      
    </div>
  );
}
