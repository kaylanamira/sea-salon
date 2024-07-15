import { useState } from "react";

const MultiDropdown = ({title, option, props, selectedItem='', onSelectChange=null}) => {
    const [open, setOpen] = useState(false);

    const handleItemClick = (item) =>  {
        if (selectedItem.includes(item)) {
            onSelectChange(selectedItem.filter(i => i !== item));
        } else {
            onSelectChange([...selectedItem, item]);
        }
        // setOpen(false)
    }

    const isItemSelected = (item) => {
        return selectedItem.includes(item);
    };
    // console.log(selectedItem)
  return (
    <div className="w-full">
        <div className="relative inline-block text-left">

            <button onClick={() => setOpen(!open)} 
            id="dropdownCheckboxButton" 
            data-dropdown-toggle="dropdownDefaultCheckbox" 
            className="inline-flex h-12 w-72 gap-x-1.5 justify-between bg-white hover:bg-[#75a17e] px-3 py-2  border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" 
            type="button">
                {title}
            <svg
                className="mt-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
                />
            </svg>
            </button>

            <div id="dropdownDefaultCheckbox" className={`z-10 w-72 absolute right-0 mt-2 origin-top-right bg-white focus:outline-none border-2 ${!open ? 'hidden' : ''} `}>
                <ul className="" aria-labelledby="dropdownCheckboxButton">
                    {option.map((item,idx) => (
                        <li key={idx} id={`multimenu-item-${idx}`} onClick={e => handleItemClick(item)}>
                            <div className="px-2 flex items-center border-b-2 hover:bg-[#6a9f75] cursor-pointer">
                                <input 
                                    id="checkbox-item-2" 
                                    type="checkbox" 
                                    checked={isItemSelected(item)}
                                    onChange={() => handleItemClick(item)}
                                    className="w-4 h-4 p-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 cursor-pointer"/>
                                <label for="checkbox-item-2" className="px-4 py-2 text-sm  hover:font-medium">{item[props]}</label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    </div>
  )
}

export default MultiDropdown