import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { belts, glossary, tenets } from '../data/content';
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
  const belt = belts[index];

  return (
    <div className="belt-path">
      <ol className="belt-path__steps">
        {belts.map((b, i) => (
          <li key={b.color}>
            <button
              type="button"
              className={i === index ? 'is-active' : i < index ? 'is-passed' : undefined}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <BeltKnot color={b.color} size={52} />
              <span>{b.name}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={`belt-card belt-card--${belt.color}`} key={belt.color}>
        <div className="belt-card__visual" aria-hidden="true">
          <BeltKnot color={belt.color} size={220} />
        </div>
        <div className="belt-card__body">
          <p className="belt-card__step">
            Шаг {index + 1} из {belts.length}
          </p>
          <h3>{belt.name} пояс</h3>
          <p className="belt-card__rank">{belt.rank}</p>
          <p className="belt-card__meaning">{belt.meaning}</p>
          <div className="belt-card__nav">
            <button
              type="button"
              aria-label="Предыдущий пояс"
              disabled={index === 0}
              onClick={() => setIndex((i) => i - 1)}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Следующий пояс"
              disabled={index === belts.length - 1}
              onClick={() => setIndex((i) => i + 1)}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
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
