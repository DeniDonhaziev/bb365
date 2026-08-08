import type { ButtonHTMLAttributes } from 'react';
import styles from './Chip.module.css';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  variant?: 'filter' | 'soft';
}

export function Chip({
  label,
  active = false,
  variant = 'filter',
  className = '',
  type = 'button',
  ...rest
}: ChipProps) {
  return (
    <button
      type={type}
      className={`${styles.root} ${styles[variant]} ${active ? styles.active : ''} ${className}`.trim()}
      aria-pressed={active}
      {...rest}
    >
      {label}
    </button>
  );
}
