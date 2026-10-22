import { ArrowRight, MapPin } from 'lucide-react';
import { club, coaches, mailto, stats } from '../data/content';
import { photo, photosIn } from '../data/photos';
import { delay } from '../utils/reveal';
import { BeltKnot } from './BeltKnot';
import { PhotoRibbon } from './PhotoRibbon';
import { Ticker } from './Ticker';
import './Hero.css';

const heroPhotos = photosIn('hero');

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
            <span className="hero__motto">{club.motto}</span>
          </h1>

          <p className="hero__lead" data-reveal style={delay(0.16)}>
            Растим сильных, уверенных и добрых. Детские, подростковые и взрослые группы в 13 залах Москвы и области —
            от первого белого пояса до чёрного.
          </p>

          <div className="hero__actions" data-reveal style={delay(0.24)}>
            <a className="btn btn--primary" href={mailto()}>
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
              {coaches.map((c) => {
                const p = photo(`coaches/${c.id}`);
                return p ? <img key={c.id} src={p.src} alt="" width={p.width} height={p.height} /> : null;
              })}
            </div>
            <p>
              <strong>Тренеры с соревновательным опытом</strong>
              <span>и спортивным образованием</span>
            </p>
          </div>
        </div>

        <div className="hero__visual" data-reveal style={delay(0.1)}>
          <PhotoRibbon photos={heroPhotos} label="Фотографии с тренировок и турниров клуба" />
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

      <Ticker />
    </section>
  );
}
