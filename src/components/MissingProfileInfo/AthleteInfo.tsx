import clsx from 'clsx';
import { useStepStore } from 'stores/useStepStore';

import { AvatarImage } from '@/components/ui/Image/AvatarImage';

import NoUser from '@/assets/img/no_user.png';
import { formatDateSimple } from '@/utils/date';

interface props {
  minimal?: boolean;
  className?: string;
  canDelete?: boolean;
}

function AthleteInfo({ minimal = true, className, canDelete }: props) {
  const { athlete, role, sport, setAthlete } = useStepStore();

  return (
    <div
      className={clsx(
        'w-full relative max-w-sm mx-auto min-w-0 break-words bg-white mb-6 shadow-lg rounded-xl mt-16',
        className
      )}
    >
      <div className='px-6'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full flex justify-center -mt-16'>
            {athlete ? (
              <AvatarImage src={athlete?.figImgUrl} width={128} height={128} />
            ) : (
              <AvatarImage src={NoUser} width={128} height={128} />
            )}
            <div>
              {canDelete && (
                <button
                  className={clsx(
                    'absolute z-[100] translate-x-1/2 -translate-y-1/2 right-1/2 top-0 bg-gray-700 rounded-full bg-opacity-50	transition-opacity duration-200',
                    athlete && 'opacity-0 hover:opacity-100 ',
                    !athlete && 'opacity-0 cursor-default hidden'
                  )}
                  onClick={() => {
                    setAthlete(undefined);
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-32 w-full'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className='text-center mt-2'>
          {athlete ? (
            <h3 className='text-2xl text-slate-700 font-bold leading-normal mb-1'>
              {athlete?.preferredfirstname} {athlete?.preferredlastname}
            </h3>
          ) : (
            <h3 className='text-2xl text-slate-700 font-bold leading-normal mb-1'>
              Search for an athlete
            </h3>
          )}

          <div className='grid grid-cols-1 divide-y-2 text-slate-700 py-2'>
            <div className='grid grid-cols-3 divide-x-2 text-slate-700 py-2'>
              <div className='flex justify-center items-center flex-col'>
                <span className='font-bold'>Country</span>
                {athlete ? <span>{athlete?.country}</span> : <span>?</span>}
              </div>
              <div className='flex justify-center items-center flex-col'>
                <span className='font-bold'>Sport</span>
                {athlete ? <span>{sport}</span> : <span>?</span>}
              </div>
              <div className='flex justify-center items-center flex-col'>
                <span className='font-bold'>Valid to</span>
                {athlete ? (
                  <span>{formatDateSimple(athlete?.validto)}</span>
                ) : (
                  <span>?</span>
                )}
              </div>
            </div>
            {!minimal && (
              <div className='grid grid-cols-3 divide-x-2 text-slate-700 py-2'>
                <div className='flex justify-center items-center flex-col'>
                  <span className='font-bold'>Coaches</span>
                  <span>None</span>
                </div>
                <div className='flex justify-center items-center flex-col'>
                  <span className='font-bold'>Role</span>
                  {role && <span>{role}</span>}
                </div>
                <div className='flex justify-center items-center flex-col'>
                  <span className='font-bold'>Athletes</span>
                  <span>None</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AthleteInfo;
