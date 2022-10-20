import Link from 'next/link';

import AuthNav from '@/components/Auth/AuthNav';

function LandingPageHeader() {
  return (
    <div className='py-4 z-1000 px-2 lg:px-0 bg-transparent fixed t-0 w-screen'>
      <nav className='flex mx-auto justify-between items-center max-w-5xl'>
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
