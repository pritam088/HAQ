-- ============================================================
-- HAQ (Citizen Civic-Tech Platform) — Supabase Database Schema
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ztfixhphqczpiyevgibw/sql
-- ============================================================

-- 1. Enable UUID Extension (if needed)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 2. Create Government Services Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_hindi TEXT,
    state TEXT NOT NULL DEFAULT 'Rajasthan',
    department TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT,
    eligibility_summary TEXT,
    required_documents JSONB DEFAULT '[]'::jsonb,
    applicable_fee TEXT,
    service_time_limit TEXT,
    appeal_route TEXT,
    official_source_links JSONB DEFAULT '[]'::jsonb,
    verification_status TEXT DEFAULT 'PENDING_REVIEW',
    last_reviewed_at TIMESTAMPTZ,
    effective_from DATE DEFAULT '2024-01-01',
    effective_to DATE,
    category TEXT DEFAULT 'Certificates',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================
-- 3. Create Official Rules Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.rules (
    id TEXT PRIMARY KEY,
    service_id TEXT REFERENCES public.services(id) ON DELETE CASCADE,
    state TEXT NOT NULL DEFAULT 'Rajasthan',
    department TEXT NOT NULL,
    rule_title TEXT NOT NULL,
    rule_text TEXT NOT NULL,
    source_url TEXT NOT NULL,
    source_type TEXT DEFAULT 'GOVERNMENT_SERVICE_PAGE',
    source_page TEXT,
    source_section TEXT,
    effective_from DATE DEFAULT '2024-01-01',
    effective_to DATE,
    verification_status TEXT DEFAULT 'PENDING_REVIEW',
    verified_by TEXT,
    verified_at TIMESTAMPTZ,
    last_checked_at TIMESTAMPTZ,
    applicability_conditions TEXT,
    deadline_value INTEGER,
    deadline_unit TEXT,
    deadline_basis TEXT,
    fee_value NUMERIC(10,2),
    fee_currency TEXT DEFAULT 'INR',
    appeal_information TEXT,
    rule_version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================
-- 4. Create Citizen Cases Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.cases (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    service_id TEXT REFERENCES public.services(id) ON DELETE SET NULL,
    service_name TEXT NOT NULL,
    application_date DATE,
    acknowledgement_date DATE,
    application_reference TEXT,
    current_status TEXT,
    actual_completion_date DATE,
    user_notes TEXT,
    status TEXT DEFAULT 'PROCESSING',
    result_status TEXT NOT NULL,
    elapsed_days INTEGER,
    allowed_days INTEGER,
    difference_days INTEGER,
    rule_title TEXT,
    source_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================
-- 5. Enable Row Level Security (RLS) & Set Policies
-- ============================================================
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active services
DROP POLICY IF EXISTS "Public can view active services" ON public.services;
CREATE POLICY "Public can view active services"
ON public.services FOR SELECT
USING (true);

-- Allow anyone to read rules
DROP POLICY IF EXISTS "Public can view rules" ON public.rules;
CREATE POLICY "Public can view rules"
ON public.rules FOR SELECT
USING (true);

-- Allow public read, insert, update, and delete for cases (Citizen application workflow)
DROP POLICY IF EXISTS "Public access to cases" ON public.cases;
CREATE POLICY "Public access to cases"
ON public.cases FOR ALL
USING (true)
WITH CHECK (true);

-- ============================================================
-- 6. Seed Government Services
-- ============================================================
INSERT INTO public.services (
    id, name, name_hindi, state, department, short_description, long_description,
    eligibility_summary, required_documents, applicable_fee, service_time_limit, appeal_route,
    official_source_links, verification_status, category, is_active
) VALUES
(
    'raj-caste-cert-001',
    'Caste Certificate (Jati Praman Patra)',
    'जाति प्रमाण पत्र',
    'Rajasthan',
    'Revenue Department (via eMitra)',
    'Application for issuance of a caste certificate through the eMitra portal in Rajasthan.',
    'The Caste Certificate (Jati Praman Patra) is an official document issued by the Revenue Department of the Government of Rajasthan. It certifies a citizen''s caste and is commonly required for admissions, employment applications, and accessing government welfare schemes. Applications are typically submitted through eMitra kiosks or the eMitra online portal.',
    'Residents of Rajasthan belonging to Scheduled Castes (SC), Scheduled Tribes (ST), or Other Backward Classes (OBC) categories. (Synthetic demonstration model.)',
    '["Application form", "Aadhaar card (for identity verification)", "Ration card or family ID", "Previous caste certificate of a family member (if available)", "Passport-size photographs", "Self-declaration affidavit"]'::jsonb,
    '₹50 application fee at eMitra kiosk',
    '15 working days from date of application',
    'Rajasthan Sampark portal (181) or district-level grievance cell',
    '["https://emitra.rajasthan.gov.in/", "https://rajasthan.gov.in/"]'::jsonb,
    'PENDING_REVIEW',
    'Certificates',
    true
),
(
    'raj-income-cert-001',
    'Income Certificate (Aay Praman Patra)',
    'आय प्रमाण पत्र',
    'Rajasthan',
    'Revenue Department (via eMitra)',
    'Application for issuance of an income certificate through the eMitra portal in Rajasthan.',
    'The Income Certificate is issued by the Revenue Department and certifies the annual income of an individual or family. It is used for availing fee concessions, scholarships, subsidized housing, and other government benefits.',
    'Any resident of Rajasthan requiring an official income declaration. (Synthetic summary.)',
    '["Application form", "Aadhaar card", "Salary slip or income proof", "Self-declaration affidavit", "Ration card"]'::jsonb,
    '₹40 application fee',
    '10 working days',
    'District Collector office or Rajasthan Sampark portal',
    '["https://emitra.rajasthan.gov.in/"]'::jsonb,
    'UNVERIFIED',
    'Certificates',
    true
),
(
    'raj-domicile-cert-001',
    'Domicile Certificate (Mool Niwas Praman Patra)',
    'मूल निवास प्रमाण पत्र',
    'Rajasthan',
    'Revenue Department (via eMitra)',
    'Application for issuance of a domicile / residence certificate in Rajasthan.',
    'The Domicile Certificate (Mool Niwas Praman Patra) certifies that the applicant is a permanent resident of Rajasthan. It is commonly required for state-level admissions, government jobs, and various welfare schemes.',
    'Permanent residents of Rajasthan. (Synthetic summary.)',
    '["Application form", "Aadhaar card", "Ration card or voter ID", "Proof of residence (electricity bill, rent agreement)", "Passport-size photographs"]'::jsonb,
    '₹50',
    '15 calendar days',
    'District Collector office',
    '["https://emitra.rajasthan.gov.in/"]'::jsonb,
    'UNVERIFIED',
    'Certificates',
    true
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    name_hindi = EXCLUDED.name_hindi,
    short_description = EXCLUDED.short_description,
    required_documents = EXCLUDED.required_documents,
    updated_at = timezone('utc'::text, now());

-- ============================================================
-- 7. Seed Official Rules
-- ============================================================
INSERT INTO public.rules (
    id, service_id, state, department, rule_title, rule_text, source_url, source_type,
    verification_status, applicability_conditions, deadline_value, deadline_unit, deadline_basis,
    fee_value, fee_currency, appeal_information, rule_version
) VALUES
(
    'rule-raj-caste-001',
    'raj-caste-cert-001',
    'Rajasthan',
    'Revenue Department',
    'Service Time Limit for Caste Certificate Issuance (Synthetic Example)',
    'SYNTHETIC EXAMPLE: The caste certificate shall be issued within 15 working days from the date of submission of a complete application with all required documents at an eMitra kiosk or through the eMitra online portal.',
    'https://emitra.rajasthan.gov.in/',
    'GOVERNMENT_SERVICE_PAGE',
    'PENDING_REVIEW',
    'Applicable only when a complete application with all required documents has been submitted. Incomplete applications may reset the timeline.',
    15,
    'WORKING_DAYS',
    'SUBMISSION_DATE',
    50.00,
    'INR',
    'If the certificate is not issued within the stated period, a grievance may be filed through the Rajasthan Sampark portal (https://sampark.rajasthan.gov.in/) or the district-level grievance redressal cell.',
    1
),
(
    'rule-raj-income-001',
    'raj-income-cert-001',
    'Rajasthan',
    'Revenue Department',
    'Income Certificate Timely Delivery Guideline (Synthetic)',
    'SYNTHETIC EXAMPLE: The income certificate must be processed and issued within 10 working days of receipt of complete documentation.',
    'https://emitra.rajasthan.gov.in/',
    'GOVERNMENT_SERVICE_PAGE',
    'UNVERIFIED',
    'Subject to verification of employer or agricultural income affidavits.',
    10,
    'WORKING_DAYS',
    'ACKNOWLEDGEMENT_DATE',
    40.00,
    'INR',
    'Contact District Collector office or file grievance on Rajasthan Sampark 181.',
    1
),
(
    'rule-raj-domicile-001',
    'raj-domicile-cert-001',
    'Rajasthan',
    'Revenue Department',
    'Domicile Certificate Issuance Standard (Synthetic)',
    'SYNTHETIC EXAMPLE: Domicile certificates are issued within 15 calendar days from the date of online acknowledgment.',
    'https://emitra.rajasthan.gov.in/',
    'GOVERNMENT_SERVICE_PAGE',
    'UNVERIFIED',
    'Valid residence proof within Rajasthan territory required.',
    15,
    'CALENDAR_DAYS',
    'ACKNOWLEDGEMENT_DATE',
    50.00,
    'INR',
    'SDO / Tehsildar appeal under Public Services Guarantee Act.',
    1
)
ON CONFLICT (id) DO UPDATE SET
    rule_title = EXCLUDED.rule_title,
    rule_text = EXCLUDED.rule_text,
    deadline_value = EXCLUDED.deadline_value,
    deadline_unit = EXCLUDED.deadline_unit,
    updated_at = timezone('utc'::text, now());

-- ============================================================
-- 8. Seed Demo Citizen Cases (for Dashboard)
-- ============================================================
INSERT INTO public.cases (
    id, service_id, service_name, application_date, acknowledgement_date,
    application_reference, current_status, actual_completion_date, user_notes,
    status, result_status, elapsed_days, allowed_days, difference_days,
    rule_title, source_url
) VALUES
(
    'case-demo-001',
    'raj-caste-cert-001',
    'Caste Certificate (Jati Praman Patra)',
    '2026-09-25',
    '2026-09-26',
    'RJ-EM-2026-89421',
    'Under Processing at Tehsil Office',
    NULL,
    'Applied via eMitra kiosk at Sanganer. Fee receipt received. Awaiting certificate for university admission.',
    'PROCESSING',
    'POSSIBLE_MISMATCH_REQUIRES_REVIEW',
    24,
    15,
    9,
    'Service Time Limit for Caste Certificate Issuance (Synthetic Example)',
    'https://emitra.rajasthan.gov.in/'
),
(
    'case-demo-002',
    'raj-income-cert-001',
    'Income Certificate (Aay Praman Patra)',
    '2026-10-12',
    '2026-10-12',
    'RJ-EM-2026-91304',
    'Certificate Issued & Downloaded',
    '2026-10-18',
    'Submitted for fee concession. Processed within the timeline.',
    'COMPLETED',
    'VERIFIED_NO_MISMATCH_IDENTIFIED',
    6,
    10,
    -4,
    'Income Certificate Timely Delivery Guideline (Synthetic)',
    'https://emitra.rajasthan.gov.in/'
),
(
    'case-demo-003',
    'raj-domicile-cert-001',
    'Domicile Certificate (Mool Niwas Praman Patra)',
    '2026-10-15',
    NULL,
    'RJ-EM-2026-92810',
    'Submitted — Receipt Awaited',
    NULL,
    'Submitted application online; physical verification pending.',
    'SUBMITTED',
    'INSUFFICIENT_INFORMATION',
    NULL,
    NULL,
    NULL,
    'Domicile Certificate Issuance Standard (Synthetic)',
    'https://emitra.rajasthan.gov.in/'
)
ON CONFLICT (id) DO NOTHING;
