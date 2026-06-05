export interface CampaignSignup {
  id: string;
  name: string;
  email: string;
  interest: string | null;
  created_at: string;
}

export interface VolunteerRegistration {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  county: string;
  skills: string | null;
  availability: string | null;
  message: string | null;
  status: 'pending' | 'reviewed' | 'active' | 'declined';
  created_at: string;
}

export interface PartnerApplication {
  id: string;
  org_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  org_type: 'business' | 'school' | 'sports' | 'council' | 'charity' | 'faith' | 'other';
  message: string | null;
  status: 'pending' | 'reviewed' | 'active' | 'declined';
  created_at: string;
}

export interface Donation {
  id: string;
  donor_name: string | null;
  email: string;
  amount_cents: number;
  currency: string;
  message: string | null;
  anonymous: boolean;
  created_at: string;
}

export interface ChapterRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  area: string;
  county: string;
  message: string | null;
  status: 'pending' | 'reviewed' | 'approved' | 'declined';
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      campaign_signups: {
        Row: CampaignSignup;
        Insert: Omit<CampaignSignup, 'id' | 'created_at'>;
        Update: Partial<Omit<CampaignSignup, 'id' | 'created_at'>>;
      };
      volunteer_registrations: {
        Row: VolunteerRegistration;
        Insert: Omit<VolunteerRegistration, 'id' | 'created_at' | 'status'>;
        Update: Partial<Omit<VolunteerRegistration, 'id' | 'created_at'>>;
      };
      partner_applications: {
        Row: PartnerApplication;
        Insert: Omit<PartnerApplication, 'id' | 'created_at' | 'status'>;
        Update: Partial<Omit<PartnerApplication, 'id' | 'created_at'>>;
      };
      donations: {
        Row: Donation;
        Insert: Omit<Donation, 'id' | 'created_at'>;
        Update: Partial<Omit<Donation, 'id' | 'created_at'>>;
      };
      chapter_requests: {
        Row: ChapterRequest;
        Insert: Omit<ChapterRequest, 'id' | 'created_at' | 'status'>;
        Update: Partial<Omit<ChapterRequest, 'id' | 'created_at'>>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, 'id' | 'created_at'>;
        Update: Partial<Omit<ContactMessage, 'id' | 'created_at'>>;
      };
    };
  };
}
