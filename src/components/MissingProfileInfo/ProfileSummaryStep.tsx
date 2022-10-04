import { useStepStore } from "stores/useStepStore";
import StepNavigation from "./StepNavigation";

interface ProfileSummaryStepProps {
  setModalClose: (arg: boolean) => void;
}

function ProfileSummaryStep({ setModalClose }: ProfileSummaryStepProps) {
  const { role, name, sharingUsers, sport } = useStepStore();

  return (
    <div>
      <span className='text-white text-xl'>Profile summary</span>
      <div className='my-4 flex flex-col'>
        <div className='flex flex-col'>
          <span className='text-white'>Name: {name}</span>
          <span className='text-white'>Sport: {sport}</span>
          <span className='text-white'>Role: {role}</span>
        </div>
        <div className='mt-4'>
          <span className='text-white'>Users sharing data with</span>
          {sharingUsers.map((user) => (
            <span className='text-white'>{user}</span>
          ))}
        </div>
      </div>
      <StepNavigation
        back={true}
        finished={true}
        setModalClose={setModalClose}
      />
    </div>
  );
}

export default ProfileSummaryStep;
