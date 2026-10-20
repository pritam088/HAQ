# HAQ — आपका अधिकार
> **Government rules, made usable.**  
> *Know the Rule. Check the Reality. Take Action.*

**Hackathon:** Craftora — Build The AI For YOU 2026  
**Team:** Team PreetIQ  
- **Pritam Bairwa** — Team Leader  
- **Sonali Agarwal** — Team Member  
- **Vikas Bairwa** — Team Member  

---

## 1. What is HAQ?

**HAQ** is a citizen-focused, explainable civic-technology platform designed to verify government service delivery rules against citizen evidence.

Instead of operating as an ungrounded general chatbot, HAQ connects a specific citizen case to an applicable, verified official rule, performs deterministic timeline and fee arithmetic, and provides source-grounded AI explanations alongside actionable, user-editable representation drafts.

```
Verified Official Rule ──► Citizen Evidence ──► Deterministic Rule Engine ──► Grounded AI Explanation ──► Actionable Draft
```

---

## 2. Core Features & Capabilities

### 📐 Deterministic Rule-Checking Engine (`src/lib/rule-engine.ts`)
- **Independently Testable Business Logic:** Core timeline calculations are completely decoupled from UI components and external AI providers.
- **Strict Counting Conventions:** Handles both `CALENDAR_DAYS` and `WORKING_DAYS` (excluding weekends), as well as statutory starting triggers (`SUBMISSION_DATE` vs. `ACKNOWLEDGEMENT_DATE`).
- **Typed Result Model:**
  - `VERIFIED_NO_MISMATCH_IDENTIFIED`
  - `POSSIBLE_MISMATCH_REQUIRES_REVIEW`
  - `INSUFFICIENT_INFORMATION`
  - `UNVERIFIED_RULE`
  - `CONFLICTING_EVIDENCE`
  - `INVALID_INPUT`
  - `PROCESSING_ERROR`
- **Automated Vitest Test Suite:** 12 automated unit tests validating edge cases, out-of-order dates, future date prevention, and missing sources.

### 🤖 Source-Grounded AI Adapter (`src/lib/ai-adapter.ts` + `/api/explain`)
- **Provider-Independent:** Configurable adapter supporting Google Gemini (`gemini-2.0-flash`) or any provider via server-side environment variables.
- **Graceful Offline/Demo Fallback:** Automatically switches to structured, grounded deterministic summaries if API keys are absent or rate-limited.
- **Strict Civic Guardrails:** Prevents hallucinated statutory provisions, invented URLs, or allegations of legal misconduct based solely on calendar differences.

### 📄 Evidence Extraction & Receipt Parsing
- **Drag-and-Drop Dropzone:** Supports PDF, PNG, JPG receipts (up to 5MB) processed ephemeral and in-memory.
- **Extraction Pipeline:** Detects candidate dates and application tokens (e.g. `RJ-EM-2026-XXXXX`), displays confidence indicators (`HIGH`, `MEDIUM`), and requires user confirmation before calculations.

### ✍️ Next-Step & Draft Representation Generator
- Generates 3 customizable, fact-supported legal representations:
  1. **Rajasthan Sampark Grievance Inquiry (CM Helpline 181)**
  2. **First Appeal under the Rajasthan Guaranteed Delivery of Public Services Act (RGDPSA)**
  3. **Tehsildar / SDO Office Polite Status Clarification**
- Directly editable in-browser textarea with instant **Copy to Clipboard** and **Download as `.txt`**.
- Direct link to official submission portals like [Rajasthan Sampark](https://sampark.rajasthan.gov.in/).

### 📊 Citizen Case Dashboard (`/dashboard`)
- Local session storage tracking active service applications.
- Real-time status filtering (Potential Mismatches, Within Timeline, Pending Information).
- One-click case re-checks and demo data reset.

### 🏛️ Reviewer Hub & Rule Repository (`/admin/rules`)
- Administrative rule governance viewer with version history, statutory text extracts, and citations.
- **6-Point Verification Audit Checklist** for certifying rules before public release.
- **Interactive Rule Engine Simulator** to test date arithmetic against live rules.

---

## 3. Transparency & Truthfulness Commitment

In strict accordance with hackathon ethics:
1. **Not an Official Government Website:** HAQ is an independent civic-tech prototype developed by Team PreetIQ. It is not endorsed by the Government of Rajasthan or Government of India.
2. **Informational Tool, Not Legal Advice:** Timeline calculations assist citizen understanding and do not constitute formal legal counsel.
3. **Timeline Difference ≠ Legal Violation:** An arithmetic difference between elapsed days and stated limits is an indicator to seek official status clarification, not proof of negligence or corruption (field verifications, document deficiencies, and gazetted holidays pause official timers).
4. **Data Minimization:** HAQ will **NEVER** ask for or store 12-digit Aadhaar numbers, OTPs, SSO passwords, or banking credentials.
5. **Synthetic Demo Notice:** Rules featured in this MVP for Rajasthan eMitra (Caste, Income, Domicile certificates) are structured synthetic demonstration models pending statutory certification.

---

## 4. Application Routes

| Route | Purpose |
|---|---|
| `/` | Landing page with hero, workflow breakdown, and core values |
| `/services` | Searchable government service catalog |
| `/services/[serviceId]` | Service details, eligibility, fees, and rules |
| `/cases/new` | 3-step guided verification workflow with receipt parsing & draft generator |
| `/dashboard` | Citizen case dashboard with timeline analytics |
| `/admin/rules` | Rule governance hub, audit checklist & calculation simulator |
| `/sources` | 4-point verification standard and portal directory |
| `/privacy` | Data minimization & zero-Aadhaar policy |
| `/limitations` | Legal boundaries & civic truthfulness disclosures |
| `/how-it-works` | Step-by-step citizen guide |
| `/api/explain` | POST endpoint for grounded AI explanations |

---

## 5. Getting Started & Development

### Prerequisites
- Node.js 18+ (tested on Node.js 20+)
- npm or pnpm

### Installation
```bash
# Clone the repository and install dependencies
npm install
```

### Running the Live Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Running Automated Tests
```bash
# Run Vitest unit tests for the deterministic rule engine
npm test
```

### Building for Production
```bash
npm run build
npm run start
```

### Optional Environment Variables (`.env.local`)
```env
# Optional: Provide your Gemini API key for live AI completions
# If omitted, HAQ automatically operates with its built-in grounded mock provider.
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash
```

---

## 6. Technology Stack
- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Vanilla Tailwind CSS with custom civic-tech color palette
- **Icons:** Lucide React
- **Date Arithmetic:** `date-fns`
- **Testing:** Vitest & `@vitejs/plugin-react`

---

© 2026 **HAQ — आपका अधिकार** | Team PreetIQ (Craftora: Build The AI For YOU)
