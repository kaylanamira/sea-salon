'use client'
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react"
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const { data: session, status } = useSession();
  const path = usePathname()
  
  return (
    <header className='px-2 py-4 border-2 flex justify-between'>
      <Link href="/" className='text-4xl'>SEASalon</Link>
      <nav className='flex gap-6 h-12 p-2.5 text-lg tabs '>
        <Link 
          href="/reviews" 
          className={path === '/reviews' ? 'active' : ''}>
          Reviews
        </Link>
        <Link 
          href="/branch" 
          className={path === '/branch' ? 'active' : ''}>
          Branch
        </Link>
        {status === 'authenticated' && session?.user?.role === 'customer' && 
        (<Link href="/customer" className={path === '/customer' ? 'active' : ''}>Dashboard</Link>)}
        {session?.user?.role === 'admin' && 
        (<Link href="/admin" className={path === '/admin' ? 'active' : ''}>Admin Dashboard</Link>)}

      </nav>
      <nav className='flex items-center gap-6 h-12 '>
        {status === 'authenticated' ? (
          <>
            {/* <Link
              href={session?.user?.role === 'admin' ? "/admin" : "/customer"}
              className=''>
              Hello, {session?.user?.name? ? session?.user?.name[0] : 'user'}
            </Link> */}
            <Link href="/" onClick={() => signOut()} className='link-custom'>Log Out</Link>
          </>
        ) : (
          <>
            <Link href="/login" className='link-custom'>Login</Link>
            <Link href="/register" className='link-custom'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar