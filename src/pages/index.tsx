import LandingPageLayout from 'layouts/LandingPageLayout';
import Image from 'next/image';
import { NextPage } from 'next/types';
import { useSession } from 'next-auth/react';

import Button from '@/components/ui/Button/Button';

import dashboardImage from '@/assets/img/dashboard.png';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal/Modal';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    router.query.error === 'OAuthAccountNotLinked' && setErrorModal(true);
  }, [router.isReady]);

  return (
    <LandingPageLayout>
      <Modal isOpen={errorModal} variant={'inverted'} setIsOpen={setErrorModal}>
        <div className='flex flex-col'>
          <h1 className='font-bold text-2xl'>Error</h1>
          <div>
            <p className='text-lg'>
              There appears to be an account already linked with this email. Try
              another provider
            </p>
          </div>
          <div className='self-end'>
            <Button
              className='w-content mr-2'
              variant='light'
              onClick={() => setErrorModal(false)}
            >
              Close
            </Button>
            <Button className='w-content' onClick={() => router.push('/login')}>
              Sign in again
            </Button>
          </div>
        </div>
      </Modal>
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
