import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { FaSearch } from "react-icons/fa";
import SegmentSelect from "./SegmentSelect";

// Mock condition – replace with real logic or prop
const isSegmentEligible = true;
const eligibleSegments = ["commercial", "education", "nonprofit"]; // adjust based on user

export default function TopSection() {
  return (
    <div className="w-full space-y-4 mb-10">
      <h2 className="text-2xl font-bold">Services</h2>

      <div className="flex flex-wrap items-end justify-between gap-6">

        {/* View Filter */}
        <div>
          <div className="text-sm font-medium mb-1">View</div>
          <RadioGroup.Root defaultValue="popular" className="flex gap-6" aria-label="View Filter">
            {[
              { label: "Popular (500)", value: "popular", bold: true },
              { label: "All (1000)", value: "all", bold: false },
            ].map(({ label, value, bold }) => (
              <RadioGroup.Item key={value} value={value} className="flex items-center gap-2 cursor-pointer group">
                <div className="h-4 w-4 rounded-full border border-gray-400 group-data-[state=checked]:bg-black" />
                <span className={bold ? "font-semibold" : ""}>{label}</span>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </div>

        {/* Selected only checkbox */}
        <div>
          <div className="text-sm font-medium mb-1 invisible">Label</div>
          <label className="inline-flex items-center space-x-2 text-sm font-medium">
            <input type="checkbox" className="form-checkbox h-4 w-4" />
            <span>Selected only</span>
          </label>
        </div>

        {/* Segment Dropdown (conditionally rendered) */}
        {isSegmentEligible && (
          <div>
            <div className="text-sm font-medium mb-1">Customer segment</div>
            <select
              defaultValue="commercial"
              className="border border-gray-300 rounded px-3 py-2 text-sm w-48"
            >
              {eligibleSegments.includes("commercial") && (
                <option value="commercial">Commercial</option>
              )}
              {eligibleSegments.includes("education") && (
                <option value="education">Education</option>
              )}
              {eligibleSegments.includes("nonprofit") && (
                <option value="nonprofit">Non-profit</option>
              )}
            </select>
          </div>
        )}

        {/* Search Field */}
        <div className="relative">
          <div className="text-sm font-medium mb-1">Search</div>
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded px-3 py-2 text-sm w-48 pr-8"
          />
          <FaSearch className="absolute right-2 bottom-2 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
