import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'surface' | 'elevated' | 'accent';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...rest
}: CardProps) {
  return (
    <div
      className={`${styles.root} ${styles[variant]} ${styles[`pad_${padding}`]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
