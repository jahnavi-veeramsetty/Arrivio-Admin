import React from 'react';

const CATEGORIES = [
  { id: 'all', en: 'All Documents', de: 'Alle Dokumente' },
  { id: 'framework', en: 'Framework Agreements', de: 'Rahmenverträge' },
  { id: 'annex', en: 'Annexes', de: 'Anlagen' },
  { id: 'protocol', en: 'Protocols', de: 'Protokolle' },
  { id: 'report', en: 'Reports & Forms', de: 'Berichte & Formulare' }
];

export default function CategoryFilters({ activeCategory, setActiveCategory, language, contracts = [] }) {
  
  // Calculate counts for each category
  const getCount = (catId) => {
    if (catId === 'all') return contracts.length;
    return contracts.filter(c => c.categoryKey === catId).length;
  };

  return (
    <div className="flex flex-wrap gap-2.5 pb-2">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = getCount(cat.id);
        const label = language === 'en' ? cat.en : cat.de;

        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer select-none
              ${isActive
                ? 'bg-[#1a6644] dark:bg-[#34d399] border-[#1a6644] dark:border-[#34d399] text-white dark:text-[#0f1117] shadow-sm shadow-[#1a6644]/15'
                : 'bg-white dark:bg-[#1a1d23] border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
          >
            <span>{label}</span>
            <span
              className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold transition-all duration-200
                ${isActive
                  ? 'bg-white/20 text-white dark:bg-[#0f1117]/10 dark:text-[#0f1117]'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500'
                }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
