import { useEffect, useRef, useState } from 'react';
import { Cookie } from 'lucide-react';
import type { Consent } from '../utils/consent';
import { readConsent, saveConsent } from '../utils/consent';
import './CookieBanner.css';

/** Баннер о cookie и сборе данных. Выбор запоминается в браузере посетителя. */
export function CookieBanner() {
  const [visible, setVisible] = useState(() => readConsent() === null);
  const [details, setDetails] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Сообщаем высоту баннера, чтобы зайчик Боб не прятался под ним
  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!visible || !el) {
      root.style.removeProperty('--cookie-offset');
      return;
    }
    const update = () => {
      const narrow = window.matchMedia('(max-width: 720px)').matches;
      root.style.setProperty('--cookie-offset', narrow ? `${el.offsetHeight + 12}px` : '0px');
    };
    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();
    return () => {
      observer.disconnect();
      root.style.removeProperty('--cookie-offset');
    };
  }, [visible]);

  if (!visible) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    setVisible(false);
  };

  return (
    <div className="cookie" ref={ref} role="region" aria-label="Cookie и сбор данных">
      <span className="cookie__icon" aria-hidden="true">
        <Cookie size={22} />
      </span>
      <div className="cookie__text">
        <p>
          <strong>Мы используем cookie.</strong> Они помогают сайту работать корректно, а обезличенная статистика
          посещений — делать его удобнее.{' '}
          <button type="button" className="cookie__more" aria-expanded={details} onClick={() => setDetails((v) => !v)}>
            {details ? 'Скрыть' : 'Подробнее'}
          </button>
        </p>
        {details && (
          <p className="cookie__details">
            Мы собираем технические данные: тип устройства и браузера, страницы, которые вы открывали, время визита.
            Эти данные обезличены и используются только для улучшения сайта. Нажимая «Принять», вы соглашаетесь на их
            обработку в соответствии с 152-ФЗ «О персональных данных». Выбор можно изменить, очистив данные сайта в
            браузере.
          </p>
        )}
      </div>
      <div className="cookie__actions">
        <button type="button" className="btn btn--primary" onClick={() => choose('all')}>
          Принять
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => choose('necessary')}>
          Только необходимые
        </button>
      </div>
    </div>
  );
}
