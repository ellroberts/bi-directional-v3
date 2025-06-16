import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { FaChevronDown } from "react-icons/fa";

const FILTER_OPTIONS = ["Commercial", "Education", "Government", "Non-profit"];

export default function TypeMultiSelect() {
  const [selected, setSelected] = useState([]);

  const toggle = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <Popover.Root>
      <Popover.Trigger className="inline-flex items-center justify-between px-3 py-2 border bg-white rounded text-sm w-[160px]">
        <span>{selected.length > 0 ? `${selected.length} selected` : "Select"}</span>
        <FaChevronDown className="text-xs ml-1" />
      </Popover.Trigger>

      <Popover.Content
  className="bg-white border rounded shadow p-2 z-50 min-w-[var(--radix-popover-trigger-width)]"
  sideOffset={4}
>
        {FILTER_OPTIONS.map((label) => (
          <label
            key={label}
            className="flex items-center gap-2 py-1 px-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(label)}
              onChange={() => toggle(label)}
              className="accent-black"
            />
            {label}
          </label>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
}
