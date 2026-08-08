export interface UserWallet {
  coins: number;
  crystals: number;
}

export interface MockUser {
  id: string;
  displayName: string;
  wallet: UserWallet;
  hasUnreadNotifications: boolean;
}

export const INITIAL_USER: MockUser = {
  id: 'user-1',
  displayName: 'Игрок',
  wallet: {
    coins: 4246,
    crystals: 4111,
  },
  hasUnreadNotifications: true,
};

/** @deprecated use UserProvider / useUser — kept for static imports if needed */
export const mockUser = INITIAL_USER;

/** Format currency with thin space as thousands separator (RU). */
export function formatCurrency(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
