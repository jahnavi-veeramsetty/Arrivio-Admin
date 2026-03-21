import { useAuth } from '../context/AuthContext';
import SuperDashboard      from '../components/dashboard/SuperDashboard';
import OpsDashboard        from '../components/dashboard/OpsDashboard';
import FinanceDashboard    from '../components/dashboard/FinanceDashboard';
import SalesDashboard      from '../components/dashboard/SalesDashboard';
import SupportDashboard    from '../components/dashboard/SupportDashboard';
import CommunityDashboard  from '../components/dashboard/CommunityDashboard';

const roleComponents = {
  super_admin:       SuperDashboard,
  ops_manager:       OpsDashboard,
  finance_manager:   FinanceDashboard,
  sales_partnership: SalesDashboard,
  support_agent:     SupportDashboard,
  community_manager: CommunityDashboard,
};

export default function Dashboard() {
  const { activeRole, user } = useAuth();
  const role = activeRole || user?.roles?.[0];
  const RoleDashboard = roleComponents[role] || OpsDashboard;
  return <RoleDashboard />;
}
