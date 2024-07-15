"use client"
import { useState, useEffect } from 'react';
import ReviewCard from '@/components/ReviewCard';

const ReviewList = ( { limit = 5, userId = null }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = userId ? `?userId=${userId}&limit=${limit}` : `?limit=${limit}`;
        const res = await fetch(`/api/reviews${query}`);
        if (!res.ok) {
          throw new Error("Failed to fetch review");
        }
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching review :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId, limit]);

  if (loading) {
    return <div>Loading...</div>;
  }
    return (
    <div className='w-full mt-4 mb-4 place-self-center px-4 gap-4 grid grid-cols-1 sm:grid-cols-4  '>
        {reviews.map((review,i) =>
            <ReviewCard key={i} review={review}/>
        )}
    </div>
    );
  };
  
  export default ReviewList;
  