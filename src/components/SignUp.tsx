import { useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Phone, Send } from 'lucide-react';
import { club, halls } from '../data/content';
import { BeltKnot } from './BeltKnot';
import './SignUp.css';

const who = ['Ребёнок', 'Подросток', 'Взрослый'] as const;

type Errors = Partial<Record<'name' | 'phone', string>>;

export function SignUp() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();

    const next: Errors = {};
    if (name.length < 2) next.name = 'Как к вам обращаться?';
    if (phone.replace(/\D/g, '').length < 10) next.phone = 'Укажите номер телефона полностью';
    setErrors(next);
    if (Object.keys(next).length) return;

    // Сайт статический, поэтому заявка уходит письмом через почтовую программу.
    // Чтобы заявки приходили автоматически, подключите обработчик формы (см. README).
    const body = [
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Кто будет заниматься: ${data.get('who')}`,
      `Зал: ${data.get('hall')}`,
      `Комментарий: ${String(data.get('comment') ?? '').trim() || '—'}`,
    ].join('\n');
    const subject = `Заявка на тренировку — ${name}`;
    window.location.href = `mailto:${club.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="section signup" id="signup">
      <div className="container">
        <div className="signup__card">
          <div className="signup__intro">
            <p className="signup__tag">
              <BeltKnot color="white" size={36} />
              Первый шаг
            </p>
            <h2>
              Каждый мастер <span className="nowrap">когда-то</span> надел белый пояс
            </h2>
            <p className="signup__lead">
              Оставьте заявку — тренер свяжется с вами, подберёт группу по возрасту и уровню и пригласит на первую
              тренировку.
            </p>
            <a className="signup__phone" href={club.phoneHref}>
              <span>
                <Phone size={20} />
              </span>
              <span>
                <small>Или просто позвоните</small>
                {club.phone}
              </span>
            </a>
          </div>

          {sent ? (
            <div className="signup__done" role="status">
              <CheckCircle2 size={48} />
              <h3>Почти готово!</h3>
              <p>
                Мы открыли почтовую программу с готовым письмом — осталось нажать «Отправить». Если письмо не
                открылось, позвоните нам: <a href={club.phoneHref}>{club.phone}</a>.
              </p>
              <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
                Заполнить заново
              </button>
            </div>
          ) : (
            <form className="signup__form" onSubmit={onSubmit} noValidate>
              <label className="field">
                <span>Ваше имя</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Например, Анна"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                />
                {errors.name && (
                  <em id="err-name" className="field__error">
                    {errors.name}
                  </em>
                )}
              </label>

              <label className="field">
                <span>Телефон</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+7 (___) ___-__-__"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'err-phone' : undefined}
                />
                {errors.phone && (
                  <em id="err-phone" className="field__error">
                    {errors.phone}
                  </em>
                )}
              </label>

              <fieldset className="field field--wide">
                <legend>Кто будет заниматься</legend>
                <div className="chips">
                  {who.map((w, i) => (
                    <label key={w} className="chip">
                      <input type="radio" name="who" value={w} defaultChecked={i === 0} />
                      <span>{w}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="field field--wide">
                <span>Удобный зал</span>
                <select name="hall" defaultValue="Подскажите ближайший">
                  <option>Подскажите ближайший</option>
                  {halls.map((h) => (
                    <option key={h.id} value={`${h.address} «${h.place}»`}>
                      {h.address} — «{h.place}»
                    </option>
                  ))}
                </select>
              </label>

              <label className="field field--wide">
                <span>Комментарий (необязательно)</span>
                <textarea name="comment" rows={3} placeholder="Возраст ребёнка, опыт занятий, удобное время" />
              </label>

              <div className="signup__submit field--wide">
                <button type="submit" className="btn btn--sun">
                  Отправить заявку
                  <Send size={18} />
                </button>
                <p>Нажимая кнопку, вы соглашаетесь на обработку персональных данных для связи с вами.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
