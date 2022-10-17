import clsx from 'clsx';
import Link from 'next/link';

interface SidebarMenuItemProps {
  name: string;
  href: string;
  bgColorClass?: string;
}

function SidebarMenuItem({ name, href, bgColorClass }: SidebarMenuItemProps) {
  return (
    <Link key={name} href={href} className=''>
      <div className='group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50'>
        <span
          className={clsx(bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full')}
          aria-hidden='true'
        />
        <span className='truncate'>{name}</span>
      </div>
    </Link>
  );
}

interface SidebarMenuItemIconProps extends SidebarMenuItemProps {
  current: boolean;
  item: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
}

function SidebarMenuItemIcon({
  name,
  href,
  item,
  current,
}: SidebarMenuItemIconProps) {
  return (
    <Link key={name} href={href} aria-current={current ? 'page' : undefined}>
      <div
        className={clsx(
          current
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
          'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
        )}
      >
        <item.icon
          className={clsx(
            current
              ? 'text-gray-500'
              : 'text-gray-400 group-hover:text-gray-500',
            'mr-3 flex-shrink-0 h-6 w-6'
          )}
          aria-hidden='true'
        />
        {name}
      </div>
    </Link>
  );
}

export { SidebarMenuItem,SidebarMenuItemIcon };
