import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline/index';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  side?: 'left' | 'right';
  setSidebarOpen: (open: boolean) => void;
  children?: React.ReactNode;
  imgSrc?: string | StaticImageData | null;
}

function SidebarMobile({
  children,
  side = 'left',
  sidebarOpen,
  setSidebarOpen,
  imgSrc,
}: SidebarProps) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-40 lg:hidden'
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
        </Transition.Child>
        <div
          className={clsx(
            'fixed inset-0 flex z-40',
            side === 'left' ? 'flex-row' : 'flex-row-reverse'
          )}
        >
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom={
              side === 'left' ? '-translate-x-full' : 'translate-x-full'
            }
            enterTo={side === 'left' ? 'translate-x-0' : '-translate-x-0'}
            leave='transition ease-in-out duration-300 transform'
            leaveFrom={side === 'left' ? 'translate-x-0' : '-translate-x-0'}
            leaveTo={side === 'left' ? '-translate-x-full' : 'translate-x-full'}
          >
            <Dialog.Panel className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div
                  className={clsx(
                    'absolute top-0 pt-5',
                    side === 'left' ? 'right-0 -mr-14 ' : 'left-0 -ml-14'
                  )}
                >
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none ring-2 ring-inset ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              {imgSrc && (
                <Link href={'/'}>
                  <div className='flex-shrink-0 flex items-center px-4 cursor-pointer'>
                    <Image
                      src={imgSrc}
                      alt='Workflow'
                      width={273 / 1.75}
                      height={49 / 1.75}
                    />
                  </div>
                </Link>
              )}

              <div
                className={clsx(
                  ' flex-1 h-0 overflow-y-auto',
                  imgSrc && 'mt-5'
                )}
              >
                <nav className='px-2'>{children}</nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default SidebarMobile;
