import LandingPageLayout from 'layouts/LandingPageLayout';
import Image from 'next/image';
import { NextPage } from 'next/types';
import { useSession } from 'next-auth/react';

import Button from '@/components/ui/Button/Button';

import dashboardImage from '@/assets/img/dashboard.png';

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <LandingPageLayout>
      <div className='w-full h-3/5 bg-gradient-to-b from-blue-600 to-blue-400 absolute top-0 -z-10' />
      <section className='mx-auto my-10 flex justify-center items-center flex-col'>
        <div className='flex py-16 mb-2 max-w-4xl w-full justify-between px-4 lg:px-0'>
          <div className='py-10'>
            <h1 className='text-6xl font-bold text-white'>TLDR</h1>
            <p className='py-4 text-lg text-white'>
              Easy monitorization of your trainings and workouts. With build in
              statistics and notifications for coaches.
            </p>
            <p className='py-4 text-lg font-bold text-white'>
              Start monitoring your trainings now
            </p>
            <div className='flex'>
              {session ? (
                <Button
                  href='/dashboard'
                  variant='ternary'
                  className='px-0 py-0'
                >
                  <div className='relative'>
                    <div className='px-4 py-2 rounded-lg shadow-2xl'>
                      Go to dashboard
                    </div>
                    <div className='absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-white animate-ping'></div>
                    <div className='absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-white'></div>
                  </div>
                </Button>
              ) : (
                <>
                  <Button href='/login' className='mr-4'>
                    Login
                  </Button>
                  <Button href='/login'>Sign up</Button>
                </>
              )}
            </div>
          </div>
          <div className='pl-20'>
            <Image
              src={dashboardImage}
              alt={'dashboard'}
              width={2800 / 2}
              height={1962 / 2}
            />
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default Home;
