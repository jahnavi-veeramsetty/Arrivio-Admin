import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { navConfig } from './navConfig';
import greenLogo from '../../assets/greenlogo.png';
import whiteLogo from '../../assets/whitelogo.png';
import { useTheme } from '../../context/ThemeContext';

const roleBadgeMap = {
  super_admin: { bg: 'bg-red-100 dark:bg-red-900/40', text: 'text-red-700 dark:text-red-400', label: 'Super Admin' },
  ops_manager: { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-400', label: 'Ops Manager' },
  sales_partnership: { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-400', label: 'Sales & Partners' },
  finance_manager: { bg: 'bg-yellow-100 dark:bg-yellow-900/40', text: 'text-yellow-700 dark:text-yellow-400', label: 'Finance' },
  support_agent: { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-400', label: 'Support' },
  community_manager: { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-400', label: 'Community' },
};

export default function Sidebar() {
  const { user, activeRole } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [openSections, setOpenSections] = useState(() => {
    const initial = {};
    navConfig.forEach(section => {
      if (section.subs.some(s => s.route === location.pathname)) {
        initial[section.id] = true;
      }
    });
    return initial;
  });

  const role = activeRole || (user?.roles?.[0]);
  const badge = roleBadgeMap[role] || { bg: 'bg-gray-100', text: 'text-gray-700', label: role };

  const visibleSections = navConfig
    .filter(section => section.roles.includes(role))
    .map(section => ({
      ...section,
      subs: section.subs.filter(sub => sub.roles.includes(role)),
    }))
    .filter(section => section.subs.length > 0 || section.route);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '??';

  return (
    <aside
      className="flex flex-col h-screen bg-white dark:bg-[#141619] border-r border-gray-100 dark:border-gray-800 transition-colors duration-200"
      style={{ width: '220px', minWidth: '220px', flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="flex items-center px-5 py-5 border-b border-gray-100 dark:border-gray-800">
        <img src={theme === 'dark' ? whiteLogo : greenLogo} alt="Arrivio" className="h-7 w-auto object-contain" />
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto py-4 px-2 space-y-1">
        {visibleSections.map(section => {
          const Icon = section.icon;
          const isOpen = openSections[section.id] ?? false;
          const isActiveSub    = section.subs.some(s => s.route === location.pathname);
          const isActiveHeader = section.route && location.pathname === section.route;
          const isActiveSection = isActiveSub || isActiveHeader;

          return (
            <div key={section.id}>
              <button
                onClick={() => {
                  // navigate to section route if it has one
                  if (section.route) navigate(section.route);
                  // always toggle open/closed
                  setOpenSections(prev => ({ ...prev, [section.id]: !prev[section.id] }));
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors group
                  ${isActiveSection
                    ? 'text-[#1a6644] bg-[#1a6644]/5 dark:bg-[#1a6644]/10'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    size={16}
                  className={isActiveSection ? 'text-[#1a6644]' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'}
                  strokeWidth={isActiveSection ? 2.5 : 2}
                />
                <span>{section.label}</span>
              </div>
              {section.subs.length > 0 && (
                isOpen
                  ? <ChevronDown size={14} className="text-gray-400 dark:text-gray-600" />
                  : <ChevronRight size={14} className="text-gray-400 dark:text-gray-600" />
              )}
            </button>

              {isOpen && (
                <div className="mt-0.5 ml-5 space-y-0.5">
                  {section.subs.map(sub => {
                    const isActive = location.pathname === sub.route;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => navigate(sub.route)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-all duration-150 border-l-2
                          ${isActive
                            ? 'text-[#1a6644] border-[#1a6644] bg-[#1a6644]/5 dark:bg-[#1a6644]/10 font-semibold'
                            : 'text-gray-500 dark:text-gray-500 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 font-normal'
                          }`}
                      >
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom User Area */}
      <div className="relative border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => navigate('/admin/account')}
          className={`w-full flex items-center gap-2.5 p-4 transition-colors text-left
            ${location.pathname === '/admin/account'
              ? 'bg-[#1a6644]/5 dark:bg-[#1a6644]/10'
              : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
        >
          <div className={`h-8 w-8 rounded-full ${badge.bg} ${badge.text} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
            {initials}
          </div>
          <div className="min-w-0 flex-grow">
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{user?.name}</p>
            <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${badge.bg} ${badge.text} uppercase tracking-wide`}>
              {badge.label}
            </span>
          </div>
          <ChevronRight
            size={14}
            className={`flex-shrink-0 transition-colors ${location.pathname === '/admin/account' ? 'text-[#1a6644]' : 'text-gray-200 dark:text-gray-700'
              }`}
          />
        </button>
      </div>
    </aside>
  );
}
