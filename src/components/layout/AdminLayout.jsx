import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8f8f6] dark:bg-[#0f1117] transition-colors duration-200">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main area: Topbar + scrollable content */}
      <div className="flex flex-col flex-grow min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-grow overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
