import { useEffect, type ReactNode } from 'react';
import styles from './BP365Modal.module.css';

interface BP365ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}

export function BP365Modal({ open, title, onClose, children, wide }: BP365ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={`${styles.panel} ${wide ? styles.wide : ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bp365-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id="bp365-modal-title" className={styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
