"use client"
import { useEffect, useState } from 'react';
import ClockIcon from '@/components/icons/ClockIcon'
import BranchIcon from '@/components/icons/BranchIcon'
import ArrowIcon from '@/components/icons/ArrowIcon'

export default function BranchPage() {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [loading, setLoading] = useState(true);
    const [showDetail, setShowDetail] = useState(false)
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
          } catch (error) {
            console.error("Error fetching branch:", error);
          } finally {
            setLoading(false);
          }
      };
  
      fetchBranches();
    }, [])

    if (loading) {
        return <div>Loading branches...</div>;
      }

    const handleDetailClick = (branch) => {
      setShowDetail(true)
      setSelectedBranch(branch)
    }

    return (
      <section className="w-3/4">
        <div className='text-center text-3xl'>
          <h3>Our Branch</h3>
        </div>
        <section className=' mt-6 mb-6 gap-6'>
          {showDetail && (
              <div 
                  onClick={e => setShowDetail(false)}
                  className='fixed inset-0 bg-black/80 flex items-center justify-center'>
                  <div onClick={e => e.stopPropagation()} className='p-4 bg-[#f3f2e9] rounded-md w-[250px]'>
                      <p className='font-semibold text-gray-800 text-center'>Services</p>
                      {selectedBranch.services.length > 0 && selectedBranch.services.map((service,idx) => (
                        <div key={`service-${idx}`}> 
                          <p>{service.name} - {service.duration} minutes</p>
                        </div>
                      ))}
                  </div>
              </div>
          )}
            <div className='grid grid-cols-4 gap-4'>
            {branches.length > 0 && branches.map((branch,idx) => (
                <div className="w-full h-full border-2 rounded-md bg-[#7fbc8c]" key={`branch-${idx}`}>
                <div className="block">
                  <article className="w-full h-full">
                      <div className="px-6 py-5 h-full text-[15px]">
                          <p className="text-[15px] text-center font-semibold mb-2 line-clamp-3">{branch.name}</p>
                          <div className='flex items-center gap-2'>
                            <BranchIcon/>
                            <p className="text-[15px] text-left text-gray-900 line-clamp-3">{branch.location}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <ClockIcon/>
                            <p className="text-[15px] text-left text-gray-900">{branch.openTime.hour}:{branch.openTime.minute} - {branch.closeTime.hour}:{branch.closeTime.minute}</p>
                        </div>
                        <button
                          onClick={e => handleDetailClick(branch)}
                          className='mt-4 bg-white w-[38px] rounded-md border-[1px] hover:bg-green-300 justify-center'>
                          <ArrowIcon/>
                        </button>
                      </div>
                  </article>
                </div>
              </div>
            ))}
           </div>
        </section>
      </section>
    );
  }
  