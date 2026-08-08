export type MainTabId = 'events' | 'achievements' | 'workshop' | 'bp365';

export interface MainNavItem {
  id: MainTabId;
  label: string;
  path: string;
  icon: 'bolt' | 'star' | 'gear' | 'path';
}

export const mainNavItems: MainNavItem[] = [
  { id: 'events', label: 'Мероприятия', path: '/events', icon: 'bolt' },
  { id: 'achievements', label: 'Достижения', path: '/achievements', icon: 'star' },
  { id: 'workshop', label: 'Мастерская', path: '/workshop', icon: 'gear' },
  { id: 'bp365', label: 'БП 365', path: '/bp365', icon: 'path' },
];

export const routes = {
  events: '/events',
  eventsTab: (tab: 'events' | 'spheres') => `/events?tab=${tab}`,
  sphere: (sphereId: string) => `/spheres/${sphereId}`,
  profile: '/profile',
  rewards: '/rewards',
  notifications: '/notifications',
  bp365: '/bp365',
  bp365Direction: (id: string) => `/bp365/directions/${id}`,
  bp365Entrepreneurship: '/bp365/directions/entrepreneurship',
} as const;

/** @deprecated use routes */
export const secondaryRoutes = {
  profile: routes.profile,
  rewards: routes.rewards,
  notifications: routes.notifications,
  tasks: '/spheres/:sphereId',
} as const;
