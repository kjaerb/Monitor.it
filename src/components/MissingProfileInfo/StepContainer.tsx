import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useStepStore } from "stores/useStepStore";
import InformationStep from "./InformationStep";
import AddUserStep from "./AddUsersStep";
import ProfileSummaryStep from "./ProfileSummaryStep";
import Steps from "./Steps";
import FigLicenseStep from "./FigLicenseStep";

function StepContainer() {
  const { user, hasProfile } = useUser();
  const [modalOpen, setModalOpen] = useState(!hasProfile);
  const { step } = useStepStore();

  return (
    <Modal isOpen={!hasProfile} variant={"primary"} setIsOpen={setModalOpen}>
      {/* Thanks to https://github.com/Fedeorlandau for the template for the modal */}
      <div className='mb-4'>
        <span className='text-white text-xl'>
          Hi {user?.name}, we're missing some information
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
