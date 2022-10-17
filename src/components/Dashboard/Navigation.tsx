import { Menu } from '@headlessui/react';
import clsx from 'clsx';

import { DashboardNavLinkProps } from './Sidebar';

interface props {
  navLinks: DashboardNavLinkProps[][];
}

function DashboardNavLinks({ navLinks }: props) {
  return (
    <>
      {navLinks.map((links, index) => {
        return (
          <div className='py-1' key={index}>
            {links.map((link, index) => {
              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      href={link.href}
                      className={clsx(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      {link.title}
                    </a>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default DashboardNavLinks;
