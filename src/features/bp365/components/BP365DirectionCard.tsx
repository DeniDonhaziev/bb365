import type { Direction } from '../data/directions';
import { DirectionIcon } from './DirectionIcon';
import styles from './BP365DirectionCard.module.css';

interface BP365DirectionCardProps {
  direction: Direction;
  selected: boolean;
  onSelect: (id: Direction['id']) => void;
}

export function BP365DirectionCard({ direction, selected, onSelect }: BP365DirectionCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${selected ? styles.selected : ''}`.trim()}
      style={{ ['--dir-accent' as string]: direction.accent }}
      onClick={() => onSelect(direction.id)}
      aria-pressed={selected}
    >
      <span className={styles.deco} aria-hidden />
      <span className={styles.iconWrap}>
        <DirectionIcon name={direction.icon} size={26} />
      </span>
      <span className={styles.category}>{direction.category}</span>
      <span className={styles.title}>{direction.title}</span>
      <span className={styles.desc}>{direction.shortDescription}</span>
      {direction.implemented && <span className={styles.badge}>Доступно</span>}
    </button>
  );
}
