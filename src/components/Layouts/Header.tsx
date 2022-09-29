import Link from "next/link";
import AuthNav from "../Auth/AuthNav";

function LandingPageHeader() {
  return (
    <div className='max-w-4xl mx-auto py-3 z-1000 px-2 lg:px-0'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <span className='font-bold text-3xl cursor-pointer text-white'>
            Monitor.
            <span className=' font-bold text-3xl cursor-pointer'>it</span>
          </span>
        </Link>
        <div>
          <AuthNav />
        </div>
      </nav>
    </div>
  );
}

export { LandingPageHeader };
