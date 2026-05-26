import PageHeader from '../../components/layout/PageHeader';
import PricingMatrix from '../../components/finance/pricing/PricingMatrix';
import PricingChangeHistory from '../../components/finance/pricing/PricingChangeHistory';
import { mockPricing } from '../../mockdata/financeData';
import { useToast } from '../../components/ui/Toast';
import { Plus, Search } from 'lucide-react';

export default function PricingPage() {
  const { addToast } = useToast();

  const handleUpdate = (city, type, value) => {
    addToast({
      title: 'Pricing Rule Updated',
      description: `New rate of €${value} for ${type} in ${city} has been logged and synchronized.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageHeader
          title="Pricing Rules"
          description="Configure base room rates, duration tier multipliers, and partner-specific overrides."
          breadcrumbs={['Finance', 'Pricing']}
        />
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] text-xs font-black uppercase tracking-widest text-[#1a6644] hover:bg-gray-50 transition-all shadow-sm active:scale-95">
            <Plus size={16} /> Partner Override
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 animate-in fade-in slide-in-from-left duration-700">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Filter by territory..."
                className="bg-transparent border-none text-sm font-bold focus:ring-0 w-64"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Display Currency: EUR (€)</span>
            </div>
          </div>
          <PricingMatrix pricing={mockPricing} onUpdate={handleUpdate} />
        </div>
        <div className="animate-in fade-in slide-in-from-right duration-700">
          <PricingChangeHistory />
        </div>
      </div>
    </div>
  );
}
