export interface PathwayStage {
  id: 'discover' | 'create' | 'mentor';
  title: string;
  daysLabel: string;
  dayFrom: number;
  dayTo: number;
}

/** 90-day path stages — orthogonal to the 14 directions */
export const PATHWAY_STAGES: PathwayStage[] = [
  {
    id: 'discover',
    title: 'Открывай себя',
    daysLabel: '1–30 день',
    dayFrom: 1,
    dayTo: 30,
  },
  {
    id: 'create',
    title: 'Создавай мечту',
    daysLabel: '31–60 день',
    dayFrom: 31,
    dayTo: 60,
  },
  {
    id: 'mentor',
    title: 'Наставляй',
    daysLabel: '61–90 день',
    dayFrom: 61,
    dayTo: 90,
  },
];

/** Demo defaults for entrepreneurship hub */
export const DEMO_DAY = 34;
export const DEMO_TOTAL_DAYS = 90;
export const DEMO_ACTIVE_STAGE_ID = 'create' as const;
