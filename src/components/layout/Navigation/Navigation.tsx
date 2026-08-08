import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import { mainNavItems } from '../../../data/mockNav';
import { IconBolt, IconStar, IconGear, IconPath } from '../../icons/Icons';

const iconMap = {
  bolt: IconBolt,
  star: IconStar,
  gear: IconGear,
  path: IconPath,
} as const;

interface NavigationProps {
  variant: 'bottom' | 'side';
}

function isItemActive(itemId: string, pathname: string): boolean {
  if (itemId === 'events') {
    return pathname.startsWith('/events') || pathname.startsWith('/spheres');
  }
  if (itemId === 'achievements') return pathname.startsWith('/achievements');
  if (itemId === 'workshop') return pathname.startsWith('/workshop');
  if (itemId === 'bp365') return pathname.startsWith('/bp365');
  return false;
}

export function Navigation({ variant }: NavigationProps) {
  const { pathname } = useLocation();

  return (
    <nav
      className={`${styles.root} ${styles[variant]}`}
      aria-label="Основная навигация"
    >
      <ul className={styles.list}>
        {mainNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          const active = isItemActive(item.id, pathname);
          return (
            <li key={item.id} className={styles.item}>
              <NavLink
                to={item.path}
                className={`${styles.link} ${active ? styles.active : ''}`.trim()}
                aria-current={active ? 'page' : undefined}
              >
                <span className={styles.iconWrap} aria-hidden>
                  <Icon size={22} />
                </span>
                <span className={styles.label}>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
