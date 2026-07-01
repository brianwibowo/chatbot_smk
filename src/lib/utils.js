// Utility helpers for Chatbot Elektro SMK

/**
 * Generate a unique thread ID
 */
export function generateThreadId() {
  return 'thread-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 9);
}

/**
 * Format a date to Indonesian locale string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Baru saja';
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text, maxLength = 40) {
  if (!text) return 'Obrolan Baru';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Generate a title from the first user message
 */
export function generateTitle(text) {
  if (!text) return 'Obrolan Baru';
  // Remove markdown formatting
  const clean = text.replace(/[#*_~`>]/g, '').trim();
  return truncateText(clean, 50);
}
