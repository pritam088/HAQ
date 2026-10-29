import { createClient } from "@supabase/supabase-js";
import { DEMO_SERVICES, DEMO_RULES, DEMO_CASES } from "./demo-data";
import type { GovernmentService, OfficialRule, CitizenCase } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ztfixhphqczpiyevgibw.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_1ZV5qhRq2wEACc5aNasvSg_Hw5bnN3k";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all government services from Supabase, falling back to demo data if unavailable.
 */
export async function getServices(): Promise<GovernmentService[]> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true);

    if (error || !data || data.length === 0) {
      return DEMO_SERVICES;
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      nameHindi: item.name_hindi || undefined,
      state: item.state,
      department: item.department,
      shortDescription: item.short_description,
      longDescription: item.long_description || undefined,
      eligibilitySummary: item.eligibility_summary || null,
      requiredDocuments: item.required_documents || null,
      applicableFee: item.applicable_fee || null,
      serviceTimeLimit: item.service_time_limit || null,
      appealRoute: item.appeal_route || null,
      officialSourceLinks: item.official_source_links || [],
      verificationStatus: item.verification_status || "PENDING_REVIEW",
      lastReviewedAt: item.last_reviewed_at || null,
      effectiveFrom: item.effective_from || null,
      effectiveTo: item.effective_to || null,
      category: item.category || "General",
      isActive: item.is_active ?? true,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  } catch (err) {
    console.warn("Supabase fetch services error, using fallback:", err);
    return DEMO_SERVICES;
  }
}

/**
 * Fetch single service by ID
 */
export async function getServiceById(id: string): Promise<GovernmentService | undefined> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return DEMO_SERVICES.find((s) => s.id === id);
    }

    return {
      id: data.id,
      name: data.name,
      nameHindi: data.name_hindi || undefined,
      state: data.state,
      department: data.department,
      shortDescription: data.short_description,
      longDescription: data.long_description || undefined,
      eligibilitySummary: data.eligibility_summary || null,
      requiredDocuments: data.required_documents || null,
      applicableFee: data.applicable_fee || null,
      serviceTimeLimit: data.service_time_limit || null,
      appealRoute: data.appeal_route || null,
      officialSourceLinks: data.official_source_links || [],
      verificationStatus: data.verification_status || "PENDING_REVIEW",
      lastReviewedAt: data.last_reviewed_at || null,
      effectiveFrom: data.effective_from || null,
      effectiveTo: data.effective_to || null,
      category: data.category || "General",
      isActive: data.is_active ?? true,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch {
    return DEMO_SERVICES.find((s) => s.id === id);
  }
}

/**
 * Fetch official rules for a specific service ID
 */
