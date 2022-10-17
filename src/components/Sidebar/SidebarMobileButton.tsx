import { MenuAlt1Icon } from '@heroicons/react/outline';

interface SidebarMobileButtonProps {
  setSidebarOpen: (open: boolean) => void;
}

function SidebarMobileButton({ setSidebarOpen }: SidebarMobileButtonProps) {
  return (
    <button
      type='button'
      className='px-4 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:hidden'
      onClick={() => setSidebarOpen(true)}
    >
      <span className='sr-only'>Open sidebar</span>
      <MenuAlt1Icon className='h-6 w-6' aria-hidden='true' />
    </button>
  );
}

export default SidebarMobileButton;
