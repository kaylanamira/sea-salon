import React from 'react'
import Link from 'next/link'
import { Links } from './links/Links'

const Navbar = () => {
  const session = false
  const isAdmin = true

  return (
    // <header className='px-2 py-4 border-b flex justify-between'>
    //     {/* <div className='text-4xl'>SEASalon</div> */}
    //     <Link href="/" className='text-4xl'>SEASalon</Link>
    //     <Links />
        // {/* <Link href="/" className='h-12 py-2.5'>Homepage</Link>
        // <Link href="/review" className='h-12 py-2.5'>Review</Link>
        // <Link href="/login">
    //     </Link> */}
    // </header>
    <header className='px-2 py-4 border-b flex justify-between'>
        <Link href="/" className='text-4xl'>SEASalon</Link>
        <nav className='flex gap-4 h-12 p-2.5 text-lg'>
          <Link href="/review">Reviews</Link>
        </nav>
        <nav className='flex items-center gap-6 h-12'>
        {
          session ? (  
            <>
              {isAdmin && <Link href="/admin">Admin</Link>}
              <button className='h-12 border-2 p-2.5 bg-[#7fbc8c] hover:bg-[#6a9f75] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6a9f75]'>Log Out</button>
            </>
          ) : (
            <>
                <Link href="/login" className='h-12 border-2 p-2.5 bg-[#7fbc8c] hover:bg-[#6a9f75] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6a9f75]'>Log In</Link>
                <Link href="/register" className='h-12 border-2 p-2.5 bg-[#7fbc8c] hover:bg-[#6a9f75] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6a9f75]'>Register</Link>
            </>
          )
        }
        </nav>
    </header>
  )
}

export default Navbar