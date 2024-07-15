"use client"
import { useState } from 'react';

const ServiceForm = ({onFormSubmit, branch}) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [service, setService] = useState({ name: '', duration: '' })

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await fetch('http://localhost:3000/api/branch', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({_id:branch['_id'], services:[...branch['services'], service]}),
          });
          
          if (res.ok) {
            setSuccess(true);
            setError("");
            onFormSubmit(service);
            setService({name:'', duration:''})
          } else {
            const errorMsg = await res.text();
            setError(errorMsg || "Error adding service");
            setSuccess(false);
          }
    }

  return (
    <div className='m-3 max-w-md mx-auto text-center'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 items-center'>
            <input
                type="text"
                placeholder="Service name"
                className="input-custom"
                value={service.name}
                required
                onChange={(e) => setService({ ...service, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Service duration (minutes)"
                className="input-custom"
                value={service.duration}
                min={0}
                required
                onChange={(e) => setService({ ...service, duration: e.target.value })}
            />
            <button onClick={handleSubmit}>Add Service</button>
            {success && <p className="text-green-400">Service added successfully!</p>}
            {error && <p className="text-red-400">{error}</p>}
        </form>
    </div>
  )
}

export default ServiceForm
