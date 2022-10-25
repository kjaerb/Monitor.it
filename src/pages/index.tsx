import LandingPageLayout from 'layouts/LandingPageLayout';
import Image from 'next/image';
import { NextPage } from 'next/types';
import { useSession } from 'next-auth/react';

import Button from '@/components/ui/Button/Button';
import { OAuthErrorModal } from '@/components/ui/Modals/OAuthErrorModal';

import dashboardImage from '@/assets/img/dashboard.png';

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <LandingPageLayout>
      <OAuthErrorModal />
      <section className='mx-auto flex justify-center items-center flex-col w-screen bg-gradient-to-b from-blue-600 to-blue-500'>
        <div className='flex pt-32 md:pt-64 pb-32 mb-2 max-w-5xl w-screen justify-between px-4 lg:px-0 flex-col md:flex-row'>
          <div className='py-10 '>
            <div>
              <div className='text-center md:text-left text-white'>
                <h1 className='text-6xl font-bold text-white'>TLDR</h1>
                <p className='py-4 text-2xl md:text-lg'>
                  Easy monitorization of your trainings and workouts. With build
                  in statistics and notifications for coaches.
                </p>
                <p className='py-4 font-bold text-2xl md:text-lg'>
                  Start monitoring your trainings now
                </p>
              </div>
              <div className='flex justify-center md:justify-start font-bold'>
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
                    <Button variant='ternary' href='/login' className='mr-4'>
                      Login
                    </Button>
                    <Button variant='light' href='/login'>
                      Sign up
                    </Button>
                  </>
                )}
              </div>
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
