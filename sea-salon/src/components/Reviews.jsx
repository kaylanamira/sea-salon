import React from 'react'
import Image from 'next/image'
import ReviewForm from '../app/reviews/ReviewForm'
import ReviewCard from './ReviewCard'

export default async function Reviews({ initialReviews }){
  
  return (
    <section className='grid grid-cols-1 sm:grid-row-2 mt-6 mb-6 gap-6'>
      <div className='mt-4 place-self-center px-4 gap-4 grid grid-cols-1 sm:grid-cols-4  '>
            {initialReviews.map(review =>
                <ReviewCard key={review.id} review={review}/>
            )}
        </div>
      <div> 
        <h1 className='mt-6 text-2xl md:leading-normal font-medium'>Create Review</h1>
        <div className="grid grid-cols-2 gap-4">
          <Image
            className="place-self-center w-full h-full border-2 shadow-[8px_8px_0px_rgba(0,0,0,1)]"
            src="/review.png"
            width={400}
            height={200}
            alt="review image"
          />
          <ReviewForm initialReviews={initialReviews}/>
        </div>
      </div>
    </section>
  )
}