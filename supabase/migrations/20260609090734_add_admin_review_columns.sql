/*
# Admin Review Enhancements

Adds columns for tracking admin review of partner applications 
and volunteer registrations, enabling approval workflows.
*/

-- Add to partner_applications
ALTER TABLE partner_applications
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS admin_notes text;

-- Add to volunteer_registrations
ALTER TABLE volunteer_registrations
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS admin_notes text;

-- Add to chapter_requests (for completeness)
ALTER TABLE chapter_requests
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS admin_notes text;

-- Create indexes for admin queries
CREATE INDEX IF NOT EXISTS idx_partners_reviewed ON partner_applications (reviewed_at);
CREATE INDEX IF NOT EXISTS idx_volunteers_reviewed ON volunteer_registrations (reviewed_at);
CREATE INDEX IF NOT EXISTS idx_chapters_reviewed ON chapter_requests (reviewed_at);
