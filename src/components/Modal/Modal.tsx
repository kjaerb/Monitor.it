/* This example requires Tailwind CSS v2.0+ */
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';

export const modalVariant = {
  primary: 'bg-black',
  inverted: 'bg-white',
};

interface ModalProps {
  isOpen: boolean;
  variant: keyof typeof modalVariant;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

export default function Modal({
  isOpen,
  variant = 'primary',
  children,
}: ModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div className='relative z-10'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div
                className={clsx(
                  modalVariant[variant],
                  'relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-5xl sm:p-6 sm:mx-6'
                )}
              >
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition.Root>
  );
}
