/*
# Tighten INSERT Policies — Replace WITH CHECK (true) with Field Validation

## Problem
All six public INSERT policies used `WITH CHECK (true)`, which the security
scanner correctly flags as unrestricted access. Although these tables are
intentionally open to anonymous visitors for public form submissions, the
WITH CHECK clause should enforce meaningful data constraints rather than
unconditionally allowing any row.

## Changes

### All six INSERT policies are replaced
Each `public_insert_*` policy now validates the minimum required fields using
non-trivial predicates. This:

1. Satisfies the security scanner — policies are no longer trivially true.
2. Adds defense-in-depth database-level validation independent of the frontend.
3. Does not block any legitimate form submission (forms already enforce these fields).

### Validation applied per table
- campaign_signups         : name non-empty + valid email format
- volunteer_registrations  : name non-empty + valid email + county non-empty
- partner_applications     : org_name, contact_name non-empty + valid email
- donations                : valid email + amount_cents > 0
- chapter_requests         : name, area, county non-empty + valid email
- contact_messages         : name, message non-empty + valid email

### Email regex
`^[^@\s]+@[^@\s]+\.[^@\s]+$` — permissive but rejects clearly malformed inputs.
*/

-- ── campaign_signups ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public_insert_signups" ON campaign_signups;
CREATE POLICY "public_insert_signups" ON campaign_signups
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(name))  > 0 AND
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

-- ── volunteer_registrations ───────────────────────────────────────────────────
DROP POLICY IF EXISTS "public_insert_volunteers" ON volunteer_registrations;
CREATE POLICY "public_insert_volunteers" ON volunteer_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(name))   > 0 AND
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND
    char_length(trim(county)) > 0
  );

-- ── partner_applications ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public_insert_partners" ON partner_applications;
CREATE POLICY "public_insert_partners" ON partner_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(org_name))     > 0 AND
    char_length(trim(contact_name)) > 0 AND
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

-- ── donations ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public_insert_donations" ON donations;
CREATE POLICY "public_insert_donations" ON donations
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND
    amount_cents > 0
  );

-- ── chapter_requests ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public_insert_chapters" ON chapter_requests;
CREATE POLICY "public_insert_chapters" ON chapter_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(name))   > 0 AND
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND
    char_length(trim(area))   > 0 AND
    char_length(trim(county)) > 0
  );

-- ── contact_messages ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public_insert_contact" ON contact_messages;
CREATE POLICY "public_insert_contact" ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(name))    > 0 AND
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND
    char_length(trim(message)) > 0
  );
