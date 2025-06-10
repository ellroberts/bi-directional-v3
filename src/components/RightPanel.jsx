import React, { useState } from "react";
import { usePlan } from "./PlanContext";
import RightPanelRow from "./RightPanelRow";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function RightPanel() {
  const { selected, remove } = usePlan();

  const groupLabels = {
    ms365: "MS365 Business Basic",
    standard: "MS365 Business Standard",
    premium: "MS365 Business Premium",
  };

  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initialState = {};
    Object.keys(groupLabels).forEach((id) => {
      initialState[id] = false;
    });
    return initialState;
  });

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleClearGroup = (groupId) => {
    const options = selected[groupId];
    if (!options) return;
    Object.keys(options).forEach((optionId) => {
      remove(groupId, optionId);
    });
  };

  const total = Object.entries(selected).reduce((sum, [groupId, options]) => {
    return (
      sum +
      Object.values(options).reduce((groupSum, opt) => {
        return groupSum + (opt.qty || 0) * (opt.price || 0);
      }, 0)
    );
  }, 0);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Order summary</h2>

      {Object.entries(groupLabels).map(([groupId, label]) => {
        const options = selected[groupId];
        if (!options || Object.keys(options).length === 0) return null;

        const isExpanded = expandedGroups[groupId];
        const optionCount = Object.keys(options).length;
        const totalQty = Object.values(options).reduce(
          (sum, opt) => sum + (parseInt(opt.qty, 10) || 0),
          0
        );

        return (
          <div key={groupId} className="mb-6">
            <div
              className="flex items-start justify-between cursor-pointer"
              onClick={() => toggleGroup(groupId)}
            >
              <div className="flex items-start gap-2 flex-1 min-w-0">
                {isExpanded ? (
                  <FaChevronDown className="text-sm mt-1" />
                ) : (
                  <FaChevronRight className="text-sm mt-1" />
                )}
                <div className="flex flex-col">
                  <div className="font-semibold truncate">{label}</div>
                  {!isExpanded && (
                    <div className="text-sm text-gray-500 space-y-0.5">
                      <div>
                        {optionCount} option{optionCount > 1 ? "s" : ""} selected
                      </div>
                      <div className="text-xs text-gray-400">
                        {totalQty} licence{totalQty !== 1 ? "s" : ""} selected
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="pt-2 space-y-4">
                {Object.entries(options).map(([optionId, opt]) => (
                  <RightPanelRow
                    key={`${groupId}-${optionId}`}
                    groupId={groupId}
                    optionId={optionId}
                    opt={opt}
                  />
                ))}

                {optionCount > 1 && (
                  <div className="text-right pt-1">
                    <button
                      onClick={() => handleClearGroup(groupId)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-6 pt-4 border-t border-gray-300 text-right">
        <div className="text-sm font-semibold text-gray-700">Total:</div>
        <div className="text-xl font-bold text-black">£{total.toFixed(2)}</div>
      </div>
    </div>
  );
}
