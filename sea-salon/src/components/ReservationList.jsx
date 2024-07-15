"use client"
// import ReviewCard from '@/components/ReviewCard';
import { useState, useEffect } from 'react';

export default function ReservationList({ limit = 5, userId = null }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const query = userId ? `?userId=${userId}&limit=${limit}` : `?limit=${limit}`;
        const res = await fetch(`/api/reservations${query}`);
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

    fetchReservations();
  }, [userId, limit]);

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  console.log(reservations)
    return (
      <div>
        <h2>Reservations</h2>
        {reservations.map((reservation,i) => (
          <div key={i}>
            <p>Service: {reservation.services}</p>
            <p>Date: {new Date(reservation.date).toLocaleString()}</p>
            <p>Time: {new Date(reservation.time).toLocaleString()}</p>
            {/* <p>Branch: {reservation.branchId.name}</p> */}
            {/* <p>User: {reservation.userId.fullname}</p> */}
          </div>
        ))}
      </div>
    );
  }
  