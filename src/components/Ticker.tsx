import type { BeltColor } from '../data/content';
import { ticker } from '../data/content';
import { BeltKnot } from './BeltKnot';
import './Ticker.css';

const colors: BeltColor[] = ['orange', 'yellow', 'green', 'blue', 'red', 'white'];

/** Бегущая строка с девизом и принципами тхэквон-до. */
export function Ticker() {
  // Содержимое дублируется, чтобы лента прокручивалась бесшовно
  const items = [...ticker, ...ticker];
  return (
    <div className="ticker" aria-label={ticker.join(' · ')}>
      <div className="ticker__track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy}>
            {items.map((word, i) => (
              <li key={`${copy}-${i}`}>
                <BeltKnot color={colors[i % colors.length]} size={34} />
                {word}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
