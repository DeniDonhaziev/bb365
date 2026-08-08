import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  INITIAL_USER,
  type MockUser,
  type UserWallet,
} from '../data/mockUser';
import {
  DAILY_REWARDS,
  INITIAL_CLAIMED_DAYS,
  REWARDS_TODAY_DAY,
  giftPayout,
  getDayStatus,
} from '../data/mockRewards';

interface UserContextValue {
  user: MockUser;
  claimedDays: number[];
  todayDay: number;
  canClaimToday: boolean;
  claimTodayReward: () => boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser>(INITIAL_USER);
  const [claimedDays, setClaimedDays] = useState<number[]>(INITIAL_CLAIMED_DAYS);
  const todayDay = REWARDS_TODAY_DAY;

  const canClaimToday = useMemo(() => {
    return getDayStatus(todayDay, claimedDays, todayDay) === 'available';
  }, [claimedDays, todayDay]);

  const claimTodayReward = useCallback(() => {
    if (claimedDays.includes(todayDay)) return false;

    const reward = DAILY_REWARDS.find((d) => d.day === todayDay);
    if (!reward) return false;

    setClaimedDays((prev) => [...prev, todayDay]);
    setUser((prev) => {
      let add: UserWallet = { coins: 0, crystals: 0 };
      if (reward.type === 'coins') {
        add = { coins: reward.amount, crystals: 0 };
      } else if (reward.type === 'crystals') {
        add = { coins: 0, crystals: reward.amount };
      } else {
        add = giftPayout(reward.amount);
      }
      return {
        ...prev,
        wallet: {
          coins: prev.wallet.coins + add.coins,
          crystals: prev.wallet.crystals + add.crystals,
        },
      };
    });
    return true;
  }, [claimedDays, todayDay]);

  const value = useMemo(
    () => ({
      user,
      claimedDays,
      todayDay,
      canClaimToday,
      claimTodayReward,
    }),
    [user, claimedDays, todayDay, canClaimToday, claimTodayReward],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within UserProvider');
  }
  return ctx;
}
