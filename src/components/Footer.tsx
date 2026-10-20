import { Mail, MapPin, Phone } from 'lucide-react';
import { club, nav } from '../data/content';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__belt" aria-hidden="true" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/images/brand/logo-lockup.png" alt="ПРОСПОРТ CLUB" width={200} height={60} loading="lazy" />
          <p>Тхэквон-до — боевое искусство, доступное каждому. Детские, подростковые и взрослые группы с {club.since} года.</p>
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
          <a href={club.phoneHref}>
            <Phone size={18} />
            {club.phone}
          </a>
          <a href={`mailto:${club.email}`}>
            <Mail size={18} />
            {club.email}
          </a>
          <a href="#halls">
            <MapPin size={18} />
            Москва и Московская область
          </a>
          <a className="btn btn--sun" href="#signup">
            Записаться на тренировку
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
