import AthleteInfo from './AthleteInfo';
import StepNavigation from './StepNavigation';

interface ProfileSummaryStepProps {
  setModalClose: (arg: boolean) => void;
}

function ProfileSummaryStep({ setModalClose }: ProfileSummaryStepProps) {
  return (
    <div>
      <AthleteInfo minimal={false} />
      <StepNavigation
        back={true}
        finished={true}
        setModalClose={setModalClose}
      />
    </div>
  );
}

export default ProfileSummaryStep;
