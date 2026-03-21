import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
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
        <PageHeader 
          title="Partner Communications" 
          breadcrumb="B2B Partners → Communications"
          description="Direct messaging threads with partner company representatives."
        />
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
