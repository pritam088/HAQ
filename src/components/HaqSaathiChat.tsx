"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Mic,
  MicOff,
  ShieldCheck,
  ChevronDown,
  Volume2,
  VolumeX,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  sourceDoc?: string;
  timestamp: string;
}

const PRESET_FAQS = [
  "जाति प्रमाण पत्र की सही सरकारी फीस क्या है?",
  "अगर ई-मित्र वाला रसीद न दे तो क्या करें?",
  "राजस्थान संपर्क 181 पर शिकायत कैसे करें?",
  "घर बैठे बिना कियोस्क के कैसे अप्लाई करें?",
];

const PRESET_ANSWERS: Record<string, { answer: string; source: string }> = {
  "जाति प्रमाण पत्र की सही सरकारी फीस क्या है?": {
    answer:
      "राजस्थान DoIT&C आदेश F1(23)/DoIT/Tech/11/Vol-V के अनुसार जाति प्रमाण पत्र (Caste Certificate) की कुल अधिकतम फीस केवल ₹100 है:\n• सरकारी आवेदन शुल्क: ₹40\n• ई-मित्र कियोस्क सर्विस चार्ज: ₹50\n• सिक्योरिटी पेपर प्रिंटिंग चार्ज: ₹10\nकियोस्क पर ₹100 से एक भी रुपया अतिरिक्त देना गैर-कानूनी है।",
    source: "DoIT&C Rate Notification F1(23)/DoIT/Tech/11/Vol-V",
  },
  "अगर ई-मित्र वाला रसीद न दे तो क्या करें?": {
    answer:
      "ई-मित्र संचालन नियमावली के तहत ऑपरेटर के लिए 'Form 33 कंप्यूटर जनरेटेड रसीद' (जिसमें टोकन नंबर दर्ज हो) देना अनिवार्य है। बिना रसीद नकद लेना या सादा हाथ का पर्चा देना अपराध है, जिसके लिए कियोस्क पर ₹5,000 की पेनल्टी और लाइसेंस निरस्त हो सकता है। आप तुरंत राजस्थान संपर्क 181 पर शिकायत दर्ज कराएं।",
    source: "eMitra Citizen Charter & Penalty Clause 12",
  },
  "राजस्थान संपर्क 181 पर शिकायत कैसे करें?": {
    answer:
      "आप अपने फोन से टोल-फ्री नंबर 181 डायल करें। ऑपरेटर को बताएं कि किस कियोस्क ने अधिक पैसे लिए और रसीद नहीं दी। या आप sampark.rajasthan.gov.in पोर्टल पर 'eMitra Overcharging' कैटेगरी में शिकायत दर्ज कर सकते हैं। इसकी जांच जिला कलेक्ट्रेट की ACP टीम द्वारा की जाती है।",
    source: "Rajasthan Sampark Portal (181 Toll-Free)",
  },
  "घर बैठे बिना कियोस्क के कैसे अप्लाई करें?": {
    answer:
      "आप बिना किसी कियोस्क जाए अपने मोबाइल/लैपटॉप से sso.rajasthan.gov.in पर लॉगिन करें। eMitra Citizen (New) ऐप खोलें, सेवा चुनें और केवल ₹40 सरकारी शुल्क UPI/Netbanking से भरें। इससे कियोस्क का ₹50-₹150 का खर्च पूरी तरह बच जाता है।",
    source: "Rajasthan Single Sign-On (SSO) Portal",
  },
};

