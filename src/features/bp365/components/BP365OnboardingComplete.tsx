import { PrimaryButton } from '../../../components/ui/PrimaryButton/PrimaryButton';
import type { Direction } from '../data/directions';
import { PathwaySteps } from './PathwaySteps';
import styles from './BP365OnboardingComplete.module.css';

interface BP365OnboardingCompleteProps {
  direction: Direction;
  onContinue: () => void;
}

export function BP365OnboardingComplete({ direction, onContinue }: BP365OnboardingCompleteProps) {
  return (
    <section className={styles.root}>
      <p className={styles.eyebrow}>БП 365</p>
      <h1 className={styles.title}>Твой путь начинается здесь</h1>
      <p className={styles.lead}>
        Ты выбрал направление «{direction.title}». В следующие 90 дней БП 365 поможет тебе
        осмыслить свой опыт, развить собственные идеи и постепенно перейти от выпускника к человеку,
        способному помогать другим.
      </p>
      <PathwaySteps />
      <PrimaryButton fullWidth onClick={onContinue}>
        Перейти в БП 365
      </PrimaryButton>
    </section>
  );
}
