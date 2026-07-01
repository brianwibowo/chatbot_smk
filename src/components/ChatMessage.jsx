'use client';

import Markdown from 'react-markdown';
import { Bot, User } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  // Extract text content from message parts
  const textContent = message.parts
    ?.filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('') || '';

  // Extract file parts (images)
  const fileParts = message.parts?.filter((part) => part.type === 'file') || [];

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
        <div className="chat-message__bubble">
          {isAssistant ? (
            textContent ? (
              <Markdown>{textContent}</Markdown>
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
