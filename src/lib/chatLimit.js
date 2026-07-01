// Chatbot Elektro SMK — Chat Usage Limiter (localStorage-based)

const DAILY_MESSAGE_LIMIT = 15;
const WARNING_THRESHOLD = 3;
const STORAGE_KEY = 'elektro_chat_usage';

function generateDeviceId() {
  return 'el-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 9);
}

export function getDeviceId() {
  if (typeof window === 'undefined') return null;
  let id = localStorage.getItem('elektro_device_id');
  if (!id) {
    id = generateDeviceId();
    localStorage.setItem('elektro_device_id', id);
  }
  return id;
}

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

export function getUsageToday() {
  if (typeof window === 'undefined') return { date: getTodayString(), messageCount: 0 };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: getTodayString(), messageCount: 0 };

    const data = JSON.parse(raw);
    // Reset if date changed
    if (data.date !== getTodayString()) {
      const fresh = { date: getTodayString(), messageCount: 0 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    return data;
  } catch {
    return { date: getTodayString(), messageCount: 0 };
  }
}

export function canSendMessage() {
  const usage = getUsageToday();
  return usage.messageCount < DAILY_MESSAGE_LIMIT;
}

export function recordMessage() {
  if (typeof window === 'undefined') return;
  const usage = getUsageToday();
  usage.messageCount += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
}

export function getRemainingMessages() {
  const usage = getUsageToday();
  return Math.max(0, DAILY_MESSAGE_LIMIT - usage.messageCount);
}

export function getUsagePercentage() {
  const usage = getUsageToday();
  return Math.min(100, (usage.messageCount / DAILY_MESSAGE_LIMIT) * 100);
}

export function isWarning() {
  return getRemainingMessages() <= WARNING_THRESHOLD && getRemainingMessages() > 0;
}

export function isLimitReached() {
  return getRemainingMessages() === 0;
}

export { DAILY_MESSAGE_LIMIT, WARNING_THRESHOLD };
