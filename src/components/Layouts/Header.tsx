import Link from "next/link";
import AuthNav from "../Auth/AuthNav";

function LandingPageHeader() {
  return (
    <div className='border-b max-w-4xl mx-auto py-3'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <span className='font-bold text-3xl cursor-pointer'>
            Monitor.
            <span className='text-blue font-bold text-3xl cursor-pointer'>
              it
            </span>
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
