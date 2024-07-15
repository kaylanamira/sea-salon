'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  if (status === 'unauthenticated' || (session?.user?.role !== 'admin')) {
    router.replace('/login');
  } 

  // if (loading) {
  //   return <div>Loading admin page...</div>;
  // }

  return (
    <div className='w-5/6'>
        <h1 className='place-self-start text-4xl font-semibold mt-6 mb-6'>Welcome, Admin</h1>
        <div className='grid grid-cols-2 justify-between'>
          {/* <h1 className='place-self-start text-2xl font-semibold'>My Reservation</h1> */}
        </div>
        <div className='grid grid-cols-2 justify-between'>
          {/* <h1 className='place-self-start text-2xl font-semibold'>My Review</h1> */}
        </div>
    </div>
  )
}
