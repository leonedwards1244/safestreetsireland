/*
# Safe Streets Ireland — Full Campaign Database Schema

## Overview
This migration creates all data persistence tables for the Safe Streets Ireland
campaign website. The site is single-tenant (no user accounts), so all tables
use anon+authenticated for INSERT (public forms submit freely), and authenticated-only
for SELECT/UPDATE/DELETE (protecting personal data from public read access).

## New Tables

### 1. campaign_signups
Stores newsletter and mailing list sign-ups from the homepage/contact form.
- id: UUID primary key
- name: Full name of the subscriber
- email: Email address (unique per signup)
- interest: What the person wants to do (volunteer, donate, partner, chapter, updates)
- created_at: Timestamp

### 2. volunteer_registrations
Full volunteer application submissions.
- id: UUID primary key
- name: Full name
- email: Email address
- phone: Optional phone number
- county: Irish county or "Nationwide"
- skills: Freetext description of skills/experience
- availability: How often they can volunteer
- message: Optional additional message
- status: Application status (pending/reviewed/active/declined)
- created_at: Timestamp

### 3. partner_applications
Organisation partnership enquiries.
- id: UUID primary key
- org_name: Organisation name
- contact_name: Contact person's name
- email: Contact email
- phone: Optional phone
- org_type: Type of organisation (business/school/sports/council/charity/faith/other)
- message: Details of proposed partnership
- status: Application status
- created_at: Timestamp

### 4. donations
Records donation intent/pledges (actual payment processing via Stripe when added).
- id: UUID primary key
- donor_name: Donor's name (nullable if anonymous)
- email: Donor email
- amount_cents: Amount in euro cents (e.g. 1000 = €10)
- currency: ISO currency code, default 'EUR'
- message: Optional message from donor
- anonymous: Whether to display this donation anonymously
- created_at: Timestamp

### 5. chapter_requests
Requests from people wanting to start a Safe Streets chapter in their area.
- id: UUID primary key
- name: Applicant's name
- email: Email address
- phone: Optional phone
- area: The specific area/town
- county: Irish county
- message: Why they want to start a chapter and relevant experience
- status: Request status
- created_at: Timestamp

### 6. contact_messages
General contact form submissions.
- id: UUID primary key
- name: Sender's name
- email: Sender's email
- subject: Message subject/topic
- message: Full message body
- created_at: Timestamp

## Security
- RLS enabled on ALL tables
- INSERT: open to anon + authenticated (public forms work without login)
- SELECT/UPDATE/DELETE: restricted to authenticated only (protects personal data)
- No user_id columns — this is a single-tenant public campaign site
*/

-- ───────────────────────────────────────────────
-- 1. campaign_signups
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campaign_signups (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text NOT NULL,
  interest    text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE campaign_signups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_signups" ON campaign_signups;
CREATE POLICY "public_insert_signups" ON campaign_signups
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_signups" ON campaign_signups;
CREATE POLICY "auth_select_signups" ON campaign_signups
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_signups" ON campaign_signups;
CREATE POLICY "auth_update_signups" ON campaign_signups
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_signups" ON campaign_signups;
CREATE POLICY "auth_delete_signups" ON campaign_signups
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_campaign_signups_email ON campaign_signups (email);
CREATE INDEX IF NOT EXISTS idx_campaign_signups_created ON campaign_signups (created_at DESC);

-- ───────────────────────────────────────────────
-- 2. volunteer_registrations
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS volunteer_registrations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  email        text NOT NULL,
  phone        text,
  county       text NOT NULL DEFAULT 'Not specified',
  skills       text,
  availability text,
  message      text,
  status       text NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending','reviewed','active','declined')),
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE volunteer_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_volunteers" ON volunteer_registrations;
CREATE POLICY "public_insert_volunteers" ON volunteer_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_volunteers" ON volunteer_registrations;
CREATE POLICY "auth_select_volunteers" ON volunteer_registrations
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_volunteers" ON volunteer_registrations;
CREATE POLICY "auth_update_volunteers" ON volunteer_registrations
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_volunteers" ON volunteer_registrations;
CREATE POLICY "auth_delete_volunteers" ON volunteer_registrations
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_volunteers_email   ON volunteer_registrations (email);
CREATE INDEX IF NOT EXISTS idx_volunteers_status  ON volunteer_registrations (status);
CREATE INDEX IF NOT EXISTS idx_volunteers_created ON volunteer_registrations (created_at DESC);

-- ───────────────────────────────────────────────
-- 3. partner_applications
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_applications (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_name      text NOT NULL,
  contact_name  text NOT NULL,
  email         text NOT NULL,
  phone         text,
  org_type      text NOT NULL DEFAULT 'other'
                  CHECK (org_type IN ('business','school','sports','council','charity','faith','other')),
  message       text,
  status        text NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','reviewed','active','declined')),
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_partners" ON partner_applications;
CREATE POLICY "public_insert_partners" ON partner_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_partners" ON partner_applications;
CREATE POLICY "auth_select_partners" ON partner_applications
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_partners" ON partner_applications;
CREATE POLICY "auth_update_partners" ON partner_applications
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_partners" ON partner_applications;
CREATE POLICY "auth_delete_partners" ON partner_applications
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_partners_email   ON partner_applications (email);
CREATE INDEX IF NOT EXISTS idx_partners_status  ON partner_applications (status);
CREATE INDEX IF NOT EXISTS idx_partners_created ON partner_applications (created_at DESC);

-- ───────────────────────────────────────────────
-- 4. donations
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS donations (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name  text,
  email       text NOT NULL,
  amount_cents integer NOT NULL CHECK (amount_cents > 0),
  currency    text NOT NULL DEFAULT 'EUR',
  message     text,
  anonymous   boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_donations" ON donations;
CREATE POLICY "public_insert_donations" ON donations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_donations" ON donations;
CREATE POLICY "auth_select_donations" ON donations
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_donations" ON donations;
CREATE POLICY "auth_update_donations" ON donations
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_donations" ON donations;
CREATE POLICY "auth_delete_donations" ON donations
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_donations_email   ON donations (email);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations (created_at DESC);

-- ───────────────────────────────────────────────
-- 5. chapter_requests
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chapter_requests (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  email      text NOT NULL,
  phone      text,
  area       text NOT NULL,
  county     text NOT NULL,
  message    text,
  status     text NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending','reviewed','approved','declined')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE chapter_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_chapters" ON chapter_requests;
CREATE POLICY "public_insert_chapters" ON chapter_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_chapters" ON chapter_requests;
CREATE POLICY "auth_select_chapters" ON chapter_requests
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_chapters" ON chapter_requests;
CREATE POLICY "auth_update_chapters" ON chapter_requests
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_chapters" ON chapter_requests;
CREATE POLICY "auth_delete_chapters" ON chapter_requests
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_chapters_county  ON chapter_requests (county);
CREATE INDEX IF NOT EXISTS idx_chapters_status  ON chapter_requests (status);
CREATE INDEX IF NOT EXISTS idx_chapters_created ON chapter_requests (created_at DESC);

-- ───────────────────────────────────────────────
-- 6. contact_messages
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  email      text NOT NULL,
  subject    text,
  message    text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact" ON contact_messages;
CREATE POLICY "public_insert_contact" ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_contact" ON contact_messages;
CREATE POLICY "auth_select_contact" ON contact_messages
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_contact" ON contact_messages;
CREATE POLICY "auth_update_contact" ON contact_messages
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_contact" ON contact_messages;
CREATE POLICY "auth_delete_contact" ON contact_messages
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_contact_email   ON contact_messages (email);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages (created_at DESC);
