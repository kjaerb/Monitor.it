import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useStepStore } from "stores/useStepStore";
import RoleStep from "./RoleStep";
import AddUserStep from "./AddUsersStep";
import ProfileSummaryStep from "./ProfileSummaryStep";
import Steps from "./Steps";

function StepContainer() {
  const { user, hasProfile } = useUser();
  const [modalOpen, setModalOpen] = useState(!hasProfile);
  const { step } = useStepStore();

  return (
    <Modal isOpen={!hasProfile} variant={"primary"} setIsOpen={setModalOpen}>
      <div className='mb-4'>
        <span className='text-white text-xl'>
          Hi {user?.name}, we're missing some information
        </span>
        <Steps currentStep={step} />
      </div>
      <div>
        {step === 0 && <RoleStep />}
        {step === 1 && <AddUserStep />}
        {step === 2 && <ProfileSummaryStep />}
      </div>
    </Modal>
  );
}

export default StepContainer;
