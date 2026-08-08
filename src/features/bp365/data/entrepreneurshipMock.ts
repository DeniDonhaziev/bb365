export type ProjectStage =
  | 'Идея'
  | 'Концепция'
  | 'MVP'
  | 'Первый результат'
  | 'Действующий проект';

export type ReactionKind = 'Полезно' | 'Интересно' | 'Сильная идея';

export interface ProjectComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface ProjectFeedback {
  id: string;
  author: string;
  good: string;
  improve: string;
  idea: string;
  createdAt: string;
}

export interface ProjectTimelineItem {
  id: string;
  date: string;
  title: string;
  kind: 'milestone' | 'update';
  result?: string;
  next?: string;
  photoLabel?: string;
}

export interface ProjectOpenRole {
  id: string;
  role: string;
  applied?: boolean;
}

export interface Project {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  region: string;
  category: string;
  stage: ProjectStage;
  coverHue: number;
  shortDescription: string;
  problem: string;
  solution: string;
  audience: string;
  teamSize: number;
  done: string[];
  needs: string[];
  views: number;
  reactions: number;
  discussions: number;
  suggestions: number;
  reacted?: boolean;
  reactionKind?: ReactionKind | null;
  openRoles: ProjectOpenRole[];
  timeline: ProjectTimelineItem[];
  comments: ProjectComment[];
  feedbacks: ProjectFeedback[];
  isMine?: boolean;
  progress?: number;
  nextStep?: string;
}

export interface CourseLesson {
  id: string;
  title: string;
}

export interface Course {
  id: string;
  title: string;
  lessonsCount: number;
  minutes: number;
  coverHue: number;
  lessons: CourseLesson[];
  progress: number; // 0-100
  completed?: boolean;
  applyCta?: string;
  applied?: boolean;
}

export interface Opportunity {
  id: string;
  type: string;
  title: string;
  organizer: string;
  format: string;
  deadline: string;
  audience: string;
  description: string;
  isExample: boolean;
  saved?: boolean;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  joined?: boolean;
}

export interface CommunityPerson {
  id: string;
  name: string;
  region: string;
  role: string;
  skills: string[];
  interests: string[];
  avatarHue: number;
  lookingForProject?: boolean;
}

export interface ActivityItem {
  id: string;
  delta: number;
  label: string;
}

export interface SuccessSecret {
  id: string;
  author: string;
  tips: string[];
  supports: number;
  supported?: boolean;
  saved?: boolean;
  comments: ProjectComment[];
}

export interface InterviewAnswers {
  howCame: string;
  proud: string;
  finalExperience: string;
  createNext: string;
  strengths: string;
  needHelp: string;
  canHelp: string;
}

export interface MentorTask {
  id: string;
  title: string;
  points: number;
  done?: boolean;
}