export function HaqSaathiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: "नमस्ते! मैं हूँ आपका 'हक साथी' (HAQ Civic AI)। आप राजस्थान ई-मित्र, कानूनी सरकारी फीस, या अपने नागरिक अधिकारों के बारे में हिंदी या इंग्लिश में कुछ भी पूछ सकते हैं।",
      timestamp: "Just now",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    // Simulate instant AI lookup with grounded responses
    setTimeout(() => {
      let botResponse = "";
      let sourceDoc = "Rajasthan DoIT&C Public Gazette";

      const matchedFaq = Object.keys(PRESET_ANSWERS).find(
        (faq) => query.includes(faq) || faq.includes(query)
      );

      if (matchedFaq) {
        botResponse = PRESET_ANSWERS[matchedFaq].answer;
        sourceDoc = PRESET_ANSWERS[matchedFaq].source;
      } else {
        const lower = query.toLowerCase();
        if (lower.includes("fees") || lower.includes("फीस") || lower.includes("charge") || lower.includes("rupaye")) {
          botResponse =
            "राजस्थान ई-मित्र पर प्रमाण पत्रों (जाति, आय, मूल निवास) का कुल अधिकतम अधिकृत शुल्क ₹100 तय है। कियोस्क संचालक इससे ज्यादा फीस या 'अर्जेंट/तत्काल चार्ज' के नाम पर पैसे नहीं मांग सकते।";
          sourceDoc = "DoIT&C Rate Notification F1(23)";
        } else if (lower.includes("complaint") || lower.includes("शिकायत") || lower.includes("181")) {
          botResponse =
            "यदि किसी कियोस्क ने अवैध पैसे लिए हैं या रसीद नहीं दी है, तो टोल-फ्री नंबर 181 पर कॉल करें या sampark.rajasthan.gov.in पर ग्रीवेंस दर्ज कराएं।";
          sourceDoc = "Rajasthan Sampark 181";
        } else {
          botResponse = `आपके प्रश्न "${query}" के संदर्भ में: राजस्थान लोक सेवा गारंटी अधिनियम के तहत सभी सेवाएं निर्धारित समय सीमा (10-15 कार्य दिवस) और निर्धारित शुल्क (अधिकतम ₹100) में प्रदान की जानी अनिवार्य हैं। बिना Form 33 रसीद के पैसे देना अस्वीकार्य है।`;
          sourceDoc = "Public Services Guarantee Act 2011";
        }
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
        sourceDoc,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  const handleVoice = () => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is supported in Chrome, Edge, and modern browsers.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        setInput(transcript);
        handleSend(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="btn-press flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-purple to-navy text-white font-bold text-xs shadow-xl hover:shadow-2xl hover:scale-105 transition-all border border-white/20 active:scale-95"
        >
          <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>हक साथी (Ask HAQ AI)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-border w-[90vw] sm:w-96 flex flex-col h-[520px] max-h-[85vh] overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy via-navy to-purple text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal/20 text-teal flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <span>हक साथी</span>
                  <span className="text-[10px] font-normal text-teal bg-teal/20 px-1.5 py-0.2 rounded">
                    Civic AI
                  </span>
                </h3>
                <span className="text-[10px] text-white/70 block">
                  Ground-truth citizen legal assistant
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-page-bg text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl shadow-2xs leading-relaxed whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-purple text-white rounded-br-none"
                      : "bg-white text-navy border border-border rounded-bl-none"
                  }`}
                >
                  {m.text}
                  {m.sourceDoc && (
                    <div className="mt-2 pt-1.5 border-t border-border-light text-[10px] text-teal font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-teal" />
                      <span>स्रोत: {m.sourceDoc}</span>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-text-muted mt-0.5 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          <div className="p-2 bg-white border-t border-border overflow-x-auto flex gap-1.5 scrollbar-none text-[11px]">
            {PRESET_FAQS.map((faq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(faq)}
                className="px-2.5 py-1 rounded-full bg-page-bg hover:bg-purple/10 text-text-secondary hover:text-purple border border-border transition-colors whitespace-nowrap text-[10px] font-medium"
              >
                {faq}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-border flex items-center gap-2">
            <button
              type="button"
              onClick={handleVoice}
              className={`p-2 rounded-xl transition-all ${
                isListening
                  ? "bg-danger text-white animate-pulse"
                  : "bg-page-bg text-purple hover:bg-purple/10 border border-border"
              }`}
              title="बोलकर पूछें (Hindi Voice)"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="हक साथी से पूछें... (उदा. जाति प्रमाण पत्र फीस)"
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-border bg-page-bg text-navy focus:outline-none focus:ring-2 focus:ring-purple/30 font-medium"
            />

            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-purple hover:bg-purple-dark text-white disabled:opacity-40 transition-colors shadow-2xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
