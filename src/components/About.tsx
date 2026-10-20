import { Check, Quote } from 'lucide-react';
import { aboutPoints, club } from '../data/content';
import { delay } from '../utils/reveal';
import { Emblem } from './Emblem';
import { SectionHead } from './SectionHead';
import './About.css';

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__text">
          <SectionHead
            belt="white"
            tag="О клубе"
            title="Клуб, где растут сила, характер и дружба"
            lead={`Наш клуб работает с ${club.since} года. Открыты детские, подростковые и взрослые группы — каждый занимается в своём темпе и по своему уровню.`}
          />

          <ul className="about__points">
            {aboutPoints.map((point, i) => (
              <li key={point} data-reveal style={delay(0.06 * i)}>
                <span className="about__check">
                  <Check size={16} strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <blockquote className="about__quote" data-reveal>
            <Quote size={28} />
            <p>Когда заканчиваются силы, начинается характер.</p>
          </blockquote>
        </div>

        <div className="about__collage" data-reveal style={delay(0.1)}>
          <figure className="about__photo about__photo--tall">
            <img
              src="/images/gallery/training-kata.webp"
              alt="Юная спортсменка с синим поясом отрабатывает удар на тренировке"
              width={344}
              height={430}
              loading="lazy"
            />
          </figure>
          <figure className="about__photo">
            <img
              src="/images/gallery/kids-team.webp"
              alt="Младшая группа клуба с тренером"
              width={344}
              height={430}
              loading="lazy"
            />
          </figure>
          <div className="about__card">
            <Emblem size={84} tone="light" spin />
            <p>Тхэквон-до — боевое искусство, доступное каждому</p>
          </div>
        </div>
      </div>
    </section>
  );
}
