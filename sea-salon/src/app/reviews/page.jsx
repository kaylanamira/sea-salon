"use client"
import ReviewForm from './ReviewForm';
import ReviewList from '@/components/ReviewList';
import Image from 'next/image';

export default function ReviewPage() {
    return (
      <section className="w-3/4">
        <div className='text-center text-3xl'>
          <h3>What Our Customer Say About Us</h3>
        </div>
        <section className=' grid grid-cols-1 sm:grid-row-2 mt-6 mb-6 gap-6'>
          <ReviewList limit={4}/>
          <h1 className='mt-6 mb-4 text-2xl md:leading-normal font-medium'>Create Review</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between ">
            <Image
              className="w-full h-full border-2 shadow-[8px_8px_0px_rgba(0,0,0,1)]"
              src="/review.png"
              width={100}
              height={100}
              alt="review image"
            />
            <ReviewForm/>
          </div>
        </section>
      </section>
    );
  }
  