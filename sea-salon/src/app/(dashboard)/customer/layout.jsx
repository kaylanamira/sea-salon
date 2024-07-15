"use client"
import React from 'react'
import CustomerSidebar from '@/components/CustomerSidebar'
import AuthComponent from '@/components/AuthComponent'

export default function CustomerLayout ({children}) {

  return (
    <div className='place-self-start w-full flex flex-row gap-10'>
      <CustomerSidebar/>
      <AuthComponent children={children} role="customer"/>
    </div>
  )
}