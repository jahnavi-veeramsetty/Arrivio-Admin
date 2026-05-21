import MetricCards from '../../components/b2c/dashboard/MetricCards';
import StatusBreakdown from '../../components/b2c/dashboard/StatusBreakdown';
import OldestPending from '../../components/b2c/dashboard/OldestPending';
import UnsignedAgreements from '../../components/b2c/dashboard/UnsignedAgreements';
import BlockedApplications from '../../components/b2c/dashboard/BlockedApplications';
import WeekSchedule from '../../components/b2c/dashboard/WeekSchedule';
import LeaseExpiryRadar from '../../components/b2c/dashboard/LeaseExpiryRadar';
import { useToast } from '../../components/ui/Toast';

export default function B2CDashboard() {
  const { show, addToast } = useToast();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2C OPERATION | DASHBOARD</p>
        </div>
      </div>

      {/* Row 1: Analytics Metrics */}
      <section>
        <MetricCards />
      </section>

      {/* Row 2: Status & Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <StatusBreakdown />
        <OldestPending />
      </div>

      {/* Row 3: Compliance & Blockers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <UnsignedAgreements />
        <BlockedApplications />
      </div>

      {/* Row 4: Operational Schedule */}
      <section>
        <WeekSchedule />
      </section>

      {/* Row 5: Renewal Pipeline */}
      <section>
        <LeaseExpiryRadar onAction={show} />
      </section>
    </div>
  );
}
