"use client"
import { useEffect, useState } from 'react';
import ConfirmDelete from '@/components/ConfirmDelete'
import ReservationCard from '@/components/ReservationCard'
import Dropdown from '@/components/Dropdown'

export default function AdminBranchPage() {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState('');
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [showPopUp, setShowPopUp] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
      const fetchReservations = async () => {
        try {
          const res = await fetch('/api/reservations');
          if (!res.ok) {
            throw new Error("Failed to fetch reservations");
          }
          const data = await res.json();
          setReservations(data);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        } finally {
          setLoading(false);
        }
        };
        const fetchBranches = async () => {
            try {
                const res = await fetch('/api/branch');
                if (!res.ok) {
                    throw new Error("Failed to fetch branch");
                }
                const data = await res.json();
                setBranches(data);
                if (data.length > 0){
                    setSelectedBranch(data[0]);
                }
            } catch (error) {
                console.error("Error fetching branch:", error);
            } finally {
                setLoading(false);
            }
        }; 

        fetchBranches();
        fetchReservations();
  }, [])

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
        return <div>Loading reservation...</div>;
    }
    
    const displayedReservation = reservations.filter(reservation => (reservation['branchId'] && reservation['branchId']['_id'] === selectedBranch['_id']))
    return (
      <section className='w-full gap-4 flex flex-col'>
        {showPopUp && (
            <div 
                onClick={e => setShowPopUp(false)}
                className='fixed inset-0 bg-black/80 flex items-center justify-center'>
                <div onClick={e => e.stopPropagation()} className='p-4 bg-[#f3f2e9] rounded-md'>
                    {/* <Branchform onFormSubmit={handleFormSubmit} /> */}
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
        <div className='h-10 flex flex-row align-center justify-between gap-4'>
            <Dropdown title='Branch' option={branches} props='name' selectedItem={selectedBranch} onSelectChange={setSelectedBranch} />
       </div>
       {displayedReservation.length > 0 && 
       <div className='grid grid-cols-4 gap-4'>
        {displayedReservation.map((reservation,idx) => (
            <ReservationCard reservation={reservation} key={idx} onDelete={handleTrashClick} user={true}/>
        ))}
       </div>}
     </section>
    );
  }
  