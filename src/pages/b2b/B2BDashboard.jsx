import PageHeader from '../../components/layout/PageHeader';
import MetricCards from '../../components/b2b/dashboard/MetricCards';
import PartnersByType from '../../components/b2b/dashboard/PartnersByType';
import EmployeesAwaitingHousing from '../../components/b2b/dashboard/EmployeesAwaitingHousing';
import ExpiringReservations from '../../components/b2b/dashboard/ExpiringReservations';
import RecentActivity from '../../components/b2b/dashboard/RecentActivity';
import CommissionSummary from '../../components/b2b/dashboard/CommissionSummary';

// Mock data
import { mockPartners, mockEmployees, mockReservations, mockCommissions, recentB2BActivity } from '../../mockdata/b2bData';

export default function B2BDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="B2B Dashboard" 
        breadcrumb="B2B Partners → Dashboard"
        description="Overview of partner performance, capacity fill rates, and employee housing status."
      />
      
      {/* Metrics Row */}
      <MetricCards 
        partners={mockPartners} 
        employees={mockEmployees} 
        reservations={mockReservations} 
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Stats & Finance) */}
        <div className="lg:col-span-1 space-y-6">
          <PartnersByType partners={mockPartners} />
          <CommissionSummary commissions={mockCommissions} />
        </div>

        {/* Center Column (Operations) */}
        <div className="lg:col-span-1 space-y-6">
          <EmployeesAwaitingHousing employees={mockEmployees} />
          <ExpiringReservations partners={mockPartners} reservations={mockReservations} />
        </div>

        {/* Right Column (Activity) */}
        <div className="lg:col-span-1">
          <RecentActivity activity={recentB2BActivity} />
        </div>
      </div>
    </div>
  );
}
