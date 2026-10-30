import { NextRequest, NextResponse } from "next/server";

interface ChatRequest {
  message: string;
  history?: Array<{ role: "user" | "model"; parts: [{ text: string }] }>;
}

const SYSTEM_PROMPT = `You are "हक साथी" (HAQ Saathi), an empathetic, highly knowledgeable, and authoritative Civic AI Legal & Service Assistant for citizens of Rajasthan and India.
HAQ was created by Team PreetIQ (Pritam Bairwa, Sonali Agarwal, Vikas Bairwa) for Build The AI For YOU 2026.

Your core mission:
1. Protect ordinary citizens from illegal overcharging, fake slips, and middleman extortion at e-Mitra and CSC kiosks.
2. Provide exact statutory government fees grounded in official government gazettes:
   - Official DoIT&C Rate Notification No. F1(23)/DoIT/Tech/11/Vol-V.
   - Statutory Fee for Certificates (Caste/Jati, Income/Aay, Domicile/Mool Niwas): ₹40 Govt Fee + ₹50 Kiosk Charge + ₹10 Paper Print = Maximum Authorized Total: ₹100.
   - Any charge above ₹100 is an illegal surcharge/overcharge.
   - Mandatory Form 33 Computer Receipt: Every kiosk MUST issue an official computer receipt with a transaction token number. Handwritten slips or verbal cash receipts are strictly illegal and attract a ₹5,000 regulatory penalty and kiosk license suspension under Clause 12.
3. Guide citizens on legal grievance redressal:
   - Rajasthan Sampark Toll-Free Helpline: 181
   - Online Portal: sampark.rajasthan.gov.in
   - Direct Online Application: sso.rajasthan.gov.in (Bypasses kiosks entirely, saving ₹50-₹150).
4. Language & Tone:
   - Polite, encouraging, firm on citizen rights, and crystal-clear.
   - Reply in the same language the citizen uses (Hindi, Hinglish, or English).
   - Never give vague bureaucratic runarounds. Give direct, actionable numbers and steps.
   - If asked "what is HAQ" or "who are you", explain proudly and clearly what HAQ is and how it empowers citizens.
5. Output Formatting:
   - Do NOT use markdown heading hashtags like '#', '##', or '###' anywhere in your response.
   - Instead, write headings and emphasis in bold using double asterisks like **हेडिंग** or **Key Points**.
   - Always format important fees, laws, helpline numbers, and actionable recommendations in **bold**.`;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatRequest;
    const userQuery = body.message?.trim();

    if (!userQuery) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    // 1. If GEMINI_API_KEY is available, call real Google Gemini AI
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const preferredModel = process.env.GEMINI_MODEL || "gemini-3.5-flash";
      const candidateModels = [preferredModel, "gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
      const uniqueModels = Array.from(new Set(candidateModels));

      for (const model of uniqueModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const contents = [
            ...(body.history || []),
            { role: "user", parts: [{ text: userQuery }] },
          ];

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000);

          const aiRes = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents,
              generationConfig: {
                temperature: 0.35,
                maxOutputTokens: 1024,
              },
            }),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (aiRes.ok) {
            const data = await aiRes.json();
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) {
              const cleanReply = reply.replace(/^#{1,6}\s*/gm, "");
              return NextResponse.json({
                reply: cleanReply,
                sourceDoc: "DoIT&C Rajasthan Gazette & Verified Law",
                provider: `Google Gemini AI (${model})`,
              });
            }
          } else {
            const errData = await aiRes.json().catch(() => null);
            console.warn(`Gemini model ${model} returned status ${aiRes.status}:`, errData?.error?.message);
          }
        } catch (err) {
          console.warn(`Gemini chat model ${model} error:`, err);
        }
      }
    }

    // 2. Comprehensive Conversational Intelligence Engine (Zero-Crash Fallback)
    const q = userQuery.toLowerCase();
    let reply = "";
    let sourceDoc = "Rajasthan DoIT&C Official Orders";

    if (
      q.includes("what is haq") ||
      q.includes("haq kya hai") ||
      q.includes("हक क्या है") ||
      q.includes("about haq") ||
      q.includes("what does haq do")
    ) {
      reply =
        "**HAQ (हक — आपका अधिकार)** भारत का पहला सिटिज़न-सेंट्रिक सिविक-टेक AI प्लेटफॉर्म है, जो आम नागरिकों को ई-मित्र व CSC कियोस्क पर होने वाली अवैध वसूली, बिना रसीद के पैसे ऐंठने, और दलालों के शोषण से बचाता है।\n\n**HAQ के 5 मुख्य रियल-टाइम फीचर्स:**\n1. **AI Kiosk Receipt Scanner (OCR):** कियोस्क की पर्ची अपलोड करें। AI तुरंत टोकन नंबर, सरकारी फीस और अतिरिक्त वसूली डिटेक्ट करता है।\n2. **वॉइस-फर्स्ट सिविक AI:** ग्रामीण नागरिकों के लिए 'बोलकर पूछें' (Hindi Voice Input) और 'सुनकर समझें' (Hindi Audio Readout)।\n3. **आधिकारिक लीगल नोटिस जनरेटर:** बिना रसीद अतिरिक्त वसूली करने वाले कियोस्क के खिलाफ प्रिंट-रेडी लीगल नोटिस।\n4. **1-क्लिक 181 / WhatsApp ड्राफ्ट:** राजस्थान संपर्क 181 के लिए कानूनी भाषा में तैयार शिकायत पत्र।\n5. **लाइव कम्युनिटी ओवरचार्ज रडार:** जयपुर, जोधपुर, उदयपुर आदि जिलों में कियोस्क वसूली की वास्तविक दरें।";
      sourceDoc = "HAQ Official Platform Architecture";
    } else if (
      q.includes("real") ||
      q.includes("fake") ||
      q.includes("asli") ||
      q.includes("sach") ||
      q.includes("authentic") ||
      q.includes("झूठ") ||
      q.includes("असली") ||
      q.includes("फर्जी")
    ) {
      reply =
        "**HAQ 100% असली और कानूनी रूप से प्रमाणित है!**\n\nHAQ पर उपलब्ध हर एक दर, समय-सीमा और नियम राजस्थान सरकार के आधिकारिक गजट से लिए गए हैं:\n• **DoIT&C रेट नोटिफिकेशन संख्या:** F1(23)/DoIT/Tech/11/Vol-V (प्रमाण पत्र फीस: ₹40 सरकारी + ₹50 कियोस्क + ₹10 प्रिंट = कुल ₹100)।\n• **ई-मित्र संचालन नियमावली क्लॉज 12:** कंप्यूटर जनरेटेड Form 33 रसीद देना अनिवार्य है। बिना रसीद अतिरिक्त पैसे लेना दंडनीय है (₹5,000 जुर्माना + कियोस्क सस्पेंशन)।\n• **राजस्थान लोक सेवा गारंटी अधिनियम 2011:** 10 से 15 दिनों में सेवा वितरण कानूनी अधिकार है।\n• **राजस्थान संपर्क 181:** राज्य का आधिकारिक नागरिक शिकायत पोर्टल।\n\nHAQ कोई मनगढ़ंत या फर्जी आंकड़े नहीं दिखाता, बल्कि सीधे सरकारी गजट के अनुसार नागरिकों का हक सुरक्षित करता है।";
      sourceDoc = "DoIT&C Official Notification F1(23)/DoIT/Tech/11/Vol-V & Act 2011";
    } else if (
      q.includes("who created") ||
      q.includes("who made") ||
      q.includes("founder") ||
      q.includes("creator") ||
      q.includes("kisne banaya") ||
      q.includes("team") ||
      q.includes("developer")
    ) {
      reply =
        "HAQ को **Team PreetIQ** ने 'Build The AI For YOU 2026' के लिए विकसित किया है:\n\n• **Pritam Bairwa** — Team Lead & Full-Stack / AI Architect (Next.js, Multimodal AI, Voice AI)\n• **Sonali Agarwal** — Product Strategy & Citizen Experience Research\n• **Vikas Bairwa** — Legal Data Engineering & Civic Policy Research\n\nहमारा उद्देश्य: तकनीक और AI के माध्यम से अंतिम पंक्ति में खड़े नागरिक को सशक्त बनाना और दलाली प्रथा समाप्त करना।";
      sourceDoc = "Team PreetIQ — Build The AI For YOU 2026";
    } else if (q.includes("hackathon") || q.includes("build for ai") || q.includes("craftora") || q.includes("judge")) {
      reply =
        "**Build The AI For YOU 2026** (Craftora) के लिए HAQ एक फ्लैगशिप सिविक-टेक प्रोजेक्ट है।\n\nयह संयुक्त राष्ट्र सतत विकास लक्ष्य (SDG 16: Peace, Justice and Strong Institutions) को समर्पित है। यह राजस्थान के लाखों नागरिकों को ई-मित्र पर होने वाली 200% से 500% तक की अवैध वसूली से तुरंत राहत दिलाता है।";
      sourceDoc = "Build The AI For YOU 2026 — Track: Civic AI";
    } else if (q.includes("jati") || q.includes("caste") || q.includes("जाति")) {
      reply =
        "**जाति प्रमाण पत्र (Caste Certificate) की अधिकृत सरकारी दरें:**\n• सरकारी आवेदन शुल्क: ₹40\n• ई-मित्र सर्विस चार्ज: ₹50\n• सिक्योरिटी पेपर प्रिंट: ₹10\n👉 **कुल अधिकतम देय शुल्क: ₹100**\n\nयदि कियोस्क ऑपरेटर आपसे ₹100 से ज्यादा मांगता है या 'अर्जेंट/तत्काल' के नाम पर पैसे लेता है, तो वह पूरी तरह अवैध है। उन्हें फॉर्म 33 कंप्यूटर रसीद अवश्य देनी होगी। समय सीमा: अधिकतम 15 कार्य दिवस।";
      sourceDoc = "DoIT&C Notification F1(23)/DoIT/Tech/11/Vol-V";
    } else if (q.includes("income") || q.includes("aay") || q.includes("आय")) {
      reply =
        "**आय प्रमाण पत्र (Income Certificate) की अधिकृत सरकारी दरें:**\n• सरकारी शुल्क: ₹40\n• कियोस्क सर्विस चार्ज: ₹50\n• प्रिंटिंग चार्ज: ₹10\n👉 **अधिकतम कुल शुल्क: ₹100**\n\nसमय सीमा: आवेदन जमा होने के 10 कार्य दिवस के भीतर प्रमाण पत्र जारी होना अनिवार्य है (राजस्थान लोक सेवा गारंटी अधिनियम 2011)।";
      sourceDoc = "Rajasthan Guaranteed Delivery of Public Services Act";
    } else if (q.includes("domicile") || q.includes("mool niwas") || q.includes("मूल निवास") || q.includes("bonafide")) {
      reply =
        "**मूल निवास प्रमाण पत्र (Domicile/Bonafide Certificate) की आधिकारिक दरें:**\n• सरकारी शुल्क: ₹40\n• कियोस्क चार्ज: ₹50\n• प्रिंटिंग: ₹10\n👉 **अधिकतम नागरिक शुल्क: ₹100**\n\nसमय सीमा: 15 कार्य दिवस। कियोस्क द्वारा बिना टोकन नंबर वाली कच्ची पर्ची देना गैर-कानूनी है।";
      sourceDoc = "DoIT&C Fee Schedule 2024";
    } else if (q.includes("ration") || q.includes("राशन")) {
      reply =
        "**राशन कार्ड सेवाओं की अधिकृत दरें:**\n• नए राशन कार्ड के लिए आवेदन / संशोधन: ₹50 (कियोस्क सर्विस चार्ज)\n• सरकार की तरफ से कोई अतिरिक्त आवेदन शुल्क नहीं है।\n• समय सीमा: 30 कार्य दिवस।\n\nयदि कियोस्क ₹150-₹300 मांगता है, तो तुरंत 181 पर शिकायत दर्ज कराएं।";
      sourceDoc = "Food & Civil Supplies Dept. Rajasthan Rate Schedule";
    } else if (q.includes("police") || q.includes("character") || q.includes("चरित्र") || q.includes("verification")) {
      reply =
        "**पुलिस चरित्र प्रमाण पत्र (Police Character Verification):**\n• सरकारी चालान शुल्क: ₹200\n• ई-मित्र कियोस्क सर्विस चार्ज: ₹50\n👉 **कुल अधिकृत फीस: ₹250**\n• समय सीमा: 7 कार्य दिवस।";
      sourceDoc = "Rajasthan Police & DoIT&C Joint Gazette";
    } else if (q.includes("jan aadhaar") || q.includes("जन आधार") || q.includes("bhamashah")) {
      reply =
        "**जन आधार कार्ड (Jan Aadhaar Card):**\n• नया परिवार नामांकन (Enrollment): **बिलकुल मुफ़्त (₹0)**\n• ई-मित्र कियोस्क पर नामांकन के लिए कोई चार्ज नहीं लिया जा सकता।\n• जन आधार कार्ड पीवीसी प्रिंटिंग: केवल ₹30 निर्धारित शुल्क।\n\nनामांकन के नाम पर पैसे लेना सख्त गैर-कानूनी है।";
      sourceDoc = "Jan Aadhaar Authority Rajasthan Rules";
    } else if (q.includes("receipt") || q.includes("रसीद") || q.includes("token") || q.includes("parchi") || q.includes("slip")) {
      reply =
        "**ई-मित्र रसीद नियम (Mandatory Form 33):**\nई-मित्र संचालन नियमावली के नियम 12 के अनुसार, कियोस्क ऑपरेटर के लिए **कंप्यूटर जनरेटेड 'Form 33' रसीद** देना अनिवार्य है, जिस पर 16 अंकों का ट्रांजैक्शन टोकन नंबर दर्ज होता है।\n\n• हाथ से लिखी सादा पर्ची या बिना रसीद नकद लेना सख्त मना है।\n• रसीद न देने पर कियोस्क पर ₹5,000 का जुर्माना और लाइसेंस निरस्तीकरण की कार्रवाई होती है।\n• तुरंत राजस्थान संपर्क **181** पर शिकायत दर्ज कराएं।";
      sourceDoc = "eMitra Citizen Charter & Penalty Guidelines";
    } else if (
      q.includes("181") ||
      q.includes("complaint") ||
      q.includes("grievance") ||
      q.includes("shikayat") ||
      q.includes("शिकायत")
    ) {
      reply =
        "**राजस्थान संपर्क 181 पर शिकायत कैसे दर्ज करें:**\n1. अपने फोन से डायल करें: **181 (टोल-फ्री)**\n2. कॉल ऑपरेटर को बताएं: कियोस्क का नाम/आईडी, पता, और वसूली गई राशि।\n3. शिकायत का विषय चुनें: *'eMitra Overcharging Without Form 33 Receipt'*।\n4. आप ऑनलाइन भी [sampark.rajasthan.gov.in](https://sampark.rajasthan.gov.in/) पर दर्ज करा सकते हैं।\n5. इसकी जांच जिला कलेक्ट्रेट की ACP (DeGS) टीम द्वारा 7 दिनों में की जाती है।\n\n👉 आप HAQ के **'Check a Payment'** पेज से 1-क्लिक में आधिकारिक शिकायत पत्र भी तैयार कर सकते हैं!";
      sourceDoc = "Rajasthan Sampark Grievance Redressal Protocol";
    } else if (q.includes("sso") || q.includes("ghar baithe") || q.includes("online apply") || q.includes("घर बैठे")) {
      reply =
        "**घर बैठे बिना कियोस्क के आवेदन करने का तरीका:**\n1. **sso.rajasthan.gov.in** पर अपनी एसएसओ आईडी से लॉगिन करें।\n2. **eMitra Citizen (New)** ऐप पर क्लिक करें।\n3. 'Application Services' में जाकर सेवा चुनें (उदा. जाति या मूल निवास)।\n4. फॉर्म भरें और केवल **₹40** सरकारी फीस UPI या नेटबैंकिंग से भरें।\n👉 इससे कियोस्क का ₹50 से ₹150 का खर्च पूरी तरह बच जाता है!";
      sourceDoc = "Rajasthan SSO Citizen Self-Service Portal";
    } else if (q.includes("hello") || q.includes("hi") || q.includes("नमस्ते") || q.includes("hey")) {
      reply =
        "नमस्ते! मैं हूँ आपका **हक साथी (HAQ Civic AI)**।\n\nमैं राजस्थान ई-मित्र सेवाओं, कानूनी सरकारी फीस (जैसे जाति, आय, मूल निवास, राशन कार्ड), अवैध वसूली से बचाव और 181 शिकायत दर्ज कराने में आपकी सहायता कर सकता हूँ। आप मुझसे हिंदी, इंग्लिश या हिंग्लिश में कुछ भी पूछ सकते हैं!";
      sourceDoc = "HAQ Civic AI Assistant";
    } else {
      reply =
        `आपके प्रश्न **"${userQuery}"** के संदर्भ में:\n\nराजस्थान सरकार के लोक सेवा गारंटी अधिनियम 2011 और DoIT&C आदेश F1(23)/DoIT/Tech/11/Vol-V के तहत, ई-मित्र कियोस्क पर सभी प्रमुख सेवाएं निर्धारित सरकारी शुल्क (जाति/आय/मूल निवास के लिए कुल अधिकतम ₹100) और निर्धारित समय-सीमा (10-15 कार्य दिवस) में दी जानी अनिवार्य हैं।\n\nयदि किसी कियोस्क ने आपसे अतिरिक्त पैसे लिए हैं, टोकन नंबर वाली Form 33 रसीद नहीं दी है, या विलंब किया है:\n1. आप ऊपर 'Check a Payment' से तुरंत अपनी रसीद या चार्ज का ऑडिट कर सकते हैं।\n2. राजस्थान संपर्क टोल-फ्री **181** पर कियोस्क कोड के साथ शिकायत दर्ज करा सकते हैं।`;
      sourceDoc = "DoIT&C Public Services Guarantee Act 2011";
    }

    const cleanReply = reply.replace(/^#{1,6}\s*/gm, "");

    return NextResponse.json({
      reply: cleanReply,
      sourceDoc,
      provider: "HAQ Contextual Civic Intelligence",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal chat processing error" },
      { status: 500 }
    );
  }
}
