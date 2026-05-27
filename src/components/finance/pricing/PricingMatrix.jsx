import { useState } from 'react';
import { Edit3, Info } from 'lucide-react';

export default function PricingMatrix({ pricing, onUpdate }) {
  const [editingCell, setEditingCell] = useState(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Base Pricing Matrix</h3>
          <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Standard monthly rates by city and room type</p>
        </div>
        <div className="px-3 py-1 bg-amber-50 rounded-lg border border-amber-100 flex items-center gap-2">
          <Info size={12} className="text-amber-600" />
          <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">Pricing changes sync to all listings instantly</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white dark:bg-gray-900/50">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">City / Territory</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Studio</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Comfort</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Essential</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration Tier Multipliers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {pricing.map((priceRow, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <p className="text-base font-black text-gray-800 dark:text-gray-100 italic tracking-tight">{priceRow.city}</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black font-mono">€{priceRow.studio.toLocaleString()}</span>
                    <button className="p-1.5 hover:bg-white rounded-lg text-gray-300 hover:text-[#1a6644] transition-all opacity-0 group-hover:opacity-100 border border-transparent hover:border-gray-100">
                      <Edit3 size={12} />
                    </button>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black font-mono">€{priceRow.oneBed.toLocaleString()}</span>
                    <button className="p-1.5 hover:bg-white rounded-lg text-gray-300 hover:text-[#1a6644] transition-all opacity-0 group-hover:opacity-100 border border-transparent hover:border-gray-100">
                      <Edit3 size={12} />
                    </button>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black font-mono">€{priceRow.twoBed.toLocaleString()}</span>
                    <button className="p-1.5 hover:bg-white rounded-lg text-gray-300 hover:text-[#1a6644] transition-all opacity-0 group-hover:opacity-100 border border-transparent hover:border-gray-100">
                      <Edit3 size={12} />
                    </button>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">1-3M</span>
                      <span className="text-[10px] font-black text-amber-600">x{priceRow.tiers.short}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-100" />
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">3-6M</span>
                      <span className="text-[10px] font-black text-blue-600">x{priceRow.tiers.med}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-100" />
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">6M+</span>
                      <span className="text-[10px] font-black text-green-600">x{priceRow.tiers.long}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
