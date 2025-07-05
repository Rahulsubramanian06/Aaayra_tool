import { Button } from "@/components/ui/button";
import bgold from "../assets/Home/big_gold.png"
import sgold from "../assets/Home/small_gold.png"
import bsilver from "../assets/Home/big_silver.png"
import ssilver from "../assets/Home/small_silver.png"
import gold_table from "../assets/Home/standard_gold.png"
import silver_table from "../assets/Home/standard_silver.png"
import scopper from "../assets/Home/small_copper.png"
// Types
interface MetalData {
  metal: string;
  percent: string;
  weight: string;
}

interface Composition {
  type: string;
  title: string;
  image: any;
  data: MetalData[];
}

// Data
const compositions: Composition[] = [
  {
    type: "Gold",
    title: "Gold 18K (100g)",
    image: bgold,
    data: [
      { metal: "Gold", percent: "75%", weight: "75g" },
      { metal: "Silver", percent: "12.5%", weight: "12.5g" },
      { metal: "Copper", percent: "12.5%", weight: "12.5g" },
    ],
  },
  {
    type: "Silver",
    title: "Silver 925 (100g)",
    image: bsilver,
    data: [
      { metal: "Silver", percent: "92.5%", weight: "92.5g" },
      { metal: "Copper", percent: "7.5%", weight: "7.5g" },
    ],
  },
];


// Components
const Header = () => (
  <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
    <button className="text-2xl hover:opacity-80 transition-opacity">☰</button>
    <div className="text-right">
      <p className="text-sm text-muted-foreground">Good Morning!</p>
      <h1 className="text-lg font-bold">User Name</h1>
    </div>
  </div>
);

const Banner = () => (
  <div className="h-32 sm:h-36 md:h-40 bg-gray-200 rounded-md mx-4 sm:mx-6 lg:mx-8" />
);

const CompositionCard = ({ composition }: { composition: Composition }) => (
  <div className="min-w-[280px] sm:min-w-[320px] border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
    <img 
      src={composition.image} 
      alt={composition.title} 
      className="w-12 h-12 mx-auto object-contain" 
    />
    <h3 className="text-sm font-semibold text-center mt-3 mb-4">
      {composition.title}
    </h3>
    
    {/* Table Header */}
    <div className="flex justify-between items-center bg-[#F2F7FF] mb-2 text-xs font-medium text-muted-foreground border-b pb-1">
      <div className="flex-1 text-center">Metal</div>
      <div className="flex-1 text-center">Comp(%)</div>
      <div className="flex-1 text-center">Weight(g)</div>
    </div>
    
    <div className="space-y-2 text-xs">
      {composition.data.map((metal, idx) => (
        <div key={idx} className="flex justify-between items-center">
          <div className="flex flex-col items-center space-x-2 flex-1">
            <span className="font-medium">{metal.metal}</span>
            {metal.metal === "Gold" && (
              <img src={sgold} alt="Gold" className="w-6 h-6" />
            )}
            {metal.metal === "Silver" && (
              <img src={ssilver} alt="Silver" className="w-6 h-6" />
            )}
            {metal.metal === "Copper" && (
              <img src={scopper} alt="Copper" className="w-6 h-6" />
            )}
          </div>
          <div className="flex-1 text-center text-muted-foreground">{metal.percent}</div>
          <div className="flex-1 text-center text-muted-foreground">{metal.weight}</div>
        </div>
      ))}
    </div>
  </div>
);

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Recent Compositions */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Recent Compositions</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {compositions.map((composition, index) => (
              <CompositionCard key={index} composition={composition} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button className="w-full sm:w-auto bg-[#001845] hover:bg-[#001845]/90">
              Make New Composition
            </Button>
          </div>
        </section>

        {/* Standard Compositions */}
        <section className="flex justify-between items-center">
          <img src={gold_table}/>
          <img src={silver_table} />
        </section>
      </div>
    </div>
  );
}
