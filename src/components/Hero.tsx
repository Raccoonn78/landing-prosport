import { ArrowRight, MapPin } from 'lucide-react';
import { club, coaches, stats } from '../data/content';
import { BeltKnot } from './BeltKnot';
import { Emblem } from './Emblem';
import { delay } from '../utils/reveal';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="hero__watermark ko" aria-hidden="true">
            태권도
          </span>

          <p className="hero__eyebrow" data-reveal>
            <BeltKnot color="white" size={30} />
            {club.fullName} · с {club.since} года
          </p>

          <h1 className="hero__title" data-reveal style={delay(0.08)}>
            Тхэквон-до
            <span>для детей и взрослых</span>
          </h1>

          <p className="hero__lead" data-reveal style={delay(0.16)}>
            Приглашаем на занятия мальчиков и девочек, подростков и взрослых. Учим с основ — бережно, системно и с
            настоящим спортивным результатом: от белого пояса до чёрного.
          </p>

          <div className="hero__actions" data-reveal style={delay(0.24)}>
            <a className="btn btn--primary" href="#signup">
              Записаться на тренировку
              <ArrowRight size={18} />
            </a>
            <a className="btn btn--ghost" href="#halls">
              <MapPin size={18} />
              Найти зал рядом
            </a>
          </div>

          <div className="hero__coaches" data-reveal style={delay(0.32)}>
            <div className="hero__avatars">
              {coaches.map((c) => (
                <img key={c.id} src={c.photo} alt="" width={300} height={300} />
              ))}
            </div>
            <p>
              <strong>Тренеры с соревновательным опытом</strong>
              <span>и спортивным образованием</span>
            </p>
          </div>
        </div>

        <div className="hero__visual" data-reveal style={delay(0.1)}>
          <div className="hero__photo">
            <img
              src="/images/hero.webp"
              alt="Тренер клуба и юная спортсменка в форме для тхэквон-до и спарринговых перчатках"
              width={1680}
              height={656}
              fetchPriority="high"
            />
          </div>
          <div className="hero__badge">
            <Emblem size={64} tone="light" spin />
            <p>
              <strong>От белого до чёрного</strong>
              <span>пояса — шаг за шагом, в своём темпе</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="stats" aria-label="Клуб в цифрах">
          {stats.map((s, i) => (
            <li key={s.label} data-reveal style={delay(0.06 * i)}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
