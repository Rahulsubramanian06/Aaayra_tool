import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

const cardClass =
  "bg-[#F2F7FF] border border-[#EAEAEA] rounded-lg p-4 mb-4 text-[#052659] shadow-sm";
const sectionTitleClass = "font-semibold text-base mb-2";
const radioClass = "mr-2 accent-blue-600";

const defaultMetals = [
  { name: "Gold" },
  { name: "Silver" },
  { name: "Copper" },
  { name: "Other Metals" },
];

// const metalInputRow = (
//   <div className="flex gap-2 mb-2 mt-2">
//     <input
//       type="text"
//       placeholder="Purity %"
//       className="border bg-white rounded px-2 py-2 w-1/2 text-xs"
//     />
//     <input
//       type="text"
//       placeholder="Metal Weight (g)"
//       className="border bg-white rounded px-2 py-2 w-1/2 text-xs"
//     />
//   </div>
// );

const NewComposition: React.FC = () => {
  const [scenario, setScenario] = useState<"weight" | "composition">("weight");
  const [scrapAvailable, setScrapAvailable] = useState(false);
  const [primaryMetal, setPrimaryMetal] = useState<string>("");
  const [secondaryMetals, setSecondaryMetals] = useState<string[]>([]);

  // Metals state
  const [primaryMetals, setPrimaryMetals] = useState(defaultMetals);
  const [secondaryMetalsList, setSecondaryMetalsList] = useState(defaultMetals);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [otherMetalInput, setOtherMetalInput] = useState("");
  // Track which section triggered the dialog
  const [dialogSource, setDialogSource] = useState<"primary" | "secondary">();

  // Scrap state
  const [scrapWeight, setScrapWeight] = useState("");
  const [scrapPurities, setScrapPurities] = useState<{ [metal: string]: string }>({});

  // Total quantity state
  const [totalQuantity, setTotalQuantity] = useState("");

  const navigate = useNavigate();

  // Calculate total metal weight
//   const metalWeight = (purity: string) => {
//     if (!purity || !scrapWeight) return 0;
//     return (parseFloat(purity) / 100) * parseFloat(scrapWeight);
//   };
  const allMetals = [primaryMetal, ...secondaryMetals];
//   const totalMetalWeight = allMetals.reduce(
//     (sum, metal) => sum + metalWeight(scrapPurities[metal] || ""),
//     0
//   );
  const scrapWeightNum = parseFloat(scrapWeight) || 0;
  const totalQuantityNum = parseFloat(totalQuantity) || 0;
  const scrapExceedsTotal = scrapAvailable && scrapWeightNum > totalQuantityNum && totalQuantityNum > 0;
  // Calculate total purity
  const totalPurity = allMetals.reduce(
    (sum, metal) => sum + (parseFloat(scrapPurities[metal] || "") || 0),
    0
  );
  const purityIs100 = totalPurity === 100;

  // Handlers for secondary metal selection
  const handleSecondaryChange = (metal: string) => {
    if (metal === "Other Metals") {
      setDialogSource("secondary");
      setDialogOpen(true);
      return;
    }
    setSecondaryMetals((prev) =>
      prev.includes(metal)
        ? prev.filter((m) => m !== metal)
        : [...prev, metal]
    );
  };

  // Handler for primary metal radio
  const handlePrimaryChange = (metal: string) => {
    if (metal === "Other Metals") {
      setDialogSource("primary");
      setDialogOpen(true);
      return;
    }
    setPrimaryMetal(metal);
  };

  // Save new metal from dialog
  const handleSaveOtherMetal = () => {
    if (!otherMetalInput.trim()) return;
    if (dialogSource === "primary") {
      setPrimaryMetals((prev) => {
        const others = prev.filter((m) => m.name === "Other Metals");
        const rest = prev.filter((m) => m.name !== "Other Metals" && m.name !== otherMetalInput.trim());
        return [...rest, { name: otherMetalInput.trim() }, ...others];
      });
      setPrimaryMetal(otherMetalInput.trim());
    } else if (dialogSource === "secondary") {
      setSecondaryMetalsList((prev) => {
        const others = prev.filter((m) => m.name === "Other Metals");
        const rest = prev.filter((m) => m.name !== "Other Metals" && m.name !== otherMetalInput.trim());
        return [...rest, { name: otherMetalInput.trim() }, ...others];
      });
      setSecondaryMetals((prev) => [...prev, otherMetalInput.trim()]);
    }
    setDialogOpen(false);
    setOtherMetalInput("");
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-2xl max-w-xs p-6 [&_[data-slot=dialog-close]]:hidden">
          <DialogHeader className="flex flex-row items-center justify-between mb-2">
            <DialogTitle className="text-[#001845] text-lg font-semibold">Other Metal</DialogTitle>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => setDialogOpen(false)}
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </DialogHeader>
          <div className="mb-2 text-sm font-medium">Name of the metal</div>
          <input
            type="text"
            value={otherMetalInput}
            onChange={e => setOtherMetalInput(e.target.value)}
            className="border rounded w-full px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder=""
          />
          <button
            className="w-full bg-[#001845] text-white rounded py-2 font-semibold hover:bg-[#001845]/90 transition"
            onClick={handleSaveOtherMetal}
          >
            Save Metal
          </button>
        </DialogContent>
      </Dialog>

      <div className="bg-gray-50 min-h-screen flex flex-col items-center py-4 px-4">
        <div className="w-full max-w-md">
          <h2 className="text-lg font-bold text-[#001845] mb-4">New Composition</h2>

          {/* Working Scenario */}
          <div className={cardClass}>
            <div className={sectionTitleClass}>Choose Working Scenarios</div>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="scenario"
                className={radioClass}
                checked={scenario === "weight"}
                onChange={() => setScenario("weight")}
              />
              Generate Based On Total Weight
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="scenario"
                className={radioClass}
                checked={scenario === "composition"}
                onChange={() => setScenario("composition")}
              />
              Generate Based On Composition
            </label>
          </div>

          {/* Scenario-specific fields */}
          {scenario === "weight" ? (
            <div className={cardClass}>
              <label className="block text-xs mb-1">Total Quantity (g)</label>
              <input
                type="number"
                className="border bg-white rounded px-2 py-2 w-full text-xs"
                placeholder="Enter total weight"
                value={totalQuantity}
                onChange={e => setTotalQuantity(e.target.value)}
              />
            </div>
          ) : null}

          {/* Primary Metal (radio) */}
          <div className={cardClass}>
            <div className={sectionTitleClass}>Choose Primary Metal</div>
            <div className="flex flex-col gap-2">
              {primaryMetals.map((metal) => (
                <div key={metal.name}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="primary-metal"
                      className={radioClass}
                      checked={primaryMetal === metal.name}
                      onChange={() => handlePrimaryChange(metal.name)}
                    />
                    <span>{metal.name}</span>
                  </label>
                  {primaryMetal === metal.name && scenario === "composition" && (
                    <input
                      type="text"
                      placeholder="Metal weight (g)"
                      className="border bg-white rounded px-2 py-2 w-full text-xs mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Metal (checkboxes) */}
          <div className={cardClass}>
            <div className={sectionTitleClass}>Choose Secondary Metal</div>
            <div className="flex flex-col gap-2">
              {secondaryMetalsList
                .filter((metal) => metal.name !== primaryMetal)
                .map((metal) => (
                  <div key={metal.name}>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className={radioClass}
                        checked={secondaryMetals.includes(metal.name)}
                        onChange={() => handleSecondaryChange(metal.name)}
                      />
                      <span>{metal.name}</span>
                    </label>
                    {secondaryMetals.includes(metal.name) && scenario === "composition" && (
                      <input
                        type="text"
                        placeholder="Metal weight (g)"
                        className="border bg-white rounded px-2 py-2 w-full text-xs mt-2"
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Scrap Metal Availability */}
          <div className={cardClass}>
            <div className={sectionTitleClass}>Scrap Metal</div>
            <label className="flex items-center mb-2 text-sm">
              <input
                type="radio"
                name="scrap"
                className={radioClass}
                checked={scrapAvailable}
                onChange={() => setScrapAvailable(true)}
              />
              Available
            </label>
            <label className="flex items-center text-sm">
              <input
                type="radio"
                name="scrap"
                className={radioClass}
                checked={!scrapAvailable}
                onChange={() => setScrapAvailable(false)}
              />
              Not Available
            </label>
          </div>

          {/* Scrap Metal Details (only if available) */}
          {scrapAvailable && (
            <div className={cardClass}>
              <label className="block text-xs mb-1">Total Scrap weight</label>
              <input
                type="number"
                className="border bg-white rounded px-2 py-2 w-full text-xs mb-2"
                placeholder="Total Scrap weight"
                value={scrapWeight}
                onChange={e => setScrapWeight(e.target.value)}
              />
              {scrapExceedsTotal && (
                <div className="text-red-500 text-xs font-semibold mb-2">Scrap weight cannot exceed total quantity!</div>
              )}
              {/* Metal details */}
              <div className="mb-2">
                <label className="block text-xs mb-1">Primary Metal</label>
                <div className="border bg-white rounded px-2 py-2 w-full text-xs">
                  {primaryMetal || <span className="text-gray-400">No metal selected</span>}
                </div>
                <div className="flex gap-2 mb-2 mt-2">
                  <input
                    type="number"
                    placeholder="Purity %"
                    className="border bg-white rounded px-2 py-2 w-1/2 text-xs"
                    value={scrapPurities[primaryMetal] || ""}
                    onChange={e => setScrapPurities(prev => ({ ...prev, [primaryMetal]: e.target.value }))}
                    min={0}
                    max={100}
                  />
                  <input
                    type="number"
                    placeholder="Metal Weight (g)"
                    className="border bg-white rounded px-2 py-2 w-1/2 text-xs"
                    value={
                      primaryMetal && scrapPurities[primaryMetal] && scrapWeight
                        ? ((parseFloat(scrapPurities[primaryMetal]) / 100) * parseFloat(scrapWeight) || "")
                        : ""
                    }
                    readOnly
                  />
                </div>
              </div>
              {secondaryMetals.length > 0 && (
                <div className="mb-2">
                  <label className="block text-xs mb-1">Secondary Metals</label>
                  {secondaryMetals.map((metal) => (
                    <div key={metal} className="mb-2">
                      <div className="border bg-white rounded px-2 py-2 w-full text-xs mb-1">
                        {metal}
                      </div>
                      <div className="flex gap-2 mb-2 mt-2">
                        <input
                          type="number"
                          placeholder="Purity %"
                          className="border bg-white rounded px-2 py-2 w-1/2 text-xs"
                          value={scrapPurities[metal] || ""}
                          onChange={e => setScrapPurities(prev => ({ ...prev, [metal]: e.target.value }))}
                          min={0}
                          max={100}
                        />
                        <input
                          type="number"
                          placeholder="Metal Weight (g)"
                          className="border bg-white rounded px-2 py-2 w-1/2 text-xs"
                          value={
                            scrapPurities[metal] && scrapWeight
                              ? ((parseFloat(scrapPurities[metal]) / 100) * parseFloat(scrapWeight) || "")
                              : ""
                          }
                          readOnly
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className={`text-xs font-semibold mt-2 ${purityIs100 ? 'text-green-600' : 'text-red-500'}`}>
                Total Purity: {totalPurity}%{purityIs100 ? '' : ' — should be 100%!'}
              </div>
            </div>
          )}

          {/* Proceed Button */}
          <button
            className="w-full bg-[#001845] text-white rounded py-2 font-semibold mt-4 hover:bg-[#001845]/90 transition disabled:opacity-50"
            disabled={
              !primaryMetal ||
              secondaryMetals.length === 0 ||
              !totalQuantity || isNaN(Number(totalQuantity)) || Number(totalQuantity) <= 0 ||
              (scrapAvailable && (!purityIs100 || scrapExceedsTotal))
            }
            onClick={() => navigate('/composition_slider', {
              state: {
                primaryMetal,
                secondaryMetals,
                totalQuantity
              }
            })}
          >
            Proceed To Next Step
          </button>
        </div>
      </div>
    </>
  );
};

export default NewComposition; 