import { getSport } from "@/types/discipline";
import { formatDateSimple } from "@/utils/date";
import { useStepStore } from "stores/useStepStore";

interface props {
  hasSearched: boolean;
}

function AthleteInfo({ hasSearched }: props) {
  const { athlete } = useStepStore();

  return (
    <div className='w-1/2 p-2 ml-2 flex flex-col shadow-md border rounded-lg bg-gray-300 text-gray-900'>
      <span>Athlete information</span>
      <span className='mt-2'>
        {hasSearched && !athlete ? (
          <span className='text-red-500'>No athlete found</span>
        ) : (
          <div>
            <div className='flex'>
              <span className='w-1/2 border-b border-black'>
                <span className='text-sm'>First name:</span>{" "}
                {athlete?.firstName}
              </span>
              <span className='w-1/2 border-b border-black'>
                <span className='text-sm'>Last name:</span> {athlete?.lastName}
              </span>
            </div>
            <div className='flex mt-2'>
              <span className='w-1/2 border-b border-black'>
                <span className='text-sm'>Discipline:</span>{" "}
                {athlete?.discipline}
              </span>
              <span className='w-1/2 border-b border-black'>
                <span className='text-sm'>Country:</span> {athlete?.country}
              </span>
            </div>
            <div className='flex mt-2'>
              <span className='w-1/2 border-b border-black'>
                <span className='text-sm'>Year of Birth:</span>{" "}
                {athlete?.yearOfBirth}
              </span>
              <span className='w-1/2 border-b border-black'>
                {athlete?.validUntil && (
                  <>
                    <span className='text-sm'>Valid until:</span>{" "}
                    {formatDateSimple(athlete.validUntil)}
                  </>
                )}
              </span>
            </div>
          </div>
        )}
      </span>
    </div>
  );
}

export default AthleteInfo;
