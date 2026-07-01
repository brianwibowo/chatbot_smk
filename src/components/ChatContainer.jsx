'use client';

import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { Zap, BookOpen, HelpCircle, Calculator } from 'lucide-react';

const SUGGESTIONS = [
  {
    icon: Zap,
    text: 'Jelaskan Hukum Ohm beserta contoh soalnya',
  },
  {
    icon: BookOpen,
    text: 'Apa perbedaan kabel NYA, NYM, dan NYY?',
  },
  {
    icon: HelpCircle,
    text: 'Bagaimana cara kerja saklar tukar (hotel)?',
  },
  {
    icon: Calculator,
    text: 'Hitung biaya listrik rumah 900 VA per bulan',
  },
];

export default function ChatContainer({ messages, status, onSuggestionClick }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, status]);

  const isEmpty = messages.length === 0;

  return (
    <div className="chat-container" ref={containerRef}>
      {isEmpty ? (
        /* Welcome Screen */
        <div className="welcome">
          <div className="welcome__icon">
            <Zap size={36} color="white" />
          </div>
          <h1 className="welcome__title">
            Halo! Saya <span>Asisten Elektro</span> ⚡
          </h1>
          <p className="welcome__desc">
            Saya siap membantu kamu memahami materi Instalasi Penerangan Listrik.
            Tanyakan apa saja tentang kelistrikan, dari Hukum Ohm sampai K3!
          </p>
          <div className="welcome__suggestions">
            {SUGGESTIONS.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="welcome__suggestion-btn"
                  onClick={() => onSuggestionClick(item.text)}
                  id={`suggestion-${index}`}
                >
                  <Icon size={16} className="welcome__suggestion-icon" />
                  {item.text}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Message List */
        <div className="chat-container__inner">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Streaming / loading indicator */}
          {status === 'streaming' &&
            messages.length > 0 &&
            messages[messages.length - 1].role !== 'assistant' && (
              <div className="chat-message chat-message--assistant">
                <div className="chat-message__avatar">
                  <Zap size={16} color="white" />
                </div>
                <div className="chat-message__content">
                  <div className="chat-message__bubble">
                    <div className="typing-indicator">
                      <div className="typing-indicator__dot" />
                      <div className="typing-indicator__dot" />
                      <div className="typing-indicator__dot" />
                    </div>
                  </div>
                </div>
              </div>
            )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
