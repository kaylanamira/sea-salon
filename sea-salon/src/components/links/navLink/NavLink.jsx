"use client"

import React from 'react'
import Link from 'next/link'

const NavLink = ({item}) => {
  return (
      <Link href={item.path} key={item.title} className='h-12 p-2.5 text-lg'>{item.title}</Link>
  )
}

export default NavLink
