"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ReviewList from '@/components/ReviewList';
import ReservationCard from '@/components/ReservationCard'
import Link from 'next/link';

export default function CustomerDashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'unauthenticated' || (session?.user?.role !== 'customer')) {
    router.replace('/login');
  } 

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const query = session?.user?._id ? `?userId=${session?.user?._id}&limit=${5}` : `?limit=${5}`;
        const res = await fetch(`/api/reservations${query}`);
        if (!res.ok) {
          throw new Error("Failed to fetch review");
        }
        const data = await res.json();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching review :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className='w-5/6'>
        <h1 className='place-self-start text-4xl font-semibold mt-6 mb-4'>Welcome</h1>
        <div className='w-full grid grid-cols-2 justify-between'>
          <h1 className='place-self-start text-2xl font-semibold'>My Reservation</h1>
          <Link href="/customer/reservations" className='place-self-end text-gray-800 hover:underline '>See all</Link>
        </div>
        {reservations.length > 0 && 
          <div className='w-full mt-4 mb-4 place-self-center px-4 gap-4 grid grid-cols-1 sm:grid-cols-4 '>
            {reservations.map((reservation,idx) => (
                <ReservationCard reservation={reservation} key={idx} />
            ))}
          </div>}
        <div className='w-full grid grid-cols-2 justify-between'>
          <h1 className='place-self-start text-2xl font-semibold'>My Review</h1>
          <Link href="/reviews" className='place-self-end text-gray-800 hover:underline '>See all</Link>
        </div>
        <ReviewList limit={4} userId={session?.user?._id} />
      </section> 
    </>
  );
}
