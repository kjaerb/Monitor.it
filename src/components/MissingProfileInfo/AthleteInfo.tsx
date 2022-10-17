import { useStepStore } from "stores/useStepStore";
import NoUser from "@/assets/img/no_user.png";
import { formatDateSimple } from "@/utils/date";
import clsx from "clsx";
import { AvatarImage } from "../ui/Image/AvatarImage";

interface props {
  minimal?: boolean;
  className?: string;
}

function AthleteInfo({ minimal = true, className }: props) {
  const { athlete, role, sport } = useStepStore();

  return (
    <div
      className={clsx(
        "w-full relative max-w-sm mx-auto min-w-0 break-words bg-white mb-6 shadow-lg rounded-xl mt-16",
        className
      )}>
      <div className='px-6'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full flex justify-center -mt-16'>
            {athlete ? (
              <AvatarImage src={athlete?.figImgUrl} width={128} height={128} />
            ) : (
              <AvatarImage src={NoUser} width={128} height={128} />
            )}
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
