import { useEffect, useState } from "react";
import { getAllCars } from "../../api/car.api";

export default function Cars() {
  const [input, setInput] = useState("");
  const [cars, setCars] = useState([]);
  function handleInputChange(event) {
    setInput(event.target.value);
  }
  function handleSearch() {
    getAllCars({ name: input }).then((res) => {
      setCars(res.data);
    }
    );
  }

  useEffect(() => {
    function fetchData() {
      getAllCars().then((res) => {
        setCars(res.data);
      });
    }
    fetchData();
  }, []);
 
  return (
    <div
      style={{ color: "blue" }}
      className="flex w-auto flex-col items-center justify-between p-14"
    >
      <div className="flex items-center justify-center py-2">
        <input
          className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
          type="text"
          placeholder="Buscar..."
          value={input}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cars.map((car, index) => (
        <div key={index} className="bg-white shadow-lg p-4 rounded overflow-hidden">
          <img src={car.image} alt={car.name} className="w-full h-60" />
          <h3 className="text-xl font-bold mb-2">{car.name}</h3>
          <p className="text-gray-600 mb-2">${car.price}</p>
          <p className="text-gray-500 text-sm mb-4">{car.description}</p>
          <p className="text-gray-500 text-sm">{car.model}</p>
          <p className="text-gray-500 text-sm">{car.type}</p>
          <button className="bg-blue-500 my-2 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded  ml-auto">Pedir cotización</button> 
        </div>
      ))}
    </div>
    </div>
  );
}
