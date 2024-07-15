import React from 'react'

function ReviewCard({review}) {
    
  return (
    <div>
        <div className="w-full h-full border-2 rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#7fbc8c]">
          <div className="block">
            <article className="w-full h-full">
                <div className="px-6 py-5 h-full">
                    <h1 className="text-[25px] text-center mb-4">{review.rating}/5</h1>
                    <p className="text-[15px] text-left font-semibold line-clamp-4">"{review.comment}"</p>
                </div>
            </article>
          </div>
        </div>
    </div>
  )
}

export default ReviewCard