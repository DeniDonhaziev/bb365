import type { UserWallet } from './mockUser';

export type RewardCurrency = 'coins' | 'crystals' | 'gift';

export type RewardDayStatus = 'claimed' | 'available' | 'locked' | 'special';

export interface DailyRewardDay {
  day: number;
  type: RewardCurrency;
  /** Numeric amount for coins/crystals; for gift — display “+N” bonus count */
  amount: number;
  special?: boolean;
}

/**
 * Calendar values from product reference (Игра Первых).
 * Day 1 shown as claimed on load to match screenshot state.
 */
export const DAILY_REWARDS: DailyRewardDay[] = [
  { day: 1, type: 'crystals', amount: 300 },
  { day: 2, type: 'crystals', amount: 40 },
  { day: 3, type: 'coins', amount: 60 },
  { day: 4, type: 'coins', amount: 40 },
  { day: 5, type: 'coins', amount: 50 },
  { day: 6, type: 'coins', amount: 50 },
  { day: 7, type: 'coins', amount: 70 },
  { day: 8, type: 'crystals', amount: 100 },
  { day: 9, type: 'coins', amount: 90 },
  { day: 10, type: 'coins', amount: 100 },
  { day: 11, type: 'coins', amount: 110 },
  { day: 12, type: 'coins', amount: 125 },
  { day: 13, type: 'gift', amount: 3, special: true },
  { day: 14, type: 'gift', amount: 3, special: true },
];

/** Mock “today” — day 2 available after day 1 already claimed (matches ref hierarchy). */
export const REWARDS_TODAY_DAY = 2;

/** Initial claimed set for demo (Day 1 already received). */
export const INITIAL_CLAIMED_DAYS: number[] = [1];

/** Gift day payout mapped into existing currencies for mock demo. */
export function giftPayout(amount: number): UserWallet {
  return {
    coins: 100 * amount,
    crystals: 50 * amount,
  };
}

export function getDayStatus(
  day: number,
  claimedDays: number[],
  todayDay: number,
): RewardDayStatus {
  if (claimedDays.includes(day)) return 'claimed';
  if (day === todayDay) return 'available';
  // Future / special days still show special visual but remain locked until day
  const def = DAILY_REWARDS.find((d) => d.day === day);
  if (def?.special && day > todayDay) return 'special';
  return 'locked';
}
