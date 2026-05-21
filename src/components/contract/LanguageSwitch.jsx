import React from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitch({ language, setLanguage }) {
  const isEn = language === 'en';

  return (
    <div className="flex items-center gap-3">
      {/* Visual Label (Globe icon) */}
      <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
        <Globe size={16} className="text-gray-400 dark:text-gray-500 animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Language</span>
      </div>
      
      {/* Sliding Pill Control */}
      <div className="relative flex p-1 bg-gray-100 dark:bg-[#141619] border border-gray-200/50 dark:border-gray-800/80 rounded-xl w-[170px] h-[38px] select-none">
        
        {/* Sliding active background */}
        <div
          className={`absolute top-1 bottom-1 w-[78px] bg-white dark:bg-[#23272f] shadow-sm rounded-lg border border-gray-200/40 dark:border-white/5 transition-all duration-300 ease-out
            ${isEn ? 'left-1' : 'left-[88px]'}`}
        />
        
        {/* English Button */}
        <button
          onClick={() => setLanguage('en')}
          className={`relative z-10 flex-grow text-center text-xs font-semibold rounded-lg cursor-pointer transition-colors duration-200
            ${isEn
              ? 'text-[#1a6644] dark:text-[#34d399]'
              : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
        >
          English
        </button>
        
        {/* German Button */}
        <button
          onClick={() => setLanguage('de')}
          className={`relative z-10 flex-grow text-center text-xs font-semibold rounded-lg cursor-pointer transition-colors duration-200
            ${!isEn
              ? 'text-[#1a6644] dark:text-[#34d399]'
              : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
        >
          German
        </button>
        
      </div>
    </div>
  );
}
