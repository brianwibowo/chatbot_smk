'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Send, Square, Paperclip, X, Image as ImageIcon } from 'lucide-react';
import { convertFileListToFileUIParts } from 'ai';
import {
  canSendMessage,
  getRemainingMessages,
  isWarning,
  isLimitReached,
} from '@/lib/chatLimit';

export default function ChatInput({ onSendMessage, status }) {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const isStreaming = status === 'streaming' || status === 'submitted';
  const limitReached = isLimitReached();
  const remaining = getRemainingMessages();
  const warning = isWarning();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '24px';
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [input]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault?.();

      const trimmed = input.trim();
      if (!trimmed && files.length === 0) return;
      if (!canSendMessage()) return;
      if (isStreaming) return;

      // Build the message parts
      let fileParts = [];
      if (files.length > 0) {
        fileParts = await convertFileListToFileUIParts(files);
      }

      // Send via the AI SDK sendMessage
      onSendMessage({
        text: trimmed,
        files: fileParts.length > 0 ? fileParts : undefined,
      });

      // Clear input
      setInput('');
      setFiles([]);
      setFilePreviews([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = '24px';
      }
    },
    [input, files, isStreaming, onSendMessage]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleFileChange = useCallback((e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Create a DataTransfer to build a FileList
    const dt = new DataTransfer();
    for (const file of selectedFiles) {
      // Only accept images
      if (file.type.startsWith('image/')) {
        dt.items.add(file);
      }
    }
    setFiles(dt.files);

    // Generate previews
    const previews = [];
    for (const file of dt.files) {
      previews.push(URL.createObjectURL(file));
    }
    setFilePreviews(previews);

    // Reset file input
    e.target.value = '';
  }, []);

  const removeFile = useCallback(
    (index) => {
      const dt = new DataTransfer();
      for (let i = 0; i < files.length; i++) {
        if (i !== index) {
          dt.items.add(files[i]);
        }
      }
      setFiles(dt.files);

      // Revoke old preview
      URL.revokeObjectURL(filePreviews[index]);
      setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    },
    [files, filePreviews]
  );

  const canSend = (input.trim().length > 0 || files.length > 0) && !isStreaming && !limitReached;

  return (
    <div className="chat-input">
      <div className="chat-input__inner">
        {/* Attachment Previews */}
        {filePreviews.length > 0 && (
          <div className="chat-input__preview">
            {filePreviews.map((src, idx) => (
              <div key={idx} className="chat-input__preview-item">
                <img src={src} alt="Pratinjau" className="chat-input__preview-img" />
                <button
                  className="chat-input__preview-remove"
                  onClick={() => removeFile(idx)}
                  aria-label="Hapus lampiran"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className={`chat-input__form ${limitReached ? 'chat-input__form--disabled' : ''}`}
        >
          <textarea
            ref={textareaRef}
            className="chat-input__textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              limitReached
                ? 'Kuota harian habis. Coba lagi besok!'
                : 'Tanyakan tentang kelistrikan...'
            }
            rows={1}
            disabled={limitReached}
            id="chat-input"
            aria-label="Tulis pesan"
          />

          <div className="chat-input__actions">
            {/* Attachment Button */}
            <button
              type="button"
              className="chat-input__btn"
              onClick={() => fileInputRef.current?.click()}
              title="Lampirkan gambar"
              disabled={limitReached}
              aria-label="Lampirkan gambar"
            >
              <Paperclip size={18} />
            </button>

            {/* Send / Stop Button */}
            {isStreaming ? (
              <button
                type="button"
                className="chat-input__btn chat-input__btn--stop"
                title="Hentikan"
                aria-label="Hentikan"
              >
                <Square size={16} />
              </button>
            ) : (
              <button
                type="submit"
                className="chat-input__btn chat-input__btn--send"
                disabled={!canSend}
                title="Kirim pesan"
                id="send-btn"
                aria-label="Kirim pesan"
              >
                <Send size={16} />
              </button>
            )}
          </div>
        </form>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="chat-input__file-input"
          onChange={handleFileChange}
          aria-hidden="true"
        />

        {/* Status messages */}
        {limitReached ? (
          <div className="chat-input__limit-reached">
            ⛔ Kuota harian kamu sudah habis (15 pesan). Silakan coba lagi besok!
          </div>
        ) : warning ? (
          <div className="chat-input__limit-warning">
            ⚠️ Sisa kuota hari ini: {remaining} pesan
          </div>
        ) : (
          <div className="chat-input__hint">
            Sisa {remaining} pesan hari ini • Tekan Enter untuk kirim, Shift+Enter untuk baris baru
          </div>
        )}
      </div>
    </div>
  );
}
