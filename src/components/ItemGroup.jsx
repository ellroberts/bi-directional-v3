import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import AddonTableRow from "./AddonTableRow";

export default function ItemGroup({ group, selectedCount }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const showSelectedCount = !isOpen && selectedCount > 0;

  return (
    <div className="border-b pb-4 mb-6">
      {/* Header */}
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {isOpen ? (
            <FaChevronDown className="text-sm mt-1" />
          ) : (
            <FaChevronRight className="text-sm mt-1" />
          )}
          <div className="flex flex-col">
            <div className="font-semibold truncate">{group.name}</div>
            <div className="text-sm text-gray-500">
              {group.options.length} options available
            </div>
          </div>
        </div>

        {showSelectedCount && (
          <div className="text-sm font-semibold text-black whitespace-nowrap ml-4">
            {selectedCount} selected
          </div>
        )}
      </div>

      {/* Expanded Options */}
      {isOpen && group.options.length > 0 && (
        <div className="mt-3 space-y-3 bg-gray-100 rounded-md px-4 py-3 mx-2">
          {/* Table Header */}
          <div className="flex text-sm font-semibold text-gray-700 border-b pb-2">
            <div className="w-[72px] px-1">Option</div>
            <div className="w-[80px] px-1">Term</div>
            <div className="w-[80px] px-1">Billing</div>
            <div className="flex-grow px-1">Licence</div>
            <div className="w-[48px] ml-2 mr-4 text-left px-1">Price</div>
            <div className="w-[88px] px-1"></div>
          </div>

          {/* Table Rows */}
          {group.options.map((opt, idx) => (
            <AddonTableRow
              key={opt.id}
              index={idx}
              groupId={group.id}
              option={opt}
              isLast={idx === group.options.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
