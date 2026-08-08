/** Spheres, events and sphere tasks — mock data matching product IA */

export interface DemoSphere {
  id: string;
  title: string;
  accent: string;
  icon: 'culture' | 'business' | 'health' | 'volunteer' | 'patriot' | 'science';
}

export type TaskType =
  | 'Тест'
  | 'Код'
  | 'Геолокация'
  | 'Верификация'
  | 'Сопоставление';

export type TaskStatus = 'available' | 'completed';

export interface DemoTask {
  id: string;
  sphereId: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
}

export type EventStatus = 'active' | 'upcoming' | 'finished';

export interface DemoEvent {
  id: string;
  title: string;
  description: string;
  sphereId: string;
  status: EventStatus;
  period: string;
}

export const demoSpheres: DemoSphere[] = [
  { id: 'culture', title: 'Культура', accent: '#f5b942', icon: 'culture' },
  { id: 'business', title: 'Бизнес', accent: '#c8956c', icon: 'business' },
  { id: 'health', title: 'ЗОЖ', accent: '#5dcf7a', icon: 'health' },
  { id: 'volunteer', title: 'Волонтерство', accent: '#b07aff', icon: 'volunteer' },
  { id: 'patriot', title: 'Патриотизм', accent: '#ffd700', icon: 'patriot' },
  { id: 'science', title: 'Наука', accent: '#5eb8ff', icon: 'science' },
];

export function getSphereById(id: string): DemoSphere | undefined {
  return demoSpheres.find((s) => s.id === id);
}

/** Events on «Мероприятия → События» (not task cards) */
export const demoEvents: DemoEvent[] = [
  {
    id: 'e1',
    title: 'Ночь науки',
    description: 'Открытые лекции и эксперименты в университетских лабораториях',
    sphereId: 'science',
    status: 'active',
    period: '12–14 марта',
  },
  {
    id: 'e2',
    title: 'Ярмарка проектов',
    description: 'Презентация студенческих инициатив и нетворкинг с партнёрами',
    sphereId: 'business',
    status: 'active',
    period: '18–20 марта',
  },
  {
    id: 'e3',
    title: 'Культурный квест',
    description: 'Маршрут по музеям и арт-пространствам города',
    sphereId: 'culture',
    status: 'upcoming',
    period: '25 марта',
  },
  {
    id: 'e4',
    title: 'Забег первых',
    description: 'Городской старт и активность для участников движения',
    sphereId: 'health',
    status: 'upcoming',
    period: '5 апреля',
  },
  {
    id: 'e5',
    title: 'День волонтёра',
    description: 'Совместные акции помощи и сбор команд',
    sphereId: 'volunteer',
    status: 'finished',
    period: '1–2 марта',
  },
];

const scienceTasks: DemoTask[] = [
  {
    id: 'sci-1',
    sphereId: 'science',
    title: 'Открытия, изменившие мир',
    description: 'Узнай, как открытия учёных повлияли на нашу жизнь',
    type: 'Тест',
    status: 'available',
  },
  {
    id: 'sci-2',
    sphereId: 'science',
    title: 'Жизнь в сети',
    description: 'Разберись, как общаться и защищать себя онлайн',
    type: 'Код',
    status: 'available',
  },
  {
    id: 'sci-3',
    sphereId: 'science',
    title: 'Символы с секретом',
    description: 'Расшифруй научные обозначения и найди скрытый смысл',
    type: 'Сопоставление',
    status: 'available',
  },
  {
    id: 'sci-4',
    sphereId: 'science',
    title: 'Карта лабораторий',
    description: 'Найди научные центры на карте региона',
    type: 'Геолокация',
    status: 'available',
  },
  {
    id: 'sci-5',
    sphereId: 'science',
    title: 'Проверка гипотезы',
    description: 'Подтверди результат эксперимента по шагам',
    type: 'Верификация',
    status: 'completed',
  },
  {
    id: 'sci-6',
    sphereId: 'science',
    title: 'Первый эксперимент',
    description: 'Выполни вводный тест по научным открытиям',
    type: 'Тест',
    status: 'completed',
  },
];

/** Lightweight mock tasks for other spheres (same screen architecture) */
function seedTasksForSphere(sphereId: string, titles: [string, string, string]): DemoTask[] {
  const types: TaskType[] = ['Тест', 'Код', 'Геолокация'];
  return titles.map((title, i) => ({
    id: `${sphereId}-${i + 1}`,
    sphereId,
    title,
    description: 'Выполни задание сферы и получи награду',
    type: types[i % types.length],
    status: i === 2 ? ('completed' as const) : ('available' as const),
  }));
}

export const demoTasks: DemoTask[] = [
  ...scienceTasks,
  ...seedTasksForSphere('culture', [
    'Мастера кисти',
    'Сцена и свет',
    'Наследие города',
  ]),
  ...seedTasksForSphere('business', [
    'Стартап за час',
    'Финансовый баланс',
    'Питч проекта',
  ]),
  ...seedTasksForSphere('health', [
    'Утренняя зарядка',
    'Шагомер недели',
    'Здоровый выбор',
  ]),
  ...seedTasksForSphere('volunteer', [
    'Первая помощь рядом',
    'Карта добрых дел',
    'Команда поддержки',
  ]),
  ...seedTasksForSphere('patriot', [
    'История побед',
    'Символы страны',
    'Памятные места',
  ]),
];

export function getTasksBySphere(sphereId: string): DemoTask[] {
  return demoTasks.filter((t) => t.sphereId === sphereId);
}

/** Exact task-type filters from product references */
export const taskTypeFilters = [
  'Все',
  'Тест',
  'Код',
  'Геолокация',
  'Верификация',
  'Сопоставление',
] as const;

export type TaskTypeFilter = (typeof taskTypeFilters)[number];

export const eventStatusLabel: Record<EventStatus, string> = {
  active: 'Идёт',
  upcoming: 'Скоро',
  finished: 'Завершено',
};
