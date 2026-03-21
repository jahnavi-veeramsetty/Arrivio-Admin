import { useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { navConfig } from './navConfig';

export default function Topbar() {
  const { user } = useAuth();
  const location = useLocation();

  // Derive breadcrumb from current route
  let sectionLabel = '';
  let subLabel = '';
  for (const section of navConfig) {
    const match = section.subs.find(s => s.route === location.pathname);
    if (match) {
      sectionLabel = section.label;
      subLabel = match.label;
      break;
    }
  }
  if (location.pathname === '/admin/account') {
    sectionLabel = 'Account';
    subLabel = '';
  }

  return (
    <header
      className="flex items-center justify-between px-6 bg-white dark:bg-[#1a1d23] border-b border-gray-100 dark:border-gray-800 transition-colors duration-200"
      style={{ height: '56px', minHeight: '56px' }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        {sectionLabel ? (
          <>
            <span className="text-gray-400 dark:text-gray-500">{sectionLabel}</span>
            {subLabel && subLabel !== sectionLabel && (
              <>
                <span className="text-gray-300 dark:text-gray-700">/</span>
                <span className="text-gray-700 dark:text-gray-200">{subLabel}</span>
              </>
            )}
          </>
        ) : (
          <span className="text-gray-400 dark:text-gray-500">Arrivio Admin</span>
        )}
      </div>

      {/* Right: Notifications */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-[#1a6644] rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
