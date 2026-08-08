import giftImg from '../../assets/profile/gift.png';
import { useNavigate } from 'react-router-dom';
import styles from './RewardsPage.module.css';
import {
  DAILY_REWARDS,
  getDayStatus,
  type DailyRewardDay,
} from '../../data/mockRewards';
import { useUser } from '../../state/UserContext';
import { formatCurrency } from '../../data/mockUser';
import { IconCoin, IconCrystal } from '../../components/icons/Icons';
import { routes } from '../../data/mockNav';
import { PrimaryButton } from '../../components/ui/PrimaryButton/PrimaryButton';

function RewardIcon({ day }: { day: DailyRewardDay }) {
  if (day.special || day.type === 'gift') {
    return (
      <div className={styles.giftVisual} aria-hidden>
        <img src={giftImg} alt="" className={styles.giftImg} draggable={false} />
      </div>
    );
  }
  if (day.type === 'crystals') {
    return (
      <div className={styles.rewardIcon}>
        <IconCrystal size={26} />
        <span className={styles.rewardAmount}>{formatCurrency(day.amount)}</span>
      </div>
    );
  }
  return (
    <div className={styles.rewardIcon}>
      <IconCoin size={26} />
      <span className={styles.rewardAmount}>{formatCurrency(day.amount)}</span>
    </div>
  );
}

export function RewardsPage() {
  const navigate = useNavigate();
  const { claimedDays, todayDay, canClaimToday, claimTodayReward } = useUser();

  const close = () => navigate(routes.profile);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.close} onClick={close}>
          Закрыть
        </button>
        <h1 className={styles.headerTitle}>Награды</h1>
        <span className={styles.headerSpacer} aria-hidden />
      </header>

      <h2 className={styles.title}>Календарь наград</h2>

      <div className={styles.grid} role="list">
        {DAILY_REWARDS.map((day) => {
          const status = getDayStatus(day.day, claimedDays, todayDay);
          return (
            <article
              key={day.day}
              role="listitem"
              className={`${styles.dayCard} ${styles[`st_${status}`]} ${
                day.special ? styles.special : ''
              }`.trim()}
            >
              <div className={styles.dayHeader}>
                <span>День {day.day}</span>
                {status === 'claimed' ? (
                  <span className={styles.check} aria-label="Получено">
                    ✓
                  </span>
                ) : null}
              </div>
              <div className={styles.dayBody}>
                <RewardIcon day={day} />
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.footer}>
        <PrimaryButton
          fullWidth
          disabled={!canClaimToday}
          onClick={() => claimTodayReward()}
          className={styles.claimBtn}
        >
          {canClaimToday ? 'Получить награду' : 'Награда за сегодня получена'}
        </PrimaryButton>
      </div>
    </div>
  );
}
