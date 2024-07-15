"use client"
import ServiceForm from '@/components/ServiceForm'
import Dropdown from '@/components/Dropdown'
import { useEffect, useState } from 'react';
import Table from '@/components/Table'

export default function AdminServicePage() {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [showPopUp, setShowPopUp] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
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
                    setSelectedBranch(data[0]);
                }
            } catch (error) {
                console.error("Error fetching branch:", error);
            } finally {
                setLoading(false);
            }
        };          
        
        fetchBranches();
    }, [])
    
    const tablecontent = selectedBranch !== '' ? selectedBranch.services : []
    const tableInfo = {
        thead: ["Service Name", "Duration", "Action"],
        tbody: tablecontent,
        tbodyprops: ['name', 'duration']
    }

  const handleFormSubmit = (service) => {
    const updatedBranch = {
    ...selectedBranch,
    services: [...selectedBranch['services'], service]
    };
    const updatedBranches = branches.map(branch =>
    branch._id === updatedBranch._id ? updatedBranch : branch
);
    setShowPopUp(false)
    setBranches(updatedBranches);
    setSelectedBranch(updatedBranch);
  }

    const handleServiceDelete = async (service_id) => {
        const updatedServices = selectedBranch.services.filter(service => service._id !== service_id)
        const res = await fetch('http://localhost:3000/api/branch', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({_id:selectedBranch['_id'], services:updatedServices}),
        });
        if (res.ok) {
            const updatedBranch = {
                ...selectedBranch,
                services: updatedServices
            };
            const updatedBranches = branches.map(branch =>
                branch._id === updatedBranch._id ? updatedBranch : branch
            );
            setBranches(updatedBranches);
            setSelectedBranch(updatedBranch);
            setError("");
        } else {
            const errorMsg = await res.text();
            setError(errorMsg || "Error deleting branch");
        }
    }

  if (loading) {
    return <div>Loading services...</div>;
  }

    return (
      <section className='w-full gap-4 flex flex-col'>
        {showPopUp && (
            <div 
                onClick={e => setShowPopUp(false)}
                className='fixed inset-0 bg-black/80 flex items-center justify-center z-10'>
                <div onClick={e => e.stopPropagation()} className='p-4 bg-[#f3f2e9] rounded-md'>
                    <ServiceForm onFormSubmit={handleFormSubmit} branch={selectedBranch} />
                </div>
            </div>
        )}
        <h1 className='place-self-start text-2xl font-semibold'>Services</h1>
        <div className='h-10 flex flex-row align-center justify-between gap-4'>
            <Dropdown title='Branch' option={branches} props='name' selectedItem={selectedBranch} onSelectChange={setSelectedBranch} />
            <button onClick={(e)=>setShowPopUp(true)} className='h-10 p-2 rounded-md'>Add</button>
       </div>
       <Table tableInfo={tableInfo} onContentDelete={handleServiceDelete} />
     </section>
    );
  }
  