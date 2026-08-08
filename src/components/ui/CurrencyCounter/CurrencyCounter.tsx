import styles from './CurrencyCounter.module.css';
import { formatCurrency } from '../../../data/mockUser';
import { IconCoin, IconCrystal } from '../../icons/Icons';

export type CurrencyType = 'coins' | 'crystals';

interface CurrencyCounterProps {
  type: CurrencyType;
  value: number;
}

export function CurrencyCounter({ type, value }: CurrencyCounterProps) {
  const label = type === 'coins' ? 'Монеты' : 'Кристаллы';

  return (
    <div className={styles.root} aria-label={`${label}: ${value}`}>
      <span className={styles.icon} aria-hidden>
        {type === 'coins' ? <IconCoin size={22} /> : <IconCrystal size={20} />}
      </span>
      <span className={styles.value}>{formatCurrency(value)}</span>
    </div>
  );
}
