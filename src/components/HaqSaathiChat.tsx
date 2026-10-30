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
  provider?: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: "नमस्ते! मैं हूँ आपका 'हक साथी' (HAQ Civic AI)। आप राजस्थान ई-मित्र, कानूनी सरकारी फीस, अपने नागरिक अधिकारों, या HAQ के बारे में हिंदी या इंग्लिश में कुछ भी पूछ सकते हैं।",
      sourceDoc: "HAQ Civic Intelligence & Rajasthan Gazette",
      timestamp: "Just now",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const speakText = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    // Clean markdown bold/bullet stars for speech
    const cleanText = text.replace(/[*#_`]/g, "").replace(/•/g, ", ");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "hi-IN";
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages
        .filter((m) => m.id !== "msg-welcome")
        .slice(-6)
        .map((m) => ({
          role: m.sender === "user" ? ("user" as const) : ("model" as const),
          parts: [{ text: m.text }],
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Chat API error: ${res.status}`);
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply || "क्षमा करें, प्रतिक्रिया प्राप्त नहीं हो सकी। कृपया पुनः प्रयास करें।",
        sourceDoc: data.sourceDoc || "DoIT&C Rajasthan Gazette",
        provider: data.provider || "Google Gemini AI",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      // Graceful local fallback
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `नमस्ते! आपके प्रश्न "${query}" के संबंध में: राजस्थान लोक सेवा गारंटी अधिनियम एवं DoIT&C अधिसूचना F1(23)/DoIT/Tech/11/Vol-V के अनुसार सभी प्रमुख प्रमाण पत्रों (जाति, आय, मूल निवास) का कुल अधिकृत शुल्क अधिकतम ₹100 है। कियोस्क द्वारा इससे अधिक शुल्क मांगना अथवा Form 33 कंप्यूटर रसीद न देना दंडनीय अपराध है। आप 181 पर शिकायत दर्ज करा सकते हैं।`,
        sourceDoc: "DoIT&C Rate Notification F1(23)",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
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
                    <div className="mt-2 pt-1.5 border-t border-border-light text-[10px] text-teal font-semibold flex items-center justify-between flex-wrap gap-1">
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-teal shrink-0" />
                        <span>स्रोत: {m.sourceDoc}</span>
                      </div>
                      {m.provider && (
                        <span className="inline-flex items-center gap-1 text-[9px] text-purple bg-purple/10 px-1.5 py-0.2 rounded font-medium">
                          <Sparkles className="w-2.5 h-2.5 text-purple" />
                          {m.provider}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5 px-1">
                  <span className="text-[9px] text-text-muted">{m.timestamp}</span>
                  {m.sender === "bot" && (
                    <button
                      type="button"
                      onClick={() => speakText(m.id, m.text)}
                      className="text-text-muted hover:text-purple transition-colors p-0.5"
                      title={speakingId === m.id ? "बंद करें (Stop)" : "सुनें (Listen Hindi Audio)"}
                    >
                      {speakingId === m.id ? (
                        <VolumeX className="w-3 h-3 text-danger animate-pulse" />
                      ) : (
                        <Volume2 className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start animate-fade-in">
                <div className="bg-white text-navy border border-border rounded-2xl rounded-bl-none p-3 shadow-2xs flex items-center gap-2">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-[10px] text-text-secondary font-medium">
                    हक साथी सोच रहा है (Analyzing Rules)...
                  </span>
                </div>
              </div>
            )}
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
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) handleSend();
              }}
              placeholder={isLoading ? "हक साथी उत्तर तैयार कर रहा है..." : "हक साथी से पूछें... (उदा. what is HAQ, जाति प्रमाण पत्र फीस)"}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-border bg-page-bg text-navy focus:outline-none focus:ring-2 focus:ring-purple/30 font-medium disabled:opacity-60"
            />

            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
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
