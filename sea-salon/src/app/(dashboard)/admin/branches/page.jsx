"use client"
import Branchform from '@/components/Branchform'
import Search from '@/components/Search'
import { useEffect, useState } from 'react';
import Table from '@/components/Table'
import ConfirmDelete from '@/components/ConfirmDelete'

export default function AdminBranchPage() {
    const [branches, setBranches] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState('');
    const [showPopUp, setShowPopUp] = useState(false)
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [error, setError] = useState("");
    
    const tableInfo = {
        thead: ["Name", "Location", "Open Time", "Close Time", "Action"],
        tbody: branches,
        tbodyprops: ['name', 'location', 'openTime', 'closeTime']
    }
    
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

    const handleFormSubmit = (branch) => {
      setShowPopUp(false)
      setBranches([...branches,branch])
      return
    }

    const handleBranchDelete = async () => {

      const res = await fetch('http://localhost:3000/api/branch', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({_id:selectedBranchId}),
      });
      if (res.ok) {
          setError("");
          setBranches(prevBranches => prevBranches.filter(branch => branch['_id'] !== selectedBranchId));
          setShowDeleteModal(false)
      } else {
          const errorMsg = await res.text();
          setError(errorMsg || "Error deleting branch");
      }
    }

    const handleTrashClick = (branch) => {
      setShowDeleteModal(true)
      setSelectedBranchId(branch)
  }

    if (loading) {
      return <div>Loading branches...</div>;
    }
    
    return (
      <section className='w-full gap-4 flex flex-col'>
        {showPopUp && (
            <div 
                onClick={e => setShowPopUp(false)}
                className='fixed inset-0 bg-black/80 flex items-center justify-center'>
                <div onClick={e => e.stopPropagation()} className='p-4 bg-[#f3f2e9] rounded-md'>
                    <Branchform onFormSubmit={handleFormSubmit} />
                </div>
            </div>
        )}
        {showDeleteModal && (
            <div 
                onClick={e => setShowDeleteModal(false)}
                className='fixed inset-0 bg-black/80 flex items-center justify-center z-10'>
                <div onClick={e => e.stopPropagation()} className='p-4 bg-[#f3f2e9] rounded-md'>
                    <ConfirmDelete onDelete={handleBranchDelete} onCancel={setShowDeleteModal} />
                </div>
            </div>
        )}
        <h1 className='place-self-start text-2xl font-semibold'>Branches</h1>
        <div className='h-10 flex flex-row align-center justify-between gap-4'>
            <Search placeholder='Search' />
            <button onClick={(e)=>setShowPopUp(true)} className='h-10 p-2 rounded-md'>Add</button>
       </div>
       <Table tableInfo={tableInfo} onContentDelete={handleTrashClick} />
     </section>
    );
  }
  