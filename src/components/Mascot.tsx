import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { BeltColor } from '../data/content';
import { bob } from '../data/content';
import { bobPhoto } from '../data/photos';
import './Mascot.css';

type Props = {
  /** Пояс текущего раздела — Боб «переодевается» под него */
  belt: BeltColor;
};

const GREETED_KEY = 'prosport-bob-greeted';

/** Талисман клуба — зайчик Боб. Маленький, живёт в углу экрана. */
export function Mascot({ belt }: Props) {
  const [talking, setTalking] = useState(false);
  const [jump, setJump] = useState(false);
  const touched = useRef(false);
  const img = bobPhoto(belt);
  const line = bob[belt];

  // Один раз за визит Боб сам здоровается
  useEffect(() => {
    let greeted = false;
    try {
      greeted = sessionStorage.getItem(GREETED_KEY) === '1';
    } catch {
      /* хранилище недоступно — просто поздороваемся */
    }
    if (greeted) return;
    const show = window.setTimeout(() => {
      if (touched.current) return;
      setTalking(true);
      try {
        sessionStorage.setItem(GREETED_KEY, '1');
      } catch {
        /* не страшно */
      }
    }, 2500);
    const hide = window.setTimeout(() => !touched.current && setTalking(false), 9000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  // Смена пояса — Боб подпрыгивает
  useEffect(() => {
    setJump(true);
    const t = window.setTimeout(() => setJump(false), 650);
    return () => window.clearTimeout(t);
  }, [belt]);

  if (!img) return null;

  const toggle = () => {
    touched.current = true;
    setTalking((v) => !v);
    setJump(true);
    window.setTimeout(() => setJump(false), 650);
  };

  return (
    <div className={`mascot ${talking ? 'mascot--talking' : ''}`}>
      {talking && (
        <div className="mascot__bubble" role="status">
          <button
            type="button"
            className="mascot__close"
            aria-label="Скрыть подсказку"
            onClick={() => {
              touched.current = true;
              setTalking(false);
            }}
          >
            <X size={14} />
          </button>
          <p className="mascot__title">Боб · {line.title}</p>
          <p>{line.phrase}</p>
        </div>
      )}
      <button
        type="button"
        className={`mascot__bunny ${jump ? 'is-jumping' : ''}`}
        aria-label="Зайчик Боб, талисман клуба. Нажмите, чтобы он что-нибудь сказал"
        aria-expanded={talking}
        onClick={toggle}
      >
        <img key={img.key} src={img.srcSm ?? img.src} alt="" width={img.width} height={img.height} decoding="async" />
      </button>
    </div>
  );
}
