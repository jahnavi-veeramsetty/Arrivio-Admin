import { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, Info, User, Smile, Paperclip } from 'lucide-react';
import { useRole } from '../../../utils/rbac';

export default function ChatWindow({ thread, onSendMessage }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const canSend = useRole(['super_admin', 'sales_partnership', 'support_agent']);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [thread?.messages]);

  if (!thread) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 bg-gray-50/30 dark:bg-gray-900/10">
        <div className="w-16 h-16 rounded-3xl bg-white dark:bg-gray-800 flex items-center justify-center mb-4 shadow-sm">
          <Smile size={32} />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-gray-300">Select a thread to start messaging</p>
      </div>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1a6644]/10 text-[#1a6644] flex items-center justify-center font-bold border border-[#1a6644]/20">
            {thread.partnerName.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800 dark:text-gray-100">{thread.partnerName}</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{thread.partnerType} · Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Phone size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Info size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/30 dark:bg-gray-900/20">
        {thread.messages.map((m, i) => {
          const isAdmin = m.sender.includes('(Admin)');
          
          return (
            <div key={i} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] flex items-end gap-2 ${isAdmin ? 'flex-row-reverse' : ''}`}>
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                  <User size={12} className="text-gray-400" />
                </div>
                <div className={`p-4 rounded-2xl text-[13px] shadow-sm leading-relaxed ${
                  isAdmin 
                    ? 'bg-[#1a6644] text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                }`}>
                  <div className="text-[10px] font-bold mb-1 opacity-60 uppercase tracking-tighter">
                    {m.sender.split(' ')[0]}
                  </div>
                  {m.text}
                  <div className={`text-[9px] mt-2 font-bold opacity-50 text-right ${isAdmin ? 'text-white' : 'text-gray-400'}`}>
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {canSend && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700">
            <button className="p-2 text-gray-400 hover:text-[#1a6644] transition-colors">
              <Paperclip size={18} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message here..." 
              className="flex-grow bg-transparent border-none focus:ring-0 text-sm py-2"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-2 rounded-xl transition-all shadow-lg ${
                input.trim() 
                  ? 'bg-[#1a6644] text-white shadow-[#1a6644]/20 scale-100' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 scale-95 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
