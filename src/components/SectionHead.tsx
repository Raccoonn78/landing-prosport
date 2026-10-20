import type { ReactNode } from 'react';
import type { BeltColor } from '../data/content';
import { BeltKnot } from './BeltKnot';
import './SectionHead.css';

type Props = {
  /** Пояс-метка раздела; вместо него можно передать иконку */
  belt?: BeltColor;
  icon?: ReactNode;
  tag: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
};

export function SectionHead({ belt, icon, tag, title, lead, align = 'left', tone = 'light' }: Props) {
  return (
    <header className={`section-head section-head--${align} section-head--${tone}`} data-reveal>
      <p className="section-head__tag">
        {belt ? <BeltKnot color={belt} size={36} /> : icon}
        <span>{tag}</span>
      </p>
      <h2 className="section-head__title">{title}</h2>
      {lead && <p className="section-head__lead">{lead}</p>}
    </header>
  );
}
