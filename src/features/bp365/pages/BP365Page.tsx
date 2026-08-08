import { useCallback, useState } from 'react';
import { BP365Welcome } from '../components/BP365Welcome';
import { BP365DirectionSelection } from '../components/BP365DirectionSelection';
import { BP365OnboardingComplete } from '../components/BP365OnboardingComplete';
import { BP365Home } from '../components/BP365Home';
import { getDirectionById, type DirectionId } from '../data/directions';
import { loadBP365Profile, saveBP365Profile } from '../lib/bp365Storage';
import styles from './BP365Page.module.css';

type Step = 'welcome' | 'select' | 'complete' | 'home';

function initialStep(): { step: Step; direction: DirectionId | null } {
  const profile = loadBP365Profile();
  if (profile.onboardingCompleted && profile.primaryDirection) {
    return { step: 'home', direction: profile.primaryDirection };
  }
  return { step: 'welcome', direction: null };
}

export function BP365Page() {
  const init = initialStep();
  const [step, setStep] = useState<Step>(init.step);
  const [selectedId, setSelectedId] = useState<DirectionId | null>(init.direction);
  const [confirmedDirection, setConfirmedDirection] = useState<DirectionId | null>(init.direction);

  const onStart = useCallback(() => setStep('select'), []);

  const onConfirmDirection = useCallback(() => {
    if (!selectedId) return;
    saveBP365Profile({
      onboardingCompleted: true,
      primaryDirection: selectedId,
    });
    setConfirmedDirection(selectedId);
    setStep('complete');
  }, [selectedId]);

  const onGoHome = useCallback(() => setStep('home'), []);

  const direction = confirmedDirection ? getDirectionById(confirmedDirection) : undefined;

  return (
    <div className={styles.page}>
      {step === 'welcome' && <BP365Welcome onStart={onStart} />}
      {step === 'select' && (
        <BP365DirectionSelection
          selectedId={selectedId}
          onSelect={setSelectedId}
          onConfirm={onConfirmDirection}
        />
      )}
      {step === 'complete' && direction && (
        <BP365OnboardingComplete direction={direction} onContinue={onGoHome} />
      )}
      {step === 'home' && confirmedDirection && (
        <BP365Home primaryDirection={confirmedDirection} />
      )}
    </div>
  );
}
