import { Check, Quote } from 'lucide-react';
import { aboutPoints, club } from '../data/content';
import { photosIn } from '../data/photos';
import { delay } from '../utils/reveal';
import { BeltKnot } from './BeltKnot';
import { PhotoFader } from './PhotoFader';
import { SectionHead } from './SectionHead';
import './About.css';

// Нечётные фото — в большом окне, чётные — в малом
const aboutPhotos = photosIn('about');
const bigPhotos = aboutPhotos.filter((_, i) => i % 2 === 0);
const smallPhotos = aboutPhotos.filter((_, i) => i % 2 === 1);

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__text">
          <SectionHead
            belt="white-orange"
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
          <PhotoFader
            className="about__photo about__photo--tall"
            photos={bigPhotos}
            interval={5500}
            sizes="(max-width: 1020px) 55vw, 320px"
          />
          <PhotoFader
            className="about__photo"
            photos={smallPhotos}
            interval={5500}
            offset={2700}
            sizes="(max-width: 1020px) 45vw, 260px"
          />
          <div className="about__card">
            <BeltKnot color="black" size={56} className="about__card-belt" />
            <p>
              <small>Девиз клуба</small>
              {club.motto}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
