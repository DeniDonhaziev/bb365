import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  createMockActivity,
  createMockCommunity,
  createMockContests,
  createMockCourses,
  createMockMentorTasks,
  createMockOpportunities,
  createMockProjects,
  INITIAL_POINTS,
  type ActivityItem,
  type CommunityPerson,
  type Contest,
  type Course,
  type InterviewAnswers,
  type MentorTask,
  type Opportunity,
  type Project,
  type ProjectStage,
  type ReactionKind,
  type SuccessSecret,
} from '../data/entrepreneurshipMock';

interface CreateProjectInput {
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  audience: string;
  stage: ProjectStage;
  category: string;
}

interface PublishUpdateInput {
  projectId: string;
  changed: string;
  result: string;
  next: string;
}

interface StructuredFeedbackInput {
  projectId: string;
  good: string;
  improve: string;
  idea: string;
}

interface EntrepreneurshipContextValue {
  points: number;
  activity: ActivityItem[];
  projects: Project[];
  courses: Course[];
  opportunities: Opportunity[];
  contests: Contest[];
  community: CommunityPerson[];
  secrets: SuccessSecret[];
  mentorTasks: MentorTask[];
  interview: InterviewAnswers | null;
  toast: string | null;
  clearToast: () => void;
  addPoints: (delta: number, label: string, toastMsg?: string) => void;
  toggleSupport: (projectId: string, kind?: ReactionKind) => void;
  addComment: (projectId: string, text: string) => void;
  submitFeedback: (input: StructuredFeedbackInput) => void;
  createProject: (input: CreateProjectInput) => void;
  publishUpdate: (input: PublishUpdateInput) => void;
  applyToRole: (projectId: string, roleId: string) => void;
  completeLesson: (courseId: string) => void;
  applyCourseToProject: (courseId: string) => void;
  saveOpportunity: (id: string) => void;
  joinContest: (id: string) => void;
  completeMentorTask: (id: string) => void;
  saveInterview: (answers: InterviewAnswers) => void;
  publishSecret: (tips: string[]) => void;
  toggleSecretSupport: (id: string) => void;
  toggleSecretSave: (id: string) => void;
  commentSecret: (id: string, text: string) => void;
  getProject: (id: string) => Project | undefined;
  weeklyTop: Project[];
}

