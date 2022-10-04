import { useUser } from "@/hooks/useUser";
import { Roles } from "@/types/roles";
import clsx from "clsx";
import { useEffect } from "react";
import { useStepStore } from "stores/useStepStore";
import StepNavigation from "./StepNavigation";

function RoleStep() {
  const { user } = useUser();
  const { role, setRole, name, setName } = useStepStore();

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, []);

  return (
    <>
      <div className='w-full'>
        <div className='flex flex-col'>
          <label htmlFor='underline_select' className='sr-only'>
            Underline select
          </label>
          <label className='text-white'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={clsx(
              "block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer",
              user?.name && "placeholder:text-gray-100"
            )}
            placeholder={user?.name ? user.name : "Enter name"}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='underline_select' className='sr-only'>
            Underline select
          </label>
          <label className='text-white'>Role</label>
          <select
            id='underline_select'
            value={role}
            onChange={(e) => setRole(e.target.value as Roles)}
            className='block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'>
            {Object.values(Roles).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>
      <StepNavigation back={false} />
    </>
  );
}

export default RoleStep;
