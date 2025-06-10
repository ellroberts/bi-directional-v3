import React, { useEffect, useState } from "react";
import { usePlan } from "./PlanContext";
import { FaTrash } from "react-icons/fa";

export default function AddonTableRow({ option, index, groupId, isLast }) {
  const { selected, addOrUpdate, remove } = usePlan();

  const current = selected[groupId]?.[option.id];
  const minQty = option.min || 0;
  const committedQty = current?.qty ?? null;
  const [inputQty, setInputQty] = useState(committedQty ?? minQty);

  useEffect(() => {
    const fallback = option.min || 0;
    setInputQty(committedQty ?? fallback);
  }, [committedQty, option.min]);

  const parsedQty = Number(inputQty);
  const isQtyNumber = !isNaN(parsedQty);
  const isValid = isQtyNumber && parsedQty >= minQty;
  const hasChanged = isQtyNumber && parsedQty !== committedQty;

  const handleSave = () => {
    const newQty = parsedQty === 0 && !current ? 1 : parsedQty;
    if (isQtyNumber && newQty >= minQty) {
      addOrUpdate(groupId, option.id, {
        ...option,
        qty: newQty,
      });
    }
  };

  const handleRemove = () => {
    remove(groupId, option.id);
  };

  return (
    <div className="grid grid-cols-6 lg:grid-cols-[64px_110px_90px_1fr_70px_70px] gap-2 px-4 items-center text-sm py-3">
      <div>{index + 1}</div>
      <div>{option.term}</div>
      <div>{option.billing}</div>

      {/* Licence control */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border border-black overflow-hidden text-sm h-[32px]">
          <button
            disabled={!isQtyNumber || parsedQty <= minQty}
            onClick={() => isQtyNumber && setInputQty(parsedQty - 1)}
            className={`px-2 text-sm h-full bg-white ${
              !isQtyNumber || parsedQty <= minQty
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500"
            }`}
          >
            −
          </button>

          <input
            type="number"
            inputMode="numeric"
            value={inputQty}
            onChange={(e) => setInputQty(e.target.value)}
            className="h-full w-[52px] text-center border-x border-black bg-white text-sm font-medium focus:outline-none
              [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

          <button
            onClick={() => isQtyNumber && setInputQty(parsedQty + 1)}
            className="px-2 text-sm text-black h-full bg-white"
          >
            +
          </button>
        </div>

        {option.min ? (
          <div className="text-xs text-gray-500 whitespace-nowrap">Min {option.min}</div>
        ) : null}
      </div>

      <div className="text-left">£{option.price}</div>

      <div>
        {current && hasChanged ? (
          <button
            className="w-full h-[32px] text-sm text-white px-2 rounded-md"
            style={{ backgroundColor: "#A34796" }}
            onClick={handleSave}
            disabled={!isValid}
          >
            Update
          </button>
        ) : current ? (
          <button
            className="w-full h-[32px] flex items-center justify-center text-sm px-2 rounded-md border border-gray-300 bg-white"
            onClick={handleRemove}
            title="Remove"
          >
            <FaTrash className="text-red-500 text-[14px]" />
          </button>
        ) : (
          <button
            className={`w-full h-[32px] text-sm px-2 rounded-md bg-white hover:bg-[#fdf0fa] border-2 ${
              parsedQty === 0
                ? "border-[#A34796] text-[#A34796]"
                : isValid
                ? "border-[#A34796] text-[#A34796]"
                : "border border-gray-300 text-gray-400"
            }`}
            onClick={handleSave}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
