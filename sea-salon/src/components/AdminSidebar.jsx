import React from 'react'
import HomeIcon from '@/components/icons/HomeIcon'
import BranchIcon from '@/components/icons/BranchIcon'
import ServiceIcon from '@/components/icons/ServiceIcon'
import ReservationIcon from '@/components/icons/ReservationIcon'
import MenuLink from '@/components/MenuLink'

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <HomeIcon/>,
  },
  {
    title: "Branch",
    path: "/admin/branches",
    icon: <BranchIcon/>,
  },
  {
    title: "Service",
    path: "/admin/services",
    icon: <ServiceIcon/>,
  },
  {
    title: "Reservation",
    path: "/admin/reservations",
    icon: <ReservationIcon/>,
  },
]
const AdminSidebar = () => {
  return (
      <div className=' border-2 rounded-md p-4 w-[250px] h-96 flex flex-col gap-4 items-center'>
        <div className='place-self-start flex flex-row gap-6'>
          <div className="w-10 h-10 overflow-hidden border-[1px] rounded-full bg-[#ffffff87]">
              <svg className="relative w-12 h-12 text-[#61906b] -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </div>
          <div className='flex flex-col'>
            <span>Thomas</span>
            <span className='text-gray-600 text-[13px]'>Admin</span>
          </div>
        </div>
        {menuItems.map(item => (
          <MenuLink item={item} />
        ))}
      </div>
  )
}

export default AdminSidebar
