export default function PageHeader({ title, breadcrumb, description }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#1a6644]/60 dark:text-[#1a6644]/80">
          {breadcrumb}
        </span>
      </div>
      <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
