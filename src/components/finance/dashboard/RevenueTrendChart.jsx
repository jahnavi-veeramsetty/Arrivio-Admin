export default function RevenueTrendChart({ data }) {
  const max = Math.max(...data.map((point) => Math.max(point.b2b, point.b2c, point.services)));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Revenue Growth</h3>
          <p className="text-xs text-gray-400 font-bold mt-1 uppercase">Quarterly Y2 run-rate by revenue stream</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Community Buildings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1a6644]" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Apartments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Services</span>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-end justify-between gap-2 md:gap-4">
        {data.map((point, index) => {
          const buildingHeight = (point.b2b / max) * 100;
          const apartmentHeight = (point.b2c / max) * 100;
          const servicesHeight = (point.services / max) * 100;

          return (
            <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap shadow-xl border border-gray-700 pointer-events-none">
                <p>Buildings: €{(point.b2b / 1000000).toFixed(2)}M</p>
                <p>Apartments: €{(point.b2c / 1000000).toFixed(2)}M</p>
                <p>Services: €{(point.services / 1000000).toFixed(2)}M</p>
              </div>

              <div className="w-full flex items-end justify-center gap-1 h-full">
                <div className="w-full max-w-[16px] rounded-t-sm bg-blue-500 group-hover:brightness-110 transition-all" style={{ height: `${buildingHeight}%` }} />
                <div className="w-full max-w-[16px] rounded-t-sm bg-[#1a6644] group-hover:brightness-110 transition-all" style={{ height: `${apartmentHeight}%` }} />
                <div className="w-full max-w-[16px] rounded-t-sm bg-amber-500 group-hover:brightness-110 transition-all" style={{ height: `${servicesHeight}%` }} />
              </div>
              <span className="text-[8px] font-black text-gray-400 mt-2 uppercase rotate-45 origin-left md:rotate-0 md:origin-center lg:text-[9px]">
                {point.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
