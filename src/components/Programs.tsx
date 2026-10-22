import { ArrowRight, Award, Dumbbell, Sparkles, Tent, Trophy, User, Users, UsersRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { advantages, formats, mailto, programs } from '../data/content';
import { photo } from '../data/photos';
import { delay } from '../utils/reveal';
import { BeltKnot } from './BeltKnot';
import { SectionHead } from './SectionHead';
import './Programs.css';

const icons: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  award: Award,
  trophy: Trophy,
  tent: Tent,
  sparkles: Sparkles,
  users: Users,
};

export function Programs() {
  return (
    <section className="section section--tint programs" id="programs">
      <div className="container">
        <SectionHead
          belt="orange"
          tag="Преимущества секции"
          title="Почему выбирают «ПРОСПОРТ»"
          lead="Семь причин прийти к нам — по одной на каждый пояс. Физические нагрузки подбираются по уровню подготовки, а технике тренеры обучат с основ."
        />

        <ol className="advantages">
          {advantages.map((a, i) => (
            <li key={a.title} className={`advantage advantage--${a.belt}`} data-reveal style={delay(0.05 * i)}>
              <div className="advantage__head">
                <BeltKnot color={a.belt} size={52} />
                <span className="advantage__num">0{i + 1}</span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
          <li className="advantage advantage--cta" data-reveal style={delay(0.35)}>
            <p className="advantage__cta-title">Начните свой путь к чёрному поясу</p>
            <a className="btn btn--sun" href={mailto()}>
              Записаться
              <ArrowRight size={18} />
            </a>
          </li>
        </ol>

        <h3 className="programs__subtitle" data-reveal>
          Что ждёт в клубе
        </h3>
        <div className="program-grid">
          {programs.map((p, i) => {
            const Icon = icons[p.icon];
            const img = photo(`club/${p.photo}`);
            return (
              <article key={p.title} className={`program ${img ? 'program--photo' : ''}`} data-reveal style={delay(0.05 * i)}>
                {img ? (
                  <img
                    className="program__photo"
                    src={img.src}
                    alt={p.title}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="program__icon">
                    <Icon size={24} />
                  </span>
                )}
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </article>
            );
          })}
        </div>

        <div className="formats">
          {formats.map((f, i) => {
            const Icon = i === 0 ? UsersRound : User;
            return (
              <article key={f.title} className={`format ${i === 1 ? 'format--dark' : ''}`} data-reveal style={delay(0.08 * i)}>
                <Icon size={32} />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <a className={`btn ${i === 1 ? 'btn--sun' : 'btn--primary'}`} href={mailto(f.title)}>
                  Записаться
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
