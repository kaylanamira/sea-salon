import React from 'react'
import ReviewCard from './ReviewCard'

const HomeReview = () => {
    const reviews = [
        {id: 1, rating:2, comment:"very nice service"},
        {id: 2, rating:2, comment:"very nice service"},
        {id: 3, rating:2, comment:"very nice service"},
    ]
  return (
    <section>
      <div className='text-center font-semibold'>
        <h3 >What Do People Say About Us</h3>
      </div>
      <div className='mt-6 mb-6 px-4 gap-4 grid grid-cols-1 sm:grid-cols-3  '>
            {reviews.map(review =>
                <ReviewCard key={review.id} review={review}/>
            )}
        </div>
    </section>
  )
}

export default HomeReview
