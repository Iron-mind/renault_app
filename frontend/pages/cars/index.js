import { useEffect, useState } from "react";
import { getAllCars } from "../../api/car.api";
import LoadingSpinner from "../../components/Loading";
import styles from "../../styles/inicio.module.css";
import Link from "next/link";

export default function Cars() {
	const [input, setInput] = useState({ name: "", type: "any", price: "" });
	const [cars, setCars] = useState([]);
	const [userRole, setUserRole] = useState("");
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState(false);

	function handleInputChange(event) {
		setInput({ ...input, [event.target.name]: event.target.value });
	}
	function makeRequest(car) {
		localStorage.setItem("quotationCar", JSON.stringify(car));
	}

	function handleSearch() {
		setLoading(true);

		let query = {};
		if (input.name) query["name"] = input.name;
		if (input.type !== "any") query["type"] = input.type;
		if (input.price) query["price"] = input.price;
		getAllCars(query)
			.then((res) => {
				setCars(res.data);
				setLoading(false);
				setInput({ name: "", type: input.type, price: "" });
			})
			.finally(() => setLoading(false));
	}

	useEffect(() => {
		setInput({ name: "", type: "any" });
		function fetchData() {
			getAllCars().then((res) => {
				setCars(res.data);
				setLoading(false);
			});
		}
		fetchData();
		localStorage.getItem("role") && setUserRole(localStorage.getItem("role"));
	}, []);

	const handleFilterClick = () => {
		setFilter(!filter);
	};

	return (
		<div className={styles.inicio}>
			<div
				style={{ color: "#131619" }}
				className="flex flex-col items-center justify-between sm:p-12 p-0 sm:w-auto w-[100%]"
			>
				<button
					className={`${styles.transitionButton} ${
						filter && styles.transitionButtonActive
					}`}
					checked={filter}
					onClick={handleFilterClick}
				>
					🡲 Filtra aqui 🡰
				</button>
				<div
					className={`${styles.transition} ${
						filter && styles.transitionActive
					}`}
				>
					<label className="text-xl text-white font-bold mb-2">
						Busca por nombre
					</label>
					<input
						className="border border-gray-300 rounded text-[#131619] px-4 py-2 focus:outline-none lg:w-[60%]"
						type="text"
						placeholder="Buscar..."
						value={input.name}
						name="name"
						onChange={handleInputChange}
					/>
					<label className="text-xl text-white font-bold mt-1">
						Por precio
					</label>
					<div className="flex items-center justify-start py-2">
						<input
							className="border border-gray-300 rounded px-2 py-2 w-[60%] focus:outline-none lg:w-[45%] "
							type="text"
							placeholder="Precio COP"
							value={input.price}
							name="price"
							onChange={handleInputChange}
						/>
					</div>
					<label className="text-xl text-white font-bold">Por modelo</label>
					<div className="flex items-center justify-start py-2">
						<select
							onChange={handleInputChange}
							name="type"
							value={input.type}
							className="border border-gray-300 rounded px-1 py-2 focus:outline-none w-[60%] lg:w-[45%]"
						>
							<option value="SU">SUV</option>
							<option value="HB">Hatchback</option>
							<option value="CT">Convertible</option>
							<option value="SD">Sedán</option>
							<option value="CP">Camioneta pickup</option>
							<option value="MV">Minivan</option>
							<option value="CO">Coupé</option>
							<option value="SW">Station Wagon</option>
							<option value="DP">Deportivo</option>
							<option value="any">Cualquier Modelo</option>
						</select>
					</div>
					<div className="py-2">
						<button
							className="bg-[#b6f09c] active:bg-[#95c480] text-[#131619] font-bold py-2 px-4 rounded w-[100%]"
							onClick={handleSearch}
						>
							Buscar
						</button>
					</div>
				</div>
				{!loading ? (
					<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[4rem] sm:mt-[0.5rem]">
						{cars.map((car, index) => (
							<div
								key={index}
								className="bg-[#0d0f10] shadow-lg p-8 rounded overflow-hidden"
							>
								<img src={car.image} alt={car.name} className="w-full h-60" />
								<h3 className="text-xl text-white font-bold mb-2 pt-2">
									{car.name}
								</h3>
								<p className="text-white mb-2">${car.price}</p>
								<p className="text-white text-sm mb-4">{car.description}</p>
								<div className="flex align-middle justify-between ">
									<p className="text-white text-sm">{car.model}</p>
									<p className="text-white text-sm">{car.type}</p>
								</div>
								{userRole == "client" && (
									<Link href="/quotation/quotationId">
										<button
											onClick={() => makeRequest(car)}
											className="bg-[#b6f09c] mt-8 hover:bg-[#95c480] text-[#131619] font-bold py-2 px-4 w-[100%] rounded"
										>
											Pedir cotización
										</button>
									</Link>
								)}
								{userRole == "staff" && (
									<Link href="/quotation/quotationId">
										<button
											onClick={() => makeRequest(car)}
											className="bg-[#b6f09c] mt-8 hover:bg-[#95c480] text-[#131619] font-bold py-2 px-4 w-[100%] rounded"
										>
											Vender
										</button>
									</Link>
								)}{" "}
							</div>
						))}
					</div>
				) : (
					<LoadingSpinner />
				)}
			</div>
		</div>
	);
}
