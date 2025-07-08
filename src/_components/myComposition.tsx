import { Button } from "../components/ui/button";

const compositions = [
  {
    type: "Gold 18 K (100g)",
    image: "/src/assets/Home/big_gold.png",
    metals: [
      { name: "Gold", icon: "/src/assets/Home/small_gold.png", comp: "75 %", weight: "75g" },
      { name: "Silver", icon: "/src/assets/Home/small_silver.png", comp: "12.5 %", weight: "12.5g" },
      { name: "Copper", icon: "/src/assets/Home/small_copper.png", comp: "12.5 %", weight: "12.5g" },
    ],
  },
  {
    type: "Silver 925 (100g)",
    image: "/src/assets/Home/big_silver.png",
    metals: [
      { name: "Silver", icon: "/src/assets/Home/small_silver.png", comp: "12.5 %", weight: "12.5g" },
      { name: "Copper", icon: "/src/assets/Home/small_copper.png", comp: "12.5 %", weight: "12.5g" },
    ],
  },
];

const MyComposition = () => {
  // Repeat the cards as in the screenshot (3 gold, 3 silver)
  const cards = [
    compositions[0],
    compositions[1],
    compositions[0],
    compositions[1],
    compositions[0],
    compositions[1],
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pt-4 pb-6">
      <div className="flex items-center mb-4">
        <button className="mr-2 text-xl">←</button>
        <h2 className="text-lg font-medium">My Compositions</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 h-auto">
        {cards.map((comp, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow border p-4 flex flex-col items-center"
          >
            <img
              src={comp.image}
              alt={comp.type}
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <div className="text-center font-bold text-lg text-blue-900 mb-2">
              {comp.type}
            </div>
            <table className="w-full text-xs border-t">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-1">Metal</th>
                  <th className="py-1">Comp(%)</th>
                  <th className="py-1">Weight(g)</th>
                </tr>
              </thead>
              <tbody>
                {comp.metals.map((metal, i) => (
                  <tr key={i} className="text-center">
                    <td className="flex items-center gap-1 py-1">
                      <img src={metal.icon} alt={metal.name} className="w-4 h-4" />
                      {metal.name}
                    </td>
                    <td>{metal.comp}</td>
                    <td>{metal.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Button className="w-full max-w-xs text-base py-6 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold">
          Make New Composition
        </Button>
      </div>
    </div>
  );
};

export default MyComposition;
