import { NextRequest, NextResponse } from "next/server";
import { generateExplanation } from "@/lib/ai-adapter";
import { getDemoRulesForService, demoRules } from "@/lib/demo-data";
import type { RuleCheckResult, OfficialRule } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { result, ruleId } = body as {
      result?: RuleCheckResult;
      ruleId?: string;
    };

    if (!result) {
      return NextResponse.json(
        { error: "Missing rule check result" },
        { status: 400 }
      );
    }

    // Find rule by ID or use fallback from demo data
    let rule: OfficialRule | undefined;
    if (ruleId) {
      rule = demoRules.find((r) => r.id === ruleId);
    }

    if (!rule && result.serviceId) {
      const serviceRules = getDemoRulesForService(result.serviceId);
      rule = serviceRules[0];
    }

    // Fallback rule metadata if none found
    if (!rule) {
      rule = {
        id: ruleId || "rule-default",
        serviceId: result.serviceId || "unknown",
        state: "Rajasthan",
        department: "Department of Personnel / Revenue",
        ruleTitle: result.ruleTitle || "Standard Service Delivery Rule",
        ruleText: "Official citizen service delivery guideline.",
        sourceUrl: result.ruleParameters?.sourceUrl || "https://emitra.rajasthan.gov.in",
        sourceType: "SERVICE_CHARTER",
        effectiveFrom: "2024-01-01",
        effectiveTo: null,
        verificationStatus: result.ruleParameters?.verificationStatus || "UNVERIFIED",
        deadlineValue: result.ruleParameters?.deadlineValue ?? 15,
        deadlineUnit: result.ruleParameters?.deadlineUnit ?? "CALENDAR_DAYS",
        deadlineBasis: result.ruleParameters?.deadlineBasis ?? "SUBMISSION_DATE",
        ruleVersion: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    const aiResponse = await generateExplanation(result, rule);

    return NextResponse.json({
      explanation: aiResponse.content,
      provider: aiResponse.provider,
      model: aiResponse.model,
      tokensUsed: aiResponse.tokensUsed,
    });
  } catch (error) {
    console.error("AI explanation error:", error);
    return NextResponse.json(
      {
        error: "Unable to generate AI explanation at this time.",
        fallback:
          "The deterministic rule check calculation remains valid. You may review the timeline analysis and suggested next steps above.",
      },
      { status: 500 }
    );
  }
}
