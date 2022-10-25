import clsx from 'clsx';
import { useEffect, useState } from 'react';

import DashboardHeader from '@/components/Dashboard/Header';
import Sidebar from '@/components/Dashboard/Sidebar';
import StepContainer from '@/components/MissingProfileInfo/StepContainer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  showPinned?: boolean;
}

export default function DashboardLayout({
  children,
  showPinned = true,
}: DashboardLayoutProps) {
  const { data: session, status } = useSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);

  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className='min-h-full'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Main column */}
        <div className='lg:pl-64 flex flex-col'>
          {/* Search header */}
          {session && (
            <DashboardHeader
              setSidebarOpen={setSidebarOpen}
              session={session}
              showPinned={showPinned}
            />
          )}
          <main
            className={clsx(
              'flex-1 mt-8',
              showPinned && 'border-t border-gray-200'
            )}
          >
            {/* Page title & actions */}
            <div className='mt-2 px-4 sm:px-6 lg:px-8'>
              <StepContainer />
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
