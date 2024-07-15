import React from 'react'
import ReviewList from './ReviewList'
const HomeReview = () => {
  
  return (
    <section className='w-full p-8 m-6 justify-items-center'>
      <div className='text-center font-semibold text-3xl'>
        <h3>What Do People Say About Us</h3>
      </div>
      <ReviewList limit={4} />
    </section>
  )
}

export default HomeReview
