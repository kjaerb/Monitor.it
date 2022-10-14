import { TrampolineLicense } from "@/data/trampolineLicenses";
import { getSport } from "@/types/discipline";
import { Role } from "@/types/roles";
import { getAtheleteInfo } from "@/utils/license";
import clsx from "clsx";
import { useState } from "react";
import { useStepStore } from "stores/useStepStore";
import Button from "../ui/Button/Button";
import AthleteInfo from "./AthleteInfo";
import StepNavigation from "./StepNavigation";

function FigLicenseStep() {
  const [hasSearched, setHasSearched] = useState(false);

  const {
    setName,
    setSport,
    incStep,
    setRole,
    setFigLicense,
    figLicense,
    setAthlete,
    athlete,
  } = useStepStore();

  return (
    <>
      <div className='flex text-white'>
        <div className='flex flex-col w-1/2 mr-2'>
          <label htmlFor='underline_select' className='sr-only'>
            Underline select
          </label>
          <label className='text-white'>
            If you have a FIG license, please enter below
          </label>
          <input
            value={figLicense}
            onChange={(e) => setFigLicense(e.target.value)}
            className={clsx(
              "block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            )}
            placeholder={"Enter FIG License"}
          />
          <Button
            className='mt-4 w-fit'
            onClick={() => {
              const a = getAtheleteInfo(figLicense as TrampolineLicense);
              if (a) {
                setAthlete({
                  ...a,
                  lastName: transformName(a.lastName),
                  discipline: getSport(a.discipline),
                });
                if (athlete) {
                  setName(`${athlete.firstName} ${athlete.lastName}`);
                  setSport(athlete.discipline);
                  setRole(Role.ATHLETE);
                }
              }
              setHasSearched(true);
            }}>
            Get license
          </Button>
        </div>
        <AthleteInfo hasSearched={hasSearched} />
      </div>
      <StepNavigation onClick={incStep} />
    </>
  );
}

function transformName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export default FigLicenseStep;
