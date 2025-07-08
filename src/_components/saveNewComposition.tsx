import bigGold from "../assets/Home/big_gold.png";
import bigSilver from "../assets/Home/big_silver.png";
import smallCopper from "../assets/Home/small_copper.png";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const metalImages: Record<string, string> = {
  Gold: bigGold,
  Silver: bigSilver,
  Copper: smallCopper,
};


const SaveNewComposition = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { metals = ["Gold", "Silver", "Copper"], metalPercentages = {}, totalQuantity = "" } = location.state || {};

  const [compositionName, setCompositionName] = useState("");

  // Build table data dynamically
  const tableData = metals.map((metal: string) => {
    const percent = metalPercentages[metal] ?? 0;
    const weight = totalQuantity ? ((percent / 100) * parseFloat(totalQuantity)).toFixed(2) : "";
    return {
      name: metal,
      img: metalImages[metal] || "",
      percent: `${percent} %`,
      weight: weight ? `${weight}g` : "",
    };
  });

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-4 px-2">
      {/* Header */}
      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold mt-4">New Composition</h2>
        <p className="text-xs text-gray-400 mb-2">Choose Metals For Composition</p>
        {/* Display Card for Selected Metals */}
        <div className="border border-[#1B3A6B] rounded-lg bg-white px-4 py-3 mb-4 flex items-center gap-4">
          <img src={metalImages[metals[0]] || ""} alt={metals[0]} className="w-14 h-14 rounded-full object-cover border" />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-xl text-[#052659] truncate">{metals[0]}</div>
            <div className="text-xs text-[#B6B6B6] font-semibold mb-1">Composition</div>
            <div className="text-sm text-[#052659] truncate">
              {metals.join(", ")}
            </div>
          </div>
        </div>
        {/* Name input */}
        <div className="mt-4">
          <label className="text-xs font-semibold">Name of the new Composition</label>
          <Input
            className="mt-1"
            placeholder=""
            value={compositionName}
            onChange={e => setCompositionName(e.target.value)}
          />
        </div>
        {/* Quantity input */}
        <div className="mt-4">
          <label className="text-xs font-semibold">Total required Quantity (in g)</label>
          <Input className="mt-1" placeholder="" value={totalQuantity} readOnly />
        </div>
        {/* Table */}
        <div className="mt-6 rounded-lg overflow-hidden border">
          <table className="w-full text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="py-2 px-2 text-left font-semibold">Metal</th>
                <th className="py-2 px-2 text-center font-semibold">Comp(%)</th>
                <th className="py-2 px-2 text-center font-semibold">Weight(g)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row: { name: string; img: string; percent: string; weight: string }) => (
                <tr key={row.name} className="border-t">
                  <td className="flex items-center gap-2 py-2 px-2">
                    <img src={row.img} alt={row.name} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold">{row.name}</span>
                  </td>
                  <td className="text-center py-2 px-2">{row.percent}</td>
                  <td className="text-center py-2 px-2">{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Save Button */}
        <div className="flex justify-center mt-10 mb-4">
          <Button
            className="bg-blue-900 text-white px-8 py-2 rounded-lg"
            disabled={!compositionName.trim()}
            onClick={() => navigate("/myComposition")}
          >
            Save New Composition
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SaveNewComposition;
