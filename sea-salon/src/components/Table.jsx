import React from 'react'
import Link from 'next/link'
import TrashIcon from './icons/TrashIcon'

const Table = ({tableInfo, onContentDelete}) => {
  return (
    <table className='bg-white border-2'>
        <thead className='p-4 text-center border-2'>
            <tr>
                {tableInfo.thead.map((head,i)=>
                    <td key={`head-${i}`} >{head}</td>
                )}
            </tr>
        </thead>
        <tbody className='p-4 text-center'>
            {tableInfo.tbody.map((item,i) => (
                <tr className='border-2 h-12 items-center' key={i}>
                    {tableInfo.tbodyprops.map((prop,idx) => (
                        <td key={`row${i}-col${idx}`} className='text-[14px]'>
                            {typeof item[prop] === 'object' ? `${item[prop].hour}:${item[prop].minute}` : item[prop]}
                        </td>
                    ))}
                    <td className='flex flex-row gap-2 justify-center place-self-center mt-1 mb-1'>
                        {/* <Link href="/admin" className='border-2 bg-white text-md'>View</Link> */}
                        {/* <button onClick={e => onContentDelete(item['_id']) }>Delete</button> */}
                        <button onClick={e => onContentDelete(item['_id']) }>
                            <TrashIcon/>
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
       </table>
  )
}

export default Table