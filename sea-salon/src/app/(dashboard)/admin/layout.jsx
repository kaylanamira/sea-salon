"use client"
import React from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import AuthComponent from '@/components/AuthComponent'

export default function AdminLayout ({children}) {
  return (
    <div className='place-self-start w-full flex flex-row gap-10'>
      <AdminSidebar/>
      <AuthComponent children={children} role="admin"/>
    </div>
  )
}
