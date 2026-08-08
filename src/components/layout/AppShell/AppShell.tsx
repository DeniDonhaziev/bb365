import type { ReactNode } from 'react';
import styles from './AppShell.module.css';
import { TopBar } from '../../ui/TopBar/TopBar';
import { Navigation } from '../Navigation/Navigation';
import { useUser } from '../../../state/UserContext';

interface AppShellProps {
  children: ReactNode;
  /** Hide bottom/side primary nav */
  hideNav?: boolean;
  /** Hide TopBar (e.g. calendar chrome has its own header) */
  hideTopBar?: boolean;
  showBack?: boolean;
  onBack?: () => void;
}

export function AppShell({
  children,
  hideNav = false,
  hideTopBar = false,
  showBack = false,
  onBack,
}: AppShellProps) {
  const { user } = useUser();

  return (
    <div
      className={`${styles.shell} ${hideNav ? styles.noNav : ''} ${hideTopBar ? styles.noTop : ''}`.trim()}
    >
      {!hideNav ? <Navigation variant="side" /> : null}

      <div className={styles.mainColumn}>
        {!hideTopBar ? (
          <div className={styles.topWrap}>
            <TopBar user={user} showBack={showBack} onBack={onBack} />
          </div>
        ) : null}

        <main className={`${styles.content} ${hideTopBar ? styles.contentFlush : ''}`.trim()}>
          {children}
        </main>
      </div>

      {!hideNav ? <Navigation variant="bottom" /> : null}
    </div>
  );
}
