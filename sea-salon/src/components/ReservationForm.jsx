"use client"
import { useEffect,useState } from 'react';
import Dropdown from '@/components/Dropdown';
import MultiDropdown from './MultiDropdown';

export default function ReservationForm({onFormSubmit,user}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBranches = async () => { 
        try {
            const res = await fetch('/api/branch');
            if (!res.ok) {
                throw new Error("Failed to fetch branch");
            }
            const data = await res.json();
            setBranches(data);
            if (data.length > 0){
                const branch = data[0]
                const services = branch.services
                setSelectedBranch(branch);
                setServices(services)
                setMinTime(branch.openTime);
                setMaxTime(branch.closeTime);
            }
        } catch (error) {
            console.error("Error fetching branch:", error);
        } 
    };          
    
      fetchBranches();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const [newdate, time] = date.split('T');
    const [hour, minute] = time.split(':');

    // const newReservation = { userId:user._id,
    //       branchId:selectedBranch._id, 
    //       services:selectedService, 
    //       datetime:date};
    const parsed = parseInt(time.hour, 10)
    if (parsed <  parseInt(selectedBranch.openTime.hour, 10) || parsed >  parseInt(selectedBranch.closeTime.hour, 10)){
      setError('Reservation must be in operating hour')
      return
    }
    const newReservation = { userId:user._id,
          branchId:selectedBranch._id, 
          services:selectedService, 
          date:newdate,
          time:{ hour, minute }};
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReservation),
    });

    if (res.ok) {
      setSuccess(true);
      setError('')
      onFormSubmit(newReservation)
    } else {
        const errorMsg = await res.text();
        setError(errorMsg || "Error submitting reservation");
        setSuccess(false);
    }
  };
  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
    setServices(branch.services)
    setSelectedService('')
    setMinTime(branch.openTime);
    setMaxTime(branch.closeTime);
  }
  const formatTime = (time) => {
    const { hour, minute } = time;
    return `${hour}:${minute}`;
  };

  return (
    <div className=' m-3 mx-auto text-center justify-center'>
      <h1 className='text-lg mb-4 font-semibold'>Create Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 w-full gap-2 mb-4'>
          <div className='flex flex-col space-y-4 items-center'> 
            <input
              type="text"
              placeholder="Customer's name"
              className="input-custom "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Customer's phone"
              className="input-custom"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="datetime-local"
              placeholder="Date"
              className="p-2 outline-none w-full bg-white border-2 h-12"
              value={date}
              min={`${date.split('T')[0]}T${formatTime(minTime)}`}
              max={`${date.split('T')[0]}T${formatTime(maxTime)}`}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className='flex flex-col space-y-4 items-center'>
            <Dropdown title='Branch' option={branches} props='name' selectedItem={selectedBranch} onSelectChange={handleBranchChange} />
            <MultiDropdown title='Service' option={services} props='name' selectedItem={selectedService} onSelectChange={setSelectedService} />
          </div>
        </div>
        <button onClick={handleSubmit}>Submit Reservation</button>
        {success && (
            <div className='text-center mt-3'>
                Login success!
            </div>
        )}
        {error !== '' && <div className='text-center my-2 text-red-400'>
            {error}
        </div>}
      </form>
    </div>
  );
}
