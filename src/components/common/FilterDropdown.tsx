import { useState } from "react";
import arrowDown from "../../assets/images/vendorImages/arrow-down.svg";

interface FilterDropdownProps {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

const FilterDropdown = ({ value, options, onChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 bg-[#262525] py-2 px-3.5 text-[#ECECEC] text-[16px] rounded-[30px] cursor-pointer"
      >
        <p>{value}</p>
        <img src={arrowDown} alt="" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-20 min-w-32 bg-[#1A1A1A] border border-[#262525] rounded-2xl p-1.5 shadow-2xl">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] transition-colors hover:bg-[#262525] ${
                  option === value ? "text-white" : "text-[#ABABAB]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterDropdown;
