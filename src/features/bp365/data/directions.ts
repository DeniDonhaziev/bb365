export type DirectionId =
  | 'entrepreneurship'
  | 'health'
  | 'ecology'
  | 'volunteering'
  | 'art'
  | 'urban'
  | 'patriotism'
  | 'education'
  | 'media'
  | 'history'
  | 'tourism'
  | 'science'
  | 'personal'
  | 'international';

export type DirectionIconName =
  | 'rocket'
  | 'heart'
  | 'leaf'
  | 'hands'
  | 'palette'
  | 'city'
  | 'shield'
  | 'book'
  | 'mic'
  | 'archive'
  | 'map'
  | 'atom'
  | 'user'
  | 'globe';

export interface Direction {
  id: DirectionId;
  category: string;
  title: string;
  shortDescription: string;
  icon: DirectionIconName;
  /** Soft accent for card decorative element */
  accent: string;
  implemented: boolean;
}

export const BP365_DIRECTIONS: Direction[] = [
  {
    id: 'entrepreneurship',
    category: 'Предпринимательство',
    title: 'Предпринимай!',
    shortDescription: 'Превращай идеи в проекты и развивай свои инициативы с сообществом выпускников.',
    icon: 'rocket',
    accent: '#7c5cff',
    implemented: true,
  },
  {
    id: 'health',
    category: 'Здоровье и спорт',
    title: 'Будь здоров!',
    shortDescription: 'Продолжай путь к силе, балансу и здоровым привычкам после финала.',
    icon: 'heart',
    accent: '#4ecdc4',
    implemented: false,
  },
  {
    id: 'ecology',
    category: 'Экология',
    title: 'Сохраняй природу!',
    shortDescription: 'Создавай экопроекты и помогай сохранять среду вокруг себя.',
    icon: 'leaf',
    accent: '#52d68a',
    implemented: false,
  },
  {
    id: 'volunteering',
    category: 'Волонтёрство',
    title: 'Делай добро!',
    shortDescription: 'Объединяй людей вокруг полезных дел и волонтёрских инициатив.',
    icon: 'hands',
    accent: '#ff8c69',
    implemented: false,
  },
  {
    id: 'art',
    category: 'Искусство и творчество',
    title: 'Твори!',
    shortDescription: 'Развивай творческие проекты и делись ими с сообществом.',
    icon: 'palette',
    accent: '#e56bff',
    implemented: false,
  },
  {
    id: 'urban',
    category: 'Развитие городов и территорий',
    title: 'Меняй мир вокруг!',
    shortDescription: 'Меняй городское пространство и территории через свои инициативы.',
    icon: 'city',
    accent: '#5b9dff',
    implemented: false,
  },
  {
    id: 'patriotism',
    category: 'Патриотизм и безопасность',
    title: 'Служи Отечеству!',
    shortDescription: 'Развивай проекты о безопасности, памяти и служении.',
    icon: 'shield',
    accent: '#4d8cff',
    implemented: false,
  },
  {
    id: 'education',
    category: 'Образование и саморазвитие',
    title: 'Открывай новое!',
    shortDescription: 'Строй образовательные маршруты и делись знаниями.',
    icon: 'book',
    accent: '#a78bfa',
    implemented: false,
  },
  {
    id: 'media',
    category: 'Журналистика и медиа',
    title: 'Расскажи о главном!',
    shortDescription: 'Создавай медиа-контент и рассказывай истории, которые важны.',
    icon: 'mic',
    accent: '#ff6b9d',
    implemented: false,
  },
  {
    id: 'history',
    category: 'История и сохранение памяти',
    title: 'Помни!',
    shortDescription: 'Сохраняй историческую память и дели ею с новыми поколениями.',
    icon: 'archive',
    accent: '#c4a484',
    implemented: false,
  },
  {
    id: 'tourism',
    category: 'Туризм и путешествия',
    title: 'Познавай Россию!',
    shortDescription: 'Открывай маршруты, территории и опыт путешествий по стране.',
    icon: 'map',
    accent: '#38bdf8',
    implemented: false,
  },
  {
    id: 'science',
    category: 'Наука и технологии',
    title: 'Создавай будущее!',
    shortDescription: 'Исследуй, прототипируй и развивай технологические решения.',
    icon: 'atom',
    accent: '#60a5fa',
    implemented: false,
  },
  {
    id: 'personal',
    category: 'Личностное развитие',
    title: 'Развивай себя!',
    shortDescription: 'Укрепляй навыки, цели и личную траекторию роста.',
    icon: 'user',
    accent: '#c084fc',
    implemented: false,
  },
  {
    id: 'international',
    category: 'Международное сотрудничество',
    title: 'Объединяй!',
    shortDescription: 'Строй мосты между сообществами и международными инициативами.',
    icon: 'globe',
    accent: '#34d399',
    implemented: false,
  },
];

export function getDirectionById(id: string): Direction | undefined {
  return BP365_DIRECTIONS.find((d) => d.id === id);
}
