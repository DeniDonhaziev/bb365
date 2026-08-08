import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './PrimaryButton.module.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'disabledLook';
  fullWidth?: boolean;
}

export function PrimaryButton({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  disabled,
  type = 'button',
  ...rest
}: PrimaryButtonProps) {
  const resolved = disabled ? 'disabledLook' : variant;

  return (
    <button
      type={type}
      className={`${styles.root} ${styles[resolved]} ${fullWidth ? styles.full : ''} ${className}`.trim()}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
