import { useUser } from "@/hooks/useUser";
import { Role } from "@/types/roles";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useStepStore } from "stores/useStepStore";
import StepNavigation from "./StepNavigation";
import { Sport } from "@/types/sport";

function InformationStep() {
  const { user } = useUser();
  const { role, setRole, name, setName, incStep, sport, setSport, athlete } =
    useStepStore();
  const [formValidation, setFormValidation] = useState(false);

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
              user?.name && "placeholder:text-gray-100",
              formValidation && !name && "border-red-500"
            )}
            placeholder={"Enter name"}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='underline_select' className='sr-only'>
            Underline select
          </label>
          <label className='text-white'>Sport</label>
          <select
            id='underline_select'
            value={sport}
            onChange={(e) => setSport(e.target.value as Sport)}
            className={clsx(
              "block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer",
              formValidation && sport === undefined && "border-red-500"
            )}>
            <>
              <option>Select a sport</option>
              {Object.values(Sport).map((sport) => {
                if (sport !== Sport.UNDEFINED) {
                  return (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  );
                }
              })}
            </>
          </select>
        </div>
        <div className='mt-4'>
          <label htmlFor='underline_select' className='sr-only'>
            Underline select
          </label>
          <label className='text-white'>Role</label>
          <select
            id='underline_select'
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className={clsx(
              "block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer",
              formValidation && role === undefined && "border-red-500"
            )}>
            <>
              <option>Select a role</option>
              {Object.values(Role).map((role) => {
                if (role !== Role.UNDEFINED) {
                  return (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  );
                }
              })}
            </>
          </select>
        </div>
      </div>
      <StepNavigation
        onClick={() => {
          if (name && role !== undefined && sport !== undefined) {
            setFormValidation(false);
            incStep();
          } else {
            setFormValidation(true);
          }
        }}
        back={true}
      />
    </>
  );
}

export default InformationStep;
