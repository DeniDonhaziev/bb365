import { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import styles from './SphereTasksPage.module.css';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import { Chip } from '../../components/ui/Chip/Chip';
import { Card } from '../../components/ui/Card/Card';
import { IconChevronDown } from '../../components/icons/Icons';
import {
  getSphereById,
  getTasksBySphere,
  taskTypeFilters,
  type TaskStatus,
  type TaskTypeFilter,
} from '../../data/mockDemo';
import { routes } from '../../data/mockNav';

const statusTabs = [
  { id: 'available' as const, label: 'Доступные' },
  { id: 'completed' as const, label: 'Завершённые' },
];

export function SphereTasksPage() {
  const { sphereId = '' } = useParams<{ sphereId: string }>();
  const sphere = getSphereById(sphereId);

  const [statusTab, setStatusTab] = useState<TaskStatus>('available');
  const [typeFilter, setTypeFilter] = useState<TaskTypeFilter>('Все');

  const tasks = useMemo(() => {
    return getTasksBySphere(sphereId).filter((task) => {
      const statusOk = task.status === statusTab;
      const typeOk = typeFilter === 'Все' || task.type === typeFilter;
      return statusOk && typeOk;
    });
  }, [sphereId, statusTab, typeFilter]);

  if (!sphere) {
    return <Navigate to={routes.eventsTab('spheres')} replace />;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <p className={styles.sphereLabel}>{sphere.title}</p>
          <h1 className={styles.title}>Задания</h1>
        </div>
        <div
          className={styles.headerIcon}
          style={{ ['--sphere-accent' as string]: sphere.accent }}
          aria-hidden
        >
          <span className={styles.headerGlyph}>{sphere.title.slice(0, 1)}</span>
        </div>
      </header>

      <Tabs
        items={statusTabs}
        value={statusTab}
        onChange={setStatusTab}
        aria-label="Статус заданий"
        className={styles.tabs}
      />

      <div className={`u-scroll-x ${styles.filters}`} role="group" aria-label="Тип задания">
        {taskTypeFilters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            active={typeFilter === filter}
            onClick={() => setTypeFilter(filter)}
          />
        ))}
      </div>

      <section className={styles.taskList} aria-label="Список заданий">
        {tasks.length === 0 ? (
          <p className={styles.empty}>Нет заданий в этом разделе</p>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className={styles.taskCard} padding="md">
              <div className={styles.taskTop}>
                <div
                  className={styles.taskThumb}
                  style={{ ['--sphere-accent' as string]: sphere.accent }}
                  aria-hidden
                />
                <div className={styles.taskBody}>
                  <h2 className={styles.taskTitle}>{task.title}</h2>
                  <p className={styles.taskDesc}>{task.description}</p>
                </div>
                <button type="button" className={styles.expand} aria-label="Развернуть">
                  <IconChevronDown size={18} />
                </button>
              </div>
            </Card>
          ))
        )}
      </section>
    </div>
  );
}
