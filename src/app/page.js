'use client';

import { useState, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { PanelLeftClose, PanelLeft, Zap, Wifi, WifiOff, Sun, Moon } from 'lucide-react';

import Sidebar from '@/components/Sidebar';
import ChatContainer from '@/components/ChatContainer';
import ChatInput from '@/components/ChatInput';
import { generateThreadId, generateTitle } from '@/lib/utils';
import { recordMessage, getRemainingMessages, isWarning, isLimitReached, canSendMessage } from '@/lib/chatLimit';

const THREADS_KEY = 'elektro_chat_threads';
const ACTIVE_THREAD_KEY = 'elektro_active_thread';

function loadThreads() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(THREADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveThreads(threads) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
}

function loadActiveThreadId() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_THREAD_KEY);
}

function saveActiveThreadId(id) {
  if (typeof window === 'undefined') return;
  if (id) {
    localStorage.setItem(ACTIVE_THREAD_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_THREAD_KEY);
  }
}

export default function ChatPage() {
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(15);
  const [theme, setTheme] = useState('light');

  // AI SDK useChat hook
  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    error,
  } = useChat({
    api: '/api/chat',
  });

  // Load threads from localStorage on mount
  useEffect(() => {
    const savedThreads = loadThreads();
    setThreads(savedThreads);

    const savedActiveId = loadActiveThreadId();
    if (savedActiveId && savedThreads.find((t) => t.id === savedActiveId)) {
      setActiveThreadId(savedActiveId);
      // Load messages for this thread
      const thread = savedThreads.find((t) => t.id === savedActiveId);
      if (thread?.messages) {
        setMessages(thread.messages);
      }
    }

    const savedTheme = localStorage.getItem('elektro_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    setRemaining(getRemainingMessages());
    setMounted(true);

    // Collapse sidebar by default on mobile
    if (window.innerWidth < 768) {
      setSidebarCollapsed(true);
    }
  }, [setMessages]);


  // Save messages to the active thread whenever messages change
  useEffect(() => {
    if (!mounted || !activeThreadId || messages.length === 0) return;
    if (status === 'streaming') return; // Don't save while streaming

    setThreads((prev) => {
      const updated = prev.map((t) => {
        if (t.id === activeThreadId) {
          // Update title from first user message if still default
          let title = t.title;
          if (title === 'Obrolan Baru' && messages.length > 0) {
            const firstUserMsg = messages.find((m) => m.role === 'user');
            if (firstUserMsg) {
              const textContent = firstUserMsg.parts
                ?.filter((p) => p.type === 'text')
                .map((p) => p.text)
                .join('');
              title = generateTitle(textContent);
            }
          }
          return { ...t, title, messages, updatedAt: new Date().toISOString() };
        }
        return t;
      });
      saveThreads(updated);
      return updated;
    });
  }, [messages, activeThreadId, mounted, status]);

  // Update remaining count after messages change
  useEffect(() => {
    if (mounted) {
      setRemaining(getRemainingMessages());
    }
  }, [messages, mounted]);

  const handleNewChat = useCallback(() => {
    const newId = generateThreadId();
    const newThread = {
      id: newId,
      title: 'Obrolan Baru',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setThreads((prev) => {
      const updated = [newThread, ...prev];
      saveThreads(updated);
      return updated;
    });

    setActiveThreadId(newId);
    saveActiveThreadId(newId);
    setMessages([]);

    // Collapse sidebar on mobile after action
    if (window.innerWidth < 768) {
      setSidebarCollapsed(true);
    }
  }, [setMessages]);

  const handleSelectThread = useCallback(
    (threadId) => {
      setActiveThreadId(threadId);
      saveActiveThreadId(threadId);

      const thread = threads.find((t) => t.id === threadId);
      if (thread?.messages) {
        setMessages(thread.messages);
      } else {
        setMessages([]);
      }

      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    },
    [threads, setMessages]
  );

  const handleDeleteThread = useCallback(
    (threadId) => {
      setThreads((prev) => {
        const updated = prev.filter((t) => t.id !== threadId);
        saveThreads(updated);
        return updated;
      });

      if (activeThreadId === threadId) {
        setActiveThreadId(null);
        saveActiveThreadId(null);
        setMessages([]);
      }
    },
    [activeThreadId, setMessages]
  );

  const handleSendMessage = useCallback(
    async ({ text, files }) => {
      if (!canSendMessage()) return;

      // Auto-create thread if none active
      let currentThreadId = activeThreadId;
      if (!currentThreadId) {
        const newId = generateThreadId();
        const newThread = {
          id: newId,
          title: generateTitle(text),
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setThreads((prev) => {
          const updated = [newThread, ...prev];
          saveThreads(updated);
          return updated;
        });
        setActiveThreadId(newId);
        saveActiveThreadId(newId);
        currentThreadId = newId;
      }

      // Record usage
      recordMessage();
      setRemaining(getRemainingMessages());

      // Send using AI SDK sendMessage
      sendMessage({
        text,
        files,
      });
    },
    [activeThreadId, sendMessage]
  );

  const handleSuggestionClick = useCallback(
    (text) => {
      handleSendMessage({ text });
    },
    [handleSendMessage]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('elektro_theme', nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
      return nextTheme;
    });
  }, []);

  // Don't render until mounted (hydration safety)
  if (!mounted) {
    return (
      <div className="app-layout">
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="typing-indicator">
            <div className="typing-indicator__dot" />
            <div className="typing-indicator__dot" />
            <div className="typing-indicator__dot" />
          </div>
        </div>
      </div>
    );
  }

  const quotaClass = isLimitReached()
    ? 'header__quota--danger'
    : isWarning()
    ? 'header__quota--warning'
    : '';

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        threads={threads}
        activeThreadId={activeThreadId}
        onNewChat={handleNewChat}
        onSelectThread={handleSelectThread}
        onDeleteThread={handleDeleteThread}
        collapsed={sidebarCollapsed}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Workspace */}
      <main className="workspace">
        {/* Header */}
        <header className="header">
          <div className="header__left">
            <button
              className="header__toggle-btn"
              onClick={() => setSidebarCollapsed((c) => !c)}
              title={sidebarCollapsed ? 'Buka sidebar' : 'Tutup sidebar'}
              aria-label="Toggle sidebar"
              id="sidebar-toggle"
            >
              {sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </button>
            <div className="header__title-group">
              <h1 className="header__title">
                <Zap size={16} className="header__title-icon" />
                Asisten Elektro
              </h1>
              <span className="header__subtitle">
                AI Guru TITL — SMK Negeri Semarang
              </span>
            </div>
          </div>

          <div className="header__right">
            <div className="header__status">
              <span
                className={`header__status-dot ${
                  error ? 'header__status-dot--error' : ''
                }`}
              />
              {error ? 'Error' : status === 'streaming' ? 'Mengetik...' : 'Online'}
            </div>
            
            {/* Header Theme Toggle Button */}
            <button
              className="header__toggle-btn"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
              aria-label="Toggle theme"
              id="theme-toggle"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <div className={`header__quota ${quotaClass}`}>
              ⚡ {remaining} sisa
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <ChatContainer
          messages={messages}
          status={status}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* Input Area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          status={status}
        />
      </main>
    </div>
  );
}

