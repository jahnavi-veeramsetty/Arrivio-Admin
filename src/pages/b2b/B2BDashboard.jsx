import MetricCards from '../../components/b2b/dashboard/MetricCards';
import PartnersByType from '../../components/b2b/dashboard/PartnersByType';
import EmployeesAwaitingHousing from '../../components/b2b/dashboard/EmployeesAwaitingHousing';
import RecentActivity from '../../components/b2b/dashboard/RecentActivity';
import ServiceFeeSummary from '../../components/b2b/dashboard/ServiceFeeSummary';

import { mockPartners, mockReservations, mockServiceFees, recentB2BActivity } from '../../mockdata/b2bData';
import { b2bRoutedEmployees } from '../../mockdata/tenantsData';

export default function B2BDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2B OPERATION | DASHBOARD</p>
        </div>
      </div>

      <MetricCards partners={mockPartners} employees={b2bRoutedEmployees} reservations={mockReservations} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <PartnersByType partners={mockPartners} />
          <ServiceFeeSummary serviceFees={mockServiceFees} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <EmployeesAwaitingHousing employees={b2bRoutedEmployees} />
        </div>

        <div className="lg:col-span-1">
          <RecentActivity activity={recentB2BActivity} />
        </div>
      </div>
    </div>
  );
}
