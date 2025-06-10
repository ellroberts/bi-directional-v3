import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { FaChevronDown, FaTimes } from "react-icons/fa";

const SEGMENT_OPTIONS = ["Commercial", "Education", "Government", "Non-profit"];

export default function SegmentSelect() {
  const [selected, setSelected] = useState("Commercial");

  const handleClear = () => setSelected("");

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="flex h-10 w-[200px] items-center justify-between rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Select Customer Segment"
        >
          {selected ? (
            <span className="flex items-center gap-2">
              {selected}
              <FaTimes
                className="text-xs cursor-pointer hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              />
            </span>
          ) : (
            <span className="text-gray-500">Select segment</span>
          )}
          <FaChevronDown className="text-xs ml-auto" />
        </button>
      </Popover.Trigger>

      <Popover.Content
        className="bg-white border rounded shadow p-2 w-[200px] z-50"
        align="start"
        sideOffset={4}
      >
        <ul className="space-y-1">
          {SEGMENT_OPTIONS.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer text-sm"
            >
              {option}
            </li>
          ))}
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
}
