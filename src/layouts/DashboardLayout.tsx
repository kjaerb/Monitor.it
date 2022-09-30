import { useState } from "react";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Dashboard/Sidebar";
import { projects } from "@/data/dashboardData";
import DashboardHeader from "@/components/Dashboard/Header";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  showPinned?: boolean;
}

export default function DashboardLayout({
  children,
  showPinned = true,
}: DashboardLayoutProps) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!session) {
    return <h1>not logged in</h1>;
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
            {children}
            {/* Projects table (small breakpoint and up) */}
            <div className='hidden sm:block'>
              <div className='align-middle inline-block min-w-full border-b border-gray-200'>
                <table className='min-w-full'>
                  <thead>
                    <tr className='border-t border-gray-200'>
                      <th
                        className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        scope='col'>
                        <span className='lg:pl-2'>Project</span>
                      </th>
                      <th
                        className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        scope='col'>
                        Members
                      </th>
                      <th
                        className='hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                        scope='col'>
                        Last updated
                      </th>
                      <th
                        className='pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                        scope='col'
                      />
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-100'>
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className='px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900'>
                          <div className='flex items-center space-x-3 lg:pl-2'>
                            <div
                              className={clsx(
                                project.bgColorClass,
                                "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                              )}
                              aria-hidden='true'
                            />
                            <a
                              href='#'
                              className='truncate hover:text-gray-600'>
                              <span>
                                {project.title}{" "}
                                <span className='text-gray-500 font-normal'>
                                  in {project.team}
                                </span>
                              </span>
                            </a>
                          </div>
                        </td>
                        <td className='px-6 py-3 text-sm text-gray-500 font-medium'>
                          <div className='flex items-center space-x-2'>
                            <div className='flex flex-shrink-0 -space-x-1'>
                              {project.members.map((member) => (
                                <img
                                  key={member.handle}
                                  className='max-w-none h-6 w-6 rounded-full ring-2 ring-white'
                                  src={member.imageUrl}
                                  alt={member.name}
                                />
                              ))}
                            </div>
                            {project.totalMembers > project.members.length ? (
                              <span className='flex-shrink-0 text-xs leading-5 font-medium'>
                                +{project.totalMembers - project.members.length}
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className='hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right'>
                          {project.lastUpdated}
                        </td>
                        <td className='px-6 py-3 whitespace-nowrap text-right text-sm font-medium'>
                          <a
                            href='#'
                            className='text-indigo-600 hover:text-indigo-900'>
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
