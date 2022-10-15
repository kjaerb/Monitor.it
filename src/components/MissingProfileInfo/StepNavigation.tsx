import { useCreateProfile } from "@/hooks/useProfile";
import { useStepStore } from "stores/useStepStore";
import Button from "../ui/Button/Button";

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

  return (
    <div className='mt-4 flex justify-end'>
      {back && (
        <Button onClick={decStep} className='mx-2' variant='light'>
          Back
        </Button>
      )}
      {finished ? (
        <Button
          onClick={() => {
            if (!name || !role || !sport) {
              return null;
            } else {
              createProfile({ role, sport, figLicense: athlete?.gymnastId });
              setModalClose(false);
            }
          }}>
          Finish
        </Button> //Handle mutation
      ) : (
        <Button
          onClick={() => {
            if (!onClick) {
              incStep();
            } else {
              onClick();
            }
          }}>
          Next
        </Button>
      )}
    </div>
  );
}

export default StepNavigation;
