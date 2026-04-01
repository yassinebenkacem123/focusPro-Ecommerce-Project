import { useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";

export default function SortDropdown({ 
  sortByOptions,
  onSelectSort
}: { 
  sortByOptions: { label: string; value: string, sortOrder?: string }[];
  onSelectSort:(sortBy: string, sortOrder: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="relative">
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-2 
        bg-orange-500 text-white cursor-pointer rounded-lg border-2 border-black"
      >
        <div className="flex items-center gap-2">
          <FaSortAmountDown  size={28}/>
          <span className="text-lg">
            {selected ? `Sort By: ${selected}` : "Sort By"}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-52 mt-2 bg-yellow-50 border border-black rounded-md shadow-lg">
          {sortByOptions.map(option => (
            <div
              key={option.value}
              onClick={() => {
                setSelected(option.label);

                onSelectSort(option.value, option.sortOrder || "asc");
                setIsOpen(false);
              }}
              className="p-2 cursor-pointer hover:bg-orange-500 hover:text-white text-stone-800"
            >
              Sort By: {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}