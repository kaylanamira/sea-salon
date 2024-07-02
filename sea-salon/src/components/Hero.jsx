import React from 'react'

const Hero = () => {
  return (
    <div>
      <section className='grid grid-cols-1 sm:grid-cols-12 mt-6'>
            <div className='col-span-7 w-full place-self-center text-center sm:text-left justify-self-start'>
                <h1 className='text-2xl sm:text-4xl md:text-5xl md:leading-normal font-semibold'>Beauty and Elegance Redefined</h1>
                <button className='h-12 mt-5 border-black border-2 p-2.5 bg-[#7fbc8c] hover:bg-[#6a9f75] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6a9f75]'>Get Started</button>
            </div>
            <div className='col-span-5 place-self-center mt-3'>
                {/* <Image src="" width={300} height={300} alt='' /> */}
            </div>
          </section>
    </div>
  )
}

export default Hero
