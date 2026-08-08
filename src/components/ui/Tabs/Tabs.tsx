import styles from './Tabs.module.css';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
}

interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
  'aria-label'?: string;
}

export function Tabs<T extends string = string>({
  items,
  value,
  onChange,
  className = '',
  'aria-label': ariaLabel = 'Вкладки',
}: TabsProps<T>) {
  return (
    <div
      className={`${styles.root} ${className}`.trim()}
      role="tablist"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`${styles.tab} ${active ? styles.active : ''}`.trim()}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
