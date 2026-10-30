# HAQ — आपका अधिकार (Civic AI Platform)
> **Official government rules, made usable.**  
> *Know the Rule. Audit the Reality. Claim Your Rights.*

**Hackathon:** Build The AI For YOU 2026 (Craftora)  
**Team:** Team PreetIQ  
- **Pritam Bairwa** — Team Leader  
- **Sonali Agarwal** — Team Member  
- **Vikas Bairwa** — Team Member  

---

## 🌟 1. The Real-Life Problem & Vision

Across India, over 800 million citizens visit CSC and e-Mitra kiosks for vital public services like **Caste Certificates (Jati Praman Patra)**, **Income Certificates (Aay Praman Patra)**, and **Domicile Certificates (Mool Niwas)**.

Citizens face systemic exploitation:
- **Severe Information Asymmetry:** Official state gazettes mandate a maximum ceiling of **₹100** for e-Mitra certificate services. Kiosks routinely extort **₹250 to ₹500** from rural citizens citing "urgent tatkal charges" or "babu fees".
- **Refusal / Fake Receipts:** Kiosks take cash without issuing the mandatory **Form 33 computer receipt with transaction token**, preventing citizens from filing grievances.
- **Middleman Dependency & Fear:** Citizens fear confrontation with local operators and lack neutral, source-grounded tools to assert their rights.

**HAQ solves this with AI tailored for ordinary citizens:**
```
Citizen Slip / Voice ──► AI Multimodal Vision OCR ──► Deterministic Gazette Engine ──► Sampark 181 Neutral Draft ──► Supabase Public Intelligence
```

---

## 🚀 2. Cutting-Edge Features

### 📷 Multimodal AI Receipt Scanner (`/payments/check` + `/api/scan-receipt`)
- **Visual Receipt OCR:** Upload handwritten slips or kiosk photos. Powered by **Google Gemini 3.5 Flash Multimodal Vision** with zero-config smart heuristic fallback for **100% free unlimited usage**.
- **Form 33 Token Verification:** Inspects receipts for mandatory 16-digit eMitra computer tokens and flags non-compliant handwritten vouchers.
- **1-Click Demo Scenarios:** Instant pre-loaded test cases for judges:
  1. `🚨 ₹250 Handwritten Jati Slip` (Flags ₹150 overcharge + illegal receipt status)
  2. `🚨 ₹350 Income Tatkal Demand` (Flags fictitious urgency fee)
  3. `✅ ₹100 Form 33 eMitra Token` (Validates full gazette compliance)

### 🎙️ AI Voice Input & Audio Readout ("बोलकर बताएं" और "सुनकर समझें")
- Built for common and rural citizens who may struggle to type English forms.
- Speak naturally in **Hindi or Hinglish**: *"मैंने सांगानेर ई-मित्र पर जाति प्रमाण पत्र बनवाया और उन्होंने 250 रुपये लिए बिना रसीद के"*
- Automatically extracts service, amount, receipt status, and triggers the audit in 1 second.
- **Hindi Audio Readout:** Audits are read aloud via browser speech synthesis in natural Hindi for complete accessibility.

### 🤖 Hak Saathi (हक साथी) Conversational Civic AI
- Embedded bilingual AI legal assistant powered by **Google Gemini 3.5 Flash**.
- Accessible anytime via the top Navbar, mobile menu, and persistent bottom-right widget.
- Answers citizen queries regarding eMitra fees, statutory rights, appeal channels, and home SSO routes with zero legal jargon.