export function createMockProjects(): Project[] {
  const commonTimeline = (title: string): ProjectTimelineItem[] => [
    { id: `${title}-t1`, date: '12 июня', title: 'Сформулировали проблему', kind: 'milestone' },
    { id: `${title}-t2`, date: '20 июня', title: 'Провели 15 интервью', kind: 'milestone' },
    { id: `${title}-t3`, date: '29 июня', title: 'Создали первый прототип', kind: 'milestone' },
    { id: `${title}-t4`, date: '8 июля', title: 'Получили первую обратную связь', kind: 'milestone' },
  ];

  return [
    {
      id: 'localai',
      title: 'LocalAI',
      author: 'Александр',
      authorAvatar: 'А',
      region: 'Казань',
      category: 'IT / Предпринимательство',
      stage: 'MVP',
      coverHue: 260,
      shortDescription: 'Умный помощник для малого бизнеса',
      problem: 'Малому бизнесу сложно самостоятельно анализировать эффективность локальной рекламы.',
      solution:
        'Сервис, который собирает данные о рекламных площадках и помогает предпринимателю выбирать наиболее эффективные каналы продвижения.',
      audience: 'Малый и локальный бизнес',
      teamSize: 3,
      done: ['Проблема подтверждена', 'Прототип интерфейса', 'Первые 10 интервью'],
      needs: ['Дизайнер', 'Маркетолог', 'Обратная связь по ценностному предложению'],
      views: 124,
      reactions: 38,
      discussions: 12,
      suggestions: 7,
      openRoles: [
        { id: 'r1', role: 'Дизайнер' },
        { id: 'r2', role: 'Frontend-разработчик' },
        { id: 'r3', role: 'Маркетолог' },
      ],
      timeline: commonTimeline('localai'),
      comments: [
        {
          id: 'c1',
          author: 'Мария',
          text: 'Пробовали ли вы тестировать решение на небольших кофейнях?',
          createdAt: '2 дня назад',
        },
        {
          id: 'c2',
          author: 'Иван',
          text: 'Можно добавить аналитику по каналам привлечения клиентов.',
          createdAt: '1 день назад',
        },
      ],
      feedbacks: [],
      isMine: true,
      progress: 65,
      nextStep: 'Получи обратную связь по ценностному предложению',
    },
    {
      id: 'ecobox',
      title: 'EcoBox',
      author: 'Анна',
      authorAvatar: 'Ан',
      region: 'Екатеринбург',
      category: 'Экология / Предпринимательство',
      stage: 'Концепция',
      coverHue: 145,
      shortDescription: 'Система повторного использования упаковки для локальных заведений',
      problem: 'Заведения накапливают одноразовую упаковку и не имеют простого сценария возврата.',
      solution: 'Сет кастомизируемых боксов с точками возврата и бонусной логикой для гостей.',
      audience: 'Кофейни и локальные кафе',
      teamSize: 4,
      done: ['Пилот с 3 кафе', 'Макеты упаковки'],
      needs: ['Партнёры-заведения', 'Опыт логистики'],
      views: 210,
      reactions: 64,
      discussions: 28,
      suggestions: 15,
      openRoles: [{ id: 'e1', role: 'Операционный менеджер' }],
      timeline: commonTimeline('ecobox'),
      comments: [
        {
          id: 'ec1',
          author: 'Кирилл',
          text: 'Как вы решаете гигиену повторной упаковки?',
          createdAt: '3 часа назад',
        },
      ],
      feedbacks: [],
    },
    {
      id: 'skillbridge',
      title: 'SkillBridge',
      author: 'Дарья',
      authorAvatar: 'Д',
      region: 'Новосибирск',
      category: 'Образование',
      stage: 'MVP',
      coverHue: 220,
      shortDescription: 'Платформа обмена практическими навыками между студентами',
      problem: 'Студентам сложно находить менторов и практику вне университета.',
      solution: 'Короткие peer-to-peer сессии обмена навыками в рамках кампуса и города.',
      audience: 'Студенты 1–4 курса',
      teamSize: 5,
      done: ['MVP чата', 'Каталог навыков'],
      needs: ['Модераторы', 'Дизайнер UI'],
      views: 180,
      reactions: 51,
      discussions: 19,
      suggestions: 9,
      openRoles: [{ id: 's1', role: 'Community manager' }],
      timeline: commonTimeline('skillbridge'),
      comments: [],
      feedbacks: [],
    },
    {
      id: 'villagego',
      title: 'VillageGo',
      author: 'Илья',
      authorAvatar: 'И',
      region: 'Тула',
      category: 'Туризм',
      stage: 'Первый результат',
      coverHue: 35,
      shortDescription: 'Цифровой сервис маршрутов малого туризма',
      problem: 'Малые локации трудно найти в стандартных туристических сервисах.',
      solution: 'Готовые маршруты выходного дня с локальными гидами и точками.',
      audience: 'Семьи и молодёжь',
      teamSize: 3,
      done: ['12 маршрутов', 'Партнёрства с гидами'],
      needs: ['Контент-мейкер'],
      views: 156,
      reactions: 42,
      discussions: 14,
      suggestions: 6,
      openRoles: [{ id: 'v1', role: 'Контент-мейкер' }],
      timeline: commonTimeline('villagego'),
      comments: [],
      feedbacks: [],
    },
    {
      id: 'medialab',
      title: 'MediaLab',
      author: 'София',
      authorAvatar: 'С',
      region: 'Санкт-Петербург',
      category: 'Медиа',
      stage: 'Концепция',
      coverHue: 320,
      shortDescription: 'Медиастудия для школьных и студенческих команд',
      problem: 'Школьным командам не хватает инфраструктуры для медиапроизводства.',
      solution: 'Мини-студия и образовательный пакет для школьных СМИ.',
      audience: 'Школы и колледжи',
      teamSize: 4,
      done: ['Концепция студии'],
      needs: ['Оператор', 'Сценарист'],
      views: 98,
      reactions: 27,
      discussions: 8,
      suggestions: 4,
      openRoles: [{ id: 'm1', role: 'Оператор' }],
      timeline: commonTimeline('medialab'),
      comments: [],
      feedbacks: [],
    },
    {
      id: 'carepoint',
      title: 'CarePoint',
      author: 'Максим',
      authorAvatar: 'М',
      region: 'Краснодар',
      category: 'Волонтёрство',
      stage: 'MVP',
      coverHue: 10,
      shortDescription: 'Сервис координации молодых волонтёров',
      problem: 'Волонтёрам сложно быстро найти релевантные смены и роли.',
      solution: 'Подбор смен, уведомления и рейтинги надёжности волонтёров.',
      audience: 'Волонтёрские штабы и НКО',
      teamSize: 6,
      done: ['Бета в 2 организациях'],
      needs: ['Backend-разработчик'],
      views: 142,
      reactions: 39,
      discussions: 11,
      suggestions: 5,
      openRoles: [{ id: 'cp1', role: 'Backend-разработчик' }],
      timeline: commonTimeline('carepoint'),
      comments: [],
      feedbacks: [],
    },
    {
      id: 'studyai',
      title: 'StudyAI',
      author: 'Елена',
      authorAvatar: 'Е',
      region: 'Москва',
      category: 'Образование / IT',
      stage: 'MVP',
      coverHue: 200,
      shortDescription: 'Помощник для персонального образовательного маршрута',
      problem: 'Учащимся сложно выстраивать индивидуальный план развития.',
      solution: 'Рекомендации модулей и трекинг прогресса на основе целей.',
      audience: 'Старшеклассники и студенты',
      teamSize: 4,
      done: ['Алгоритм рекомендаций v1'],
      needs: ['Педагог-методист'],
      views: 201,
      reactions: 58,
      discussions: 22,
      suggestions: 11,
      openRoles: [{ id: 'st1', role: 'Методист' }],
      timeline: commonTimeline('studyai'),
      comments: [],
      feedbacks: [],
    },
  ];
}

