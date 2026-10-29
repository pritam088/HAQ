import { NextRequest, NextResponse } from "next/server";
import { checkPayment, validatePaymentInput } from "@/lib/fee-engine";
import type { PaymentCheckInput } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCheckInput;

    const validationErrors = validatePaymentInput(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: validationErrors },
        { status: 400 }
      );
    }

    // Execute deterministic fee comparison
    const result = checkPayment(body);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Payment check API error:", error);
    return NextResponse.json(
      {
        error: "Unable to process payment check at this time.",
        details: error instanceof Error ? error.message : "Internal error",
      },
      { status: 500 }
    );
  }
}