const EntrepreneurshipContext = createContext<EntrepreneurshipContextValue | null>(null);

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function EntrepreneurshipProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [activity, setActivity] = useState(createMockActivity);
  const [projects, setProjects] = useState(createMockProjects);
  const [courses, setCourses] = useState(createMockCourses);
  const [opportunities, setOpportunities] = useState(createMockOpportunities);
  const [contests, setContests] = useState(createMockContests);
  const [community] = useState(createMockCommunity);
  const [secrets, setSecrets] = useState<SuccessSecret[]>([]);
  const [mentorTasks, setMentorTasks] = useState(createMockMentorTasks);
  const [interview, setInterview] = useState<InterviewAnswers | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const clearToast = useCallback(() => setToast(null), []);

  const addPoints = useCallback((delta: number, label: string, toastMsg?: string) => {
    setPoints((p) => p + delta);
    setActivity((prev) => [{ id: uid('act'), delta, label }, ...prev]);
    if (toastMsg) setToast(toastMsg);
  }, []);

  const toggleSupport = useCallback((projectId: string, kind: ReactionKind = 'Полезно') => {
    setProjects((prev) => {
      const target = prev.find((p) => p.id === projectId);
      if (!target) return prev;
      if (target.reacted && target.reactionKind === kind) {
        return prev.map((p) =>
          p.id !== projectId
            ? p
            : {
                ...p,
                reacted: false,
                reactionKind: null,
                reactions: Math.max(0, p.reactions - 1),
              },
        );
      }
      if (target.reacted && target.reactionKind !== kind) {
        setToast('Ты поддержал проект');
        return prev.map((p) =>
          p.id !== projectId ? p : { ...p, reactionKind: kind },
        );
      }
      setToast('Ты поддержал проект');
      return prev.map((p) =>
        p.id !== projectId
          ? p
          : {
              ...p,
              reacted: true,
              reactionKind: kind,
              reactions: p.reactions + 1,
            },
      );
    });
  }, []);

  const addComment = useCallback((projectId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          discussions: p.discussions + 1,
          comments: [
            ...p.comments,
            {
              id: uid('c'),
              author: 'Ты',
              text: trimmed,
              createdAt: 'сейчас',
            },
          ],
        };
      }),
    );
    addPoints(10, 'Участие в обсуждении', '+10 баллов за участие в обсуждении');
  }, [addPoints]);

  const submitFeedback = useCallback(
    (input: StructuredFeedbackInput) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== input.projectId) return p;
          return {
            ...p,
            suggestions: p.suggestions + 1,
            feedbacks: [
              ...p.feedbacks,
              {
                id: uid('fb'),
                author: 'Ты',
                good: input.good,
                improve: input.improve,
                idea: input.idea,
                createdAt: 'сейчас',
              },
            ],
          };
        }),
      );
      addPoints(20, 'Оставлена полезная обратная связь', '+20 баллов за полезную обратную связь');
    },
    [addPoints],
  );

  const createProject = useCallback(
    (input: CreateProjectInput) => {
      const project: Project = {
        id: uid('proj'),
        title: input.title,
        author: 'Александр',
        authorAvatar: 'А',
        region: 'Казань',
        category: input.category || 'Предпринимательство',
        stage: input.stage,
        coverHue: Math.floor(Math.random() * 360),
        shortDescription: input.shortDescription,
        problem: input.problem,
        solution: input.solution,
        audience: input.audience,
        teamSize: 1,
        done: ['Проект опубликован'],
        needs: [],
        views: 0,
        reactions: 0,
        discussions: 0,
        suggestions: 0,
        openRoles: [],
        timeline: [
          {
            id: uid('t'),
            date: 'сегодня',
            title: 'Проект создан',
            kind: 'milestone',
          },
        ],
        comments: [],
        feedbacks: [],
        isMine: true,
        progress: 10,
        nextStep: 'Сформулируй первую гипотезу',
      };
      setProjects((prev) => [project, ...prev]);
      addPoints(100, `Создан проект ${input.title}`, '+100 баллов: проект опубликован');
    },
    [addPoints],
  );

  const publishUpdate = useCallback(
    (input: PublishUpdateInput) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== input.projectId) return p;
          return {
            ...p,
            timeline: [
              {
                id: uid('up'),
                date: 'сегодня',
                title: input.changed,
                kind: 'update',
                result: input.result,
                next: input.next,
                photoLabel: 'Фото (mock)',
              },
              ...p.timeline,
            ],
            progress: Math.min(100, (p.progress ?? 50) + 5),
          };
        }),
      );
      addPoints(50, 'Опубликовано обновление проекта', '+50 баллов: обновление проекта');
    },
    [addPoints],
  );

  const applyToRole = useCallback((projectId: string, roleId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          openRoles: p.openRoles.map((r) =>
            r.id === roleId ? { ...r, applied: true } : r,
          ),
        };
      }),
    );
    setToast('Отклик отправлен');
  }, []);

  const completeLesson = useCallback(
    (courseId: string) => {
      setCourses((prev) =>
        prev.map((c) => {
          if (c.id !== courseId) return c;
          const step = 100 / Math.max(1, c.lessonsCount);
          const next = Math.min(100, c.progress + step);
          const completed = next >= 100;
          if (completed && !c.completed) {
            setTimeout(() => {
              addPoints(30, 'Пройден образовательный модуль', '+30 баллов: модуль завершён');
            }, 0);
          }
          return { ...c, progress: next, completed: completed || c.completed };
        }),
      );
    },
    [addPoints],
  );

  const applyCourseToProject = useCallback((courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, applied: true } : c)),
    );
    setProjects((prev) =>
      prev.map((p) => {
        if (!p.isMine || p.id !== 'localai') return p;
        return {
          ...p,
          timeline: [
            {
              id: uid('hyp'),
              date: 'сегодня',
              title: 'Добавлена гипотеза из обучения',
              kind: 'update',
              result: 'Гипотеза: локальная реклама окупается при пакетной аналитике каналов',
              next: 'Провести 5 интервью для проверки',
            },
            ...p.timeline,
          ],
          nextStep: 'Проверь гипотезу через интервью',
          progress: Math.min(100, (p.progress ?? 65) + 8),
        };
      }),
    );
    setToast('Гипотеза добавлена в LocalAI');
  }, []);

  const saveOpportunity = useCallback((id: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, saved: !o.saved } : o)),
    );
    setToast('Возможность сохранена');
  }, []);

  const joinContest = useCallback((id: string) => {
    setContests((prev) =>
      prev.map((c) => (c.id === id ? { ...c, joined: true } : c)),
    );
    setToast('Ты участвуешь');
  }, []);

  const completeMentorTask = useCallback(
    (id: string) => {
      setMentorTasks((prev) => {
        const task = prev.find((t) => t.id === id);
        if (!task || task.done) return prev;
        setTimeout(() => {
          addPoints(task.points, task.title, `+${task.points} баллов за наставничество`);
        }, 0);
        return prev.map((t) => (t.id === id ? { ...t, done: true } : t));
      });
    },
    [addPoints],
  );

  const saveInterview = useCallback((answers: InterviewAnswers) => {
    setInterview(answers);
    setToast('Интервью завершено — история сохранена');
  }, []);

  const publishSecret = useCallback((tips: string[]) => {
    setSecrets((prev) => [
      {
        id: uid('sec'),
        author: 'Александр',
        tips,
        supports: 0,
        comments: [],
      },
      ...prev,
    ]);
    setToast('Секрет успеха опубликован');
  }, []);

  const toggleSecretSupport = useCallback((id: string) => {
    setSecrets((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (s.supported) {
          return { ...s, supported: false, supports: Math.max(0, s.supports - 1) };
        }
        return { ...s, supported: true, supports: s.supports + 1 };
      }),
    );
  }, []);

  const toggleSecretSave = useCallback((id: string) => {
    setSecrets((prev) => prev.map((s) => (s.id === id ? { ...s, saved: !s.saved } : s)));
    setToast('Сохранено');
  }, []);

  const commentSecret = useCallback((id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setSecrets((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              comments: [
                ...s.comments,
                { id: uid('sc'), author: 'Ты', text: trimmed, createdAt: 'сейчас' },
              ],
            }
          : s,
      ),
    );
  }, []);

  const getProject = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects],
  );

  const weeklyTop = useMemo(() => {
    const score = (p: Project) =>
      p.reactions * 2 + p.discussions * 3 + p.suggestions * 4 + p.views * 0.1;
    return [...projects].sort((a, b) => score(b) - score(a)).slice(0, 5);
  }, [projects]);

  const value: EntrepreneurshipContextValue = {
    points,
    activity,
    projects,
    courses,
    opportunities,
    contests,
    community,
    secrets,
    mentorTasks,
    interview,
    toast,
    clearToast,
    addPoints,
    toggleSupport,
    addComment,
    submitFeedback,
    createProject,
    publishUpdate,
    applyToRole,
    completeLesson,
    applyCourseToProject,
    saveOpportunity,
    joinContest,
    completeMentorTask,
    saveInterview,
    publishSecret,
    toggleSecretSupport,
    toggleSecretSave,
    commentSecret,
    getProject,
    weeklyTop,
  };

  return (
    <EntrepreneurshipContext.Provider value={value}>{children}</EntrepreneurshipContext.Provider>
  );
}

export function useEntrepreneurship() {
  const ctx = useContext(EntrepreneurshipContext);
  if (!ctx) throw new Error('useEntrepreneurship must be used within EntrepreneurshipProvider');
  return ctx;
}
