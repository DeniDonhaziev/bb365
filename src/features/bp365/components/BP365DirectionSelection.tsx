import { PrimaryButton } from '../../../components/ui/PrimaryButton/PrimaryButton';
import { BP365_DIRECTIONS, type DirectionId } from '../data/directions';
import { BP365DirectionCard } from './BP365DirectionCard';
import styles from './BP365DirectionSelection.module.css';

interface BP365DirectionSelectionProps {
  selectedId: DirectionId | null;
  onSelect: (id: DirectionId) => void;
  onConfirm: () => void;
}

export function BP365DirectionSelection({
  selectedId,
  onSelect,
  onConfirm,
}: BP365DirectionSelectionProps) {
  const selected = BP365_DIRECTIONS.find((d) => d.id === selectedId);

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Выбери своё направление</h1>
        <p className={styles.lead}>
          Выбери сферу, в которой хочешь продолжить развитие после финала. Она определит основные
          задания, проекты, возможности и сообщество твоего пути в БП 365.
        </p>
      </header>

      <div className={styles.grid}>
        {BP365_DIRECTIONS.map((d) => (
          <BP365DirectionCard
            key={d.id}
            direction={d}
            selected={selectedId === d.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className={styles.footer}>
        {selected && (
          <p className={styles.chosen}>
            Твоё основное направление: <strong>{selected.title}</strong>
          </p>
        )}
        <PrimaryButton fullWidth disabled={!selectedId} onClick={onConfirm}>
          Выбрать направление
        </PrimaryButton>
      </div>
    </section>
  );
}
