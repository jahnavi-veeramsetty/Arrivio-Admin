import { Search, Filter, Download } from 'lucide-react';

export default function PartnerFilters({ onSearch, onFilterType, onFilterStatus, canExport }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search partners..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a6644] transition-all"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <select 
          className="bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm py-2 px-3 focus:ring-2 focus:ring-[#1a6644] text-gray-600 dark:text-gray-300"
          onChange={(e) => onFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Employer">Employer</option>
          <option value="Agency">Agency</option>
          <option value="University">University</option>
          <option value="Investor">Investor</option>
        </select>

        <select 
          className="bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm py-2 px-3 focus:ring-2 focus:ring-[#1a6644] text-gray-600 dark:text-gray-300"
          onChange={(e) => onFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {canExport && (
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold transition-colors border border-gray-100 dark:border-gray-700">
          <Download size={16} /> Export
        </button>
      )}
    </div>
  );
}
