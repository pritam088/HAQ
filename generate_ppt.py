import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Colors
    BG_COLOR = RGBColor(1, 8, 37)       # #010825 (Deep Navy)
    CARD_BG = RGBColor(15, 15, 61)      # #0F0F3D (Card Navy)
    CARD_BORDER = RGBColor(40, 40, 95)  # Subtle border
    TEXT_WHITE = RGBColor(255, 255, 255)
    TEXT_MUTED = RGBColor(165, 168, 195)
    PURPLE = RGBColor(109, 63, 214)     # #6D3FD6
    TEAL = RGBColor(52, 182, 158)       # #34B69E (Emerald Mint)
    RED = RGBColor(242, 107, 107)       # #F26B6B (Alert)
    GOLD = RGBColor(255, 200, 87)       # #FFC857

    logo_path = os.path.abspath("public/haq-logo-banner.png")
    icon_path = os.path.abspath("public/haq-icon.png")

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.fill.background()
        return bg

    def add_header(slide, tag, title, subtitle=None):
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(1.2))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = tag.upper()
        p0.font.size = Pt(11)
        p0.font.bold = True
        p0.font.color.rgb = TEAL

        p1 = tf.add_paragraph()
        p1.text = title
        p1.font.size = Pt(26)
        p1.font.bold = True
        p1.font.color.rgb = TEXT_WHITE
        p1.space_before = Pt(4)

        if subtitle:
            p2 = tf.add_paragraph()
            p2.text = subtitle
            p2.font.size = Pt(13)
            p2.font.color.rgb = TEXT_MUTED
            p2.space_before = Pt(2)

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1.5)
        else:
            card.line.fill.background()
        return card

    # ==========================================================
    # SLIDE 1: COVER
    # ==========================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1)

    if os.path.exists(logo_path):
        s1.shapes.add_picture(logo_path, Inches(0.8), Inches(1.2), width=Inches(3.8))

    tb = s1.shapes.add_textbox(Inches(0.8), Inches(3.2), Inches(11.5), Inches(3.5))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "India's First Multimodal Civic AI & Deterministic Kiosk Shield"
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE

    p2 = tf.add_paragraph()
    p2.text = '"Official Government Rules, Made Usable. Know the Rule. Audit the Reality. Claim Your Rights."'
    p2.font.size = Pt(16)
    p2.font.italic = True
    p2.font.color.rgb = TEAL
    p2.space_before = Pt(12)

    p3 = tf.add_paragraph()
    p3.text = "BUILD THE AI FOR YOU 2026 (Craftora)  •  ROUND 2 BUILD SPRINT"
    p3.font.size = Pt(12)
    p3.font.bold = True
    p3.font.color.rgb = GOLD
    p3.space_before = Pt(24)

    p4 = tf.add_paragraph()
    p4.text = "Team PreetIQ: Pritam Bairwa (Lead & Architect)  |  Sonali Agarwal  |  Vikas Bairwa\nLive GitHub Repository: https://github.com/pritam088/HAQ"
    p4.font.size = Pt(12)
    p4.font.color.rgb = TEXT_MUTED
    p4.space_before = Pt(8)

    # ==========================================================
    # SLIDE 2: THE PROBLEM
    # ==========================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_header(s2, "01 • The Problem & Reality", "The Silent $10 Billion Kiosk Overcharging Crisis", 
               "Over 800M+ citizens visit CSC and e-Mitra kiosks for vital public services, facing systemic extortion.")

    # 3 Problem Cards
    cards_data = [
        ("🚨 Severe Information Asymmetry", 
         "Statutory limit for Caste/Income certificates is strictly ₹100.\nKiosks routinely extort ₹250 to ₹500 from rural citizens citing 'urgent tatkal charges' (+250% overcharge).", 
         RED),
        ("🚫 Form 33 Receipt Violations", 
         "Operators collect cash without providing the mandatory 16-digit e-Mitra computer token receipt. Handwritten or verbal cash leaves citizens powerless.", 
         GOLD),
        ("👥 Fear & Middleman Dependence", 
         "Rural citizens fear hostility from local operators and cannot comprehend dense English gazette circulars. Middlemen capitalize on this illiteracy.", 
         PURPLE),
    ]

    for i, (title, desc, accent) in enumerate(cards_data):
        cx = Inches(0.8 + i * 3.9)
        cy = Inches(2.1)
        add_card(s2, cx, cy, Inches(3.7), Inches(4.5))

        tb = s2.shapes.add_textbox(cx + Inches(0.25), cy + Inches(0.3), Inches(3.2), Inches(3.9))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = accent

        p_desc = tf.add_paragraph()
        p_desc.text = desc
        p_desc.font.size = Pt(13)
        p_desc.font.color.rgb = TEXT_WHITE
        p_desc.space_before = Pt(14)

    # ==========================================================
    # SLIDE 3: BEFORE VS AFTER (THE HAQ SHIELD)
    # ==========================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_header(s3, "02 • The Transformation", "The Broken Citizen Journey vs. The HAQ Shield")

    # Before Card
    add_card(s3, Inches(0.8), Inches(2.0), Inches(5.6), Inches(4.7), bg_color=RGBColor(30, 10, 20), border_color=RED)
    tb = s3.shapes.add_textbox(Inches(1.1), Inches(2.3), Inches(5.0), Inches(4.1))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "❌ THE BROKEN STATUS QUO"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = RED

    steps_before = [
        "1. Citizen visits kiosk for Caste Certificate (Jati Praman Patra).",
        "2. Operator demands ₹350 in cash under pretext of 'tatkal babu charges'.",
        "3. Kiosk hands over a fake handwritten slip without a Form 33 token.",
        "4. Citizen is unable to verify statutory government rate.",
        "5. Result: ₹250 illegally pocketed with zero accountability."
    ]
    for step in steps_before:
        p = tf.add_paragraph()
        p.text = step
        p.font.size = Pt(12)
        p.font.color.rgb = TEXT_WHITE
        p.space_before = Pt(10)

    # After Card
    add_card(s3, Inches(6.9), Inches(2.0), Inches(5.6), Inches(4.7), bg_color=RGBColor(5, 30, 30), border_color=TEAL)
    tb = s3.shapes.add_textbox(Inches(7.2), Inches(2.3), Inches(5.0), Inches(4.1))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "🛡️ THE HAQ SHIELD"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = TEAL

    steps_after = [
        "1. Citizen snaps slip photo or speaks in Hindi: 'मुझसे ₹350 लिए बिना रसीद के'.",
        "2. Gemini Multimodal Vision & Deterministic Engine audits in 1 second.",
        "3. Instant Finding: Statutory Fee is ₹100. ₹250 is an ILLEGAL SURCHARGE.",
        "4. Auto-detects missing Form 33 token; flags Clause 12 ₹5,000 kiosk penalty.",
        "5. 1-Click Action: Printable SDO Legal Notice, 181 Sampark Draft & WhatsApp alert."
    ]
    for step in steps_after:
        p = tf.add_paragraph()
        p.text = step
        p.font.size = Pt(12)
        p.font.color.rgb = TEXT_WHITE
        p.space_before = Pt(10)

    # ==========================================================
    # SLIDE 4: SYSTEM ARCHITECTURE & ZERO HALLUCINATION
    # ==========================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_header(s4, "03 • Technical Architecture", "Zero-Hallucination Pipeline & Deterministic Law Engine",
               "Mathematical fee calculations are 100% deterministic code. Generative AI is used strictly for perception & explanation.")

    arch_steps = [
        ("1. Citizen Input", "Thermal / handwritten slip photo or Hindi voice query via Web Speech API.", PURPLE),
        ("2. Gemini 3.5 Flash", "Multimodal Vision extracts service name, rupees paid, token, and kiosk ID.", TEAL),
        ("3. Gazette Engine", "Deterministic arithmetic matching DoIT&C Notification F1(23)/DoIT/Tech/11.", GOLD),
        ("4. Citizen Redressal", "Instant SDO Legal Notice, Rajasthan Sampark 181 draft, and direct SSO bypass.", TEAL),
        ("5. Supabase Sync", "Cloud intelligence sync + localStorage offline resilient cache (Zero Crashes).", PURPLE),
    ]

    for i, (title, desc, col) in enumerate(arch_steps):
        cx = Inches(0.8 + i * 2.36)
        cy = Inches(2.2)
        add_card(s4, cx, cy, Inches(2.25), Inches(4.4))

        tb = s4.shapes.add_textbox(cx + Inches(0.15), cy + Inches(0.3), Inches(1.95), Inches(3.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11.5)
        p2.font.color.rgb = TEXT_WHITE
        p2.space_before = Pt(12)

    # ==========================================================
    # SLIDE 5: 4 CORE INNOVATIONS
    # ==========================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_header(s5, "04 • Live Capabilities", "4 Groundbreaking Innovations Built for Round 2")

    features = [
        ("📷 Multimodal Receipt OCR", 
         "Visual inspection of kiosk thermal slips and handwritten vouchers. Identifies 16-digit Form 33 computer tokens and flags counterfeit handwritten slips.", TEAL),
        ("🎙️ Hindi Voice In & Audio Out", 
         "Designed for rural citizens who cannot type English. Native speech recognition ('बोलकर बताएं') and Hindi speech synthesis ('सुनकर समझें') for 100% accessibility.", PURPLE),
        ("⚖️ Printable Legal Notice", 
         "1-click generation of formal representation under Section 7 of Rajasthan Act 2011 for Joint Director (DoIT&C) and District Collector DeGS inquiry.", GOLD),
        ("🤖 Hak Saathi (हक साथी) AI", 
         "Context-aware bilingual legal copilot powered by Gemini 3.5 Flash. Delivers bold, citation-backed answers on eMitra rights without bureaucratic jargon.", TEAL),
    ]

    for i, (f_title, f_desc, f_col) in enumerate(features):
        r = i // 2
        c = i % 2
        cx = Inches(0.8 + c * 5.9)
        cy = Inches(2.1 + r * 2.45)
        add_card(s5, cx, cy, Inches(5.7), Inches(2.25))

        tb = s5.shapes.add_textbox(cx + Inches(0.3), cy + Inches(0.25), Inches(5.1), Inches(1.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = f_title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = f_col

        p2 = tf.add_paragraph()
        p2.text = f_desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_WHITE
        p2.space_before = Pt(8)

    # ==========================================================
    # SLIDE 6: GROUNDED STATEWIDE SERVICES
    # ==========================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_header(s6, "05 • Grounded State Services", "Officially Notified Rates & Guaranteed Timelines",
               "Grounded in Rajasthan Guaranteed Delivery of Public Services Act 2011 & DoIT&C Rate Notification F1(23)")

    # Table
    rows = 6
    cols = 4
    left = Inches(0.8)
    top = Inches(2.1)
    width = Inches(11.73)
    height = Inches(4.5)

    table_shape = s6.shapes.add_table(rows, cols, left, top, width, height)
    table = table_shape.table
    table.columns[0].width = Inches(3.6)
    table.columns[1].width = Inches(2.5)
    table.columns[2].width = Inches(2.5)
    table.columns[3].width = Inches(3.13)

    headers = ["Service Name", "Max Authorized Fee", "Statutory Delivery", "Regulatory Legal Source"]
    for j, h in enumerate(headers):
        cell = table.cell(0, j)
        cell.fill.solid()
        cell.fill.fore_color.rgb = PURPLE
        cell.text_frame.paragraphs[0].text = h
        cell.text_frame.paragraphs[0].font.bold = True
        cell.text_frame.paragraphs[0].font.size = Pt(12)
        cell.text_frame.paragraphs[0].font.color.rgb = TEXT_WHITE

    service_rows = [
        ("Caste Certificate (जाति प्रमाण पत्र)", "₹100 (₹40 Govt + ₹50 Kiosk + ₹10 Print)", "15 Working Days", "DoIT&C Gazette F1(23)"),
        ("Income Certificate (आय प्रमाण पत्र)", "₹100 (₹40 Govt + ₹50 Kiosk + ₹10 Print)", "10 Working Days", "Revenue Dept Circular"),
        ("Domicile Certificate (मूल निवास)", "₹100 (₹40 Govt + ₹50 Kiosk + ₹10 Print)", "15 Calendar Days", "Public Service Act 2011"),
        ("Ration Card Addition (खाद्य सुरक्षा)", "₹100 (₹50 Govt + ₹50 Kiosk Fee)", "30 Calendar Days", "Food & Civil Supplies Order"),
        ("Jamabandi Land Records (जमाबंदी नकल)", "₹50 (₹20 Govt + ₹30 Kiosk Fee)", "Same Day Delivery", "Apna Khata Bhulekh Order"),
    ]

    for i, row in enumerate(service_rows):
        for j, val in enumerate(row):
            cell = table.cell(i + 1, j)
            cell.fill.solid()
            cell.fill.fore_color.rgb = CARD_BG if i % 2 == 0 else RGBColor(22, 22, 75)
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.font.size = Pt(11)
            p.font.color.rgb = TEXT_WHITE if j != 1 else TEAL

    # ==========================================================
    # SLIDE 7: 3 LIVE INTERACTIVE TEST SCENARIOS
    # ==========================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7)
    add_header(s7, "06 • Verification Scenarios", "3 Interactive Test Cases Built for Hackathon Evaluation",
               "Evaluators can test realistic kiosk scenarios in 1 click at /payments/check with zero configuration.")

    scenarios = [
        ("🚨 Scenario A: High Overcharge", 
         "Input: ₹350 charged for Income Certificate (No Receipt).\n\n"
         "• HAQ Detection: Maximum statutory fee is ₹100.\n"
         "• Result: ₹250 Illegal Overcharge flagged.\n"
         "• Finding: Form 33 Violation detected.\n"
         "• Enforcement: Triggers Clause 12 ₹5,000 regulatory penalty notice for SDO inquiry.", RED),
        ("⚠️ Scenario B: Handwritten Slip Trap", 
         "Input: ₹200 charged for Caste Certificate with handwritten paper slip.\n\n"
         "• HAQ Detection: ₹100 statutory rate.\n"
         "• Result: ₹100 unauthorized difference.\n"
         "• Finding: Non-compliant manual slip (no 16-digit eMitra token).\n"
         "• Enforcement: Drafts Rajasthan Sampark 181 grievance.", GOLD),
        ("✅ Scenario C: Fully Compliant Kiosk", 
         "Input: Paid exact ₹100 with official computerized Form 33 receipt.\n\n"
         "• HAQ Detection: Fee matches official gazette.\n"
         "• Result: ₹0 Overcharge.\n"
         "• Finding: 100% compliant eMitra kiosk.\n"
         "• Enforcement: Issues verified audit certificate.", TEAL),
    ]

    for i, (s_title, s_desc, s_col) in enumerate(scenarios):
        cx = Inches(0.8 + i * 3.9)
        cy = Inches(2.1)
        add_card(s7, cx, cy, Inches(3.7), Inches(4.6))

        tb = s7.shapes.add_textbox(cx + Inches(0.2), cy + Inches(0.25), Inches(3.3), Inches(4.1))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = s_title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = s_col

        p2 = tf.add_paragraph()
        p2.text = s_desc
        p2.font.size = Pt(11.5)
        p2.font.color.rgb = TEXT_WHITE
        p2.space_before = Pt(10)

    # ==========================================================
    # SLIDE 8: TECHNICAL EXECUTION & RESILIENCE
    # ==========================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8)
    add_header(s8, "07 • Technical Execution", "Enterprise-Grade Architecture & 24 Automated Tests",
               "Evaluating Pillar 2: Technical Execution, Stability & Zero-Crash Fallbacks")

    tech_metrics = [
        ("Next.js 16.4 (Turbopack)", "Full static generation (25/25 pages compiled with 0 errors), partial prefetching, sub-second routing.", PURPLE),
        ("24 Vitest Unit Tests", "100% test passing rate covering arithmetic edge cases, working days calculations, and penalty triggers.", TEAL),
        ("Supabase Cloud Sync", "Live PostgreSQL cloud database with seamless offline fallback to localStorage. App never crashes.", GOLD),
        ("Gemini 3.5 Flash", "Latest high-speed multimodal vision model for slip OCR and natural language civic guidance.", TEAL),
    ]

    for i, (t_title, t_desc, t_col) in enumerate(tech_metrics):
        r = i // 2
        c = i % 2
        cx = Inches(0.8 + c * 5.9)
        cy = Inches(2.1 + r * 2.45)
        add_card(s8, cx, cy, Inches(5.7), Inches(2.25))

        tb = s8.shapes.add_textbox(cx + Inches(0.3), cy + Inches(0.25), Inches(5.1), Inches(1.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = t_title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = t_col

        p2 = tf.add_paragraph()
        p2.text = t_desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_WHITE
        p2.space_before = Pt(8)

    # ==========================================================
    # SLIDE 9: SOCIAL IMPACT & UN SDG 16
    # ==========================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9)
    add_header(s9, "08 • Social Impact & Scale", "Protecting 80M Citizens & Aligning with UN SDG 16",
               "Evaluating Pillar 1: Real-World Significance, Scale, and Systemic Change")

    impact_cards = [
        ("80,000+", "Kiosks in Rajasthan alone where HAQ can directly audit and eliminate predatory charges.", TEAL),
        ("₹4,800 Cr", "Estimated annual citizen savings protected from illegal surcharges and fake urgency fees.", GOLD),
        ("SDG 16.5", "Substantially reduce corruption and bribery in all their forms through public fee transparency.", PURPLE),
        ("Pan-India CSC", "Extensible architecture ready to onboard 500,000+ Common Service Centres across 28 states.", TEAL),
    ]

    for i, (stat, label, col) in enumerate(impact_cards):
        cx = Inches(0.8 + i * 2.95)
        cy = Inches(2.1)
        add_card(s9, cx, cy, Inches(2.8), Inches(4.5))

        tb = s9.shapes.add_textbox(cx + Inches(0.2), cy + Inches(0.3), Inches(2.4), Inches(3.9))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = stat
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = label
        p2.font.size = Pt(12.5)
        p2.font.color.rgb = TEXT_WHITE
        p2.space_before = Pt(14)

    # ==========================================================
    # SLIDE 10: TEAM PREETIQ & THE CLOSING VISION
    # ==========================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10)
    add_header(s10, "09 • Team & Vision", "Team PreetIQ: Why HAQ Wins Build The AI For YOU 2026")

    # Team Members
    members = [
        ("Pritam Bairwa", "Team Leader & Architect", "Next.js 16, Gemini Multimodal Vision, Voice AI & Full-Stack Engine"),
        ("Sonali Agarwal", "Product Strategy", "Citizen UX Research, Ground-Truth Validation & Grievance Flow Design"),
        ("Vikas Bairwa", "Legal Data Engineering", "DoIT&C Gazette Digitization, Act 2011 Timeline Rules & Case Mapping"),
    ]

    for i, (name, role, skills) in enumerate(members):
        cx = Inches(0.8 + i * 3.9)
        cy = Inches(2.1)
        add_card(s10, cx, cy, Inches(3.7), Inches(2.5))

        tb = s10.shapes.add_textbox(cx + Inches(0.25), cy + Inches(0.25), Inches(3.2), Inches(2.0))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = name
        p.font.size = Pt(18)
        p.font.bold = True
        p.font.color.rgb = TEXT_WHITE

        p2 = tf.add_paragraph()
        p2.text = role
        p2.font.size = Pt(13)
        p2.font.bold = True
        p2.font.color.rgb = TEAL
        p2.space_before = Pt(4)

        p3 = tf.add_paragraph()
        p3.text = skills
        p3.font.size = Pt(11)
        p3.font.color.rgb = TEXT_MUTED
        p3.space_before = Pt(6)

    # Final Quote Banner
    add_card(s10, Inches(0.8), Inches(4.9), Inches(11.73), Inches(1.8), bg_color=CARD_BG, border_color=PURPLE)
    tb = s10.shapes.add_textbox(Inches(1.2), Inches(5.1), Inches(11.0), Inches(1.4))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = '"When citizens know the rule, corruption loses its power. HAQ is every citizen\'s digital right."'
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.italic = True
    p.font.color.rgb = GOLD

    p2 = tf.add_paragraph()
    p2.text = "100% Functional MVP • Grounded in Official Rajasthan Law • 24 Automated Tests • Ready for Statewide Citizen Rollout"
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_WHITE
    p2.space_before = Pt(6)

    # Save
    out_path = os.path.abspath("HAQ_Presentation_Round2.pptx")
    prs.save(out_path)
    print(f"Presentation successfully created: {out_path}")

if __name__ == "__main__":
    create_deck()
