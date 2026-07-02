'use client';

import { MessageSquare, Plus, Trash2, User, Sun, Moon } from 'lucide-react';
import { formatDate, truncateText } from '@/lib/utils';

export default function Sidebar({
  threads,
  activeThreadId,
  onNewChat,
  onSelectThread,
  onDeleteThread,
  collapsed,
  theme,
  onToggleTheme,
}) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${!collapsed ? 'sidebar-overlay--visible' : ''}`}
        onClick={onNewChat}
        aria-hidden="true"
      />

      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
        {/* Sidebar Header (Brand Logo & New Chat) */}
        <div className="sidebar__header" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.png" alt="SmartIML AI Logo" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                SmartIML AI
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>XI TITL SMKN 4 Semarang</div>
            </div>
          </div>
          <button className="sidebar__new-chat-btn" onClick={onNewChat} id="new-chat-btn">
            <Plus size={18} />
            Obrolan Baru
          </button>
        </div>

        {/* Thread List */}
        <div className="sidebar__threads">
          {threads.length === 0 ? (
            <div className="sidebar__empty">
              <MessageSquare size={24} style={{ marginBottom: 8, opacity: 0.3 }} />
              <p>Belum ada riwayat obrolan</p>
            </div>
          ) : (
            threads.map((thread) => (
              <div
                key={thread.id}
                className={`sidebar__thread-item ${
                  thread.id === activeThreadId ? 'sidebar__thread-item--active' : ''
                }`}
                onClick={() => onSelectThread(thread.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectThread(thread.id)}
              >
                <MessageSquare size={14} className="sidebar__thread-icon" />
                <span className="sidebar__thread-title">
                  {truncateText(thread.title, 35)}
                </span>
                <button
                  className="sidebar__thread-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteThread(thread.id);
                  }}
                  title="Hapus obrolan"
                  aria-label={`Hapus obrolan: ${thread.title}`}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="sidebar__footer">
          <div className="sidebar__avatar">
            <User size={16} />
          </div>
          <div className="sidebar__user-info">
            <div className="sidebar__user-name">Siswa SMK</div>
            <div className="sidebar__user-role">Jurusan TITL</div>
          </div>
          <button
            className="header__toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
            aria-label="Toggle theme"
            style={{ padding: '6px' }}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        {/* Credit */}
        <div style={{ 
          textAlign: 'center', 
          padding: '6px 8px', 
          fontSize: '0.625rem', 
          color: 'var(--text-muted)', 
          borderTop: '1px solid var(--sidebar-border)', 
          opacity: 0.6,
          letterSpacing: '0.025em'
        }}>
          Dev: M. Hendri Akbar Daffa - UNNES
        </div>
      </aside>
    </>
  );
}

