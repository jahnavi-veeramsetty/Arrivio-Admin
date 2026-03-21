import { Search, User, MessageSquare } from 'lucide-react';

export default function ThreadList({ threads, activeThreadId, onSelectThread }) {
  const getRelativeTime = (dateStr) => {
    const diff = new Date() - new Date(dateStr);
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800">
      {/* Search */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs focus:ring-2 focus:ring-[#1a6644] transition-all"
          />
        </div>
      </div>

      {/* Threads */}
      <div className="flex-grow overflow-y-auto">
        {threads.map((t) => {
          const isActive = activeThreadId === t.id;
          
          return (
            <div 
              key={t.id} 
              onClick={() => onSelectThread(t)}
              className={`p-4 cursor-pointer transition-all border-l-4 ${
                isActive 
                  ? 'bg-[#1a6644]/5 border-[#1a6644] dark:bg-[#1a6644]/10' 
                  : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="text-[13px] font-bold text-gray-800 dark:text-gray-200 truncate">{t.partnerName}</div>
                <span className="text-[9px] font-bold text-gray-400 uppercase">{getRelativeTime(t.timestamp)}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 truncate pr-4 leading-tight">{t.lastMessage}</p>
                {t.unreadCount > 0 && (
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1a6644] text-white text-[9px] flex items-center justify-center font-bold">
                    {t.unreadCount}
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                  <User size={10} />
                </div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{t.assignedTo}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
