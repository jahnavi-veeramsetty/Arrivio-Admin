import React from 'react';

export default function TenantCard({ tenant }) {
  if (!tenant) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 italic">No tenant currently assigned to this unit.</p>
      </div>
    );
  }

  const initials = tenant.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400">
            {initials}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">{tenant.name}</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{tenant.company}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <DetailItem label="Email" value={tenant.email} />
          <DetailItem label="Phone" value={tenant.phone} />
          <DetailItem label="Move-in Date" value={new Date(tenant.moveIn).toLocaleDateString()} />
          <DetailItem label="Lease End Date" value={new Date(tenant.leaseEnd).toLocaleDateString()} />
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-widest mb-0.5">{label}</p>
      <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{value}</p>
    </div>
  );
}
