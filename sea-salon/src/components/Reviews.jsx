import React from 'react'
import ReviewCard from './ReviewCard'

const Reviews =  () => {
    // const reviews = await prisma.review.findMany()
    // async function fetchReviews() {
    //     try {
    //       const reviews = await prisma.review.findMany(); 
    //     } catch (error) {
    //       console.error('Error fetching reviews:', error);
    //     } finally {
    //       await prisma.$disconnect(); 
    //     }
    //   }
      
  return (
    <div>
        <h2 className='sm:text-2xl text-center mt-6'>Reviews</h2>
        {/* <div className='mt-6 px-4 gap-4 grid grid-cols-1 sm:grid-cols-3  '>
            {reviews.map(review =>
                <ReviewCard key={review.id} review={review}/>
            )}
        </div> */}
    </div>
  )
}

export default Reviews