import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

// Import metal icons
import smallGold from "@/assets/Home/small_gold.png";
import smallSilver from "@/assets/Home/small_silver.png";
import smallCopper from "@/assets/Home/small_copper.png";
import smallOther from "@/assets/New composition/small_other_metals.png";

interface CompositionSlidersState {
  primaryMetal: string;
  secondaryMetals: string[];
  totalQuantity: string;
}

const metalIcons: Record<string, string> = {
  Gold: smallGold,
  Silver: smallSilver,
  Copper: smallCopper,
  "Other Metals": smallOther,
};

const sectionHeaderClass =
  "bg-[#F2F7FF] text-[#052659] font-semibold text-base px-4 py-2 rounded-t-lg border-b border-[#EAEAEA] mb-0";

const inputClass =
  "border border-[#B6C6E3] bg-white rounded px-2 py-2 w-full text-xs focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/20";

const labelClass = "block text-xs mb-1 font-medium text-[#052659]";

const bsiStandardValues: Record<string, number> = {
  "24 K": 99.9,
  "22 K": 91.6,
  "18 K": 75.0,
  "16 K": 66.7,
};

const CompositionSliders: React.FC = () => {
  // Get data from router state
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as CompositionSlidersState;
  const { primaryMetal, secondaryMetals, totalQuantity } = state;

  // State for metal percentages
  const [metalPercentages, setMetalPercentages] = useState<{ [metal: string]: number | "" }>({});
  const [bsiStandard, setBsiStandard] = useState<string>("");
  const bsiOptions = ["24 K", "22 K", "18 K", "16 K"];

  // Helper to update slider value
  const handleSliderChange = (metal: string, value: number[]) => {
    // If BSI is selected and metal is primary, do nothing (locked)
    if (bsiStandard && metal === primaryMetal) return;
    // For secondary metals, ensure total does not exceed allowed
    if (secondaryMetals.includes(metal) && bsiStandard) {
      const allowed = 100 - (bsiStandardValues[bsiStandard] || 0);
      const otherTotal = secondaryMetals
        .filter((m) => m !== metal)
        .reduce((sum, m) => sum + (metalPercentages[m] === "" ? 0 : metalPercentages[m] || 0), 0);
      if (value[0] + otherTotal > allowed) return; // Prevent overflow
    }
    setMetalPercentages((prev) => ({ ...prev, [metal]: value[0] }));
  };

  // When BSI changes, set/lock primary metal and reset secondary if needed
  useEffect(() => {
    if (bsiStandard && primaryMetal) {
      setMetalPercentages((prev) => ({
        ...prev,
        [primaryMetal]: bsiStandardValues[bsiStandard] || 0,
      }));
      // Optionally reset secondary metals if their sum is too high
      const allowed = 100 - (bsiStandardValues[bsiStandard] || 0);
      const secSum = secondaryMetals.reduce((sum, m) => sum + (metalPercentages[m] === "" ? 0 : metalPercentages[m] || 0), 0);
      if (secSum > allowed) {
        // Reset all secondary to 0
        const resetSec: Record<string, number> = {};
        secondaryMetals.forEach((m) => (resetSec[m] = 0));
        setMetalPercentages((prev) => ({
          ...prev,
          ...resetSec,
        }));
      }
    }
  }, [bsiStandard, primaryMetal, secondaryMetals]);

  // Helper to calculate metal weight
  const getMetalWeight = (metal: string) => {
    const percent = metalPercentages[metal] === "" ? 0 : metalPercentages[metal] || 0;
    return totalQuantity ? ((percent / 100) * parseFloat(totalQuantity)).toFixed(2) : "";
  };

  const handleBsiRadioChange = (option: string) => {
    setBsiStandard(option);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-2 sm:px-0">
      <div className="w-full max-w-md mx-auto flex flex-col pb-24">
        <div className="pt-6 pb-2 px-2">
          <div className="text-lg font-bold text-[#001845] mb-1">New Composition</div>
          <div className="text-xs text-[#6B7280] mb-4">Choose Metals For Composition</div>
        </div>

        {/* Summary Card */}
        <div className="border border-[#1B3A6B] rounded-lg bg-white px-4 py-3 mb-4 flex items-center gap-4">
          <img src={metalIcons[primaryMetal] || smallOther} alt={primaryMetal} className="w-14 h-14 rounded-full object-cover border" />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-xl text-[#052659] truncate">{primaryMetal}</div>
            <div className="text-xs text-[#B6B6B6] font-semibold mb-1">Composition</div>
            <div className="text-sm text-[#052659] truncate">
              {([primaryMetal, ...secondaryMetals].filter(Boolean)).join(", ")}.
            </div>
          </div>
        </div>
        {/* BSI Standards Card */}
        <div className="bg-[#F2F7FF] border border-[#EAEAEA] rounded-2xl px-4 pt-4 pb-2 mb-6 shadow-sm">
          <div className="font-bold text-lg text-[#052659] mb-3">BSI Standards</div>
          <div className="flex flex-wrap gap-4 mb-2">
            {bsiOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 font-bold text-[#052659] text-lg cursor-pointer">
                <input
                  type="radio"
                  name="bsi-standard"
                  className="w-5 h-5 accent-[#052659] border-2 border-[#B6C6E3] rounded-full"
                  checked={bsiStandard === option}
                  onChange={() => handleBsiRadioChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        {/* Optionally, show a warning if not selected */}
        {!bsiStandard && (
          <div className="text-center text-red-600 font-semibold text-sm mb-4 -mt-4">Please select a BSI Standard to continue.</div>
        )}

        {/* Disable below content if no BSI standard is selected */}
        <div className={`${!bsiStandard ? 'opacity-50 pointer-events-none select-none' : ''}`}>
          {/* Primary Metal Section */}
          {primaryMetal && (
            <div className="mb-0">
              <div className="border border-[#B6C6E3] rounded-lg mb-6 overflow-hidden bg-white shadow-sm">
                <div className={sectionHeaderClass + " rounded-t-lg border-b-0"}>Primary Metal</div>
                <div className="px-4 pt-4 pb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <img src={metalIcons[primaryMetal] || smallOther} alt={primaryMetal} className="w-8 h-8 rounded-full border object-cover" />
                    <span className="font-semibold text-base">{primaryMetal}</span>
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-4 w-full">
                      <Slider
                        min={0}
                        max={100}
                        step={0.5}
                        value={[metalPercentages[primaryMetal] === "" ? 0 : metalPercentages[primaryMetal] || 0]}
                        onValueChange={(val) => handleSliderChange(primaryMetal, val)}
                        className="w-full"
                        disabled={!!bsiStandard}
                      />
                      <span className="text-xs font-semibold bg-[#1B3A6B] text-white rounded-full px-3 py-1 min-w-[40px] text-center shadow-md border border-[#1B3A6B] -ml-6 relative z-10">
                        {metalPercentages[primaryMetal] === "" ? 0 : metalPercentages[primaryMetal] || 0}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <label className={labelClass}>% of composition</label>
                        <input
                          type="number"
                          className={inputClass}
                          value={metalPercentages[primaryMetal] === "" ? 0 : metalPercentages[primaryMetal] || 0}
                          onChange={e => handleSliderChange(primaryMetal, [Number(e.target.value)])}
                          min={0}
                          max={100}
                          placeholder="% of composition"
                          readOnly={!!bsiStandard}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Total Metal to be added (g)</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={getMetalWeight(primaryMetal)}
                          readOnly
                          placeholder="Total Metal to be added (g)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Metals Section */}
          {secondaryMetals && secondaryMetals.length > 0 && (
            <div className="mb-0">
              <div className="border border-[#B6C6E3] rounded-lg mb-6 overflow-hidden bg-white shadow-sm">
                <div className={sectionHeaderClass + " rounded-t-lg border-b-0"}>Secondary Metal</div>
                <div className="px-4 pt-4 pb-6">
                  {secondaryMetals.map((metal, idx) => (
                    <div key={metal} className={idx !== secondaryMetals.length - 1 ? "mb-8" : "mb-0"}>
                      <div className="flex items-center gap-2 mb-4">
                        <img src={metalIcons[metal] || smallOther} alt={metal} className="w-8 h-8 rounded-full border object-cover" />
                        <span className="font-semibold text-base">{metal}</span>
                      </div>
                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center gap-4 w-full">
                          <Slider
                            min={0}
                            max={100}
                            step={0.5}
                            value={[metalPercentages[metal] === "" ? 0 : metalPercentages[metal] || 0]}
                            onValueChange={(val) => handleSliderChange(metal, val)}
                            className="w-full"
                            disabled={
                              !!bsiStandard &&
                              (metalPercentages[metal] === "" ? 0 : metalPercentages[metal] || 0) +
                                secondaryMetals
                                  .filter((m) => m !== metal)
                                  .reduce((sum, m) => sum + (metalPercentages[m] === "" ? 0 : metalPercentages[m] || 0), 0) >=
                                100 - (bsiStandardValues[bsiStandard] || 0)
                            }
                          />
                          <span className="text-xs font-semibold bg-[#1B3A6B] text-white rounded-full px-3 py-1 min-w-[40px] text-center shadow-md border border-[#1B3A6B] -ml-6 relative z-10">
                            {metalPercentages[metal] === "" ? 0 : metalPercentages[metal] || 0}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <label className={labelClass}>% of composition</label>
                            <input
                              type="number"
                              className={inputClass}
                              value={
                                metalPercentages[metal] !== undefined && metalPercentages[metal] !== null
                                  ? metalPercentages[metal]
                                  : ""
                              }
                              onChange={e => {
                                const val = e.target.value;
                                if (val === "") {
                                  setMetalPercentages(prev => ({ ...prev, [metal]: "" }));
                                } else {
                                  handleSliderChange(metal, [Number(val)]);
                                }
                              }}
                              min={0}
                              max={100}
                              placeholder="% of composition"
                              readOnly={
                                !!bsiStandard &&
                                (metalPercentages[metal] === "" ? 0 : metalPercentages[metal] || 0) +
                                  secondaryMetals
                                    .filter((m) => m !== metal)
                                    .reduce((sum, m) => sum + (metalPercentages[m] === "" ? 0 : metalPercentages[m] || 0), 0) >=
                                  100 - (bsiStandardValues[bsiStandard] || 0)
                              }
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Total Metal to be added (g)</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={getMetalWeight(metal)}
                              readOnly
                              placeholder="Total Metal to be added (g)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Total Quantity Card */}
          <div className="w-full mt-2 mb-24">
            <label className={labelClass + " px-1"}>Total Quantity (g)</label>
            <input
              type="number"
              className={inputClass + " w-full"}
              value={totalQuantity}
              readOnly
            />
          </div>

          {/* Show warning if secondary metals exceed allowed sum */}
          {bsiStandard && secondaryMetals.length > 0 &&
            secondaryMetals.reduce((sum, m) => sum + (metalPercentages[m] === "" ? 0 : metalPercentages[m] || 0), 0) > 100 - (bsiStandardValues[bsiStandard] || 0) && (
              <div className="text-center text-red-600 font-semibold text-sm mb-4">Secondary metals exceed allowed percentage for selected BSI standard.</div>
            )}
        </div>
      </div>
      {/* Sticky Proceed Button */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center bg-white py-4 border-t border-[#EAEAEA] z-20">
        <button onClick={() => navigate("/saveNewComposition", {
          state: {
            metals: [primaryMetal, ...secondaryMetals],
            metalPercentages,
            totalQuantity,
          }
        })}
          className="w-full max-w-md bg-[#001845] text-white rounded py-3 font-semibold text-base hover:bg-[#001845]/90 transition mx-2"
        >
          Proceed To Next Step
        </button>
      </div>
    </div>
  );
};

export default CompositionSliders; 