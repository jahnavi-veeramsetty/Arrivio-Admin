import { roles as rolesMetadata } from '../mockdata/roles';
import { UserCircle, Briefcase, Building2, Users, Receipt, Headset, ShieldAlert, ArrowRight, LogOut } from 'lucide-react';
import WalkingAnimation from '../components/WalkingAnimation';
import greenLogo from '../assets/greenlogo.png';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Icon mapping based on role ID
const roleIconMap = {
  super_admin: ShieldAlert,
  ops_manager: Briefcase,
  sales_partnership: Building2,
  finance_manager: Receipt,
  support_agent: Headset,
  community_manager: Users
};

// Color mapping for cards
const roleColorMap = {
  super_admin: { icon: "text-red-600", bg: "bg-red-500", border: "border-red-100" },
  ops_manager: { icon: "text-[#0f4c3a]", bg: "bg-[#0f4c3a]", border: "border-emerald-100" },
  sales_partnership: { icon: "text-blue-600", bg: "bg-blue-600", border: "border-blue-100" },
  finance_manager: { icon: "text-emerald-600", bg: "bg-emerald-600", border: "border-emerald-100" },
  support_agent: { icon: "text-orange-500", bg: "bg-orange-500", border: "border-orange-100" },
  community_manager: { icon: "text-purple-600", bg: "bg-purple-600", border: "border-purple-100" }
};

export default function AdminRoles() {
  const { user, selectRole, logout } = useAuth();
  const navigate = useNavigate();

  // Filter metadata to only include roles the user actually has
  const userRoles = rolesMetadata.filter(role => user.roles.includes(role.id));

  const handleSelect = (roleId) => {
    selectRole(roleId);
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full flex-col lg:flex-row font-sans selection:bg-[#186b53]/30 overflow-hidden">
      
      {/* Left Sidebar / Hero Area */}
      <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#0f4c3a] px-8 py-12 lg:w-[40%] lg:px-16 xl:px-20">
        {/* Absolute Logo at Top Left */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 xl:left-16 z-30 pointer-events-none">
          <img src={greenLogo} alt="Arrivio Logo" className="h-9 w-auto object-contain brightness-0 invert opacity-90" />
        </div>

        {/* Background dark glowing effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-[#186b53]/60 blur-[120px]"></div>
           <div className="absolute top-[40%] -right-[20%] h-[60%] w-[60%] rounded-full bg-emerald-500/20 blur-[120px]"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        </div>

        {/* Intro Text Sequence */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none anim-intro-text z-10">
          <h2 className="text-center text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-white drop-shadow-xl px-4 filter">
            Welcome Back,<br/>
            <span className="text-white/80 text-2xl lg:text-3xl font-medium block mt-2">{user.name}</span>
            <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 to-emerald-300 drop-shadow-none">
              Portal Selection
            </span>
          </h2>
        </div>

        {/* Center Character Animation - Walks in */}
        <div className="relative z-40 w-full flex flex-col items-center justify-center anim-character-in pointer-events-auto">
          <WalkingAnimation />
        </div>
      </div>

      {/* Right Content Area - Role Selection */}
      <div className="relative z-20 flex h-full w-full flex-col bg-[#f2f2f2] shadow-[-15px_0_40px_rgba(0,0,0,0.15)] px-6 py-12 lg:w-[60%] lg:px-12 xl:px-16 overflow-y-auto overflow-x-hidden">
         <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#111827_1px,transparent_1px)] [background-size:24px_24px]"></div>
         
         {/* Top Actions */}
         <div className="relative z-30 w-full flex justify-end mb-12">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
         </div>

         <div className="relative z-30 w-full max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <div className="mb-10 text-center lg:text-left transition-all">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#0f4c3a]">Role Verification</h1>
              <p className="mt-3 text-gray-600 max-w-md">Your account is authorized for multiple domains. Please select the workspace you wish to access.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 auto-rows-fr">
              {userRoles.map((role, index) => {
                const Icon = roleIconMap[role.id] || UserCircle;
                const colors = roleColorMap[role.id] || roleColorMap.ops_manager;

                return (
                  <button
                    key={role.id}
                    onClick={() => handleSelect(role.id)}
                    style={{ animationDelay: `${index * 50 + 300}ms` }}
                    className={`group relative flex flex-col items-start p-7 bg-white border ${colors.border} rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left animate-slide-up overflow-hidden`}
                  >
                    <div className="relative z-10 flex flex-col h-full w-full">
                      {/* Icon Container */}
                      <div className="mb-6 inline-flex p-4 rounded-3xl bg-[#f2f2f2] group-hover:bg-white transition-colors self-start shadow-sm border border-gray-50">
                        <Icon className={`${colors.icon}`} size={28} />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 truncate w-full">{role.name}</h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed mb-6 flex-grow opacity-80 line-clamp-2">
                        Includes {role.permissions[0].replace('_', ' ')} permission and {role.permissions.length - 1} other access keys.
                      </p>

                      <div className="flex items-center text-xs font-bold text-[#0f4c3a] group-hover:translate-x-1 transition-transform tracking-wider uppercase">
                        Initialize Session
                        <ArrowRight size={14} className="ml-2" />
                      </div>
                    </div>

                    {/* Decorative background element on hover */}
                    <div className={`absolute -top-12 -right-12 h-32 w-32 ${colors.bg} opacity-0 group-hover:opacity-[0.04] rounded-full transition-all duration-700 blur-2xl group-hover:scale-150`}></div>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 text-center lg:text-left pt-6 border-t border-gray-100/50">
              <p className="text-xs text-gray-400 font-medium italic">
                Secure enterprise session // Arrivio RBAC v2.4
              </p>
            </div>
         </div>
      </div>
    </div>
  );
}
