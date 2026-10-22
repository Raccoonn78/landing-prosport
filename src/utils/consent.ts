// Согласие на cookie и сбор обезличенных данных.
// Перед подключением аналитики (например, Яндекс Метрики) проверяйте hasAnalyticsConsent()
// и/или слушайте событие 'prosport:consent' — оно приходит, когда посетитель сделал выбор.

export type Consent = 'all' | 'necessary';

const KEY = 'prosport-cookie-consent';

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const value = JSON.parse(raw)?.value;
    return value === 'all' || value === 'necessary' ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ value, date: new Date().toISOString() }));
  } catch {
    /* хранилище недоступно — баннер просто покажется снова при следующем визите */
  }
  window.dispatchEvent(new CustomEvent<Consent>('prosport:consent', { detail: value }));
}

export const hasAnalyticsConsent = () => readConsent() === 'all';
