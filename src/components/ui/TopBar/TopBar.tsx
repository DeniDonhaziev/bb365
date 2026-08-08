import { useNavigate } from 'react-router-dom';
import styles from './TopBar.module.css';
import { CurrencyCounter } from '../CurrencyCounter/CurrencyCounter';
import { IconButton } from '../IconButton/IconButton';
import { IconBell, IconUser } from '../../icons/Icons';
import type { MockUser } from '../../../data/mockUser';
import { routes } from '../../../data/mockNav';

interface TopBarProps {
  user: MockUser;
  showBack?: boolean;
  onBack?: () => void;
}

export function TopBar({ user, showBack = false, onBack }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header className={styles.root}>
      <div className={styles.side}>
        {showBack ? (
          <IconButton aria-label="Назад" onClick={onBack}>
            <span className={styles.backGlyph}>‹</span>
          </IconButton>
        ) : (
          <IconButton
            variant="profile"
            aria-label="Профиль"
            onClick={() => navigate(routes.profile)}
          >
            <IconUser size={22} />
          </IconButton>
        )}
      </div>

      <div className={styles.currencies}>
        <CurrencyCounter type="coins" value={user.wallet.coins} />
        <CurrencyCounter type="crystals" value={user.wallet.crystals} />
      </div>

      <div className={`${styles.side} ${styles.sideEnd}`}>
        <IconButton
          variant="plain"
          aria-label="Уведомления"
          onClick={() => navigate(routes.notifications)}
          className={styles.bell}
        >
          <IconBell size={24} />
          {user.hasUnreadNotifications ? (
            <span className={styles.dot} aria-hidden />
          ) : null}
        </IconButton>
      </div>
    </header>
  );
}
