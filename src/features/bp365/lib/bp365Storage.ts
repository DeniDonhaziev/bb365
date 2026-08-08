import type { DirectionId } from '../data/directions';

const STORAGE_KEY = 'bp365Profile';

export interface BP365Profile {
  onboardingCompleted: boolean;
  primaryDirection: DirectionId | null;
}

const defaultProfile: BP365Profile = {
  onboardingCompleted: false,
  primaryDirection: null,
};

export function loadBP365Profile(): BP365Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProfile };
    const parsed = JSON.parse(raw) as Partial<BP365Profile>;
    return {
      onboardingCompleted: Boolean(parsed.onboardingCompleted),
      primaryDirection: (parsed.primaryDirection as DirectionId) ?? null,
    };
  } catch {
    return { ...defaultProfile };
  }
}

export function saveBP365Profile(profile: BP365Profile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function clearBP365Profile(): void {
  localStorage.removeItem(STORAGE_KEY);
}
