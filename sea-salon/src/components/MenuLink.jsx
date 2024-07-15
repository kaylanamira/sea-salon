"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuLink = ({item}) => {
  const path = usePathname()
  return (
    <Link 
      href={item.path} 
      className={`w-full rounded-md h-12 border-2 p-2.5  ${path === item.path? 'bg-[#7fbc8c]' : 'bg-[#7fbc8c3b]'} hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-2`}>
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink
