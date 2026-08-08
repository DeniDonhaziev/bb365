import { Link } from 'react-router-dom';
import type { DemoSphere } from '../../data/mockDemo';
import { routes } from '../../data/mockNav';
import styles from './SphereCard.module.css';

import cultureImg from '../../assets/spheres/culture.png';
import businessImg from '../../assets/spheres/business.png';
import healthImg from '../../assets/spheres/health.png';
import volunteerImg from '../../assets/spheres/volunteer.png';
import patriotImg from '../../assets/spheres/patriot.png';
import scienceImg from '../../assets/spheres/science.png';

const sphereImages: Record<DemoSphere['icon'], string> = {
  culture: cultureImg,
  business: businessImg,
  health: healthImg,
  volunteer: volunteerImg,
  patriot: patriotImg,
  science: scienceImg,
};

/**
 * Pointy-top hex with mostly straight edges and lightly softened corners.
 * Side edges are vertical (classic hex read), not a rounded shield.
 * viewBox 0 0 200 220
 */
export const HEX_PATH =
  'M 100 6 ' +
  'L 174 48 ' +
  'Q 178 50 178 56 ' +
  'L 178 164 ' +
  'Q 178 170 174 172 ' +
  'L 100 214 ' +
  'Q 96 216 92 214 ' +
  'L 26 172 ' +
  'Q 22 170 22 164 ' +
  'L 22 56 ' +
  'Q 22 50 26 48 ' +
  'L 92 6 ' +
  'Q 96 4 100 6 Z';

interface SphereCardProps {
  sphere: DemoSphere;
  className?: string;
}

export function SphereCard({ sphere, className = '' }: SphereCardProps) {
  const img = sphereImages[sphere.icon];
  const fillId = `hex-fill-${sphere.id}`;
  const glowId = `hex-glow-${sphere.id}`;

  return (
    <Link
      to={routes.sphere(sphere.id)}
      className={`${styles.card} ${className}`.trim()}
      style={{ ['--sphere-accent' as string]: sphere.accent }}
      aria-label={`Сфера ${sphere.title}`}
    >
      <svg
        className={styles.shape}
        viewBox="0 0 200 220"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id={fillId} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#52309a" />
            <stop offset="42%" stopColor="#3a1a72" />
            <stop offset="100%" stopColor="#26104f" />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="40%" r="56%">
            <stop offset="0%" stopColor="rgba(160, 100, 235, 0.26)" />
            <stop offset="60%" stopColor="rgba(90, 45, 150, 0.08)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>
        <path d={HEX_PATH} fill={`url(#${fillId})`} />
        <path d={HEX_PATH} fill={`url(#${glowId})`} />
        <path
          d={HEX_PATH}
          fill="none"
          stroke="rgba(200, 175, 245, 0.34)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className={styles.content}>
        <h3 className={styles.title}>{sphere.title}</h3>
        <div className={styles.asset}>
          <img src={img} alt="" className={styles.image} draggable={false} />
        </div>
      </div>
    </Link>
  );
}
