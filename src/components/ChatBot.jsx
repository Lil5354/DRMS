import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Xin chào! Tôi là trợ lý AI của DRMS 😊\n\nBạn cần hỗ trợ gì về hệ thống cứu trợ thiên tai?", 
      isBot: true,
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
  const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isTyping) return;
    
    setInput("");
    
    const userMsg = {
      text: textToSend,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const systemPrompt = `Bạn là chatbot AI của DRMS (Disaster Relief Management System) - Hệ thống quản lý cứu trợ thiên tai.

THÔNG TIN DRMS:
- Chức năng chính: Quản lý quyên góp, phân phối cứu trợ, theo dõi kho hàng, lập lịch vận chuyển
- Người dùng: Nhà tài trợ, tình nguyện viên, quản trị viên, người quản lý kho
- Tính năng nổi bật: 
  + Theo dõi quyên góp và yêu cầu cứu trợ real-time
  + Quản lý kho hàng và phân phối thông minh
  + Lập lịch vận chuyển và theo dõi giao hàng
  + Báo cáo và thống kê chi tiết
  + Xác thực QR code cho hàng hóa
  + Bản đồ hiển thị vị trí cứu trợ

PHONG CÁCH TRẢ LỜI:
- Trả lời ngắn gọn, rõ ràng (2-3 câu)
- Thân thiện và hỗ trợ nhiệt tình
- Dùng emoji vừa phải: 😊, 📦, 🚚, 💝, 🗺️
- Tập trung vào hướng dẫn sử dụng hệ thống
- Luôn sẵn sàng giải đáp thắc mắc`;

      const conversationHistory = messages
        .slice(1)
        .filter(msg => !msg.isTyping)
        .map(msg => ({
          role: msg.isBot ? 'assistant' : 'user',
          content: msg.text
        }));

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...conversationHistory,
            { role: "user", content: textToSend }
          ],
          temperature: 0.7,
          max_tokens: 200
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || 'Xin lỗi, tôi không hiểu. Bạn có thể hỏi lại được không? 😊';
      
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: botResponse, 
        isBot: true, 
        timestamp: new Date()
      }]);
      
    } catch (error) {
      console.error('API Error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau! 😊',
        isBot: true,
        timestamp: new Date()
      }]);
    }
  };

  const quickReplies = ["Quyên góp", "Yêu cầu cứu trợ", "Quản lý kho", "Vận chuyển", "Báo cáo"];

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        {!isOpen && (
          <div className="animate-fade-in mb-2">
            <div className="bg-white rounded-2xl shadow-xl px-4 py-3 max-w-[250px] border-2 border-blue-200">
              <p className="text-sm font-medium text-gray-800">
                Cần hỗ trợ về DRMS? 😊
              </p>
              <div className="absolute -right-2 bottom-4 w-4 h-4 bg-white border-r-2 border-b-2 border-blue-200 transform rotate-[-45deg]"></div>
            </div>
          </div>
        )}
        
        <div className="relative">
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          )}
          <button
            className="h-14 w-14 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-110 bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[550px] bg-white rounded-2xl shadow-2xl border-2 border-blue-200 flex flex-col">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/50">
                  <span className="text-2xl">🤖</span>
                </div>
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base">DRMS Assistant</h3>
                <p className="text-xs text-white/90 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Trả lời ngay lập tức
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div className={`max-w-[85%]`}>
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-md ${
                      msg.isBot
                        ? "bg-white border border-gray-200 text-gray-800"
                        : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 px-2">
                    {msg.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 py-2 flex gap-2 overflow-x-auto">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  className="text-xs whitespace-nowrap border border-blue-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-colors flex-shrink-0 px-3 py-1.5 rounded-lg"
                  onClick={() => handleSend(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Nhập câu hỏi của bạn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border-2 focus:border-blue-500 rounded-lg px-3 py-2 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg text-white p-2 rounded-lg disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
