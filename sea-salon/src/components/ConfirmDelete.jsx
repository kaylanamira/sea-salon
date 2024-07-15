import React from 'react'

export default function ConfirmDelete({onDelete,onCancel}) {
  return (
    
<div >
    <h1 className="text-2xl mb-4">Are you sure you want to delete?</h1>
    <div className="flex space-x-2 mx-auto w-32 place-content-center">
        <button className="text-base" onClick={e => onCancel(false)} >Cancel</button>
        <button onClick={e => onDelete()}>Delete</button>
    </div>
</div>
 
  )
}
