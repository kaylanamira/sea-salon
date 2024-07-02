import React from 'react'

function ReviewCard({review}) {
    
  return (
    <div>
        <div className="w-50 h-full border-2 rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#c0ecca]">
        <a href="" className="block cursor-pointer">
            <article className="w-full h-full">
                <div className="px-6 py-5 text-left h-full">
                    <h1 className="text-[32px] mb-4">{review.rating}</h1>
                    <p className="text-xs mb-4 line-clamp-4">{review.comment}</p>
                </div>
            </article>
        </a>
        </div>
    </div>
  )
}

export default ReviewCard