import { MapPin } from 'lucide-react';
import { coaches, halls } from '../data/content';
import { delay } from '../utils/reveal';
import { SectionHead } from './SectionHead';
import './Coaches.css';

const hallById = new Map(halls.map((h) => [h.id, h]));

export function Coaches() {
  return (
    <section className="section coaches" id="coaches">
      <div className="container">
        <SectionHead
          belt="blue"
          tag="Наша команда"
          title="От первого поклона до чёрного пояса"
          lead="Все тренеры клуба имеют спортивное образование и соревновательный опыт. Они знают, как помочь новичку освоиться и как подготовить спортсмена к турниру."
        />

        <div className="coach-grid">
          {coaches.map((coach, i) => {
            const [surname, ...rest] = coach.name.split(' ');
            return (
              <article key={coach.id} className={`coach coach--${coach.accent}`} data-reveal style={delay(0.08 * i)}>
                <div className="coach__photo">
                  <img src={coach.photo} alt={coach.name} width={300} height={300} loading="lazy" />
                </div>
                <div className="coach__body">
                  <p className="coach__role">Тренер</p>
                  <h3>
                    {surname}
                    <span>{rest.join(' ')}</span>
                  </h3>
                  <ul className="coach__halls">
                    {coach.halls.map((id) => {
                      const hall = hallById.get(id);
                      if (!hall) return null;
                      return (
                        <li key={id}>
                          <MapPin size={16} />
                          <span>
                            {hall.address}
                            <small>«{hall.place}»</small>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
