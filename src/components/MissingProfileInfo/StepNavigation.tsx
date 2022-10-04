import { useStepStore } from "stores/useStepStore";
import Button from "../ui/Button/Button";

interface NavigationProps {
  back?: boolean;
  finished?: boolean;
  handleNext?: boolean;
}

function StepNavigation({
  back,
  finished = false,
  handleNext,
}: NavigationProps) {
  const { incStep, decStep } = useStepStore();

  return (
    <div className='mt-4 flex justify-end'>
      {back && (
        <Button onClick={decStep} className='mx-2' variant='light'>
          Back
        </Button>
      )}
      {finished ? (
        <Button>Finish</Button> //Handle mutation
      ) : (
        <Button
          onClick={() => {
            // if (handleNext) {
            incStep();
            // }
          }}>
          Next
        </Button>
      )}
    </div>
  );
}

export default StepNavigation;
