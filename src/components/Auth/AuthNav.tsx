import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { ButtonMenu } from '@/components/ui/Button/ButtonMenu';
import { AvatarImage } from '@/components/ui/Image/AvatarImage';

import SidebarMobile from '../Sidebar/SidebarMobile';
import SidebarMobileButton from '../Sidebar/SidebarMobileButton';
import Button from '../ui/Button/Button';

function AuthNav() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SidebarMobile
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        side='right'
      >
        {}
        <div>
          {session ? (
            <div className='flex flex-col w-full'>
              <h1 className='flex flex-wrap font-bold text-lg mx-auto mb-4'>
                Welcome {session.user?.name}
              </h1>
              <Button href={'/dashboard'}>Dashboard</Button>
            </div>
          ) : (
            <>
              <Button className='w-full' onClick={() => signIn('google')}>
                Login
              </Button>
              <Button variant='light' className='w-full mt-4'>
                Sign up
              </Button>
            </>
          )}
        </div>
      </SidebarMobile>
      <SidebarMobileButton setSidebarOpen={setSidebarOpen} />

      <div className='hidden sm:block'>
        {session ? (
          <>
            <Button href={'/dashboard'}>Dashboard</Button>

            <ButtonMenu
              className='py-1'
              items={[
                {
                  children: 'Sign out',
                  onClick: () => signOut(),
                },
              ]}
            >
              <span className='font-bold mr-2'>{session.user?.name} </span>
              <AvatarImage src={session.user?.image} width={30} height={30} />
            </ButtonMenu>
          </>
        ) : (
          // <Button href={"/login"}>Sign in</Button>
          <Button href={'/dashboard'} onClick={() => signIn('github')}>
            Sign in
          </Button>
        )}
      </div>
    </>
  );
}

export default AuthNav;