export function createMockCourses(): Course[] {
  return [
    {
      id: 'idea-to-project',
      title: 'От идеи к проекту',
      lessonsCount: 4,
      minutes: 25,
      coverHue: 250,
      progress: 0,
      lessons: [
        { id: '1', title: 'Формулируем идею' },
        { id: '2', title: 'Определяем проблему' },
        { id: '3', title: 'Первый черновик решения' },
        { id: '4', title: 'План на 30 дней' },
      ],
    },
    {
      id: 'hypothesis',
      title: 'Как проверить гипотезу',
      lessonsCount: 5,
      minutes: 35,
      coverHue: 210,
      progress: 20,
      applyCta: 'Добавить гипотезу в LocalAI',
      lessons: [
        { id: '1', title: 'Что такое гипотеза' },
        { id: '2', title: 'Кто твоя аудитория' },
        { id: '3', title: 'Как провести интервью' },
        { id: '4', title: 'Как проверить результат' },
        { id: '5', title: 'Что делать дальше' },
      ],
    },
    {
      id: 'mvp',
      title: 'Создание MVP',
      lessonsCount: 4,
      minutes: 30,
      coverHue: 280,
      progress: 0,
      lessons: [
        { id: '1', title: 'Что считать MVP' },
        { id: '2', title: 'Минимальный функционал' },
        { id: '3', title: 'Сборка прототипа' },
        { id: '4', title: 'Первый запуск' },
      ],
    },
    {
      id: 'audience',
      title: 'Как понять свою аудиторию',
      lessonsCount: 3,
      minutes: 20,
      coverHue: 170,
      progress: 0,
      lessons: [
        { id: '1', title: 'Сегменты' },
        { id: '2', title: 'Интервью' },
        { id: '3', title: 'Инсайты' },
      ],
    },
    {
      id: 'finance',
      title: 'Основы финансовой модели',
      lessonsCount: 5,
      minutes: 40,
      coverHue: 40,
      progress: 0,
      lessons: [
        { id: '1', title: 'Доходы и расходы' },
        { id: '2', title: 'Unit-экономика' },
        { id: '3', title: 'Прогноз' },
        { id: '4', title: 'Сценарии' },
        { id: '5', title: 'Практика' },
      ],
    },
    {
      id: 'pitch',
      title: 'Как презентовать проект',
      lessonsCount: 4,
      minutes: 30,
      coverHue: 330,
      progress: 0,
      lessons: [
        { id: '1', title: 'Структура питча' },
        { id: '2', title: 'Сторителлинг' },
        { id: '3', title: 'Слайды' },
        { id: '4', title: 'Репетиция' },
      ],
    },
  ];
}

