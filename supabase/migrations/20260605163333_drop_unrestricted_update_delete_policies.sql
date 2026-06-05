/*
# Tighten RLS Policies — Remove Unnecessary UPDATE/DELETE Access

## Problem
The initial schema included UPDATE and DELETE policies scoped to `authenticated`
with USING (true) / WITH CHECK (true). These grant any authenticated user
unrestricted ability to modify or delete all form submissions across all tables.
Since there is no admin panel or admin user system built yet, these policies
provide no legitimate use case and represent a real security risk.

## Changes

### Removed policies (across all 6 tables)
All `auth_update_*` and `auth_delete_*` policies are dropped. Going forward,
only the Supabase service role (used via the dashboard or a future server-side
admin panel) can UPDATE or DELETE rows.

### Retained policies
- `public_insert_*` on all tables — intentionally open to `anon, authenticated`
  so public visitors can submit forms without authenticating. This is correct
  by design for a single-tenant campaign site with no user accounts.
- `auth_select_*` on all tables — authenticated users (future admins) can read
  submissions; anonymous users cannot, protecting personal data.

### Tables affected
campaign_signups, volunteer_registrations, partner_applications,
donations, chapter_requests, contact_messages
*/

-- ── campaign_signups ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_signups" ON campaign_signups;
DROP POLICY IF EXISTS "auth_delete_signups" ON campaign_signups;

-- ── volunteer_registrations ───────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_volunteers" ON volunteer_registrations;
DROP POLICY IF EXISTS "auth_delete_volunteers" ON volunteer_registrations;

-- ── partner_applications ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_partners" ON partner_applications;
DROP POLICY IF EXISTS "auth_delete_partners" ON partner_applications;

-- ── donations ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_donations" ON donations;
DROP POLICY IF EXISTS "auth_delete_donations" ON donations;

-- ── chapter_requests ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_chapters" ON chapter_requests;
DROP POLICY IF EXISTS "auth_delete_chapters" ON chapter_requests;

-- ── contact_messages ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_contact" ON contact_messages;
DROP POLICY IF EXISTS "auth_delete_contact" ON contact_messages;