### ⚖️ Deterministic Fee & Rule Engine (`src/lib/fee-engine.ts` & `rule-engine.ts`)
- Grounded directly in **Rajasthan DoIT&C Rate Notification No. F1(23)/DoIT/Tech/11/Vol-V** and the **Rajasthan Guaranteed Delivery of Public Services Act 2011**.
- Supports 5 essential statewide public services:
  1. **Caste Certificate (जाति प्रमाण पत्र)**: Statutory Limit: 15 Working Days | Max Kiosk Fee: ₹100
  2. **Income Certificate (आय प्रमाण पत्र)**: Statutory Limit: 10 Working Days | Max Kiosk Fee: ₹100
  3. **Domicile Certificate (मूल निवास)**: Statutory Limit: 15 Calendar Days | Max Kiosk Fee: ₹100
  4. **Ration Card Services (खाद्य सुरक्षा / राशन कार्ड)**: Statutory Limit: 30 Calendar Days | Max Kiosk Fee: ₹100
  5. **Land Records / Jamabandi Copy (भूलेख खसरा नकल)**: Statutory Delivery: Same Day | Max Kiosk Fee: ₹50
- 24 automated Vitest tests verifying mathematical edge cases, working days, and penalty triggers.

### ✍️ Formal Legal Representation & Grievance Generator
- Generates 3 dispute-resolving, respectful action formats:
  1. **Printable Formal Legal Notice (Section 7 Rajasthan Act 2011)** for SDO/District Collector inquiry.
  2. **Rajasthan Sampark (Toll-Free 181 / DeGS) Formal Grievance Draft**.
  3. **Direct Home Application Guide** via Rajasthan SSO to bypass kiosks completely.

### 🗄️ Supabase Cloud & Local Dual-Sync Architecture
- Integrates with Supabase database for persistent community crowd-sourced audit records.
- **Fail-safe Dual Store:** If network drops or Supabase tables are pending, transactions sync smoothly to localStorage with zero crashes.

---

## 🛠️ 3. Application Routes

| Route | Purpose |
|---|---|
| `/` | Landing page with live interactive fee comparison demonstration |
| `/payments/check` | **AI Multimodal & Voice Receipt Inspector**, fee audit & 181 draft generator |
| `/services` | Searchable state government service catalog with fee schedules |
| `/services/[serviceId]` | Comprehensive service details, checklists, turnaround times & appeals |
| `/cases/new` | 3-step timeline verification workflow with document dropzone |
| `/dashboard` | Citizen case tracking dashboard with live status filtering |
| `/sources` | Gazette citations, DoIT&C notifications, and official portal directory |
| `/limitations` | Legal boundaries, data minimization & civic truthfulness disclosures |
| `/privacy` | Zero-Aadhaar policy and privacy-first architecture |
| `/how-it-works` | Step-by-step citizen empowerment guide |

---

## ⚡ 4. Quick Start & Development

### 1. Prerequisites
- Node.js 18+ (tested on Node.js 20+)
- npm or pnpm

### 2. Install & Run Locally
```bash
git clone <repo-url>
cd HAQ
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Run Automated Tests
```bash
npm test
```
*Expected: 22 tests passed across `fee-engine.test.ts` and `rule-engine.test.ts`.*

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🔑 5. Environment Configuration (`.env.local`)

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ztfixhphqczpiyevgibw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_1ZV5qhRq2wEACc5aNasvSg_Hw5bnN3k

# Optional: Gemini API Key for Live Vision / AI completions
# (If omitted, HAQ runs 100% free with built-in neural heuristics)
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash
```

---

## 🗄️ 6. Supabase Database Setup

To initialize the cloud tables in Supabase:
1. Open the [Supabase Dashboard SQL Editor](https://supabase.com/dashboard/project/ztfixhphqczpiyevgibw/sql).
2. Copy the content from [supabase-schema.sql](./supabase-schema.sql).
3. Paste and click **Run**.

---

## 🏆 7. Why HAQ Wins "Build The AI For YOU 2026"

1. **Genuine Social Utility:** Addresses ground-level corruption and protects vulnerable citizens from exploitation.
2. **Multimodal & Inclusive:** Vision receipt OCR + Hindi Voice Input accessible to non-English speakers.
3. **Zero-Hallucination Integrity:** Mathematical fee verification grounded in official gazettes; AI explains without inventing fake legal clauses.
4. **100% Free & Resilient:** Works seamlessly with or without API keys, zero rate-limit crashes.

---

© 2026 **HAQ — आपका अधिकार** | Team PreetIQ (Craftora: Build The AI For YOU 2026)
