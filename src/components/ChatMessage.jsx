'use client';

import { useState, useCallback } from 'react';
import Markdown from 'react-markdown';
import { Bot, User, Copy, Check } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  const [copied, setCopied] = useState(false);

  // Extract text content from message parts
  const textContent = message.parts
    ?.filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('') || '';

  // Extract file parts (images)
  const fileParts = message.parts?.filter((part) => part.type === 'file') || [];

  const handleCopy = useCallback(() => {
    if (!textContent) return;
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [textContent]);

  return (
    <div className={`chat-message chat-message--${message.role}`} id={`msg-${message.id}`}>
      {/* Avatar */}
      <div className="chat-message__avatar">
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Content */}
      <div className="chat-message__content">
        {/* Attachment images */}
        {fileParts.length > 0 && (
          <div className="chat-message__attachments">
            {fileParts.map((file, index) => (
              file.mediaType?.startsWith('image/') && (
                <img
                  key={index}
                  src={file.url || `data:${file.mediaType};base64,${file.data}`}
                  alt="Lampiran"
                  className="chat-message__attachment-img"
                />
              )
            ))}
          </div>
        )}

        {/* Message bubble */}
        <div 
          className="chat-message__bubble"
          style={{ 
            position: 'relative', 
            paddingRight: isAssistant && textContent ? '40px' : '16px' 
          }}
        >
          {isAssistant ? (
            textContent ? (
              <>
                <Markdown>{textContent}</Markdown>
                <button
                  className="header__toggle-btn"
                  onClick={handleCopy}
                  title="Salin teks"
                  aria-label="Salin teks"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    bottom: '6px',
                    padding: '4px',
                    border: 'none',
                    background: 'none',
                    opacity: 0.6,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                >
                  {copied ? (
                    <Check size={14} style={{ color: 'var(--success-500)' }} />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </>
            ) : (
              <div className="typing-indicator">
                <div className="typing-indicator__dot" />
                <div className="typing-indicator__dot" />
                <div className="typing-indicator__dot" />
              </div>
            )
          ) : (
            <span>{textContent}</span>
          )}
        </div>
      </div>
    </div>
  );
}
