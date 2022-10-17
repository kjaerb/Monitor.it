import { navigation, teams } from "@/data/dashboardData";
import Link from "next/link";
import { useState } from "react";
import AuthNav from "@/components/Auth/AuthNav";
import {
  SidebarMenuItem,
  SidebarMenuItemIcon,
} from "@/components/Sidebar/SidebarMenuItem";
import SidebarMobile from "@/components/Sidebar/SidebarMobile";
import SidebarMobileButton from "@/components/Sidebar/SidebarMobileButton";

function LandingPageHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='max-w-4xl mx-auto py-3 z-1000 px-2 lg:px-0'>
      <SidebarMobile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <div className='space-y-1'>
          {navigation.map((item, index) => (
            <SidebarMenuItemIcon
              key={index}
              name={item.name}
              href={item.href}
              item={{
                icon: item.icon,
              }}
              current={item.current}
            />
          ))}
        </div>
        <div className='mt-8'>
          <h3
            className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'
            id='mobile-teams-headline'>
            Teams
          </h3>
          <div
            className='mt-1 space-y-1'
            role='group'
            aria-labelledby='mobile-teams-headline'>
            {teams.map((team, index) => (
              <SidebarMenuItem
                key={index}
                name={team.name}
                href={team.href}
                bgColorClass={team.bgColorClass}
              />
            ))}
          </div>
        </div>
      </SidebarMobile>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <span className='font-bold text-3xl cursor-pointer text-white'>
            Monitor.
            <span className=' font-bold text-3xl cursor-pointer'>it</span>
          </span>
        </Link>
        <SidebarMobileButton setSidebarOpen={setSidebarOpen} />
        <div className='hidden sm:block'>
          <AuthNav />
        </div>
      </nav>
    </div>
  );
}

export { LandingPageHeader };
