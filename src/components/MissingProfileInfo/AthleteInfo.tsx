import { useStepStore } from "stores/useStepStore";
import Loading from "../ui/Loading/Loading";

interface props {
  hasSearched: boolean;
}

function AthleteInfo({ hasSearched }: props) {
  const { athlete } = useStepStore();

  return (
    <div className='w-1/2 relative max-w-sm mx-auto min-w-0 break-words bg-white mb-6 shadow-lg rounded-xl mt-16'>
      {hasSearched ? (
        athlete ? (
          <div className='px-6'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full flex justify-center'>
                <img
                  src={athlete?.figImgUrl}
                  className='shadow-xl object-top rounded-full w-32 h-32 object-cover -mt-16'
                />
              </div>
            </div>
            <div className='text-center mt-2'>
              <h3 className='text-2xl text-slate-700 font-bold leading-normal mb-1'>
                {athlete?.preferredfirstname} {athlete?.preferredlastname}
              </h3>
              <div className='text-xs mt-0 mb-4 text-slate-400 font-bold uppercase'>
                <i className='fas fa-map-marker-alt mr-2 text-slate-400 opacity-75'></i>
                {athlete?.country}
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <h3 className='text-xl text-red-500 font-bold leading-normal mb-1'>
              No athlete found
            </h3>
          </div>
        )
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <h3 className='text-xl text-slate-700 font-bold leading-normal mb-1'>
            Search for an athlete
          </h3>
        </div>
      )}
    </div>
  );
}

export default AthleteInfo;
