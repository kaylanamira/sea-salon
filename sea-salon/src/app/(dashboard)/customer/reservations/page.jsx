"use client"
import ReservationForm from '@/components/ReservationForm'
import ReservationCard from '@/components/ReservationCard'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ConfirmDelete from '@/components/ConfirmDelete'

export default function CustomerReservationPage() {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState('');
    const [showPopUp, setShowPopUp] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { data: session } = useSession();
    
    useEffect(() => {
        const fetchreservations = async () => {
            try {
                const res = await fetch(`/api/reservations?userId=${session?.user?._id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch reservation");
                }
                const data = await res.json();
                setReservations(data);
            } catch (error) {
                console.error("Error fetching reservation:", error);
            } finally {
                setLoading(false);
            }
        };          
        
        fetchreservations();
    }, [])
    
  const handleFormSubmit = (newReservation) => {
    setReservations([...reservations,newReservation])
    setShowPopUp(false)
    return
  }

    const handleReservationDelete = async () => {
        const _id = selectedReservation._id
        const res = await fetch('http://localhost:3000/api/reservations', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({_id}),
        });
        if (res.ok) {
            setError("");
            setReservations(prevReservations => prevReservations.filter(reservation => reservation['_id'] !== _id));
            setShowDeleteModal(false)
        } else {
            const errorMsg = await res.text();
            setError(errorMsg || "Error deleting reservation");
        }
    }
  
    const handleTrashClick = (reservation) => {
        setShowDeleteModal(true)
        setSelectedReservation(reservation)
    }

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  const user = session?.user ?  session?.user : null
    return (
      <section className='w-full gap-4 flex flex-col'>
        {showPopUp && (
            <div 
                onClick={e => setShowPopUp(false)}
                className='fixed inset-0 bg-black/80 flex items-center justify-center z-10'>
                <div onClick={e => e.stopPropagation()} className='p-4 bg-[#f3f2e9] rounded-md'>
                    <ReservationForm onFormSubmit={handleFormSubmit} user={user} />
                </div>
            </div>
        )}
        {showDeleteModal && (
            <div 
                onClick={e => setShowDeleteModal(false)}
                className='fixed inset-0 bg-black/80 flex items-center justify-center z-10'>
                <div onClick={e => e.stopPropagation()} className='p-4 bg-[#f3f2e9] rounded-md'>
                    <ConfirmDelete onDelete={handleReservationDelete} onCancel={setShowDeleteModal} />
                </div>
            </div>
        )}
        <h1 className='place-self-start text-2xl font-semibold'>Reservations</h1>
        <div className='h -10 flex flex-row align-center justify-between gap-4'>
            {/* <Dropdown title='Branch' option={reservations} props='name' selectedItem={selectedBranch} onSelectChange={setSelectedBranch} /> */}
            {/* <Dropdown title='Services' option={reservation.services} props='name' /> */}
            <button onClick={(e)=>setShowPopUp(true)} className='h-10 p-2 rounded-md'>Add</button>
       </div>
       {reservations.length > 0 && 
       <div className='grid grid-cols-4 gap-4'>
        {reservations.map((reservation,idx) => (
            <ReservationCard reservation={reservation} key={idx} onDelete={handleTrashClick}/>
        ))}
       </div>}
     </section>
    );
  }
  