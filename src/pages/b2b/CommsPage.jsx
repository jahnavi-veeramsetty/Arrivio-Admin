import { useState } from 'react';

import ThreadList from '../../components/b2b/comms/ThreadList';
import ChatWindow from '../../components/b2b/comms/ChatWindow';
import { mockThreads } from '../../mockdata/b2bData';

export default function CommsPage() {
  const [threads, setThreads] = useState(mockThreads);
  const [activeThreadId, setActiveThreadId] = useState(null);

  const activeThread = threads.find(t => t.id === activeThreadId);

  const handleSendMessage = (text) => {
    const newMessage = {
      sender: 'Sarah J. (Admin)',
      text,
      timestamp: new Date().toISOString(),
    };

    setThreads(prev => prev.map(t => 
      t.id === activeThreadId 
        ? { 
            ...t, 
            messages: [...t.messages, newMessage],
            lastMessage: text,
            timestamp: newMessage.timestamp,
            unreadCount: 0 
          }
        : t
    ));
  };

  const handleSelectThread = (thread) => {
    setActiveThreadId(thread.id);
    // Mark as read
    setThreads(prev => prev.map(t => t.id === thread.id ? { ...t, unreadCount: 0 } : t));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="mb-6 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2B OPERATION | PARTNER COMMUNICATIONS</p>
          </div>
        </div>
      </div>

      <div className="flex-grow flex bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl">
        <div className="w-1/3 min-w-[300px]">
          <ThreadList 
            threads={threads} 
            activeThreadId={activeThreadId}
            onSelectThread={handleSelectThread}
          />
        </div>
        <div className="flex-grow">
          <ChatWindow 
            thread={activeThread}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
