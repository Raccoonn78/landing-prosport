import { CircleHelp, Mail, Phone } from 'lucide-react';
import { club, faq } from '../data/content';
import { delay } from '../utils/reveal';
import { SectionHead } from './SectionHead';
import './Faq.css';

export function Faq() {
  return (
    <section className="section section--tint faq" id="faq">
      <div className="container faq__grid">
        <div>
          <SectionHead
            icon={<CircleHelp size={26} />}
            tag="Вопросы и ответы"
            title="Частые вопросы родителей и новичков"
            lead="Не нашли ответ? Позвоните или напишите — тренер всё расскажет."
          />
          <div className="faq__contacts" data-reveal>
            <a href={club.phoneHref}>
              <Phone size={18} />
              {club.phone}
            </a>
            <a href={`mailto:${club.email}`}>
              <Mail size={18} />
              {club.email}
            </a>
          </div>
        </div>

        <div className="faq__list">
          {faq.map((item, i) => (
            <details key={item.q} className="faq__item" data-reveal style={delay(0.04 * i)} open={i === 0}>
              <summary>
                <span>{item.q}</span>
                <span className="faq__toggle" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
