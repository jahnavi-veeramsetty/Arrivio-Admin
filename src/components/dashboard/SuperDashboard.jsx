// src/components/dashboard/SuperDashboard.jsx
import React from 'react';
import { dashboardData } from '../../mockdata/dashboardData';

// Row 1-3 Components
import SuperMetricCards from './super/SuperMetricCards';
import RevenueChart from './super/RevenueChart';
import OccupancyByCity from './super/OccupancyByCity';
import GeoMap from './super/GeoMap';
import ApplicationFunnel from './super/ApplicationFunnel';

// Row 4 Components
import RecentActivityFeed from './RecentActivityFeed';
import SystemHealth from './SystemHealth';
import ActionsNeeded from './ActionsNeeded';

export default function SuperDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50/30 dark:bg-gray-900/10 min-h-full">
      {/* Row 1: Metric Cards */}
      <section>
        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Executive Overview</p>
        <SuperMetricCards metrics={dashboardData.metrics} />
      </section>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={dashboardData.revenue} />
        </div>
        <div className="lg:col-span-1">
          <OccupancyByCity data={dashboardData.occupancy} />
        </div>
      </div>

      {/* Row 3: Geo & Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GeoMap tenants={dashboardData.tenants} properties={dashboardData.properties} />
        </div>
        <div className="lg:col-span-1">
          <ApplicationFunnel data={dashboardData.funnel} />
        </div>
      </div>

      {/* Row 4: Shared Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivityFeed activity={dashboardData.activity} />
        <SystemHealth health={dashboardData.health} />
        <ActionsNeeded actions={dashboardData.actions} />
      </div>
    </div>
  );
}
