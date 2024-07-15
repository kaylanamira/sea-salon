"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
// import { revalidatePath } from 'next/cache';

export default function ReviewForm() {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const res = await fetch('http://localhost:3000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating:parseInt(rating) , comment, userId: session?.user?._id  }),
    });
    if (res.ok) {
      const newReview = await res.json();
      setSuccess(true);
      setError("");
      setRating(1);
      setComment("");
      // onReviewChange((prevReviews) => [...prevReviews, newReview]);
    } else {
      const errorMsg = await res.text();
      setError(errorMsg || "Error submitting review");
      setSuccess(false);
    }
  };

  return (
    <div className='m-3 max-w-md mx-auto text-center '>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <input
          type="number"
          placeholder="Rating"
          className="input-custom"
          value={rating}
          min={1}
          max={5}
          required
          onChange={(e) => setRating(e.target.value)}
        />
        <textarea
          type='text'
          placeholder="Comment"
          className="input-custom"
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Submit Review</button>
        {success && <p className="text-green-400">Review submitted successfully!</p>}
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}
