import { Award, Dumbbell, Sparkles, Tent, Trophy, Users, User, UsersRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { formats, groups, programs } from '../data/content';
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
          belt="yellow"
          tag="Занятия"
          title="Тренировки для всей семьи"
          lead="Физические нагрузки подбираются исходя из уровня подготовки и постоянно растут, а технике наши тренеры всегда обучат с основ."
        />

        <div className="groups">
          {groups.map((g, i) => (
            <article key={g.title} className={`group group--${g.belt}`} data-reveal style={delay(0.08 * i)}>
              <BeltKnot color={g.belt} size={56} />
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </article>
          ))}
        </div>

        <h3 className="programs__subtitle" data-reveal>
          Что ждёт в клубе
        </h3>
        <div className="program-grid">
          {programs.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <article key={p.title} className="program" data-reveal style={delay(0.05 * i)}>
                <span className="program__icon">
                  <Icon size={24} />
                </span>
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
                <a className={`btn ${i === 1 ? 'btn--sun' : 'btn--primary'}`} href="#signup">
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
