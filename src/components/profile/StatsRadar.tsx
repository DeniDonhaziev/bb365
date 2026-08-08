import { PROFILE_STATS, STAT_SCALE_MAX, type StatDef } from '../../data/mockStats';
import styles from './StatsRadar.module.css';

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function formatValue(v: number): string {
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(2).replace('.', ',');
}

function StatIcon({ icon, color }: { icon: StatDef['icon']; color: string }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
  };
  if (icon === 'bolt') {
    return (
      <svg {...common}>
        <path fill={color} d="M13 2 6 13h5l-1 9 8-12h-5V2Z" />
      </svg>
    );
  }
  if (icon === 'star') {
    return (
      <svg {...common}>
        <path fill={color} d="M12 2.2 18.8 9 12 21.8 5.2 9 12 2.2Z" />
        <path fill="#fff" opacity="0.3" d="M12 2.2 9 9h6L12 2.2Z" />
      </svg>
    );
  }
  if (icon === 'spirit') {
    return (
      <svg {...common}>
        <path
          fill={color}
          d="M12 19c-2.8-1.8-4.8-4.2-4.8-6.8 0-2 1.6-3.3 4.8-5 3.2 1.7 4.8 3 4.8 5 0 2.6-2 5-4.8 6.8Z"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        fill={color}
        d="M9.2 10V7.4c0-.9.7-1.6 1.6-1.6.3 0 .6.1.8.3.3-.7 1-1.2 1.8-1.2.9 0 1.7.7 1.7 1.7v1c.3-.1.5-.2.9-.2.8 0 1.5.7 1.5 1.5v5.2A3.9 3.9 0 0 1 13.4 18h-1.1A4.1 4.1 0 0 1 8.2 13.9v-1.2c0-1 .6-1.9 1.5-2.4.2 0 .4-.1.5-.3Z"
      />
    </svg>
  );
}

/**
 * Layout from product mockup:
 *   labels at 4 corners, value bubbles fixed on diamond ring, never stacked at center.
 */
export function StatsRadar() {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2 + 2;
  const R = 82;
  const bubbleR = 16;

  const hexPoints = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const p = polar(cx, cy, r, i * 60);
      return `${p.x},${p.y}`;
    }).join(' ');

  // clockwise for clean fill
  const ordered = [...PROFILE_STATS].sort((a, b) => a.angle - b.angle);

  const dataPoly = ordered
    .map((s) => {
      const t = Math.min(s.value, STAT_SCALE_MAX) / STAT_SCALE_MAX;
      // Map value to ring fraction; force min so polygon stays readable
      const r = R * (0.38 + t * 0.62);
      const p = polar(cx, cy, r, s.angle);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  // Fixed bubble positions on the outer ring (NOT scaled by value)
  const nodes = PROFILE_STATS.map((s) => ({
    ...s,
    tip: polar(cx, cy, R, s.angle),
  }));

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className={styles.wrap}>
      {/* Corner labels — HTML for reliable non-overlap */}
      <div className={`${styles.corner} ${styles.tl}`}>
        <span className={styles.iconRow}>
          <StatIcon icon={byId.endurance.icon} color={byId.endurance.color} />
          <span>{byId.endurance.label}</span>
        </span>
      </div>
      <div className={`${styles.corner} ${styles.tr}`}>
        <span className={styles.iconRow}>
          <span>{byId.charisma.label}</span>
          <StatIcon icon={byId.charisma.icon} color={byId.charisma.color} />
        </span>
      </div>
      <div className={`${styles.corner} ${styles.bl}`}>
        <span className={styles.iconRow}>
          <StatIcon icon={byId.spirit.icon} color={byId.spirit.color} />
          <span>{byId.spirit.label}</span>
        </span>
      </div>
      <div className={`${styles.corner} ${styles.br}`}>
        <span className={styles.iconRow}>
          <span>{byId.strength.label}</span>
          <StatIcon icon={byId.strength.icon} color={byId.strength.color} />
        </span>
      </div>

      <svg className={styles.svg} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Характеристики">
        <defs>
          <radialGradient id="radarBoard" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="rgba(120, 70, 200, 0.55)" />
            <stop offset="55%" stopColor="rgba(70, 35, 145, 0.75)" />
            <stop offset="100%" stopColor="rgba(42, 18, 95, 0.9)" />
          </radialGradient>
          <radialGradient id="radarCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 200, 120, 0.55)" />
            <stop offset="40%" stopColor="rgba(180, 100, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        <polygon
          points={hexPoints(R)}
          fill="url(#radarBoard)"
          stroke="rgba(200,170,255,0.35)"
          strokeWidth="1.4"
        />
        <polygon
          points={hexPoints(R * 0.7)}
          fill="none"
          stroke="rgba(190,160,245,0.2)"
          strokeWidth="1"
        />
        <polygon
          points={hexPoints(R * 0.42)}
          fill="none"
          stroke="rgba(190,160,245,0.16)"
          strokeWidth="1"
        />

        {Array.from({ length: 6 }, (_, i) => {
          const tip = polar(cx, cy, R, i * 60);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={tip.x}
              y2={tip.y}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={dataPoly}
          fill="rgba(150, 90, 230, 0.42)"
          stroke="rgba(215, 180, 255, 0.65)"
          strokeWidth="1.6"
        />

        <circle cx={cx} cy={cy} r={22} fill="url(#radarCenter)" />
        <circle cx={cx} cy={cy} r={2.8} fill="#f5ebff" />

        {nodes.map((s) => (
          <g key={s.id}>
            <circle
              cx={s.tip.x}
              cy={s.tip.y}
              r={bubbleR + 2}
              fill="none"
              stroke={s.color}
              strokeOpacity={0.5}
              strokeWidth={2}
            />
            <circle
              cx={s.tip.x}
              cy={s.tip.y}
              r={bubbleR}
              fill="rgba(28, 12, 62, 0.96)"
              stroke={s.color}
              strokeWidth={1.6}
            />
            <text
              x={s.tip.x}
              y={s.tip.y}
              textAnchor="middle"
              dominantBaseline="central"
              className={styles.valueText}
            >
              {formatValue(s.value)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
