"use client"
import { useState } from 'react';
import TrashIcon from '@/components/icons/TrashIcon'

const Branchform = ({onFormSubmit}) => {
    const [branch, setBranch] = useState({name:'',location:'',openTime:'',closeTime:'', services: []})
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [service, setService] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await fetch('http://localhost:3000/api/branch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({...branch,services:service}),
          });
          
          if (res.ok) {
            setSuccess(true);
            setError("");
            onFormSubmit(branch);
            setBranch({name:'',location:'',openTime:'',closeTime:'',services:[]})
          } else {
            const errorMsg = await res.text();
            setError(errorMsg || "Error submitting branch");
            setSuccess(false);
          }
    }
    
    function addService(){
        setService(oldServices => {
            return [...oldServices, {name:'', duration:0}]
        })
    }

    function deleteService(idx){
        setService(oldServices => {
            return oldServices.filter((_,i) => i !== idx)
        })
    }

    function editService(e,i,prop){
        const newValue = e.target.value
        setService(oldServices => {
            const newServices = oldServices
            newServices[i][prop] = newValue
            return newServices
        })
    }

  return (
    <div className='m-3 max-w-md mx-auto text-center'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 items-center'>
            <input
                type="text"
                placeholder="Name"
                className="input-custom"
                value={branch.name}
                required
                onChange={(e) => setBranch({ ...branch, name: e.target.value })}
            />
            <textarea
                type='text'
                placeholder="Location"
                className="input-custom"
                value={branch.location}
                required
                onChange={(e) => setBranch({ ...branch, location: e.target.value })}
            />
            <div className='grid grid-cols-2 w-full gap-2'>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Opening time:</label>
                    <div class="relative">
                    <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                        </svg>
                    </div>
                    <input 
                        type="time" 
                        id="open-time" 
                        name="time"
                        className="bg-white border-2 leading-none border-gray-300 text-gray-900 text-sm outline-none block w-full p-2.5 " 
                        value={branch.openTime} 
                        required 
                        onChange={(e) => setBranch({ ...branch, openTime: e.target.value })}/>
                </div>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Closing time:</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <input 
                            type="time" 
                            id="close-time" 
                            name="time"
                            className="bg-white border-2 leading-none border-gray-300 text-gray-900 text-sm outline-none block w-full p-2.5 " 
                            min="09:00" 
                            max="21:00" 
                            value={branch.closeTime} 
                            required 
                            onChange={(e) => setBranch({ ...branch, closeTime: e.target.value })}/>
                    </div>
                </div>
            </div>
            <div className='bg-white border-2 w-full p-2'>
                <div className='flex flex-row align-middle justify-between'>
                    <label>Services</label>
                    <button type='button' onClick={addService} className='m-0 p-0 h-6 w-12'>Add</button>

                </div>
                {service?.length > 0  && service.map((_,idx)=>(
                    <div className='w-full flex gap-2 mt-2' key={idx}> 
                        <input type="text" placeholder='Service name' value={service.name} className='border-2 p-1 w-1/2 outline-none' onChange={e => editService(e, idx, 'name')}/>
                        <input type="number" placeholder='Service duration' value={service.duration} className='border-2 p-1 w-1/2 outline-none' onChange={e => editService(e, idx, 'duration')}/>
                        <button type='button' onClick={e => deleteService(idx)} className='m-0 p-2 w-10'>
                            <TrashIcon/>
                        </button>
                    </div>
                ) )}
            </div>
            <button type="submit">Add Branch</button>
            {success && <p className="text-green-400">Branch added successfully!</p>}
            {error && <p className="text-red-400">{error}</p>}
        </form>
    </div>
  )
}

export default Branchform
