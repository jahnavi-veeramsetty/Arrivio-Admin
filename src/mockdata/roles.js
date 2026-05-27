export const roles = [
  {
    id: "super_admin",
    name: "Super Admin",
    permissions: [
      "system_settings",
      "audit_logs",
      "admin_management",
      "all_access"
    ],
    restrictedFrom: []
  },
  {
    id: "ops_manager",
    name: "Operations Manager",
    permissions: [
      "applications_view",
      "applications_edit",
      "units_manage",
      "move_in_out",
      "maintenance_manage",
      "docusign_countersign"
    ],
    restrictedFrom: ["finance_data", "revenue_reports", "pricing_rules"]
  },
  {
    id: "sales_partnership",
    name: "Sales & Partnerships",
    permissions: [
      "b2b_onboarding",
      "capacity_reservations",
      "employee_lists",
      "service_fees_view"
    ],
    restrictedFrom: ["b2c_applications", "finance_data", "payments_view"]
  },
  {
    id: "finance_manager",
    name: "Finance Manager",
    permissions: [
      "payments_manage",
      "invoices_manage",
      "refunds_issue",
      "revenue_reports",
      "pricing_rules",
      "investor_payouts"
    ],
    restrictedFrom: ["operational_data", "personal_data", "maintenance_records"]
  },
  {
    id: "support_agent",
    name: "Customer Support Agent",
    permissions: [
      "view_status",
      "add_notes"
    ],
    restrictedFrom: ["document_open", "payments_view", "approval_actions", "reject_actions"]
  },
  {
    id: "community_manager",
    name: "Community Manager",
    permissions: [
      "events_manage",
      "clubs_manage",
      "announcements_post",
      "feed_moderation",
      "push_notifications"
    ],
    restrictedFrom: ["admin_portal_data", "finance_data", "ops_data"]
  }
];
