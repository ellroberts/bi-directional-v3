import React from "react";
import { usePlan } from "./PlanContext";
import RightPanelRow from "./RightPanelRow";

export default function RightPanel() {
  const { selected } = usePlan();

  const groupLabels = {
    ms365: "MS365 Business Basic",
    standard: "MS365 Business Standard",
    premium: "MS365 Business Premium",
  };

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Order summary</h2>

      {Object.entries(groupLabels).map(([groupId, label]) => {
        const options = selected[groupId];
        if (!options || Object.keys(options).length === 0) return null;

        return (
          <div key={groupId} className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{label}</h3>
            <div className="space-y-2">
              {Object.entries(options).map(([optionId, opt]) => (
                <RightPanelRow
                  key={`${groupId}-${optionId}`}
                  groupId={groupId}
                  optionId={optionId}
                  opt={opt}
                />
              ))}
            </div>
            <div className="pt-4 mb-4">
              <hr className="border-t-1 border-gray-300" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
