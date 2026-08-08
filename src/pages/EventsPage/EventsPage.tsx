import { useSearchParams } from 'react-router-dom';
import styles from './EventsPage.module.css';
import { SectionHeader } from '../../components/ui/SectionHeader/SectionHeader';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import { Card } from '../../components/ui/Card/Card';
import { SphereCard } from '../../components/spheres/SphereCard';
import {
  demoEvents,
  demoSpheres,
  eventStatusLabel,
  getSphereById,
} from '../../data/mockDemo';

type EventsMainTab = 'events' | 'spheres';

const eventTabs = [
  { id: 'events' as const, label: 'События' },
  { id: 'spheres' as const, label: 'Сферы' },
];

function parseTab(value: string | null): EventsMainTab {
  return value === 'events' ? 'events' : 'spheres';
}

function getSphere(id: string) {
  return demoSpheres.find((s) => s.id === id)!;
}

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = parseTab(searchParams.get('tab'));

  const setTab = (next: EventsMainTab) => {
    setSearchParams({ tab: next }, { replace: true });
  };

  return (
    <div className={styles.page}>
      <SectionHeader title="Мероприятия" />

      <Tabs
        items={eventTabs}
        value={tab}
        onChange={setTab}
        aria-label="Разделы мероприятий"
        className={styles.tabs}
      />

      {tab === 'spheres' ? (
        <section className={styles.section} aria-label="Сферы">
          {/*
            Mobile: 2-1-2-1 honeycomb rows.
            Desktop: CSS places slots into staggered 3+3 map.
          */}
          <div className={styles.honeycomb}>
            <div className={`${styles.hcRow} ${styles.hcPair}`}>
              <SphereCard
                sphere={getSphere('culture')}
                className={`${styles.hcItem} ${styles.slotCulture}`}
              />
              <SphereCard
                sphere={getSphere('business')}
                className={`${styles.hcItem} ${styles.slotBusiness}`}
              />
            </div>
            <div className={`${styles.hcRow} ${styles.hcCenter}`}>
              <SphereCard
                sphere={getSphere('health')}
                className={`${styles.hcItem} ${styles.slotHealth}`}
              />
            </div>
            <div className={`${styles.hcRow} ${styles.hcPair}`}>
              <SphereCard
                sphere={getSphere('volunteer')}
                className={`${styles.hcItem} ${styles.slotVolunteer}`}
              />
              <SphereCard
                sphere={getSphere('patriot')}
                className={`${styles.hcItem} ${styles.slotPatriot}`}
              />
            </div>
            <div className={`${styles.hcRow} ${styles.hcCenter}`}>
              <SphereCard
                sphere={getSphere('science')}
                className={`${styles.hcItem} ${styles.slotScience}`}
              />
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.section} aria-label="События">
          <div className={styles.eventList}>
            {demoEvents.map((event) => {
              const sphere = getSphereById(event.sphereId);
              return (
                <Card key={event.id} className={styles.eventCard} padding="md">
                  <div className={styles.eventHeader}>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <span
                      className={`${styles.eventStatus} ${styles[`status_${event.status}`]}`}
                    >
                      {eventStatusLabel[event.status]}
                    </span>
                  </div>
                  <p className={styles.eventDesc}>{event.description}</p>
                  <div className={styles.eventMeta}>
                    {sphere ? (
                      <span className={styles.eventSphere}>{sphere.title}</span>
                    ) : null}
                    <span className={styles.eventPeriod}>{event.period}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
