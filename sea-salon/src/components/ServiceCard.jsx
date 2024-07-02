import React from 'react'

const ServiceCard = ({name, source}) => {
  return (
    <div class="w-50 border-2 block cursor-pointer rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white">
       <article class="w-full">
          <figure class="w-full h-1/2 border-black border-b-2">
             <img
                src={source}
                alt="thumbnail"
                class="w-full h-full object-cover"
                />
          </figure>
          <div class="px-6 py-5 text-left">
             <h1 class="text-[20px] mb-4">{name}</h1>
          </div>
       </article>
 </div>
  )
}

export default ServiceCard
