import { Figathlete } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import { useStepStore } from 'stores/useStepStore';

import { getFigLicense, searchFigLicense } from '@/utils/fig';

import AthleteInfo from './AthleteInfo';
import StepNavigation from './StepNavigation';

import { Role } from '@/types/roles';
import { getSport } from '@/types/sport';

function FigLicenseStep() {
  const [hasSearched, setHasSearched] = useState(false);
  const [figLicenseSearch, setFigLicenseSearch] = useState<Figathlete[]>();
  const [figLicense, setFigLicense] = useState<string>('');

  const { incStep, setSport, setName, setRole, setAthlete, athlete } =
    useStepStore();

  return (
    <>
      <div className='flex text-white flex-col md:flex-row  justify-center'>
        <div className='flex flex-col w-full md:w-1/2 mr-2 mb-8 md:mb-0 px-1 mt-16'>
          <label htmlFor='underline_select' className='sr-only'>
            Underline select
          </label>
          <label className='text-white'>
            If you have a FIG license, please enter below
          </label>
          <form onSubmit={async (e) => handleFigLicenseSearch(e)}>
            <div className='flex'>
              <input
                value={figLicense}
                onChange={async (e) => handleFigLicenseInput(e)}
                className={clsx(
                  'py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none',
                  hasSearched
                    ? !athlete
                      ? 'border-red-500'
                      : 'border-green-500'
                    : ''
                )}
                placeholder={'Enter FIG License or Last name'}
              />

              <button
                type='submit'
                className={clsx(
                  'py-2.5 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none',
                  hasSearched
                    ? !athlete
                      ? 'border-red-500'
                      : 'border-green-500'
                    : ''
                )}
              >
                Search
              </button>
            </div>
            <div
              className={clsx(
                figLicenseSearch ? 'block' : 'hidden',
                'bg-white w-full max-h-28 shadow-lg rounded-b-md overflow-y-scroll'
              )}
            >
              {figLicenseSearch?.map((athlete, index) => {
                return (
                  <div
                    className='text-black cursor-pointer p-2 flex justify-between'
                    key={index}
                    onClick={async () => handleFigLicenseInputClick(athlete)}
                  >
                    <p>
                      {athlete.preferredfirstname}{' '}
                      {transformName(athlete.preferredlastname)}
                    </p>
                    <span className='text-sm text-gray-600'>
                      {athlete.country} - {athlete.idgymnastlicense}
                    </span>
                  </div>
                );
              })}
            </div>
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

        <AthleteInfo className='md:mr-0' canDelete={true} />
      </div>
      <StepNavigation onClick={incStep} />
    </>
  );

  async function handleFigLicenseInputClick(athlete: Figathlete) {
    setHasSearched(true);
    handleSetAthlete(await getFigLicense(athlete.idgymnastlicense.toString()));
    setFigLicense(
      athlete.preferredfirstname +
        ' ' +
        transformName(athlete.preferredlastname)
    );
    setFigLicenseSearch(undefined);
  }

  async function handleFigLicenseInput(e: React.ChangeEvent<HTMLInputElement>) {
    setFigLicense(e.target.value);
    if (e.target.value.length > 2) {
      await searchFigLicense(e.target.value, 10).then((athletes) => {
        if (athletes && athletes.length !== 0) {
          setFigLicenseSearch(athletes);
        } else {
          setFigLicenseSearch(undefined);
        }
      });
    } else {
      setFigLicenseSearch(undefined);
    }
  }

  function handleSetAthlete(athlete?: Figathlete) {
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
        profileId: '',
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
      setName('');
      setSport(getSport(''));
      setRole(Role.UNDEFINED);
    }
  }

  async function handleFigLicenseSearch(e: React.FormEvent) {
    e.preventDefault();
    await getFigLicense(figLicense).then((athlete) => {
      handleSetAthlete(athlete);
    });
    setHasSearched(true);
  }

  function transformName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}

export default FigLicenseStep;
