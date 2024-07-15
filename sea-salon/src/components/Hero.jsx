import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Hero = () => {
  return (
    // <div>
      <section className='grid grid-cols-1 sm:grid-cols-12 mt-6 mb-6'>
        <div className='flex flex-col items-center sm:items-start col-span-7 gap-10 place-self-center text-center sm:text-left justify-self-start'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl md:leading-normal font-semibold'>Beauty and Elegance Redefined</h1>
            <Link href="/register" className='h-12 w-2/5 lg:w-1/5 text-center border-2 p-2.5 bg-[#7fbc8c] hover:bg-[#6a9f75] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6a9f75]'>Get Started</Link>
        </div>
        <div className='col-span-5 place-self-center mt-3'>
            <Image 
            className="w-full h-full border-2 shadow-[8px_8px_0px_rgba(0,0,0,1)]"
            src="/beauty.jpg" width={300} height={300} alt='' />
        </div>
      </section>
    // </div>
  )
}

export default Hero
