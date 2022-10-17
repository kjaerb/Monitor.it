import clsx from "clsx";
import { useState } from "react";
import { useStepStore } from "stores/useStepStore";
import AthleteInfo from "./AthleteInfo";
import StepNavigation from "./StepNavigation";
import { getFigLicense } from "@/utils/fig";
import { getSport } from "@/types/sport";
import { Role } from "@/types/roles";

function FigLicenseStep() {
  const [hasSearched, setHasSearched] = useState(false);

  const {
    incStep,
    setFigLicense,
    setSport,
    setName,
    setRole,
    figLicense,
    setAthlete,
    athlete,
  } = useStepStore();

  return (
    <>
      <div className='flex text-white flex-col md:flex-row  justify-center items-center'>
        <div className='flex flex-col w-full md:w-1/2 mr-2 mb-8 md:mb-0 px-1'>
          <label htmlFor='underline_select' className='sr-only'>
            Underline select
          </label>
          <label className='text-white'>
            If you have a FIG license, please enter below
          </label>
          <form
            className='flex'
            onSubmit={async (e) => handleFigLicenseSearch(e)}>
            <input
              value={figLicense}
              onChange={(e) => setFigLicense(e.target.value)}
              className={clsx(
                "py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none  peer",
                hasSearched
                  ? !athlete
                    ? "border-red-500"
                    : "border-green-500"
                  : ""
              )}
              placeholder={"Enter FIG License"}
            />
            <button
              type='submit'
              className={clsx(
                "py-2.5 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none peer",
                hasSearched
                  ? !athlete
                    ? "border-red-500"
                    : "border-green-500"
                  : ""
              )}>
              Search
            </button>
          </form>
          <div>
            <span className='text-red-500'>
              {hasSearched && !athlete ? (
                <>No athlete found</>
              ) : (
                <span className='opacity-0'>Athlete found</span>
              )}
            </span>
          </div>
        </div>

        <AthleteInfo className=' md:mr-0' />
      </div>
      <StepNavigation onClick={incStep} />
    </>
  );

  async function handleFigLicenseSearch(e: React.FormEvent) {
    e.preventDefault();
    await getFigLicense(figLicense).then((athlete) => {
      if (athlete) {
        setAthlete({
          ...athlete,
          preferredlastname: transformName(athlete.preferredlastname),
          idgymnastlicense: Number(athlete.idgymnastlicense),
          gymnastid: Number(athlete.gymnastid),
          licensestatus: new Date(athlete.licensestatus),
          birth: new Date(athlete.birth),
          validto: new Date(athlete.validto),
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "",
        });
        setName(
          `${athlete.preferredfirstname} ${transformName(
            athlete.preferredlastname
          )}`
        );
        setSport(getSport(athlete.discipline));
        setRole(Role.ATHLETE);
      } else {
        setAthlete(undefined);
        setName("");
        setSport(getSport(""));
        setRole(Role.UNDEFINED);
      }
    });
    setHasSearched(true);
  }

  function transformName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}

export default FigLicenseStep;
