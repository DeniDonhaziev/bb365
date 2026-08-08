import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'profile' | 'plain';
  'aria-label': string;
}

export function IconButton({
  children,
  variant = 'default',
  className = '',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.root} ${styles[variant]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