export function createMockOpportunities(): Opportunity[] {
  return [
    {
      id: 'o1',
      type: 'Конкурс',
      title: 'Конкурс цифровых инициатив молодых команд',
      organizer: 'Пример организатора',
      format: 'Онлайн + финал офлайн',
      deadline: 'до 30 сентября',
      audience: 'Выпускники 18–25',
      description: 'Площадка для презентации цифровых решений для локального бизнеса.',
      isExample: true,
    },
    {
      id: 'o2',
      type: 'Акселератор',
      title: 'Акселератор проектных команд',
      organizer: 'Пример акселератора',
      format: '8 недель онлайн',
      deadline: 'набор до 15 октября',
      audience: 'Команды 2–5 человек',
      description: 'Упаковка продукта, питч и выход к пилотным партнёрам.',
      isExample: true,
    },
    {
      id: 'o3',
      type: 'Хакатон',
      title: 'Хакатон «Городские решения»',
      organizer: 'Пример площадки',
      format: '48 часов',
      deadline: 'регистрация открыта',
      audience: 'IT и социальные проекты',
      description: 'Совместная разработка прототипов в смешанных командах.',
      isExample: true,
    },
    {
      id: 'o4',
      type: 'Образовательная программа',
      title: 'Программа по product discovery',
      organizer: 'Пример школы',
      format: 'Вебинары + задания',
      deadline: 'старт 1 октября',
      audience: 'Начинающие авторы проектов',
      description: 'Серия занятий о гипотезах, интервью и валидации.',
      isExample: true,
    },
    {
      id: 'o5',
      type: 'Питчинг',
      title: 'Питч-день региональных инициатив',
      organizer: 'Пример сообщества',
      format: 'Офлайн 1 день',
      deadline: 'заявки до 20 сентября',
      audience: 'Проекты на стадии MVP',
      description: 'Короткие питчи и обратная связь от кураторов.',
      isExample: true,
    },
    {
      id: 'o6',
      type: 'Грантовая возможность',
      title: 'Поддержка молодёжных инициатив',
      organizer: 'Пример фонда',
      format: 'Заявка онлайн',
      deadline: 'окно приёма 2 недели',
      audience: 'Социально значимые проекты',
      description: 'Поддержка на закупку оборудования и пилотный запуск.',
      isExample: true,
    },
  ];
}

export function createMockContests(): Contest[] {
  return [
    { id: 'c1', title: 'Проект месяца', description: 'Выбери и поддержи лучший проект выпускников.' },
    { id: 'c2', title: 'Лучший социальный стартап', description: 'Фокус на социальный эффект инициативы.' },
    { id: 'c3', title: 'Питч за 60 секунд', description: 'Коротко и ясно расскажи о своём проекте.' },
    { id: 'c4', title: 'Разбор недели', description: 'Глубокий разбор одного проекта с экспертами.' },
    { id: 'c5', title: 'Помоги улучшить 3 проекта', description: 'Оставь полезную обратную связь трём командам.' },
  ];
}

export function createMockCommunity(): CommunityPerson[] {
  return [
    {
      id: 'p1',
      name: 'Анна',
      region: 'Екатеринбург',
      role: 'Автор проекта',
      skills: ['Операции', 'Упаковка'],
      interests: ['Экология', 'Ритейл'],
      avatarHue: 145,
    },
    {
      id: 'p2',
      name: 'Кирилл',
      region: 'Москва',
      role: 'Выпускник',
      skills: ['Frontend', 'UX'],
      interests: ['IT', 'Образование'],
      avatarHue: 220,
      lookingForProject: true,
    },
    {
      id: 'p3',
      name: 'Мария',
      region: 'Казань',
      role: 'Будущий наставник',
      skills: ['Менторинг', 'Питчи'],
      interests: ['Стартапы'],
      avatarHue: 300,
    },
    {
      id: 'p4',
      name: 'Тимур',
      region: 'Уфа',
      role: 'Ищет команду',
      skills: ['Дизайн', 'Брендинг'],
      interests: ['Медиа', 'Туризм'],
      avatarHue: 40,
      lookingForProject: true,
    },
    {
      id: 'p5',
      name: 'Ольга',
      region: 'Владивосток',
      role: 'Автор проекта',
      skills: ['Исследования'],
      interests: ['Городская среда'],
      avatarHue: 180,
    },
  ];
}

export function createMockActivity(): ActivityItem[] {
  return [
    { id: 'a1', delta: 100, label: 'Создан проект LocalAI' },
    { id: 'a2', delta: 50, label: 'Опубликован новый этап проекта' },
    { id: 'a3', delta: 20, label: 'Помог проекту EcoBox' },
    { id: 'a4', delta: 30, label: 'Завершён микро-курс' },
    { id: 'a5', delta: 10, label: 'Участвовал в обсуждении' },
  ];
}

export function createMockMentorTasks(): MentorTask[] {
  return [
    { id: 'mt1', title: 'Разбери 1 новую идею', points: 25 },
    { id: 'mt2', title: 'Ответь на вопрос начинающего автора', points: 15 },
    { id: 'mt3', title: 'Помоги улучшить презентацию проекта', points: 30 },
  ];
}

export const INITIAL_POINTS = 1240;
