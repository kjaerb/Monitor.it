import StepNavigation from "./StepNavigation";

function ProfileSummaryStep() {
  return (
    <div>
      <span className='text-white text-xl'>Profile summary</span>
      <StepNavigation back={true} finished={true} />
    </div>
  );
}

export default ProfileSummaryStep;
