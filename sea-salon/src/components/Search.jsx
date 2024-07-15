import React from 'react'
import SearchIcon from './icons/SearchIcon'

export default function Search({placeholder, value=null}){
  return (
    <div className='w-[300px] rounded-md h-full border-2 p-2.5 flex items-center gap-2 active:outline-1 bg-white'>
        <SearchIcon/>
        <input type="text" placeholder={placeholder} className='w-full outline-none' value={value}/>
    </div>
  )
}
