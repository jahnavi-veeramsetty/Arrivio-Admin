import MetricCards        from '../../components/b2c/dashboard/MetricCards';
import StatusBreakdown     from '../../components/b2c/dashboard/StatusBreakdown';
import OldestPending       from '../../components/b2c/dashboard/OldestPending';
import UnsignedAgreements  from '../../components/b2c/dashboard/UnsignedAgreements';
import RecentDecisions     from '../../components/b2c/dashboard/RecentDecisions';
import WeekSchedule        from '../../components/b2c/dashboard/WeekSchedule';

export default function B2CDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">B2C Applications</p>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Section Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Live snapshot of all B2C tenant applications — status, risk flags, and this week's schedule.
        </p>
      </div>

      {/* Metric Cards */}
      <MetricCards />

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <StatusBreakdown />
        <OldestPending />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <UnsignedAgreements />
        <RecentDecisions />
      </div>

      {/* Row 3 */}
      <WeekSchedule />
    </div>
  );
}
