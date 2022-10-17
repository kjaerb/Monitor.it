import { Menu, Transition } from "@headlessui/react";
import { Session } from "next-auth";
import { Fragment } from "react";
import { MenuAlt1Icon } from "@heroicons/react/outline/index";
import clsx from "clsx";
import { AvatarImage } from "@/components/ui/Image/AvatarImage";
import { projects } from "@/data/dashboardData";
import { DotsVerticalIcon, SearchIcon } from "@heroicons/react/solid/index";
import { formatDateSimple } from "@/utils/date";
import Button from "@/components/ui/Button/Button";
import DashboardNavLinks from "./Navigation";
import { dashboardNavLinks } from "./Sidebar";

interface DashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  session: Session;
  showPinned: boolean;
}

function DashboardHeader({
  setSidebarOpen,
  session,
  showPinned,
}: DashboardHeaderProps) {
  const pinnedProjects = projects.filter((project) => project.pinned);

  return (
    <>
      <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden'>
        <button
          type='button'
          className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden'
          onClick={() => setSidebarOpen(true)}>
          <span className='sr-only'>Open sidebar</span>
          <MenuAlt1Icon className='h-6 w-6' aria-hidden='true' />
        </button>
        <div className='flex-1 flex justify-between px-4 sm:px-6 lg:px-8'>
          <div className='flex-1 flex'>
            <form className='w-full flex md:ml-0' action='#' method='GET'>
              <label htmlFor='search-field' className='sr-only'>
                Search
              </label>
              <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                  <SearchIcon className='h-5 w-5' aria-hidden='true' />
                </div>
                <input
                  id='search-field'
                  name='search-field'
                  className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm'
                  placeholder='Search'
                  type='search'
                />
              </div>
            </form>
          </div>
          <div className='flex items-center'>
            {/* Profile dropdown */}
            <Menu as='div' className='ml-3 relative'>
              <div>
                <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'>
                  <span className='sr-only'>Open user menu</span>
                  <AvatarImage
                    src={session.user?.image}
                    width={32}
                    height={32}
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                  <DashboardNavLinks navLinks={dashboardNavLinks} />
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      <div className='border-b border-gray-200 px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8'>
        <div className='min-w-0 flex items-center'>
          <h1 className='text-lg font-medium text-gray-900 sm:truncate'>
            Home
          </h1>
          <span className='text-xs sm:truncate ml-2'>
            {formatDateSimple(new Date())}
          </span>
        </div>
        <div className='flex justify-center items-center sm:mt-0 sm:ml-4'>
          <Button className='flex flex-col items-center'>
            <span>Start training</span>
            {/* <span className='text-xs sm:truncate'>
              {formatDateSimple(new Date())}
            </span> */}
          </Button>
        </div>
      </div>
      {/* Pinned projects */}
      {showPinned && (
        <>
          <div className='px-4 mt-6 sm:px-6 lg:px-8'>
            <h2 className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
              Pinned trainings
            </h2>
            <ul
              role='list'
              className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3'>
              {pinnedProjects.map((project) => (
                <li
                  key={project.id}
                  className='relative col-span-1 flex shadow-sm rounded-md'>
                  <div
                    className={clsx(
                      project.bgColorClass,
                      "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                    )}>
                    {project.initials}
                  </div>
                  <div className='flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate'>
                    <div className='flex-1 px-4 py-2 text-sm truncate'>
                      <a
                        href='#'
                        className='text-gray-900 font-medium hover:text-gray-600'>
                        {project.title}
                      </a>
                      <p className='text-gray-500'>
                        {project.totalMembers} Members
                      </p>
                    </div>
                    <Menu as='div' className='flex-shrink-0 pr-2'>
                      <Menu.Button className='w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'>
                        <span className='sr-only'>Open options</span>
                        <DotsVerticalIcon
                          className='w-5 h-5'
                          aria-hidden='true'
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'>
                        <Menu.Items className='z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                          <div className='py-1'>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href='#'
                                  className={clsx(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}>
                                  View
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                          <div className='py-1'>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href='#'
                                  className={clsx(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}>
                                  Removed from pinned
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href='#'
                                  className={clsx(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}>
                                  Share
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default DashboardHeader;
