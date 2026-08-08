/** Profile characteristics from product reference — only stats visible on screenshot */

export interface StatDef {
  id: 'endurance' | 'charisma' | 'spirit' | 'strength';
  label: string;
  value: number;
  /** Angle degrees: 0 = top, clockwise */
  angle: number;
  color: string;
  icon: 'bolt' | 'star' | 'spirit' | 'strength';
}

/**
 * Axes matching original screenshot:
 * TL Выносливость, TR Харизма, BL Дух, BR Сила
 */
export const PROFILE_STATS: StatDef[] = [
  {
    id: 'endurance',
    label: 'Выносливость',
    value: 1,
    angle: 315,
    color: '#5eb8ff',
    icon: 'bolt',
  },
  {
    id: 'charisma',
    label: 'Харизма',
    value: 4,
    angle: 45,
    color: '#ff9a2e',
    icon: 'star',
  },
  {
    id: 'spirit',
    label: 'Дух',
    value: 0.65,
    angle: 225,
    color: '#7ec8ff',
    icon: 'spirit',
  },
  {
    id: 'strength',
    label: 'Сила',
    value: 0.5,
    angle: 135,
    color: '#ff5a4a',
    icon: 'strength',
  },
];

export const STAT_SCALE_MAX = 4;
