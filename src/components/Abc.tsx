import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { belts, glossary, tenets } from '../data/content';
import { bobPhoto } from '../data/photos';
import { delay } from '../utils/reveal';
import { BeltKnot } from './BeltKnot';
import { SectionHead } from './SectionHead';
import './Abc.css';

const tabs = [
  { id: 'belts', label: 'Пояса' },
  { id: 'tenets', label: 'Принципы' },
  { id: 'glossary', label: 'Словарь' },
] as const;

type TabId = (typeof tabs)[number]['id'];

export function Abc() {
  const [tab, setTab] = useState<TabId>('belts');

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = tabs.findIndex((t) => t.id === tab);
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    setTab(next.id);
    document.getElementById(`abc-tab-${next.id}`)?.focus();
  };

  return (
    <section className="section section--dark abc" id="abc">
      <div className="container">
        <SectionHead
          belt="green"
          tone="dark"
          tag="Азбука тхэквон-до"
          title="Маленькая энциклопедия для учеников и родителей"
          lead="Что означают цвета поясов, на каких принципах строится тхэквон-до и что за корейские слова звучат на тренировке."
        />

        <div className="abc__tabs" role="tablist" aria-label="Разделы азбуки" data-reveal>
          {tabs.map((t) => (
            <button
              key={t.id}
              id={`abc-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-controls={`abc-panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={onTabKey}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div id={`abc-panel-${tab}`} role="tabpanel" aria-labelledby={`abc-tab-${tab}`} className="abc__panel">
          {tab === 'belts' && <BeltPath />}
          {tab === 'tenets' && <Tenets />}
          {tab === 'glossary' && <Glossary />}
        </div>
      </div>
    </section>
  );
}

function BeltPath() {
  const [index, setIndex] = useState(0);
  const [answerShown, setAnswerShown] = useState(false);
  const steps = useRef<HTMLOListElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const belt = belts[index];
  const bunny = bobPhoto(belt.color);

  const go = (i: number) => setIndex(Math.min(belts.length - 1, Math.max(0, i)));

  // На телефоне пояса идут одной строкой с прокруткой — держим выбранный по центру.
  // Прокручиваем только саму строку, чтобы страница не «уезжала».
  useEffect(() => {
    const list = steps.current;
    const item = list?.children[index] as HTMLElement | undefined;
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2, behavior: 'smooth' });
  }, [index]);

  // Свайп по карточке влево/вправо — следующий/предыдущий пояс
  const onTouchStart = (e: TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
  };

  const arrows = (
    <>
      <button type="button" aria-label="Предыдущий пояс" disabled={index === 0} onClick={() => go(index - 1)}>
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        aria-label="Следующий пояс"
        disabled={index === belts.length - 1}
        onClick={() => go(index + 1)}
      >
        <ChevronRight size={22} />
      </button>
    </>
  );

  return (
    <div className="belt-path">
      <ol className="belt-path__steps" ref={steps}>
        {belts.map((b, i) => (
          <li key={b.color}>
            <button
              type="button"
              className={i === index ? 'is-active' : i < index ? 'is-passed' : undefined}
              aria-pressed={i === index}
              onClick={() => go(i)}
            >
              <BeltKnot color={b.color} size={52} />
              <span>{b.name}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={`belt-card belt-card--${belt.color}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="belt-card__visual">
          {bunny ? (
            <img
              key={bunny.key}
              className="belt-card__bunny"
              src={bunny.src}
              alt={`Зайчик Боб — ${belt.name.toLowerCase()} пояс: ${belt.theme.toLowerCase()}`}
              width={bunny.width}
              height={bunny.height}
              loading="lazy"
            />
          ) : (
            <BeltKnot color={belt.color} size={220} className="belt-card__fallback" />
          )}
          <BeltKnot color={belt.color} size={64} className="belt-card__badge" />
          {/* На телефоне счётчик и стрелки закреплены на картинке и никуда не сдвигаются */}
          <span className="belt-card__counter" aria-hidden="true">
            {index + 1} / {belts.length}
          </span>
          <div className="belt-card__arrows">{arrows}</div>
        </div>

        <div className="belt-card__side">
          {/* Тексты всех поясов лежат в одной ячейке друг на друге: карточка всегда
              высотой с самый длинный текст и не меняет размер при переключении */}
          <div className="belt-card__bodies">
            {belts.map((b, i) => (
              <div
                key={b.color}
                className={`belt-card__body ${i === index ? 'is-active' : ''}`}
                aria-hidden={i !== index}
                inert={i !== index}
              >
                <p className="belt-card__step">
                  Шаг {i + 1} из {belts.length}
                </p>
                <h3>{b.name} пояс</h3>
                <p className="belt-card__rank">Тема: {b.theme}</p>
                <div className="belt-card__meaning">
                  {b.meaning.map((paragraph) => (
                    <p key={paragraph}>
                      <RichText text={paragraph} />
                    </p>
                  ))}
                  {b.author && <p className="belt-card__author">— {b.author}</p>}
                </div>
                {b.answer && (
                  <button
                    type="button"
                    className={`belt-card__answer ${answerShown ? 'is-shown' : ''}`}
                    aria-expanded={answerShown}
                    onClick={() => setAnswerShown((v) => !v)}
                  >
                    <span className="belt-card__answer-label">{answerShown ? 'Ответ:' : 'Показать ответ'}</span>
                    <span className="belt-card__answer-text" aria-hidden={!answerShown}>
                      {b.answer}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="belt-card__nav">{arrows}</div>
        </div>
      </div>
    </div>
  );
}

/** Текст, где **так** выделено жирным. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}

function Tenets() {
  return (
    <ol className="tenets">
      {tenets.map((t, i) => (
        <li key={t.ru} className="tenet" style={delay(0.05 * i)}>
          <span className="tenet__ko ko" aria-hidden="true">
            {t.ko}
          </span>
          <span className="tenet__num">0{i + 1}</span>
          <h3>{t.ru}</h3>
          <p>{t.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Glossary() {
  return (
    <dl className="glossary">
      {glossary.map((g) => (
        <div key={g.term} className="glossary__item">
          <dt>
            {g.term}
            <span className="ko">{g.ko}</span>
          </dt>
          <dd>{g.text}</dd>
        </div>
      ))}
    </dl>
  );
}
