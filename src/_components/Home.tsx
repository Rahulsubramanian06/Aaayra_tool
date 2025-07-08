import { Button } from "@/components/ui/button";
import bgold from "../assets/Home/big_gold.png"
import sgold from "../assets/Home/small_gold.png"
import bsilver from "../assets/Home/big_silver.png"
import ssilver from "../assets/Home/small_silver.png"
import gold_table from "../assets/Home/standard_gold.png"
import silver_table from "../assets/Home/standard_silver.png"
import scopper from "../assets/Home/small_copper.png"
import { Menu } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
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
  {
    type: "Gold",
    title: "Gold 22K (50g)",
    image: bgold,
    data: [
      { metal: "Gold", percent: "91.6%", weight: "45.8g" },
      { metal: "Silver", percent: "5%", weight: "2.5g" },
      { metal: "Copper", percent: "3.4%", weight: "1.7g" },
    ],
  },
  {
    type: "Silver",
    title: "Silver 999 (20g)",
    image: bsilver,
    data: [
      { metal: "Silver", percent: "99.9%", weight: "19.98g" },
      { metal: "Copper", percent: "0.1%", weight: "0.02g" },
    ],
  },
  {
    type: "Gold",
    title: "Gold 14K (30g)",
    image: bgold,
    data: [
      { metal: "Gold", percent: "58.5%", weight: "17.55g" },
      { metal: "Silver", percent: "20%", weight: "6g" },
      { metal: "Copper", percent: "21.5%", weight: "6.45g" },
    ],
  },
  {
    type: "Silver",
    title: "Silver 800 (40g)",
    image: bsilver,
    data: [
      { metal: "Silver", percent: "80%", weight: "32g" },
      { metal: "Copper", percent: "20%", weight: "8g" },
    ],
  },
  {
    type: "Gold",
    title: "Gold 24K (10g)",
    image: bgold,
    data: [
      { metal: "Gold", percent: "99.9%", weight: "9.99g" },
      { metal: "Silver", percent: "0.05%", weight: "0.005g" },
      { metal: "Copper", percent: "0.05%", weight: "0.005g" },
    ],
  },
  {
    type: "Silver",
    title: "Silver 950 (60g)",
    image: bsilver,
    data: [
      { metal: "Silver", percent: "95%", weight: "57g" },
      { metal: "Copper", percent: "5%", weight: "3g" },
    ],
  },
];




const CompositionCard = ({ composition }: { composition: Composition }) => (
  <div className="min-w-[280px] sm:min-w-[320px] border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
    <img 
      src={composition.image} 
      alt={composition.title} 
      className="w-20 h-20 mx-auto object-contain" 
    />
    <h3 className="text-sm font-semibold text-center mt-3 mb-4">
      {composition.title}
    </h3>
    
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="flex justify-between items-center bg-[#F2F7FF] text-xs font-medium text-muted-foreground p-2 border-b border-gray-200">
        <div className="flex-1 text-center">Metal</div>
        <div className="flex-1 text-center">Comp(%)</div>
        <div className="flex-1 text-center">Weight(g)</div>
      </div>
      
      <div className="p-2">
        <div className="space-y-2 text-xs">
          {composition.data.map((metal, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center">
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
              {idx < composition.data.length - 1 && (
                <hr className="my-2 border-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export function Home() {
  const navigate = useNavigate();
  const [comps, setComps] = useState<Composition[]>(compositions);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("compositions") || "null");
    if (saved && Array.isArray(saved) && saved.length > 0) {
      // Map localStorage structure to Composition type if needed
      const mapped = saved.map((c: any) => ({
        type: c.type || "",
        title: c.type || "",
        image: c.image || bgold,
        data: (c.metals || []).map((m: any) => ({
          metal: m.name,
          percent: m.comp,
          weight: m.weight,
        })),
      }));
      setComps(mapped);
    } else {
      setComps(compositions);
    }
  }, []);
  return (
    <div className="bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Menu className="w-6 h-6 text-gray-700" />
      </div>
      <div className="flex justify-center w-full">
        <div className="max-w-7xl w-full px-4">
          <div className="mt-4">
            <p className="text-sm">Good Morning!</p>
            <h1 className="text-lg font-bold text-[#001845]">User Name</h1>
          </div>
          <div className="py-6 space-y-6">
          <div className="h-40 md:h-50 bg-gray-200 rounded-md mx-4 sm:mx-6 lg:mx-8" />
            <section>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Recent Compositions</h2>
              <Swiper
                spaceBetween={16}
                slidesPerView={1.2}
                breakpoints={{
                  640: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 3.2 },
                }}
                className="pb-4"
                modules={[Pagination]}
                pagination={{ clickable: true }}
                loop={true}
              >
                {comps.map((composition, index) => (
                  <SwiperSlide key={index} className="pb-10">
                    <CompositionCard composition={composition} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="mt-6 flex justify-center">
                <Button
                  className="w-full sm:w-auto bg-[#001845] hover:bg-[#001845]/90"
                  onClick={() => navigate("/new_composition")}
                >
                  Make New Composition
                </Button>
              </div>
            </section>

            <section className="flex items-center justify-between flex-wrap gap-3">
              <img src={gold_table} className="xl:w-2/5"/>
              <img src={silver_table} className="xl:w-2/5"/>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
