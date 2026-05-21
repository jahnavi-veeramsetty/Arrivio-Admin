import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search contracts..." }) {
  const inputRef = useRef(null);

  // Keyboard shortcut listener to focus search on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative flex-grow max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
        <Search size={18} strokeWidth={2} />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1d23] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:border-[#1a6644] dark:focus:border-[#34d399] focus:ring-4 focus:ring-[#1a6644]/5 dark:focus:ring-[#34d399]/5 transition-all duration-200"
      />
      
      {/* Keyboard Shortcut Indicator or Clear Button */}
      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center gap-1.5">
        {value ? (
          <button
            onClick={() => onChange('')}
            className="p-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Clear search"
          >
            <X size={14} />
          </button>
        ) : (
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-[#141619] border border-gray-200 dark:border-gray-800 rounded-md select-none font-mono">
            ⌘K
          </span>
        )}
      </div>
    </div>
  );
}
