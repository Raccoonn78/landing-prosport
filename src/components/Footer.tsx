import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { club, mailto, nav } from '../data/content';
import { photo } from '../data/photos';
import { BeltKnot } from './BeltKnot';
import './Footer.css';

const logo = photo('brand/logo-lockup');

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="contacts">
      <div className="footer__belt" aria-hidden="true" />

      <div className="container footer__motto">
        <BeltKnot color="black" size={64} />
        <p>
          <span>{club.motto}</span>
          <small>Напишите нам — подберём группу по возрасту и зал рядом с домом.</small>
        </p>
        <a className="btn btn--sun" href={mailto()}>
          Записаться на тренировку
          <ArrowRight size={18} />
        </a>
      </div>

      <div className="container footer__grid">
        <div className="footer__brand">
          {logo && <img src={logo.src} alt="ПРОСПОРТ CLUB" width={logo.width} height={logo.height} loading="lazy" />}
          <p>
            Тхэквон-до — боевое искусство, доступное каждому. Детские, подростковые и взрослые группы с {club.since}{' '}
            года.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Разделы сайта">
          <p className="footer__title">Разделы</p>
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer__contacts">
          <p className="footer__title">Контакты</p>
          <a href={`mailto:${club.email}`}>
            <Mail size={18} />
            {club.email}
          </a>
          <a href="#halls">
            <MapPin size={18} />
            Москва и Московская область
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {club.since}–{year} {club.fullName}
        </p>
        <a href="#top">Наверх ↑</a>
      </div>
    </footer>
  );
}
