import { useMemo, useState, type FormEvent } from 'react';
import { PrimaryButton } from '../../../components/ui/PrimaryButton/PrimaryButton';
import { Card } from '../../../components/ui/Card/Card';
import { Tabs } from '../../../components/ui/Tabs/Tabs';
import { PathwaySteps } from '../components/PathwaySteps';
import { BP365Modal } from '../components/BP365Modal';
import { BP365Toast } from '../components/BP365Toast';
import { DEMO_ACTIVE_STAGE_ID, DEMO_DAY, DEMO_TOTAL_DAYS } from '../data/pathway';
import type { Project, ProjectStage, ReactionKind } from '../data/entrepreneurshipMock';
import { useEntrepreneurship } from './EntrepreneurshipContext';
import styles from './EntrepreneurshipHub.module.css';

type HubTab = 'home' | 'projects' | 'learning' | 'opportunities' | 'community';

const STAGE_OPTIONS: ProjectStage[] = [
  'Идея',
  'Концепция',
  'MVP',
  'Первый результат',
  'Действующий проект',
];

const REACTIONS: ReactionKind[] = ['Полезно', 'Интересно', 'Сильная идея'];

function pointsFmt(n: number) {
  return n.toLocaleString('ru-RU');
}

function Cover({ hue, title }: { hue: number; title: string }) {
  return (
    <div
      className={styles.cover}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 55% 42%), hsl(${(hue + 40) % 360} 60% 28%))`,
      }}
      aria-hidden
    >
      <span>{title.slice(0, 1)}</span>
    </div>
  );
}

function Avatar({ letter, hue }: { letter: string; hue?: number }) {
  return (
    <span
      className={styles.avatar}
      style={hue != null ? { background: `hsl(${hue} 50% 40%)` } : undefined}
    >
      {letter}
    </span>
  );
}

export function EntrepreneurshipHub() {
  const ctx = useEntrepreneurship();
  const [tab, setTab] = useState<HubTab>('home');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [editHint, setEditHint] = useState(false);
  const [commentDraft, setCommentDraft] = useState('');
  const [secretComment, setSecretComment] = useState<Record<string, string>>({});
  const [oppDetailId, setOppDetailId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    problem: '',
    solution: '',
    audience: '',
    stage: 'Идея' as ProjectStage,
    category: 'IT / Предпринимательство',
  });

  const [updateForm, setUpdateForm] = useState({
    changed: '',
    result: '',
    next: '',
  });

  const [fbForm, setFbForm] = useState({ good: '', improve: '', idea: '' });
  const [interviewForm, setInterviewForm] = useState({
    howCame: '',
    proud: '',
    finalExperience: '',
    createNext: '',
    strengths: '',
    needHelp: '',
    canHelp: '',
  });
  const [secretForm, setSecretForm] = useState({
    helped: '',
    mistake: '',
    differently: '',
    advice: '',
  });

  const myProject = useMemo(
    () => ctx.projects.find((p) => p.isMine && p.id === 'localai') ?? ctx.projects.find((p) => p.isMine) ?? ctx.projects[0],
    [ctx.projects],
  );

  const detail = detailId ? ctx.getProject(detailId) : null;
  const activeCourse = courseId ? ctx.courses.find((c) => c.id === courseId) : null;
  const oppDetail = oppDetailId ? ctx.opportunities.find((o) => o.id === oppDetailId) : null;

  const openProject = (id: string) => {
    setDetailId(id);
    setCommentDraft('');
    setFbForm({ good: '', improve: '', idea: '' });
  };

  const recommendedCourse = ctx.courses.find((c) => c.id === 'hypothesis') ?? ctx.courses[0];
  const nearestOpp = ctx.opportunities[0];
  const helpProjects = ctx.projects.filter((p) => !p.isMine).slice(0, 3);

  const onCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    ctx.createProject(form);
    setCreateOpen(false);
    setForm({
      title: '',
      shortDescription: '',
      problem: '',
      solution: '',
      audience: '',
      stage: 'Идея',
      category: 'IT / Предпринимательство',
    });
    setTab('projects');
  };

  const onUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (!updateForm.changed.trim()) return;
    ctx.publishUpdate({
      projectId: myProject.id,
      changed: updateForm.changed,
      result: updateForm.result,
      next: updateForm.next,
    });
    setUpdateOpen(false);
    setUpdateForm({ changed: '', result: '', next: '' });
  };

  const onFeedback = (e: FormEvent) => {
    e.preventDefault();
    if (!detailId || !fbForm.good.trim()) return;
    ctx.submitFeedback({ projectId: detailId, ...fbForm });
    setFbForm({ good: '', improve: '', idea: '' });
  };

  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <p className={styles.category}>Предпринимательство</p>
        <div className={styles.heroTop}>
          <h1 className={styles.title}>Предпринимай!</h1>
          <span className={styles.badge}>Твоё основное направление</span>
        </div>
        <p className={styles.lead}>
          Превращай идеи в проекты, получай обратную связь от выпускников и помогай развиваться
          другим.
        </p>
        <p className={styles.status}>
          БП 365 · День {DEMO_DAY} из {DEMO_TOTAL_DAYS}
        </p>
        <PathwaySteps activeStageId={DEMO_ACTIVE_STAGE_ID} compact />
        <div className={styles.pointsBar}>
          <div>
            <p className={styles.pointsLabel}>Активность в направлении</p>
            <p className={styles.pointsValue}>{pointsFmt(ctx.points)} баллов</p>
            <p className={styles.pointsHint}>
              Получай баллы за развитие своего проекта и помощь другим участникам.
            </p>
          </div>
          <PrimaryButton variant="ghost" onClick={() => setRewardsOpen(true)}>
            Награды
          </PrimaryButton>
        </div>
      </header>

      <div className={styles.tabsWrap}>
        <Tabs
          aria-label="Разделы Предпринимай"
          value={tab}
          onChange={setTab}
          items={[
            { id: 'home', label: 'Главная' },
            { id: 'projects', label: 'Проекты' },
            { id: 'learning', label: 'Обучение' },
            { id: 'opportunities', label: 'Возможности' },
            { id: 'community', label: 'Сообщество' },
          ]}
          className={styles.tabs}
        />
      </div>

      {tab === 'home' && (
        <div className={styles.stack}>
          <Card variant="elevated" className={styles.block}>
            <h2 className={styles.blockTitle}>Продолжи развитие своей идеи</h2>
            <p className={styles.muted}>
              {myProject.title}
              {myProject.shortDescription ? ` · ${myProject.shortDescription}` : ''}
            </p>
            <div className={styles.progressRow}>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${myProject.progress ?? 0}%` }}
                />
              </div>
              <span className={styles.progressPct}>{myProject.progress ?? 0}%</span>
            </div>
            <p className={styles.nextStep}>
              <strong>Следующий шаг:</strong> {myProject.nextStep}
            </p>
            <div className={styles.rowBtns}>
              <PrimaryButton onClick={() => openProject(myProject.id)}>
                Продолжить проект
              </PrimaryButton>
              <PrimaryButton variant="ghost" onClick={() => setUpdateOpen(true)}>
                Опубликовать обновление
              </PrimaryButton>
            </div>
          </Card>

          <Card className={styles.block}>
            <h2 className={styles.blockTitle}>Мой текущий проект</h2>
            <ProjectSummary
              project={myProject}
              onOpen={() => openProject(myProject.id)}
              onEdit={() => setEditHint(true)}
              onUpdate={() => setUpdateOpen(true)}
            />
            {editHint && (
              <p className={styles.muted}>
                Режим редактирования (demo): правки фиксируй через «Опубликовать обновление».
              </p>
            )}
          </Card>

          <Card className={styles.block}>
            <h2 className={styles.blockTitle}>Проекты, которым можно помочь</h2>
            <div className={styles.miniGrid}>
              {helpProjects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={styles.miniCard}
                  onClick={() => openProject(p.id)}
                >
                  <Cover hue={p.coverHue} title={p.title} />
                  <span className={styles.miniTitle}>{p.title}</span>
                  <span className={styles.muted}>{p.shortDescription}</span>
                </button>
              ))}
            </div>
          </Card>

          <div className={styles.twoCol}>
            <Card className={styles.block}>
              <h2 className={styles.blockTitle}>Рекомендованный курс</h2>
              <p className={styles.courseName}>{recommendedCourse.title}</p>
              <p className={styles.muted}>
                {recommendedCourse.lessonsCount} уроков · {recommendedCourse.minutes} минут
              </p>
              <PrimaryButton
                onClick={() => {
                  setCourseId(recommendedCourse.id);
                  setLessonIndex(0);
                  setTab('learning');
                }}
              >
                Начать
              </PrimaryButton>
            </Card>
            <Card className={styles.block}>
              <h2 className={styles.blockTitle}>Ближайшая возможность</h2>
              <p className={styles.courseName}>{nearestOpp.title}</p>
              <p className={styles.exampleTag}>Пример возможности</p>
              <PrimaryButton variant="ghost" onClick={() => setTab('opportunities')}>
                Подробнее
              </PrimaryButton>
            </Card>
          </div>

          <Card className={styles.block}>
            <h2 className={styles.blockTitle}>90-дневный маршрут</h2>
            <PathwaySteps activeStageId={DEMO_ACTIVE_STAGE_ID} />
          </Card>

          <Card className={styles.block}>
            <h2 className={styles.blockTitle}>Моя активность</h2>
            <p className={styles.pointsValue}>{pointsFmt(ctx.points)} баллов</p>
            <ul className={styles.activityList}>
              {ctx.activity.slice(0, 6).map((a) => (
                <li key={a.id}>
                  <span className={styles.delta}>+{a.delta}</span>
                  <span>{a.label}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {tab === 'projects' && (
        <div className={styles.stack}>
          <div className={styles.rowBetween}>
            <h2 className={styles.sectionTitle}>Проекты выпускников</h2>
            <PrimaryButton onClick={() => setCreateOpen(true)}>+ Создать проект</PrimaryButton>
          </div>

          <Card className={styles.block}>
            <h3 className={styles.blockTitle}>Проекты недели</h3>
            <ol className={styles.topList}>
              {ctx.weeklyTop.map((p, i) => (
                <li key={p.id}>
                  <button type="button" onClick={() => openProject(p.id)}>
                    <span className={styles.rank}>{i + 1}</span>
                    <span>{p.title}</span>
                    <span className={styles.muted}>
                      {p.reactions} · {p.discussions} · {p.suggestions}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className={styles.tiny}>
              Рейтинг: поддержка, обсуждения и полезные рекомендации.
            </p>
          </Card>

          <div className={styles.projectGrid}>
            {ctx.projects.map((p) => (
              <article key={p.id} className={styles.projectCard}>
                <Cover hue={p.coverHue} title={p.title} />
                <div className={styles.projectBody}>
                  <div className={styles.authorRow}>
                    <Avatar letter={p.authorAvatar} />
                    <div>
                      <strong>{p.title}</strong>
                      <p className={styles.muted}>
                        {p.author} · {p.region}
                      </p>
                    </div>
                  </div>
                  <p className={styles.descClamp}>{p.shortDescription}</p>
                  <div className={styles.metaRow}>
                    <span className={styles.chip}>{p.stage}</span>
                    <span className={styles.muted}>
                      {p.reactions} реакций · {p.discussions} обс. · команда {p.teamSize}
                    </span>
                  </div>
                  <div className={styles.rowBtns}>
                    <PrimaryButton onClick={() => openProject(p.id)}>Подробнее</PrimaryButton>
                    <button
                      type="button"
                      className={`${styles.supportBtn} ${p.reacted ? styles.reacted : ''}`.trim()}
                      onClick={() => ctx.toggleSupport(p.id)}
                    >
                      {p.reacted ? 'Поддержано' : 'Поддержать'}
                    </button>
                    <PrimaryButton variant="ghost" onClick={() => openProject(p.id)}>
                      Обсудить
                    </PrimaryButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {tab === 'learning' && (
        <div className={styles.stack}>
          <h2 className={styles.sectionTitle}>Микро-курсы</h2>
          <div className={styles.courseGrid}>
            {ctx.courses.map((c) => (
              <article key={c.id} className={styles.courseCard}>
                <Cover hue={c.coverHue} title={c.title} />
                <div className={styles.projectBody}>
                  <h3 className={styles.courseName}>{c.title}</h3>
                  <p className={styles.muted}>
                    {c.lessonsCount} уроков · {c.minutes} минут
                  </p>
                  <div className={styles.progressRow}>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className={styles.progressPct}>{Math.round(c.progress)}%</span>
                  </div>
                  <PrimaryButton
                    onClick={() => {
                      setCourseId(c.id);
                      setLessonIndex(0);
                    }}
                  >
                    {c.progress > 0 ? 'Продолжить' : 'Начать'}
                  </PrimaryButton>
                  {c.completed && c.applyCta && !c.applied && (
                    <div className={styles.applyBox}>
                      <p>Примени результат к своему проекту</p>
                      <PrimaryButton onClick={() => ctx.applyCourseToProject(c.id)}>
                        {c.applyCta}
                      </PrimaryButton>
                    </div>
                  )}
                  {c.applied && <p className={styles.muted}>Результат применён к LocalAI</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {tab === 'opportunities' && (
        <div className={styles.stack}>
          <h2 className={styles.sectionTitle}>Возможности для тебя</h2>
          <div className={styles.oppGrid}>
            {ctx.opportunities.map((o) => (
              <Card key={o.id} className={styles.block}>
                {o.isExample && <span className={styles.exampleTag}>Пример возможности</span>}
                <p className={styles.chip}>{o.type}</p>
                <h3 className={styles.courseName}>{o.title}</h3>
                <p className={styles.muted}>Организатор: {o.organizer}</p>
                <p className={styles.muted}>
                  {o.format} · {o.deadline}
                </p>
                <p className={styles.muted}>Для кого: {o.audience}</p>
                <p className={styles.descClamp}>{o.description}</p>
                <div className={styles.rowBtns}>
                  <PrimaryButton onClick={() => setOppDetailId(o.id)}>Подробнее</PrimaryButton>
                  <PrimaryButton variant="ghost" onClick={() => ctx.saveOpportunity(o.id)}>
                    {o.saved ? 'Сохранено' : 'Сохранить'}
                  </PrimaryButton>
                </div>
              </Card>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Внутренние конкурсы БП 365</h2>
          <div className={styles.oppGrid}>
            {ctx.contests.map((c) => (
              <Card key={c.id} className={styles.block}>
                <h3 className={styles.courseName}>{c.title}</h3>
                <p className={styles.muted}>{c.description}</p>
                <PrimaryButton
                  disabled={c.joined}
                  onClick={() => ctx.joinContest(c.id)}
                >
                  {c.joined ? 'Ты участвуешь' : 'Участвовать'}
                </PrimaryButton>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === 'community' && (
        <div className={styles.stack}>
          <h2 className={styles.sectionTitle}>Сообщество предпринимателей БП</h2>
          <p className={styles.muted}>Выпускники · авторы проектов · поиск команды · будущие наставники</p>

          <div className={styles.peopleGrid}>
            {ctx.community.map((person) => (
              <Card key={person.id} className={styles.personCard} padding="md">
                <div className={styles.authorRow}>
                  <Avatar letter={person.name.slice(0, 1)} hue={person.avatarHue} />
                  <div>
                    <strong>{person.name}</strong>
                    <p className={styles.muted}>
                      {person.region} · {person.role}
                    </p>
                  </div>
                </div>
                <p className={styles.muted}>Навыки: {person.skills.join(', ')}</p>
                <p className={styles.muted}>Интересы: {person.interests.join(', ')}</p>
                {person.lookingForProject && (
                  <span className={styles.chip}>Ищет проект</span>
                )}
              </Card>
            ))}
          </div>

          <Card className={styles.block}>
            <h3 className={styles.blockTitle}>Участники, которые ищут проекты</h3>
            <div className={styles.peopleGrid}>
              {ctx.community
                .filter((p) => p.lookingForProject)
                .map((person) => (
                  <div key={`lf-${person.id}`} className={styles.seekCard}>
                    <Avatar letter={person.name.slice(0, 1)} hue={person.avatarHue} />
                    <div>
                      <strong>{person.name}</strong>
                      <p className={styles.muted}>
                        {person.region} · {person.skills.join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          <Card className={styles.block}>
            <h3 className={styles.blockTitle}>Расскажи о себе</h3>
            <p className={styles.muted}>Поделись своим путём после финала Большой перемены</p>
            {ctx.interview ? (
              <div className={styles.story}>
                <h4>Моя история</h4>
                <p>
                  <strong>Как пришёл:</strong> {ctx.interview.howCame}
                </p>
                <p>
                  <strong>Горжусь:</strong> {ctx.interview.proud}
                </p>
                <p>
                  <strong>Опыт финала:</strong> {ctx.interview.finalExperience}
                </p>
                <p>
                  <strong>Хочу создать:</strong> {ctx.interview.createNext}
                </p>
                <p>
                  <strong>Сильные стороны:</strong> {ctx.interview.strengths}
                </p>
                <p>
                  <strong>Нужна помощь:</strong> {ctx.interview.needHelp}
                </p>
                <p>
                  <strong>Могу помочь:</strong> {ctx.interview.canHelp}
                </p>
              </div>
            ) : (
              <PrimaryButton onClick={() => setInterviewOpen(true)}>Пройти интервью</PrimaryButton>
            )}
          </Card>

          <Card className={styles.block}>
            <h3 className={styles.blockTitle}>Секреты успеха</h3>
            <p className={styles.muted}>Передай свой опыт будущим финалистам</p>
            <PrimaryButton onClick={() => setSecretOpen(true)}>Опубликовать секрет</PrimaryButton>
            <div className={styles.secretList}>
              {ctx.secrets.map((s) => (
                <article key={s.id} className={styles.secretCard}>
                  <p className={styles.muted}>{s.author}</p>
                  <ul>
                    {s.tips.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className={styles.rowBtns}>
                    <button
                      type="button"
                      className={`${styles.supportBtn} ${s.supported ? styles.reacted : ''}`.trim()}
                      onClick={() => ctx.toggleSecretSupport(s.id)}
                    >
                      {s.supported ? 'Поддержано' : 'Поддержать'} ({s.supports})
                    </button>
                    <PrimaryButton variant="ghost" onClick={() => ctx.toggleSecretSave(s.id)}>
                      {s.saved ? 'Сохранено' : 'Сохранить'}
                    </PrimaryButton>
                  </div>
                  <div className={styles.commentBox}>
                    <input
                      className={styles.input}
                      placeholder="Прокомментировать..."
                      value={secretComment[s.id] ?? ''}
                      onChange={(e) =>
                        setSecretComment((prev) => ({ ...prev, [s.id]: e.target.value }))
                      }
                    />
                    <PrimaryButton
                      onClick={() => {
                        ctx.commentSecret(s.id, secretComment[s.id] ?? '');
                        setSecretComment((prev) => ({ ...prev, [s.id]: '' }));
                      }}
                    >
                      Отправить
                    </PrimaryButton>
                  </div>
                  {s.comments.map((c) => (
                    <p key={c.id} className={styles.commentLine}>
                      <strong>{c.author}:</strong> {c.text}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </Card>

          <Card className={styles.block}>
            <h3 className={styles.blockTitle}>Передай опыт дальше</h3>
            <p className={styles.muted}>
              Ты уже развиваешь собственный проект. Помоги тем, кто только начинает.
            </p>
            <ul className={styles.mentorList}>
              {ctx.mentorTasks.map((t) => (
                <li key={t.id}>
                  <span>{t.title}</span>
                  <PrimaryButton
                    disabled={t.done}
                    onClick={() => ctx.completeMentorTask(t.id)}
                  >
                    {t.done ? 'Выполнено' : `Выполнить · +${t.points}`}
                  </PrimaryButton>
                </li>
              ))}
            </ul>
          </Card>

          <Card className={styles.block}>
            <h3 className={styles.blockTitle}>Продолжить общение</h3>
            <div className={styles.rowBtns}>
              <a className={styles.socialLink} href="#" onClick={(e) => e.preventDefault()}>
                VK
              </a>
              <a className={styles.socialLink} href="#" onClick={(e) => e.preventDefault()}>
                Telegram
              </a>
            </div>
            <p className={styles.tiny}>Ссылки-демо для макета, без заявленной интеграции.</p>
          </Card>
        </div>
      )}

      {/* Project detail */}
      <BP365Modal
        open={Boolean(detail)}
        title={detail?.title ?? 'Проект'}
        onClose={() => setDetailId(null)}
        wide
      >
        {detail && (
          <div className={styles.detail}>
            <div className={styles.authorRow}>
              <Avatar letter={detail.authorAvatar} />
              <div>
                <p>
                  {detail.author} · {detail.region}
                </p>
                <p className={styles.muted}>
                  {detail.category} · {detail.stage} · команда {detail.teamSize}
                </p>
              </div>
            </div>
            <p>
              <strong>Проблема:</strong> {detail.problem}
            </p>
            <p>
              <strong>Решение:</strong> {detail.solution}
            </p>
            <p>
              <strong>Целевая аудитория:</strong> {detail.audience}
            </p>
            <div>
              <strong>Что уже сделано</strong>
              <ul>
                {detail.done.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Что требуется</strong>
              <ul>
                {detail.needs.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className={styles.reactionRow}>
              {REACTIONS.map((kind) => (
                <button
                  key={kind}
                  type="button"
                  className={`${styles.supportBtn} ${
                    detail.reacted && detail.reactionKind === kind ? styles.reacted : ''
                  }`.trim()}
                  onClick={() => ctx.toggleSupport(detail.id, kind)}
                >
                  {kind}
                </button>
              ))}
              <span className={styles.muted}>{detail.reactions} реакций</span>
            </div>

            <section>
              <h4>История развития</h4>
              <ol className={styles.timeline}>
                {detail.timeline.map((t) => (
                  <li key={t.id}>
                    <span className={styles.timelineDate}>{t.date}</span>
                    <div>
                      <strong>{t.title}</strong>
                      {t.result && <p className={styles.muted}>Результат: {t.result}</p>}
                      {t.next && <p className={styles.muted}>Дальше: {t.next}</p>}
                      {t.photoLabel && <p className={styles.tiny}>{t.photoLabel}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h4>Помоги улучшить проект</h4>
              <form className={styles.form} onSubmit={onFeedback}>
                <label>
                  Что уже хорошо?
                  <textarea
                    className={styles.textarea}
                    value={fbForm.good}
                    onChange={(e) => setFbForm((f) => ({ ...f, good: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  Что стоит улучшить?
                  <textarea
                    className={styles.textarea}
                    value={fbForm.improve}
                    onChange={(e) => setFbForm((f) => ({ ...f, improve: e.target.value }))}
                  />
                </label>
                <label>
                  Какую идею ты бы предложил?
                  <textarea
                    className={styles.textarea}
                    value={fbForm.idea}
                    onChange={(e) => setFbForm((f) => ({ ...f, idea: e.target.value }))}
                  />
                </label>
                <PrimaryButton type="submit">Отправить обратную связь</PrimaryButton>
              </form>
              {detail.feedbacks.length > 0 && (
                <ul className={styles.feedbackList}>
                  {detail.feedbacks.map((f) => (
                    <li key={f.id}>
                      <strong>{f.author}</strong>
                      <p>Хорошо: {f.good}</p>
                      {f.improve && <p>Улучшить: {f.improve}</p>}
                      {f.idea && <p>Идея: {f.idea}</p>}
                    </li>
                  ))}
                </ul>
              )}
              <p className={styles.tiny}>Рекомендаций: {detail.suggestions}</p>
            </section>

            <section>
              <h4>Обсуждения</h4>
              {detail.comments.map((c) => (
                <p key={c.id} className={styles.commentLine}>
                  <strong>{c.author}:</strong> {c.text}
                </p>
              ))}
              <div className={styles.commentBox}>
                <input
                  className={styles.input}
                  placeholder="Написать комментарий..."
                  value={commentDraft}
                  onChange={(e) => setCommentDraft(e.target.value)}
                />
                <PrimaryButton
                  onClick={() => {
                    ctx.addComment(detail.id, commentDraft);
                    setCommentDraft('');
                  }}
                >
                  Отправить
                </PrimaryButton>
              </div>
            </section>

            {detail.openRoles.length > 0 && (
              <section>
                <h4>Ищу в команду</h4>
                <ul className={styles.roles}>
                  {detail.openRoles.map((r) => (
                    <li key={r.id}>
                      <span>{r.role}</span>
                      <PrimaryButton
                        disabled={r.applied}
                        onClick={() => ctx.applyToRole(detail.id, r.id)}
                      >
                        {r.applied ? 'Отклик отправлен' : 'Откликнуться'}
                      </PrimaryButton>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {detail.isMine && (
              <PrimaryButton onClick={() => setUpdateOpen(true)}>
                Опубликовать обновление
              </PrimaryButton>
            )}
          </div>
        )}
      </BP365Modal>

      {/* Create project */}
      <BP365Modal open={createOpen} title="Создать проект" onClose={() => setCreateOpen(false)}>
        <form className={styles.form} onSubmit={onCreate}>
          <label>
            Название
            <input
              className={styles.input}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </label>
          <label>
            Короткое описание
            <input
              className={styles.input}
              value={form.shortDescription}
              onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
            />
          </label>
          <label>
            Проблема
            <textarea
              className={styles.textarea}
              value={form.problem}
              onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))}
            />
          </label>
          <label>
            Решение
            <textarea
              className={styles.textarea}
              value={form.solution}
              onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))}
            />
          </label>
          <label>
            Целевая аудитория
            <input
              className={styles.input}
              value={form.audience}
              onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))}
            />
          </label>
          <label>
            Стадия
            <select
              className={styles.input}
              value={form.stage}
              onChange={(e) =>
                setForm((f) => ({ ...f, stage: e.target.value as ProjectStage }))
              }
            >
              {STAGE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            Направление
            <input
              className={styles.input}
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            />
          </label>
          <div className={styles.uploadMock}>
            <span>Обложка — mock upload</span>
            <PrimaryButton type="button" variant="ghost">
              Выбрать файл
            </PrimaryButton>
          </div>
          <PrimaryButton type="submit" fullWidth>
            Опубликовать проект
          </PrimaryButton>
        </form>
      </BP365Modal>

      {/* Publish update */}
      <BP365Modal
        open={updateOpen}
        title="Опубликовать обновление"
        onClose={() => setUpdateOpen(false)}
      >
        <form className={styles.form} onSubmit={onUpdate}>
          <label>
            Что изменилось?
            <textarea
              className={styles.textarea}
              value={updateForm.changed}
              onChange={(e) => setUpdateForm((f) => ({ ...f, changed: e.target.value }))}
              required
              placeholder="Сегодня провели первые 10 интервью..."
            />
          </label>
          <label>
            Какой результат получен?
            <textarea
              className={styles.textarea}
              value={updateForm.result}
              onChange={(e) => setUpdateForm((f) => ({ ...f, result: e.target.value }))}
            />
          </label>
          <label>
            Что планируется дальше?
            <textarea
              className={styles.textarea}
              value={updateForm.next}
              onChange={(e) => setUpdateForm((f) => ({ ...f, next: e.target.value }))}
            />
          </label>
          <div className={styles.uploadMock}>
            <span>Фото — mock</span>
            <PrimaryButton type="button" variant="ghost">
              Прикрепить
            </PrimaryButton>
          </div>
          <PrimaryButton type="submit" fullWidth>
            Опубликовать
          </PrimaryButton>
        </form>
      </BP365Modal>

      {/* Course viewer */}
      <BP365Modal
        open={Boolean(activeCourse)}
        title={activeCourse?.title ?? 'Курс'}
        onClose={() => setCourseId(null)}
        wide
      >
        {activeCourse && (
          <div className={styles.courseViewer}>
            <p className={styles.muted}>
              Урок {lessonIndex + 1} из {activeCourse.lessons.length}
            </p>
            <h3>{activeCourse.lessons[lessonIndex]?.title}</h3>
            <p className={styles.lead}>
              Краткий материал урока (demo): разбери идею, зафиксируй выводы и примени к своему
              проекту.
            </p>
            <div className={styles.progressRow}>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${activeCourse.progress}%` }}
                />
              </div>
              <span className={styles.progressPct}>{Math.round(activeCourse.progress)}%</span>
            </div>
            <div className={styles.rowBtns}>
              <PrimaryButton
                variant="ghost"
                disabled={lessonIndex === 0}
                onClick={() => setLessonIndex((i) => Math.max(0, i - 1))}
              >
                Назад
              </PrimaryButton>
              <PrimaryButton
                variant="ghost"
                disabled={lessonIndex >= activeCourse.lessons.length - 1}
                onClick={() =>
                  setLessonIndex((i) => Math.min(activeCourse.lessons.length - 1, i + 1))
                }
              >
                Следующий
              </PrimaryButton>
              <PrimaryButton
                onClick={() => {
                  ctx.completeLesson(activeCourse.id);
                  if (lessonIndex < activeCourse.lessons.length - 1) {
                    setLessonIndex((i) => i + 1);
                  }
                }}
              >
                Завершить урок
              </PrimaryButton>
            </div>
            {activeCourse.completed && activeCourse.applyCta && !activeCourse.applied && (
              <div className={styles.applyBox}>
                <p>Примени результат к своему проекту</p>
                <PrimaryButton onClick={() => ctx.applyCourseToProject(activeCourse.id)}>
                  {activeCourse.applyCta}
                </PrimaryButton>
              </div>
            )}
          </div>
        )}
      </BP365Modal>

      {/* Opportunity detail */}
      <BP365Modal
        open={Boolean(oppDetail)}
        title={oppDetail?.title ?? 'Возможность'}
        onClose={() => setOppDetailId(null)}
      >
        {oppDetail && (
          <div className={styles.detail}>
            <span className={styles.exampleTag}>Пример возможности</span>
            <p>{oppDetail.description}</p>
            <p className={styles.muted}>{oppDetail.organizer}</p>
            <p className={styles.muted}>
              {oppDetail.format} · {oppDetail.deadline}
            </p>
            <p className={styles.muted}>Для кого: {oppDetail.audience}</p>
            <PrimaryButton onClick={() => ctx.saveOpportunity(oppDetail.id)}>
              {oppDetail.saved ? 'Сохранено' : 'Сохранить'}
            </PrimaryButton>
          </div>
        )}
      </BP365Modal>

      {/* Rewards */}
      <BP365Modal open={rewardsOpen} title="Награды" onClose={() => setRewardsOpen(false)}>
        <div className={styles.detail}>
          <p>Баллы активности могут использоваться в системе наград БП 365</p>
          <p className={styles.pointsValue}>{pointsFmt(ctx.points)} баллов</p>
          <ul>
            <li>Мерч</li>
            <li>Специальные награды</li>
            <li>Доступ к событиям</li>
          </ul>
          <p className={styles.tiny}>Полноценный магазин в макете не реализован.</p>
        </div>
      </BP365Modal>

      {/* Interview */}
      <BP365Modal
        open={interviewOpen}
        title="Расскажи о себе"
        onClose={() => setInterviewOpen(false)}
        wide
      >
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            ctx.saveInterview(interviewForm);
            setInterviewOpen(false);
          }}
        >
          {(
            [
              ['howCame', 'Как ты пришёл в Большую перемену?'],
              ['proud', 'Чем ты гордишься?'],
              ['finalExperience', 'Какой опыт дал тебе финал?'],
              ['createNext', 'Что ты хочешь создать дальше?'],
              ['strengths', 'Какие у тебя сильные стороны?'],
              ['needHelp', 'В чём тебе нужна помощь?'],
              ['canHelp', 'Чем ты можешь помочь другим?'],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              {label}
              <textarea
                className={styles.textarea}
                required
                value={interviewForm[key]}
                onChange={(e) =>
                  setInterviewForm((f) => ({ ...f, [key]: e.target.value }))
                }
              />
            </label>
          ))}
          <PrimaryButton type="submit" fullWidth>
            Завершить интервью
          </PrimaryButton>
        </form>
      </BP365Modal>

      {/* Success secret */}
      <BP365Modal
        open={secretOpen}
        title="Секреты успеха"
        onClose={() => setSecretOpen(false)}
      >
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            ctx.publishSecret([
              secretForm.helped,
              secretForm.mistake,
              secretForm.differently,
              secretForm.advice,
            ].filter(Boolean));
            setSecretOpen(false);
            setSecretForm({ helped: '', mistake: '', differently: '', advice: '' });
          }}
        >
          <label>
            Что помогло тебе дойти до финала?
            <textarea
              className={styles.textarea}
              required
              value={secretForm.helped}
              onChange={(e) => setSecretForm((f) => ({ ...f, helped: e.target.value }))}
            />
          </label>
          <label>
            Какая ошибка научила тебя больше всего?
            <textarea
              className={styles.textarea}
              value={secretForm.mistake}
              onChange={(e) => setSecretForm((f) => ({ ...f, mistake: e.target.value }))}
            />
          </label>
          <label>
            Что ты сделал бы иначе?
            <textarea
              className={styles.textarea}
              value={secretForm.differently}
              onChange={(e) => setSecretForm((f) => ({ ...f, differently: e.target.value }))}
            />
          </label>
          <label>
            Какой один совет ты дал бы будущему участнику?
            <textarea
              className={styles.textarea}
              required
              value={secretForm.advice}
              onChange={(e) => setSecretForm((f) => ({ ...f, advice: e.target.value }))}
            />
          </label>
          <PrimaryButton type="submit" fullWidth>
            Опубликовать
          </PrimaryButton>
        </form>
      </BP365Modal>

      <BP365Toast message={ctx.toast} onClose={ctx.clearToast} />
    </div>
  );
}

function ProjectSummary({
  project,
  onOpen,
  onEdit,
  onUpdate,
}: {
  project: Project;
  onOpen: () => void;
  onEdit: () => void;
  onUpdate: () => void;
}) {
  return (
    <div className={styles.summary}>
      <p>
        <strong>{project.title}</strong> · {project.author} · {project.category}
      </p>
      <p className={styles.chip}>{project.stage}</p>
      <p>
        <strong>Проблема:</strong> {project.problem}
      </p>
      <p>
        <strong>Решение:</strong> {project.solution}
      </p>
      <p>
        <strong>Аудитория:</strong> {project.audience}
      </p>
      <p className={styles.muted}>Команда: {project.teamSize} человека</p>
      <p className={styles.muted}>
        {project.views} просмотров · {project.reactions} реакций · {project.discussions} обсуждений ·{' '}
        {project.suggestions} предложений
      </p>
      <div className={styles.rowBtns}>
        <PrimaryButton onClick={onOpen}>Открыть проект</PrimaryButton>
        <PrimaryButton variant="ghost" onClick={onEdit}>
          Редактировать
        </PrimaryButton>
        <PrimaryButton variant="ghost" onClick={onUpdate}>
          Опубликовать обновление
        </PrimaryButton>
      </div>
    </div>
  );
}
