"use client"
import TrashIcon from './icons/TrashIcon'
import ArrowIcon from './icons/ArrowIcon'
import CalendarIcon from './icons/CalendarIcon'
import ClockIcon from './icons/ClockIcon'
import BranchIcon from './icons/BranchIcon'
import UserIcon from './icons/UserIcon'
import ReservationDetail from './ReservationDetail';
import { useState } from 'react';

function ReservationCard({reservation, onDelete, user=false}) {
  const [showDetail, setShowDetail] = useState(false)

  const formatDate = (datetime) => {
    const [date, time] = datetime.split('T');
    return { date, time };
  };

  const formatTime = (time) => {
    const {hour, minute} = time;
    return hour + ':' + minute;
  };

  return (
    <div className='w-full'>
        {showDetail && (
            <div 
                onClick={e => setShowDetail(false)}
                className='fixed inset-0 bg-black/80 flex items-center justify-center'>
                <div onClick={e => e.stopPropagation()} className='p-4 bg-[#f3f2e9] rounded-md w-[250px]'>
                    <ReservationDetail reservation={reservation} formatDate={formatDate} formatTime={formatTime} />
                </div>
            </div>
        )}
        <div className="w-full h-full border-2 rounded-md bg-[#7fbc8c]">
          <div className="block">
            <article className="w-full h-full">
                <div className="px-6 py-5 h-full text-[15px]">
                    <p className="text-[15px] text-center font-semibold mb-2 line-clamp-3">{reservation.branchId.name}</p>
                    <div className='flex items-center gap-2'>
                      <BranchIcon/>
                      <p className="text-[15px] text-left text-gray-900 line-clamp-3">{reservation.branchId.name} - {reservation.branchId.location}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                      <CalendarIcon/>
                      <p className="text-[15px] text-left text-gray-900">{formatDate(reservation.date).date}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                      <ClockIcon/>
                      <p className="text-[15px] text-left text-gray-900">{formatTime(reservation.time)}</p>
                  </div>
                  {user && (<div className='flex items-center gap-2'>
                      <UserIcon/>
                      <p className="text-[15px] text-left text-gray-900">{reservation.userId.fullname}</p>
                  </div>)}
                    {onDelete && (
                      <div className='w-full flex justify-between'>
                        <button
                          onClick={e => onDelete(reservation)}
                          className='mt-4 bg-white w-[38px] rounded-md border-[1px] hover:bg-red-300 justify-center'>
                          <TrashIcon/>
                        </button>
                        <button
                          onClick={e => setShowDetail(true)}
                          className='mt-4 bg-white w-[38px] rounded-md border-[1px] hover:bg-green-300 justify-center'>
                          <ArrowIcon/>
                        </button>

                      </div>
                    )}
                </div>
            </article>
          </div>
        </div>
    </div>
  )
}

export default ReservationCard