import React from 'react';
import {
  FileSignature,
  FileCheck,
  ClipboardList,
  AlertTriangle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// Maps categoryKey to a specific Lucide Icon
const categoryIconMap = {
  framework: {
    icon: FileSignature,
    gradient: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    enLabel: 'Framework',
    deLabel: 'Rahmenvertrag'
  },
  annex: {
    icon: FileCheck,
    gradient: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    enLabel: 'Annex',
    deLabel: 'Anlage'
  },
  protocol: {
    icon: ClipboardList,
    gradient: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    enLabel: 'Protocol',
    deLabel: 'Protokoll'
  },
  report: {
    icon: AlertTriangle,
    gradient: 'from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
    enLabel: 'Report',
    deLabel: 'Bericht'
  }
};

export default function ContractCard({ contract, language }) {
  const { id, categoryKey, enName, deName, enDesc, deDesc, enFile, deFile } = contract;
  const isEn = language === 'en';

  const title = isEn ? enName : deName;
  const description = isEn ? enDesc : deDesc;
  const file = isEn ? enFile : deFile;
  const categoryConfig = categoryIconMap[categoryKey] || categoryIconMap.framework;
  const IconComponent = categoryConfig.icon;
  const categoryLabel = isEn ? categoryConfig.enLabel : categoryConfig.deLabel;

  // URL of the static HTML file
  const contractUrl = `/contracts/${isEn ? 'english' : 'german'}/${file}`;

  const handleOpenContract = () => {
    window.open(contractUrl, '_blank');
  };

  return (
    <div
      onClick={handleOpenContract}
      className="group relative flex flex-col justify-between p-6 bg-white dark:bg-[#1a1d23] border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-black/20 hover:border-[#1a6644]/30 dark:hover:border-[#34d399]/30 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer"
    >
      <div>
        {/* Card Header (Icon, Doc #, and Category Badge) */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr ${categoryConfig.gradient} ${categoryConfig.color} group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent size={20} strokeWidth={2} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 font-mono tracking-wide">
              DOC #{id}
            </span>
            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${categoryConfig.bg}`}>
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Contract Title */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#1a6644] dark:group-hover:text-[#34d399] transition-colors duration-200 mb-2 line-clamp-1">
          {title}
        </h3>

        {/* Contract Description */}
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 mb-6">
          {description}
        </p>
      </div>

      {/* Card Footer (Static Path & View Button) */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800/50">
        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono truncate max-w-[130px] sm:max-w-[150px]" title={file}>
          {file}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Avoid triggering parent div onClick twice
            handleOpenContract();
          }}
          className="flex items-center gap-1 text-[11px] font-bold text-[#1a6644] dark:text-[#34d399] group-hover:gap-1.5 transition-all cursor-pointer"
        >
          <span>{isEn ? 'View Contract' : 'Dokument öffnen'}</span>
          <ExternalLink size={12} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
