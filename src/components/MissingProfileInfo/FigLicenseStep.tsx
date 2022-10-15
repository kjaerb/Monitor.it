import clsx from "clsx";
import { useState } from "react";
import { useStepStore } from "stores/useStepStore";
import Button from "../ui/Button/Button";
import AthleteInfo from "./AthleteInfo";
import StepNavigation from "./StepNavigation";
import { getFigLicense } from "@/utils/fig";

function FigLicenseStep() {
  const [hasSearched, setHasSearched] = useState(false);

  const { incStep, setFigLicense, figLicense, setAthlete } = useStepStore();

  return (
    <>
      <div className='flex text-white'>
        <div className='flex flex-col w-1/2 mt-16 mr-2'>
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
              "block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            )}
            placeholder={"Enter FIG License"}
          />
          <Button
            className='mt-4 w-fit'
            onClick={async () => {
              await getFigLicense(figLicense).then((athlete) => {
                if (athlete) {
                  setHasSearched(true);
                  setAthlete({
                    ...athlete,
                    preferredlastname: transformName(athlete.preferredlastname),
                  });
                } else {
                  setAthlete(undefined);
                }
              });
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
