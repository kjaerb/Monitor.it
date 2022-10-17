import { useStepStore } from 'stores/useStepStore';

import { useCreateProfile } from '@/hooks/useProfile';
import { useUpdateUserImage, useUser } from '@/hooks/useUser';

import Button from '@/components/ui/Button/Button';

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
  const { createProfile } = useCreateProfile();
  const { user } = useUser();
  const { updateUserImage } = useUpdateUserImage();

  return (
    <div className='mt-4 flex justify-end'>
      {back && (
        <Button onClick={decStep} className='mx-2' variant='light'>
          Back
        </Button>
      )}
      {finished ? (
        <Button onClick={() => handleOnSubmit()}>Finish</Button>
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
      if ((user?.image === undefined || user.image === null) && athlete) {
        updateUserImage({ imageURL: athlete?.figImgUrl });
      }
      setModalClose(false);
    }
  }
}

export default StepNavigation;
