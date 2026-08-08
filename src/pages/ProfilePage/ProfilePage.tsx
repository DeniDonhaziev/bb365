import giftImg from '../../assets/profile/gift.png';
import lockImg from '../../assets/profile/lock.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import { StatsRadar } from '../../components/profile/StatsRadar';
import { routes } from '../../data/mockNav';

type ProfileTab = 'profile' | 'settings';

const tabs = [
  { id: 'profile' as const, label: 'Профиль' },
  { id: 'settings' as const, label: 'Настройки' },
];

export function ProfilePage() {
  const [tab, setTab] = useState<ProfileTab>('profile');
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Tabs
        items={tabs}
        value={tab}
        onChange={setTab}
        aria-label="Разделы профиля"
        className={styles.tabs}
      />

      {tab === 'profile' ? (
        <div className={styles.layout}>
          <button
            type="button"
            className={styles.rewardsCard}
            onClick={() => navigate(routes.rewards)}
          >
            <div className={styles.rewardsText}>
              <span className={styles.rewardsTitle}>Ежедневные награды</span>
              <span className={styles.rewardsSub}>за активность</span>
            </div>
            <div className={styles.rewardsGift} aria-hidden>
              <img src={giftImg} alt="" className={styles.giftImg} draggable={false} />
            </div>
          </button>

          <div className={styles.mainCol}>
            <section className={styles.characterCard} aria-label="Персонаж">
              <h2 className={styles.characterTitle}>Персонаж скоро появится</h2>
              <div className={styles.lockStage}>
                <div className={styles.lockGlow} aria-hidden />
                <div className={styles.lockHex} aria-hidden>
                  <svg className={styles.hexBg} viewBox="0 0 100 110" preserveAspectRatio="xMidYMid meet">
                    <path
                      d="M50 6 L88 28 V74 L50 96 L12 74 V28 Z"
                      fill="rgba(120, 70, 200, 0.22)"
                      stroke="rgba(210, 180, 255, 0.38)"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <img src={lockImg} alt="" className={styles.lockImg} draggable={false} />
                </div>
              </div>
            </section>

            <section className={styles.statsCard} aria-labelledby="stats-heading">
              <h2 id="stats-heading" className={styles.statsTitle}>
                Характеристики
              </h2>
              <StatsRadar />
            </section>
          </div>
        </div>
      ) : (
        <section className={styles.settings} aria-label="Настройки">
          <label className={styles.settingRow}>
            <span>Уведомления о наградах</span>
            <input type="checkbox" defaultChecked className={styles.switch} />
          </label>
          <label className={styles.settingRow}>
            <span>Звуковые эффекты</span>
            <input type="checkbox" defaultChecked className={styles.switch} />
          </label>
          <label className={styles.settingRow}>
            <span>Показывать баланс в шапке</span>
            <input type="checkbox" defaultChecked className={styles.switch} />
          </label>
        </section>
      )}
    </div>
  );
}
