import React from 'react'

const ServiceCard = ({name, source}) => {
  return (
    <div className="w-50 border-2 block cursor-pointer rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white">
       <article className="w-full">
          <figure className="w-full h-1/2 border-black border-b-2">
             <img
                src={source}
                alt="thumbnail"
                className="w-full h-full object-cover"
                />
          </figure>
          <div className="px-6 py-5 text-left">
             <p className=" text-[18px] md:text-[20px] mb-4">{name}</p>
          </div>
       </article>
 </div>
  )
}

export default ServiceCard
