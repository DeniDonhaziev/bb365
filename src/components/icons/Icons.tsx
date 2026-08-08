import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(props: IconProps) {
  const { size = 24, ...rest } = props;
  return { width: size, height: size, ...rest };
}

export function IconBolt(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...base(props)}>
      <path d="M13.2 2.1 4.8 13.4c-.35.47-.02 1.15.56 1.15H11l-1.3 7.2c-.12.68.72 1.1 1.18.58l9.3-11.4c.34-.42.04-1.05-.52-1.05H13.9l1.35-7.2c.13-.68-.73-1.1-1.05-.58Z" />
    </svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...base(props)}>
      <path d="M12 2.5c.35 0 .67.2.82.52l2.12 4.7 5.12.53c.78.08 1.1 1.03.5 1.55l-3.85 3.4 1.12 5c.17.76-.66 1.35-1.33.95L12 16.7l-4.5 2.45c-.67.4-1.5-.19-1.33-.95l1.12-5-3.85-3.4c-.6-.52-.28-1.47.5-1.55l5.12-.53 2.12-4.7c.15-.32.47-.52.82-.52Z" />
    </svg>
  );
}

export function IconGear(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...base(props)}>
      <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm8.2 3.2-1.55-.3a6.8 6.8 0 0 0-.64-1.55l.95-1.27a.9.9 0 0 0-.06-1.15l-1.45-1.45a.9.9 0 0 0-1.15-.06l-1.27.95a6.8 6.8 0 0 0-1.55-.64l-.3-1.55A.9.9 0 0 0 12.3 3h-2.05a.9.9 0 0 0-.88.72l-.3 1.55c-.54.16-1.06.37-1.55.64l-1.27-.95a.9.9 0 0 0-1.15.06L3.65 6.47a.9.9 0 0 0-.06 1.15l.95 1.27c-.27.49-.48 1.01-.64 1.55l-1.55.3a.9.9 0 0 0-.72.88v2.05c0 .43.3.8.72.88l1.55.3c.16.54.37 1.06.64 1.55l-.95 1.27a.9.9 0 0 0 .06 1.15l1.45 1.45c.3.3.78.34 1.15.06l1.27-.95c.49.27 1.01.48 1.55.64l.3 1.55c.08.42.45.72.88.72h2.05c.43 0 .8-.3.88-.72l.3-1.55c.54-.16 1.06-.37 1.55-.64l1.27.95c.37.28.85.24 1.15-.06l1.45-1.45a.9.9 0 0 0 .06-1.15l-.95-1.27c.27-.49.48-1.01.64-1.55l1.55-.3a.9.9 0 0 0 .72-.88v-2.05a.9.9 0 0 0-.72-.88Z" />
    </svg>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...base(props)}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

export function IconBell(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...base(props)}>
      <path d="M12 2.5a6 6 0 0 0-6 6v2.3c0 .7-.2 1.4-.55 2L4.2 15.2a1.2 1.2 0 0 0 1 1.9h13.6a1.2 1.2 0 0 0 1-1.9l-1.25-2.4c-.35-.6-.55-1.3-.55-2V8.5a6 6 0 0 0-6-6Zm0 19a2.8 2.8 0 0 0 2.7-2.1H9.3A2.8 2.8 0 0 0 12 21.5Z" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...base(props)}>
      <path d="M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Zm0 1.8c-3.7 0-8 1.85-8 4.5v.9c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-.9c0-2.65-4.3-4.5-8-4.5Z" />
    </svg>
  );
}

export function IconCoin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base(props)}>
      <circle cx="12" cy="12" r="10" fill="#E8A800" />
      <circle cx="12" cy="12" r="8.2" fill="#FFD54A" />
      <circle cx="12" cy="12" r="6.4" fill="none" stroke="#F0B820" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3.2" fill="#F7C93A" stroke="#C98A00" strokeWidth="1" />
    </svg>
  );
}

export function IconCrystal(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base(props)}>
      <path d="M12 2.2 4.5 9.5 12 21.8 19.5 9.5 12 2.2Z" fill="#E945D0" />
      <path d="M12 2.2 8 9.5h8L12 2.2Z" fill="#FF7AE8" />
      <path d="M8 9.5 12 21.8 4.5 9.5H8Z" fill="#C21BB0" />
      <path d="M16 9.5h3.5L12 21.8 16 9.5Z" fill="#D147FF" />
      <path d="M8 9.5h8L12 2.2 8 9.5Z" fill="#F26BE0" opacity="0.9" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** BP 365 path / journey mark */
export function IconPath(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...base(props)}>
      <path d="M6.5 19.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm11-10a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
      <path d="M8.4 15.4c1.3-2.2 3.1-3.8 5.6-5.1 2-.9 3.1-2 3.7-3.5l1.8.7c-.8 2-2.4 3.5-4.8 4.6-2.2 1.1-3.7 2.5-4.8 4.3l-1.5-1Z" />
      <circle cx="12" cy="12" r="1.4" />
    </svg>
  );
}
