import { About } from './components/About';
import { Abc } from './components/Abc';
import { Coaches } from './components/Coaches';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Halls } from './components/Halls';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Programs } from './components/Programs';
import { SignUp } from './components/SignUp';
import { useReveal } from './hooks/useScrollEffects';

export function App() {
  useReveal();

  return (
    <>
      <a className="skip-link" href="#main">
        К основному содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Programs />
        <Abc />
        <Coaches />
        <Gallery />
        <Halls />
        <Faq />
        <SignUp />
      </main>
      <Footer />
    </>
  );
}
