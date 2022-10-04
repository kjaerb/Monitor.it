import { useState } from "react";

import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/Header";
import { useUser } from "@/hooks/useUser";
import StepContainer from "@/components/MissingProfileInfo/StepContainer";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  showPinned?: boolean;
}

export default function DashboardLayout({
  children,
  showPinned = true,
}: DashboardLayoutProps) {
  const { user, status, session, hasProfile } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  //@TODO: Add a loading state
  if (!session) {
    return null;
  }

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
        <Sidebar
          session={session}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Main column */}
        <div className='lg:pl-64 flex flex-col'>
          {/* Search header */}
          <DashboardHeader
            setSidebarOpen={setSidebarOpen}
            session={session}
            showPinned={showPinned}
          />
          <main className='flex-1 mt-8'>
            {/* Page title & actions */}
            <div className='align-middle inline-block min-w-full border-t border-gray-200'>
              <div className='mt-2 px-4 sm:px-6 lg:px-8'>
                <StepContainer />
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
