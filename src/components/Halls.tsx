import { useMemo, useState } from 'react';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { club, coaches, halls } from '../data/content';
import { delay } from '../utils/reveal';
import { SectionHead } from './SectionHead';
import './Halls.css';

const coachByHall = new Map(coaches.flatMap((c) => c.halls.map((h) => [h, c] as const)));

const mapUrl = (city: string, address: string) =>
  `https://yandex.ru/maps/?text=${encodeURIComponent(`${city}, ${address}`)}`;

export function Halls() {
  const [coachId, setCoachId] = useState<string>('all');

  const visible = useMemo(
    () => (coachId === 'all' ? halls : halls.filter((h) => coachByHall.get(h.id)?.id === coachId)),
    [coachId],
  );

  return (
    <section className="section halls" id="halls">
      <div className="container halls__grid">
        <div className="halls__intro">
          <SectionHead
            belt="black"
            tag="Где мы тренируемся"
            title="Залы в Москве и Подмосковье"
            lead="Тренировки проходят в удобное время в спортивных залах и школах. Выберите зал рядом с домом — или позвоните, и мы подскажем ближайший филиал."
          />
          <div className="halls__call" data-reveal>
            <p>
              <strong>13 филиалов</strong>
              <span>в Москве и Московской области</span>
            </p>
            <a className="btn btn--primary" href={club.phoneHref}>
              <Phone size={18} />
              {club.phone}
            </a>
          </div>
        </div>

        <div className="halls__list-wrap">
          <div className="halls__filter" role="group" aria-label="Фильтр по тренеру" data-reveal>
            <button type="button" aria-pressed={coachId === 'all'} onClick={() => setCoachId('all')}>
              Все залы
            </button>
            {coaches.map((c) => (
              <button key={c.id} type="button" aria-pressed={coachId === c.id} onClick={() => setCoachId(c.id)}>
                {c.name.split(' ').slice(0, 2).reverse().join(' ')}
              </button>
            ))}
          </div>

          <ul className="halls__list">
            {visible.map((hall, i) => {
              const coach = coachByHall.get(hall.id);
              return (
                <li key={hall.id} className="hall" style={delay(0.04 * i)}>
                  <span className="hall__pin">
                    <MapPin size={20} />
                  </span>
                  <div className="hall__info">
                    <p className="hall__place">«{hall.place}»</p>
                    <p className="hall__address">{hall.address}</p>
                    <p className="hall__meta">
                      {hall.city}
                      {coach && <> · тренер {coach.name.split(' ').slice(0, 2).reverse().join(' ')}</>}
                    </p>
                  </div>
                  <a
                    className="hall__map"
                    href={mapUrl(hall.city, hall.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Открыть на карте: ${hall.address}`}
                  >
                    <span>На карте</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
