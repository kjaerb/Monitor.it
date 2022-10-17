import { useStepStore } from 'stores/useStepStore';

import { useCreateProfile } from '@/hooks/useProfile';
import { useUpdateUserImage } from '@/hooks/useUser';

import Button from '@/components/ui/Button/Button';

import Loading from '../ui/Loading/Loading';

interface NavigationProps {
  back?: boolean;
  finished?: boolean;
  onClick?: () => void;
  setModalClose?: (arg: boolean) => void;
}

function StepNavigation({
  back,
  finished = false,
  onClick,
  setModalClose = () => null,
}: NavigationProps) {
  const { incStep, decStep, role, name, sport, athlete } = useStepStore();
  const { createProfile, isLoading, status } = useCreateProfile();
  const { updateUserImage } = useUpdateUserImage();

  return (
    <div className='mt-4 flex justify-end'>
      {back && (
        <Button onClick={decStep} className='mx-2' variant='light'>
          Back
        </Button>
      )}
      {finished ? (
        <Button disabled={isLoading} onClick={() => handleOnSubmit()}>
          {status === 'loading' ? <Loading /> : <>Finish</>}
        </Button>
      ) : (
        <Button onClick={() => handleNextStep()}>Next</Button>
      )}
    </div>
  );

  function handleNextStep() {
    if (!onClick) {
      incStep();
    } else {
      onClick();
    }
  }

  function handleOnSubmit() {
    if (!name || !role || !sport) {
      return null;
    } else {
      createProfile({ role, sport, figAthlete: athlete });
      if (athlete) {
        updateUserImage({ imageURL: athlete?.figImgUrl });
      }
      setModalClose(false);
    }
  }
}

export default StepNavigation;
