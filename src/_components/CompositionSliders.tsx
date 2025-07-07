import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

interface CompositionSlidersState {
  primaryMetal: string;
  secondaryMetals: string[];
  totalQuantity: string;
}

const CompositionSliders: React.FC = () => {
  // Get data from router state
  const location = useLocation();
  const state = (location.state || {}) as CompositionSlidersState;
  const { primaryMetal, secondaryMetals, totalQuantity } = state;

  // State for metal percentages
  const [metalPercentages, setMetalPercentages] = useState<{ [metal: string]: number }>({});

  // Helper to update slider value
  const handleSliderChange = (metal: string, value: number[]) => {
    setMetalPercentages((prev) => ({ ...prev, [metal]: value[0] }));
  };

  // Helper to calculate metal weight
  const getMetalWeight = (metal: string) => {
    const percent = metalPercentages[metal] || 0;
    return totalQuantity ? ((percent / 100) * parseFloat(totalQuantity)).toFixed(2) : "";
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-4 px-4">
      <div className="w-full max-w-md">
        <h2 className="text-lg font-bold text-[#001845] mb-4">Set Metal Composition</h2>

        {/* Primary Metal Section (Slider) */}
        {primaryMetal && (
          <div className="bg-white border rounded-lg p-4 mb-4">
            <div className="font-semibold text-sm mb-2">Primary Metal</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{primaryMetal}</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <Slider
                min={0}
                max={100}
                step={1}
                value={[metalPercentages[primaryMetal] || 0]}
                onValueChange={(val) => handleSliderChange(primaryMetal, val)}
                className="w-3/4"
              />
              <span className="text-xs font-semibold bg-[#001845] text-white rounded px-2 py-1 min-w-[40px] text-center">
                {metalPercentages[primaryMetal] || 0}%
              </span>
            </div>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                className="border bg-white rounded px-2 py-2 w-1/2 text-xs"
                value={metalPercentages[primaryMetal] || 0}
                onChange={e => handleSliderChange(primaryMetal, [Number(e.target.value)])}
                min={0}
                max={100}
                placeholder="% of composition"
              />
              <input
                type="text"
                className="border bg-white rounded px-2 py-2 w-1/2 text-xs"
                value={getMetalWeight(primaryMetal)}
                readOnly
                placeholder="Total Metal to be added (g)"
              />
            </div>
          </div>
        )}

        {/* Secondary Metals Section (Slider) */}
        {secondaryMetals && secondaryMetals.length > 0 && (
          <div className="bg-white border rounded-lg p-4 mb-4">
            <div className="font-semibold text-sm mb-2">Secondary Metal{secondaryMetals.length > 1 ? 's' : ''}</div>
            {secondaryMetals.map((metal) => (
              <div key={metal} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{metal}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[metalPercentages[metal] || 0]}
                    onValueChange={(val) => handleSliderChange(metal, val)}
                    className="w-3/4"
                  />
                  <span className="text-xs font-semibold bg-[#001845] text-white rounded px-2 py-1 min-w-[40px] text-center">
                    {metalPercentages[metal] || 0}%
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    className="border bg-white rounded px-2 py-2 w-1/2 text-xs"
                    value={metalPercentages[metal] || 0}
                    onChange={e => handleSliderChange(metal, [Number(e.target.value)])}
                    min={0}
                    max={100}
                    placeholder="% of composition"
                  />
                  <input
                    type="text"
                    className="border bg-white rounded px-2 py-2 w-1/2 text-xs"
                    value={getMetalWeight(metal)}
                    readOnly
                    placeholder="Total Metal to be added (g)"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompositionSliders; 