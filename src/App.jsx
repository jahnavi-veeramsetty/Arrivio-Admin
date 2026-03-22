import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import ScrollToTop from './components/ui/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import AdminRoles from './pages/AdminRoles';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Placeholder from './pages/Placeholder';

// B2C pages
import B2CDashboard from './pages/b2c/B2CDashboard';
import ApplicationsPage from './pages/b2c/ApplicationsPage';
import DocumentsPage from './pages/b2c/DocumentsPage';
import UnitsPage from './pages/b2c/UnitsPage';
import MovePage from './pages/b2c/MovePage';
import WaitlistPage from './pages/b2c/WaitlistPage';

// B2B pages
import B2B_Dashboard from './pages/b2b/B2BDashboard';
import PartnersPage from './pages/b2b/PartnersPage';
import CapacityPage from './pages/b2b/CapacityPage';
import EmployeesPage from './pages/b2b/EmployeesPage';
import CommsPage from './pages/b2b/CommsPage';
import CommissionsPage from './pages/b2b/CommissionsPage';

// Finance pages
import FinanceDashboard from './pages/finance/FinanceDashboard';
import PaymentsPage from './pages/finance/PaymentsPage';
import InvoicesPage from './pages/finance/InvoicesPage';
import RefundsPage from './pages/finance/RefundsPage';
import DepositsPage from './pages/finance/DepositsPage';
import InvestorsPage from './pages/finance/InvestorsPage';
import PricingPage from './pages/finance/PricingPage';

// Properties pages
import PropertiesDashboard from './pages/properties/PropertiesDashboard';
import AllPropertiesPage from './pages/properties/AllPropertiesPage';
import CitiesPage from './pages/properties/CitiesPage';
import UnitTypesPage from './pages/properties/UnitTypesPage';
import AmenitiesPage from './pages/properties/AmenitiesPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>

            {/* ── Public Routes ── */}
            <Route path="/login" element={<AdminLogin />} />
            <Route
              path="/role-selection"
              element={
                <ProtectedRoute>
                  <AdminRoles />
                </ProtectedRoute>
              }
            />

            {/* ── Protected Routes (inside AdminLayout) ── */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>

                {/* Dashboard */}
                <Route path="/admin/dashboard" element={<Dashboard />} />

                {/* Account */}
                <Route path="/admin/account" element={<Account />} />

                {/* B2C */}
                <Route path="/admin/b2c" element={<B2CDashboard />} />
                <Route path="/admin/b2c/applications" element={<ApplicationsPage />} />
                <Route path="/admin/b2c/documents" element={<DocumentsPage />} />
                <Route path="/admin/b2c/documents/:appId" element={<DocumentsPage />} />
                <Route path="/admin/b2c/properties" element={<UnitsPage />} />
                <Route path="/admin/b2c/properties/:propertyId" element={<UnitsPage />} />
                <Route path="/admin/b2c/properties/:propertyId/:unitId" element={<UnitsPage />} />
                <Route path="/admin/b2c/units" element={<Navigate to="/admin/b2c/properties" replace />} />
                <Route path="/admin/b2c/move" element={<MovePage />} />
                <Route path="/admin/b2c/waitlist" element={<WaitlistPage />} />

                {/* B2B */}
                <Route path="/admin/b2b" element={<B2B_Dashboard />} />
                <Route path="/admin/b2b/partners" element={<PartnersPage />} />
                <Route path="/admin/b2b/capacity" element={<CapacityPage />} />
                <Route path="/admin/b2b/employees" element={<EmployeesPage />} />
                <Route path="/admin/b2b/comms" element={<CommsPage />} />
                <Route path="/admin/b2b/commissions" element={<CommissionsPage />} />

                {/* Finance */}
                <Route path="/admin/finance" element={<FinanceDashboard />} />
                <Route path="/admin/finance/payments" element={<PaymentsPage />} />
                <Route path="/admin/finance/invoices" element={<InvoicesPage />} />
                <Route path="/admin/finance/refunds" element={<RefundsPage />} />
                <Route path="/admin/finance/deposits" element={<DepositsPage />} />
                <Route path="/admin/finance/investors" element={<InvestorsPage />} />
                <Route path="/admin/finance/pricing" element={<PricingPage />} />

                {/* Properties */}
                <Route path="/admin/properties" element={<PropertiesDashboard />} />
                <Route path="/admin/properties/list" element={<AllPropertiesPage />} />
                <Route path="/admin/properties/cities" element={<CitiesPage />} />
                <Route path="/admin/properties/types" element={<UnitTypesPage />} />
                <Route path="/admin/properties/amenities" element={<AmenitiesPage />} />

                {/* Community */}
                <Route path="/admin/community/events" element={<Placeholder title="Events" />} />
                <Route path="/admin/community/clubs" element={<Placeholder title="Clubs" />} />
                <Route path="/admin/community/announcements" element={<Placeholder title="Announcements" />} />
                <Route path="/admin/community/feed" element={<Placeholder title="Feed Moderation" />} />
                <Route path="/admin/community/push" element={<Placeholder title="Push Notifications" />} />
                <Route path="/admin/community/residents" element={<Placeholder title="Resident Directory" />} />

                {/* Reports */}
                <Route path="/admin/reports/occupancy" element={<Placeholder title="Occupancy" />} />
                <Route path="/admin/reports/funnel" element={<Placeholder title="Application Funnel" />} />
                <Route path="/admin/reports/revenue" element={<Placeholder title="Revenue" />} />
                <Route path="/admin/reports/leads" element={<Placeholder title="Lead Source" />} />
                <Route path="/admin/reports/leases" element={<Placeholder title="Lease Expiry Forecast" />} />
                <Route path="/admin/reports/b2b" element={<Placeholder title="B2B Performance" />} />
                <Route path="/admin/reports/community" element={<Placeholder title="Community Engagement" />} />

                {/* Settings */}
                <Route path="/admin/settings/admins" element={<Placeholder title="Admin Accounts" />} />
                <Route path="/admin/settings/roles" element={<Placeholder title="Roles & Permissions" />} />
                <Route path="/admin/settings/audit" element={<Placeholder title="Audit Log" />} />
                <Route path="/admin/settings/email" element={<Placeholder title="Email Templates" />} />
                <Route path="/admin/settings/docusign" element={<Placeholder title="DocuSign Config" />} />
                <Route path="/admin/settings/stripe" element={<Placeholder title="Stripe Config" />} />
                <Route path="/admin/settings/properties" element={<Placeholder title="Properties & Cities" />} />
                <Route path="/admin/settings/flags" element={<Placeholder title="Feature Flags" />} />

              </Route>
            </Route>

            {/* ── Redirects ── */}
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />

          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}