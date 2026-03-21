import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ScrollToTopButton from '../ui/ScrollToTopButton';

export default function AdminLayout() {
  const mainRef = useRef(null);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8f8f6] dark:bg-[#0f1117] transition-colors duration-200">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main area: Topbar + scrollable content */}
      <div className="flex flex-col flex-grow min-w-0 overflow-hidden">
        <Topbar />
        <main ref={mainRef} className="flex-grow overflow-y-auto p-6 scroll-smooth">
          <Outlet />
        </main>
      </div>

      {/* Floating Scroll to Top */}
      <ScrollToTopButton scrollContainerRef={mainRef} />
    </div>
  );
}
