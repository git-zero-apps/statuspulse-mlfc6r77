// Auto-generated database types from ZERO Builder
// Do not edit manually
export interface Profiles {
  id: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
  subscription_plan: string;
  subscription_status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfilesInsert {
  full_name: string;
  role?: string;
  avatar_url: string | null;
  subscription_plan?: string;
  subscription_status?: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}

export interface StatusPages {
  id?: string;
  user_id: string;
  page_name: string;
  page_slug: string;
  logo_url: string | null;
  brand_color: string;
  custom_domain: string | null;
  header_text: string | null;
  timezone: string;
  show_branding: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface StatusPagesInsert {
  user_id: string;
  page_name: string;
  page_slug: string;
  logo_url: string | null;
  brand_color?: string;
  custom_domain: string | null;
  header_text: string | null;
  timezone?: string;
  show_branding?: boolean;
  is_public?: boolean;
}

export interface ComponentGroups {
  id?: string;
  status_page_id: string;
  name: string;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ComponentGroupsInsert {
  status_page_id: string;
  name: string;
  description: string | null;
  display_order?: number;
}

export interface Components {
  id?: string;
  status_page_id: string;
  group_id: string | null;
  name: string;
  description: string | null;
  status: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ComponentsInsert {
  status_page_id: string;
  group_id: string | null;
  name: string;
  description: string | null;
  status?: string;
  display_order?: number;
}

export interface ComponentUptime {
  id?: string;
  component_id: string;
  date: string;
  uptime_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface ComponentUptimeInsert {
  component_id: string;
  date: string;
  uptime_percentage?: number;
}

export interface Incidents {
  id?: string;
  status_page_id: string;
  title: string;
  status: string;
  impact: string;
  created_by: string;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IncidentsInsert {
  status_page_id: string;
  title: string;
  status?: string;
  impact?: string;
  created_by: string;
  resolved_at: string | null;
}

export interface IncidentUpdates {
  id?: string;
  incident_id: string;
  status: string;
  message: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface IncidentUpdatesInsert {
  incident_id: string;
  status: string;
  message: string;
  created_by: string;
}

export interface IncidentComponents {
  id?: string;
  incident_id: string;
  component_id: string;
  created_at: string;
  updated_at: string;
}

export interface IncidentComponentsInsert {
  incident_id: string;
  component_id: string;
}

export interface ScheduledMaintenances {
  id?: string;
  status_page_id: string;
  title: string;
  description: string | null;
  scheduled_start: string;
  scheduled_end: string;
  status: string;
  auto_update_status: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ScheduledMaintenancesInsert {
  status_page_id: string;
  title: string;
  description: string | null;
  scheduled_start: string;
  scheduled_end: string;
  status?: string;
  auto_update_status?: boolean;
  created_by: string;
}

export interface MaintenanceComponents {
  id?: string;
  maintenance_id: string;
  component_id: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceComponentsInsert {
  maintenance_id: string;
  component_id: string;
}

export interface Subscribers {
  id?: string;
  status_page_id: string;
  email: string;
  phone: string | null;
  confirmed: boolean;
  confirmation_token: string | null;
  subscription_type: string;
  unsubscribed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscribersInsert {
  status_page_id: string;
  email: string;
  phone: string | null;
  confirmed?: boolean;
  confirmation_token: string | null;
  subscription_type?: string;
  unsubscribed?: boolean;
}

export interface SubscriberComponents {
  id?: string;
  subscriber_id: string;
  component_id: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriberComponentsInsert {
  subscriber_id: string;
  component_id: string;
}

export interface TeamMembers {
  id?: string;
  status_page_id: string;
  user_id: string | null;
  email: string;
  role: string;
  invited_by: string;
  accepted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMembersInsert {
  status_page_id: string;
  user_id: string | null;
  email: string;
  role?: string;
  invited_by: string;
  accepted?: boolean;
}
