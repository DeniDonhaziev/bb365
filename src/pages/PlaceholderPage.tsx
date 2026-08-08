import { SectionHeader } from '../components/ui/SectionHeader/SectionHeader';
import styles from './PlaceholderPage.module.css';

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className={styles.page}>
      <SectionHeader title={title} />
    </div>
  );
}
