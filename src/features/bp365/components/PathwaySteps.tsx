import styles from './PathwaySteps.module.css';
import { PATHWAY_STAGES } from '../data/pathway';

interface PathwayStepsProps {
  activeStageId?: 'discover' | 'create' | 'mentor';
  compact?: boolean;
}

export function PathwaySteps({ activeStageId, compact = false }: PathwayStepsProps) {
  return (
    <ol className={`${styles.root} ${compact ? styles.compact : ''}`.trim()} aria-label="90-дневный путь">
      {PATHWAY_STAGES.map((stage, index) => {
        const active = stage.id === activeStageId;
        return (
          <li key={stage.id} className={`${styles.step} ${active ? styles.active : ''}`.trim()}>
            {index > 0 && <span className={styles.arrow} aria-hidden>→</span>}
            <div className={styles.card}>
              <span className={styles.title}>{stage.title}</span>
              <span className={styles.days}>{stage.daysLabel}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
