import { About } from './components/About';
import { Abc } from './components/Abc';
import { Coaches } from './components/Coaches';
import { CookieBanner } from './components/CookieBanner';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Halls } from './components/Halls';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Mascot } from './components/Mascot';
import { Programs } from './components/Programs';
import { sectionBelts } from './data/content';
import { useActiveSection, useReveal } from './hooks/useScrollEffects';

const sectionIds = sectionBelts.map((s) => s.id);

export function App() {
  useReveal();
  const active = useActiveSection(sectionIds);
  const belt = sectionBelts.find((s) => s.id === active)?.belt ?? 'white';

  return (
    <>
      <a className="skip-link" href="#main">
        К основному содержанию
      </a>
      <Header active={active} belt={belt} />
      <main id="main">
        <Hero />
        <About />
        <Programs />
        <Abc />
        <Coaches />
        <Gallery />
        <Halls />
        <Faq />
      </main>
      <Footer />
      <Mascot belt={belt} />
      <CookieBanner />
    </>
  );
}
