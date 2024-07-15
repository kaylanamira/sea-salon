"use client"
import React from 'react'
import HomeIcon from '@/components/icons/HomeIcon'
import ReservationIcon from '@/components/icons/ReservationIcon'
import MenuLink from '@/components/MenuLink'
import { useSession } from 'next-auth/react';

const menuItems = [
  {
    title: "Dashboard",
    path: "/customer",
    icon: <HomeIcon/>,
  },
  {
    title: "My Reservation",
    path: "/customer/reservations",
    icon: <ReservationIcon/>,
  },
]
const CustomerSidebar = () => {
    const { data: session, status } = useSession();
  return (
      <div className=' border-2 rounded-md p-4 w-[250px] h-screen flex flex-col gap-4 items-center'>
        <div className='place-self-start flex flex-row gap-6'>
          <div className="w-10 h-10 overflow-hidden border-[1px] rounded-full bg-[#ffffff87]">
              <svg className="relative w-12 h-12 text-[#61906b] -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </div>
          <div className='flex flex-col'>
            <span>{session?.user?.fullname.split(' ')[0]}</span>
            <span className='text-gray-600 text-[13px]'>Customer</span>
          </div>
        </div>
        {menuItems.map(item => (
          <MenuLink item={item} />
        ))}
      </div>
  )
}

export default CustomerSidebar
