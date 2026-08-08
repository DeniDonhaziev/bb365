import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell/AppShell';
import { EventsPage } from './pages/EventsPage/EventsPage';
import { SphereTasksPage } from './pages/SphereTasksPage/SphereTasksPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { RewardsPage } from './pages/RewardsPage/RewardsPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { BP365Page } from './features/bp365/pages/BP365Page';
import { EntrepreneurshipPage } from './features/bp365/entrepreneurship/EntrepreneurshipPage';
import { routes } from './data/mockNav';

function EventsRoute() {
  return (
    <AppShell>
      <EventsPage />
    </AppShell>
  );
}

function SphereRoute() {
  const navigate = useNavigate();

  return (
    <AppShell showBack onBack={() => navigate(routes.eventsTab('spheres'))}>
      <SphereTasksPage />
    </AppShell>
  );
}

function ProfileRoute() {
  const navigate = useNavigate();

  return (
    <AppShell showBack onBack={() => navigate(routes.eventsTab('spheres'))}>
      <ProfilePage />
    </AppShell>
  );
}

function RewardsRoute() {
  return (
    <AppShell hideNav hideTopBar>
      <RewardsPage />
    </AppShell>
  );
}

function BP365Route() {
  return (
    <AppShell>
      <BP365Page />
    </AppShell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={routes.eventsTab('spheres')} replace />} />
        <Route path="/events" element={<EventsRoute />} />
        <Route path="/spheres/:sphereId" element={<SphereRoute />} />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/rewards" element={<RewardsRoute />} />
        <Route path="/bp365" element={<BP365Route />} />
        <Route path="/bp365/directions/entrepreneurship" element={<EntrepreneurshipPage />} />
        <Route
          path="/achievements"
          element={
            <AppShell>
              <PlaceholderPage title="Достижения" />
            </AppShell>
          }
        />
        <Route
          path="/workshop"
          element={
            <AppShell>
              <PlaceholderPage title="Мастерская" />
            </AppShell>
          }
        />
        <Route
          path="/notifications"
          element={
            <AppShell>
              <PlaceholderPage title="Уведомления" />
            </AppShell>
          }
        />
        <Route path="*" element={<Navigate to={routes.eventsTab('spheres')} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
