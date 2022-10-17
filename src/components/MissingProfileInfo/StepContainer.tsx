import { useState } from 'react';
import { useStepStore } from 'stores/useStepStore';

import { useUser } from '@/hooks/useUser';

import Modal from '@/components/Modal/Modal';

import AddUserStep from './AddUsersStep';
import FigLicenseStep from './FigLicenseStep';
import InformationStep from './InformationStep';
import ProfileSummaryStep from './ProfileSummaryStep';
import Steps from './Steps';

function StepContainer() {
  const { user, hasProfile } = useUser();
  const [, setModalOpen] = useState(!hasProfile);
  const { step } = useStepStore();

  return (
    <Modal isOpen={!hasProfile} variant={'primary'} setIsOpen={setModalOpen}>
      {/* Thanks to https://github.com/Fedeorlandau for the template for the modal */}
      <div className='mb-4'>
        <span className='text-white text-xl'>
          Hi {user?.name}, we&apos;re missing some information
        </span>
        <Steps currentStep={step} />
      </div>
      <div>
        {step === 0 && <FigLicenseStep />}
        {step === 1 && <InformationStep />}
        {step === 2 && <AddUserStep />}
        {step === 3 && <ProfileSummaryStep setModalClose={setModalOpen} />}
      </div>
    </Modal>
  );
}

export default StepContainer;
