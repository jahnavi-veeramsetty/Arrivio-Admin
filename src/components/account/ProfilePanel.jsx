import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LogOut, Lock, Sun, Moon } from 'lucide-react';

const roleConfig = {
  super_admin:       { label: 'Super Admin',          dot: 'bg-red-400'     },
  ops_manager:       { label: 'Ops Manager',          dot: 'bg-emerald-400' },
  sales_partnership: { label: 'Sales & Partnerships', dot: 'bg-blue-400'    },
  finance_manager:   { label: 'Finance Manager',      dot: 'bg-yellow-400'  },
  support_agent:     { label: 'Support Agent',        dot: 'bg-orange-400'  },
  community_manager: { label: 'Community Manager',    dot: 'bg-purple-400'  },
};

export default function ProfilePanel() {
  const { user, activeRole, selectRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const role = activeRole || user?.roles?.[0];
  const roleMeta = roleConfig[role] || { label: role, dot: 'bg-gray-400' };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '??';

  const handleSwitchRole = (roleId) => {
    selectRole(roleId);
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isSuperAdmin = user?.roles?.includes('super_admin');
  const rolesToDisplay = isSuperAdmin ? Object.keys(roleConfig) : (user?.roles || []);

  return (
    <div
      className="w-64 flex-shrink-0 rounded-2xl overflow-hidden sticky top-0"
      style={{ background: '#1e2329', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* ── Profile header ── */}
      <div className="p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="h-11 w-11 rounded-xl text-base flex items-center justify-center flex-shrink-0"
            style={{ background: '#1a6644', color: 'white' }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            <span
              className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full uppercase"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#d1fae5' }}
            >
              {roleMeta.label}
            </span>
          </div>
        </div>

        {/* Meta info */}
        <div className="space-y-2">
          {[
            { label: 'Last login',   value: 'Today, 12:36' },
            { label: 'Member since', value: 'Jan 2025'     },
            { label: '2FA',          value: 'Enabled', green: true },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{row.label}</span>
              <span className={`text-xs font-medium ${row.green ? 'text-green-400' : 'text-gray-300'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Switch Role View ── */}
      {rolesToDisplay.length > 0 && (
        <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Switch Role View
          </p>
          <div className="space-y-0.5">
            {rolesToDisplay.map(roleId => {
              const meta = roleConfig[roleId] || { label: roleId, dot: 'bg-gray-400' };
              const isActive = roleId === role;
              return (
                <button
                  key={roleId}
                  onClick={() => !isActive && handleSwitchRole(roleId)}
                  disabled={isActive}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
                    ${isActive ? 'cursor-default' : 'hover:bg-white/5 cursor-pointer'}`}
                  style={isActive
                    ? { background: 'rgba(26,102,68,0.25)', border: '1px solid rgba(26,102,68,0.4)' }
                    : {}
                  }
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${meta.dot}`} />
                  <span className={`flex-grow text-left text-sm ${isActive ? 'text-green-300' : 'text-gray-300'}`}>
                    {meta.label}
                  </span>
                  {isActive && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      current
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Appearance / Theme Toggle ── */}
      <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Appearance
        </p>
        <div className="flex items-center justify-between bg-white/5 rounded-xl p-1">
          <button
            onClick={() => theme === 'dark' && toggleTheme()}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-all
              ${theme === 'light' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Sun size={13} /> Light
          </button>
          <button
            onClick={() => theme === 'light' && toggleTheme()}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-all
              ${theme === 'dark' ? 'bg-white/20 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Moon size={13} /> Dark
          </button>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="py-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors">
          <Lock size={15} className="text-gray-500" />
          Change password
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}
