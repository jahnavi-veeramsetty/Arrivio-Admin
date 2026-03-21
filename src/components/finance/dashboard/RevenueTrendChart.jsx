export default function RevenueTrendChart({ data }) {
  const max = Math.max(...data.map(d => d.b2c + d.b2b));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Revenue Growth</h3>
          <p className="text-xs text-gray-400 font-bold mt-1 uppercase">B2C vs B2B Revenue Split (Last 12 Mo)</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1a6644]"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">B2C</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">B2B</span>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-end justify-between gap-1 md:gap-2">
        {data.map((d, i) => {
          const b2cHeight = (d.b2c / max) * 100;
          const b2bHeight = (d.b2b / max) * 100;
          
          return (
            <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap shadow-xl border border-gray-700 pointer-events-none">
                <p>B2C: £{(d.b2c/1000).toFixed(1)}k</p>
                <p>B2B: £{(d.b2b/1000).toFixed(1)}k</p>
              </div>
              
              <div className="w-full max-w-[20px] rounded-t-sm bg-blue-500 relative group-hover:brightness-110 transition-all" style={{ height: `${b2bHeight}%` }}>
                <div className="absolute bottom-full left-0 w-full bg-[#1a6644] rounded-t-sm" style={{ height: `${(b2cHeight / b2bHeight) * 100}%` }}></div>
              </div>
              <span className="text-[8px] font-black text-gray-400 mt-2 uppercase rotate-45 origin-left md:rotate-0 md:origin-center lg:text-[9px]">
                {d.month.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
