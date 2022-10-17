/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Fragment } from 'react';

interface ButtonMenuProps {
  children?: React.ReactNode;
  items: ButtonMenuItemProps[];
  className?: string;
}

export function ButtonMenu({ children, items, className }: ButtonMenuProps) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button
          className={clsx(
            'flex items-center w-full justify-center rounded-md border  border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100',
            className
          )}
        >
          {children}
          <ChevronDownIcon
            className='-mr-1 ml-1 h-5 w-5 text-gray-400'
            aria-hidden='true'
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
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-colors duration-200'>
          <div className='py-1'>
            {items.map((item, index) => {
              return (
                <ButtonMenuItem key={index} onClick={item.onClick}>
                  {item.children}
                </ButtonMenuItem>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export type ButtonMenuItemProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};

function ButtonMenuItem({ children, onClick }: ButtonMenuItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={clsx(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block w-full px-4 py-2 text-left text-sm'
          )}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}
