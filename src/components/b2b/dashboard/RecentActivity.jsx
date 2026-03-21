import { MessageSquare, Building2, UserCheck, CreditCard, Activity } from 'lucide-react';

const ICON_MAP = {
  onboarding: Building2,
  capacity: Activity,
  message: MessageSquare,
  housing: UserCheck,
  payment: CreditCard,
  case: Activity,
};

const COLOR_MAP = {
  onboarding: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  capacity: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
  message: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  housing: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  payment: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
  case: 'text-red-500 bg-red-50 dark:bg-red-900/20',
};

export default function RecentActivity({ activity }) {
  const getRelativeTime = (dateStr) => {
    const diff = new Date() - new Date(dateStr);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 h-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 uppercase tracking-tight">Recent Partner Activity</h3>
      
      <div className="flex-grow space-y-4 pt-4">
        {activity.slice(0, 7).map(item => {
          const Icon = ICON_MAP[item.type] || Activity;
          const colors = COLOR_MAP[item.type] || 'text-gray-500 bg-gray-50 dark:bg-gray-800';
          
          return (
            <div key={item.id} className="flex gap-4 group">
              <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${colors} transition-transform group-hover:scale-105`}>
                <Icon size={14} />
              </div>
              <div className="flex-grow min-w-0 border-l border-gray-50 dark:border-gray-700 pl-4 py-0.5">
                <p className="text-xs text-gray-700 dark:text-gray-300 font-medium line-clamp-2 leading-snug">
                  {item.text}
                </p>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {getRelativeTime(item.timestamp)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
