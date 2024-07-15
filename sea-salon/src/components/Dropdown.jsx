import { useState } from "react";

const Dropdown = ({title, option, props, selectedItem='', onSelectChange=null}) => {
  const [open, setOpen] = useState(false);

  const handleItemClick = (item) =>  {
    onSelectChange(item)
    setOpen(false)
  }

  return (
    <div className="w-full">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex h-12 w-72 gap-x-1.5 justify-between bg-white hover:bg-[#75a17e] px-3 py-2  border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setOpen(!open)}
          >
            {selectedItem === '' ? title : selectedItem[props]}
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
        </div>

        <div
          className={`z-10 w-72 absolute right-0 mt-2 origin-top-right bg-white focus:outline-none border-2 ${!open ? 'hidden' : ''} `}
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div>
            {option.length === 0 && 
                <div
                    className="block px-4 py-2 text-sm border-b-2 hover:bg-[#6a9f75] hover:font-medium"
                    id={`menu-item-empty`}
                >
                    No {title} Yet
                </div>}
            {option.map((item,idx) => (
                <div
                    onClick={e => handleItemClick(item)}
                    className="block px-4 py-2 text-sm border-b-2 hover:bg-[#6a9f75] hover:font-medium"
                    id={`menu-item-${idx}`}
                    key={idx}
                >
                    {item[props]}
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;


  