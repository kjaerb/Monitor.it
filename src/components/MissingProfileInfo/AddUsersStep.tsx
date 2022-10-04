import { useProfileNames } from "@/hooks/useProfile";
import { Roles } from "@/types/roles";
import { useEffect, useState } from "react";
import { useStepStore } from "stores/useStepStore";
import StepNavigation from "./StepNavigation";

function AddUserStep() {
  const { role } = useStepStore();
  const { profileNames } = useProfileNames();

  const [roleName, setRoleName] = useState<string>("");
  const [roleNamePlural, setRoleNamePlural] = useState<string>("");
  useEffect(() => {
    if (role === Roles.ATHLETE) {
      setRoleName("coach");
      setRoleNamePlural("coaches");
    } else {
      setRoleName("athlet");
      setRoleNamePlural("athletes");
    }
  }, []);

  return (
    <>
      <div className='mt-4'>
        {role !== Roles.UNDEFINED && (
          <>
            <span className='text-white text-xl'>
              {role === Roles.ATHLETE && (
                <>
                  Add {roleNamePlural} that you want to share your training data
                  with
                </>
              )}
              {role === Roles.COACH && (
                <>
                  Add {roleNamePlural} that you coach, such that you can see
                  their training data
                </>
              )}
            </span>
            <div className='flex flex-col mt-4'>
              <label className='text-white'>Add {roleNamePlural}</label>
              <input
                className='py-1 border-b-2 text-white bg-transparent focus:border-blue-500'
                placeholder={`${roleName} name`}
              />
            </div>
            <div className=''></div>
          </>
        )}
      </div>
      <StepNavigation back={true} />
    </>
  );
}

export default AddUserStep;
