import { useState } from "react";

import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/Header";
import { useUser } from "@/hooks/useUser";
import StepContainer from "@/components/MissingProfileInfo/StepContainer";
import clsx from "clsx";

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
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Main column */}
        <div className='lg:pl-64 flex flex-col'>
          {/* Search header */}
          <DashboardHeader
            setSidebarOpen={setSidebarOpen}
            session={session}
            showPinned={showPinned}
          />
          <main
            className={clsx(
              "flex-1 mt-8",
              showPinned && "border-t border-gray-200"
            )}>
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
