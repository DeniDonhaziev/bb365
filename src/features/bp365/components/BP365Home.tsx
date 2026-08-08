import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../../components/ui/PrimaryButton/PrimaryButton';
import { Card } from '../../../components/ui/Card/Card';
import { routes } from '../../../data/mockNav';
import { getDirectionById, type DirectionId } from '../data/directions';
import { PATHWAY_STAGES, DEMO_DAY, DEMO_TOTAL_DAYS, DEMO_ACTIVE_STAGE_ID } from '../data/pathway';
import { PathwaySteps } from './PathwaySteps';
import styles from './BP365Home.module.css';

interface BP365HomeProps {
  primaryDirection: DirectionId;
}

export function BP365Home({ primaryDirection }: BP365HomeProps) {
  const navigate = useNavigate();
  const direction = getDirectionById(primaryDirection);
  const [hint, setHint] = useState(false);

  const canOpenDirection = direction?.implemented;

  const stageLabel = useMemo(
    () => PATHWAY_STAGES.find((s) => s.id === DEMO_ACTIVE_STAGE_ID)?.title ?? '',
    [],
  );

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>БП 365</p>
        <h1 className={styles.title}>Твой 90-дневный путь</h1>
        <p className={styles.meta}>
          День {DEMO_DAY} из {DEMO_TOTAL_DAYS} · этап «{stageLabel}»
        </p>
      </header>

      <PathwaySteps activeStageId={DEMO_ACTIVE_STAGE_ID} />

      {direction && (
        <Card variant="elevated" className={styles.primaryCard}>
          <p className={styles.cardLabel}>Твоё основное направление</p>
          <h2 className={styles.cardTitle}>{direction.title}</h2>
          <p className={styles.cardCat}>{direction.category}</p>
          <p className={styles.cardDesc}>{direction.shortDescription}</p>
          {canOpenDirection ? (
            <PrimaryButton
              fullWidth
              onClick={() => navigate(routes.bp365Direction(direction.id))}
            >
              Открыть «{direction.title}»
            </PrimaryButton>
          ) : (
            <>
              <PrimaryButton
                fullWidth
                variant="ghost"
                onClick={() => setHint(true)}
              >
                Скоро откроется
              </PrimaryButton>
              {hint && (
                <p className={styles.hint}>
                  Полный демо-модуль сейчас доступен только для направления «Предпринимай!».
                </p>
              )}
            </>
          )}
        </Card>
      )}

      <Card padding="md" className={styles.info}>
        <h3 className={styles.infoTitle}>Как устроен БП 365</h3>
        <p className={styles.infoText}>
          14 направлений отвечают на вопрос «в какой сфере ты развиваешься». Три этапа — «как ты
          растёшь за 90 дней»: открывай себя → создавай мечту → наставляй.
        </p>
      </Card>
    </section>
  );
}
