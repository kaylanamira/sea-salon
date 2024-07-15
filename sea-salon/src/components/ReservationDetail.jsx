import CalendarIcon from './icons/CalendarIcon'
import ClockIcon from './icons/ClockIcon'
import BranchIcon from './icons/BranchIcon'
import ServiceIcon from './icons/ServiceIcon'

const ReservationDetail = ({ reservation, formatDate, formatTime }) => {
  return (
    <div>
        <p className="text-[15px] text-center font-semibold mb-2 line-clamp-3">Reservation</p>
        <div className='flex items-center gap-2'>
            <BranchIcon/>
            <p className="text-[15px] text-left text-gray-800 line-clamp-3">{reservation.branchId.name} - {reservation.branchId.location}</p>
        </div>
        <div className='flex items-center gap-2'>
            <CalendarIcon/>
            <p className="text-[15px] text-left text-gray-800">{formatDate(reservation.date).date}</p>
        </div>
        <div className='flex items-center gap-2'>
            <ClockIcon/>
            <p className="text-[15px] text-left text-gray-800">{formatTime(reservation.time)}</p>
        </div>
        <div className='flex items-center gap-2'>
            <ServiceIcon/>
            <p className="text-[15px] text-left text-gray-800">Services</p>
        </div>
        <div className='mt-2 ml-6 flex flex-col'>
            {reservation.services.length > 0  && 
                reservation.services.map((service,idx) => (
                    <p key={`service-${idx}`} className="text-[13px] text-gray-800 text-left">{service.name}</p>
                ))
            }
        </div>
    </div>
  )
}

export default ReservationDetail