export async function getRulesForService(serviceId: string): Promise<OfficialRule[]> {
  try {
    const { data, error } = await supabase
      .from("rules")
      .select("*")
      .eq("service_id", serviceId);

    if (error || !data || data.length === 0) {
      return DEMO_RULES.filter((r) => r.serviceId === serviceId);
    }

    return data.map((item) => ({
      id: item.id,
      serviceId: item.service_id,
      state: item.state,
      department: item.department,
      ruleTitle: item.rule_title,
      ruleText: item.rule_text,
      sourceUrl: item.source_url,
      sourceType: item.source_type,
      sourcePage: item.source_page || undefined,
      sourceSection: item.source_section || undefined,
      effectiveFrom: item.effective_from,
      effectiveTo: item.effective_to || null,
      verificationStatus: item.verification_status,
      verifiedBy: item.verified_by || null,
      verifiedAt: item.verified_at || null,
      lastCheckedAt: item.last_checked_at || null,
      applicabilityConditions: item.applicability_conditions || null,
      deadlineValue: item.deadline_value || null,
      deadlineUnit: item.deadline_unit || null,
      deadlineBasis: item.deadline_basis || null,
      feeValue: item.fee_value || null,
      feeCurrency: item.fee_currency || "INR",
      appealInformation: item.appeal_information || null,
      ruleVersion: item.rule_version || 1,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  } catch {
    return DEMO_RULES.filter((r) => r.serviceId === serviceId);
  }
}

export type StoredCitizenCase = CitizenCase & {
  resultStatus: string;
  elapsedDays?: number;
  allowedDays?: number;
  differenceDays?: number;
  ruleTitle?: string;
  sourceUrl?: string;
};

/**
 * Fetch all citizen cases (for Dashboard)
 */
export async function getCitizenCases(): Promise<StoredCitizenCase[]> {
  try {
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      // If table is empty or error, check localStorage in browser if available
      if (typeof window !== "undefined") {
        const local = window.localStorage.getItem("haq_citizen_cases");
        if (local) {
          try {
            return JSON.parse(local);
          } catch {
            // ignore
          }
        }
      }
      return DEMO_CASES;
    }

    return data.map((c) => ({
      id: c.id,
      userId: c.user_id || null,
      serviceId: c.service_id,
      serviceName: c.service_name,
      applicationDate: c.application_date || null,
      acknowledgementDate: c.acknowledgement_date || null,
      applicationReference: c.application_reference || null,
      currentStatus: c.current_status || null,
      actualCompletionDate: c.actual_completion_date || null,
      userNotes: c.user_notes || null,
      status: c.status || "PROCESSING",
      resultStatus: c.result_status || "INSUFFICIENT_INFORMATION",
      elapsedDays: c.elapsed_days || undefined,
      allowedDays: c.allowed_days || undefined,
      differenceDays: c.difference_days || undefined,
      ruleTitle: c.rule_title || undefined,
      sourceUrl: c.source_url || undefined,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    }));
  } catch {
    return DEMO_CASES;
  }
}

/**
 * Save a new citizen case to Supabase
 */
export async function saveCitizenCase(newCase: StoredCitizenCase): Promise<boolean> {
  try {
    const row = {
      id: newCase.id,
      service_id: newCase.serviceId,
      service_name: newCase.serviceName,
      application_date: newCase.applicationDate || null,
      acknowledgement_date: newCase.acknowledgementDate || null,
      application_reference: newCase.applicationReference || null,
      current_status: newCase.currentStatus || null,
      actual_completion_date: newCase.actualCompletionDate || null,
      user_notes: newCase.userNotes || null,
      status: newCase.status || "PROCESSING",
      result_status: newCase.resultStatus,
      elapsed_days: newCase.elapsedDays || null,
      allowed_days: newCase.allowedDays || null,
      difference_days: newCase.differenceDays || null,
      rule_title: newCase.ruleTitle || null,
      source_url: newCase.sourceUrl || null,
      created_at: newCase.createdAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("cases").upsert(row);

    // Also sync to localStorage as redundant local backup
    if (typeof window !== "undefined") {
      try {
        const local = window.localStorage.getItem("haq_citizen_cases");
        const existing: StoredCitizenCase[] = local ? JSON.parse(local) : [...DEMO_CASES];
        const updated = [newCase, ...existing.filter((c) => c.id !== newCase.id)];
        window.localStorage.setItem("haq_citizen_cases", JSON.stringify(updated));
      } catch {
        // ignore
      }
    }

    if (error) {
      if (error.code === "PGRST205") {
        console.info(
          "ℹ️ Case stored in local storage. To sync with cloud Supabase, execute 'supabase-schema.sql' in your Supabase SQL editor."
        );
      } else {
        console.warn("Supabase save case warning:", error.message || error);
      }
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase save fallback to local storage:", err);
    return false;
  }
}

/**
 * Delete a citizen case from Supabase
 */
export async function deleteCitizenCase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("cases").delete().eq("id", id);

    // Sync to local storage
    if (typeof window !== "undefined") {
      try {
        const local = window.localStorage.getItem("haq_citizen_cases");
        if (local) {
          const existing: StoredCitizenCase[] = JSON.parse(local);
          const filtered = existing.filter((c) => c.id !== id);
          window.localStorage.setItem("haq_citizen_cases", JSON.stringify(filtered));
        }
      } catch {
        // ignore
      }
    }

    return !error;
  } catch {
    return false;
  }
}
