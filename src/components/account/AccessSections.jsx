import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { navConfig } from '../layout/navConfig';
import { CheckCircle2 } from 'lucide-react';

const roleLabels = {
  super_admin:       'Super Admin',
  ops_manager:       'Ops Manager',
  sales_partnership: 'Sales & Partnerships',
  finance_manager:   'Finance Manager',
  support_agent:     'Support Agent',
  community_manager: 'Community Manager',
};

export default function AccessSections() {
  const { user, activeRole } = useAuth();
  const navigate = useNavigate();

  const role = activeRole || user?.roles?.[0];

  const accessibleSections = navConfig
    .filter(section => section.roles.includes(role))
    .map(section => ({
      ...section,
      subs: section.subs.filter(sub => sub.roles.includes(role)),
    }))
    .filter(s => s.subs.length > 0);

  return (
    <div className="flex-grow min-w-0 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Your Access</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          Sections and pages accessible under your current role —{' '}
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {roleLabels[role] || role}
          </span>
        </p>
      </div>

      {accessibleSections.map(section => {
        const Icon = section.icon;
        return (
          <div
            key={section.id}
            className="bg-white dark:bg-[#1a1d23] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden"
          >
            {/* Section header */}
            <div className="bg-gray-50 dark:bg-white/5 px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
              <Icon size={14} className="text-[#1a6644]" />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest">
                {section.label}
              </span>
              <span className="ml-auto text-xs text-gray-400 dark:text-gray-600">
                {section.subs.length} pages
              </span>
            </div>

            {/* Subsections */}
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {section.subs.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => navigate(sub.route)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left group"
                >
                  <span>{sub.label}</span>
                  <CheckCircle2 size={14} className="text-gray-200 dark:text-gray-700 group-hover:text-[#1a6644] transition-colors" />
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
