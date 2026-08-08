import { useEffect } from 'react';
import styles from './BP365Toast.module.css';

interface BP365ToastProps {
  message: string | null;
  onClose: () => void;
}

export function BP365Toast({ message, onClose }: BP365ToastProps) {
  useEffect(() => {
    if (!message) return;
    const t = window.setTimeout(onClose, 2600);
    return () => window.clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={styles.root} role="status" aria-live="polite">
      {message}
    </div>
  );
}
