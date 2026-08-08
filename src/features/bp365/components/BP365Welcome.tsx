import { PrimaryButton } from '../../../components/ui/PrimaryButton/PrimaryButton';
import styles from './BP365Welcome.module.css';

interface BP365WelcomeProps {
  onStart: () => void;
}

export function BP365Welcome({ onStart }: BP365WelcomeProps) {
  return (
    <section className={styles.root}>
      <div className={styles.glow} aria-hidden />
      <p className={styles.eyebrow}>БП 365</p>
      <h1 className={styles.title}>Финал — только начало</h1>
      <p className={styles.lead}>
        Ты уже прошёл большой путь и стал частью сообщества «Большой перемены». Теперь начинается
        новый этап — 90 дней, чтобы открыть себя, превратить свои цели в реальные результаты и
        передать накопленный опыт другим.
      </p>
      <div className={styles.banner}>
        <p>
          Желаем тебе удачи, новых достижений и смелости двигаться дальше. Твоя Большая перемена
          продолжается!
        </p>
      </div>
      <PrimaryButton fullWidth onClick={onStart}>
        Начать путь
      </PrimaryButton>
    </section>
  );
}
