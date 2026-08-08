import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../../components/layout/AppShell/AppShell';
import { routes } from '../../../data/mockNav';
import { EntrepreneurshipProvider } from './EntrepreneurshipContext';
import { EntrepreneurshipHub } from './EntrepreneurshipHub';

export function EntrepreneurshipPage() {
  const navigate = useNavigate();

  return (
    <AppShell showBack onBack={() => navigate(routes.bp365)}>
      <EntrepreneurshipProvider>
        <EntrepreneurshipHub />
      </EntrepreneurshipProvider>
    </AppShell>
  );
}
