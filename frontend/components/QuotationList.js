import { useEffect, useState } from "react"
import { getAllQuotation, getWorker, getCar } from "../api/quotation.api.js"
import { getDemand } from "../api/demand.api"
import Link from "next/link";
import styles from "../styles/order.module.css"
import LoadingSpinner from "./Loading.js";


export function QuotationList() {
    const [quotations, setQuotation] = useState([]);
    const [quotationModify, setQuotationModify] = useState([]);
    let [loading, setLoading] = useState(false); 
    
    useEffect(()=> {
        setLoading(true)
        //obtiene todas las ordenes
        const loadQuotation = async () => {
        const { data } = await getAllQuotation();
        setQuotation(data);

        //busca las peticiones de cada cotizacion y los guarda
        const demands = [];
        const demandsIds = [];
        for (let i = 0; i < data.length; i++) {
            const quotation = data[i];
            const { data: demandData } = await getDemand({id:quotation.request});
            demands.push(demandData[0]);
            demandsIds.push(demandData[0].id)
        }

        //busca las carros de cada cotizacion y los guarda
        const cars = [];
        for (let i = 0; i < data.length; i++) {
            const quotation = data[i];
            const { data: carData } = await getCar({id:quotation.carName});
            cars.push(carData[0]);
        }

        //busca los trabajadores de cada peticion y los guarda
        const workers = []
        for (let i = 0; i < demands.length; i++) {
            const demand = demands[i];
            const { data: workerData } = await getWorker({id:demand.worker});
            workers.push(workerData[0]);
        }

        //recorre las peticiones, verifica que sean los datos correctos y edita las peticiones para mostrarlas correctamente
        const updatedQuotation = data.map((quotation) => {
            const demand = demands.find((demand) => demand.id === quotation.request);
            const worker = demand ? workers.find((worker) => worker.id === demand.worker) : null;
            const nameSeller = worker ? worker.name : '';

            const car = cars.find((car) => car.id === quotation.carName);
            const nameCar = car ? car.name : '';
            return {
            ...quotation,
            nameSeller: nameSeller,
            nameCar: nameCar
            };
        });
        setQuotationModify(updatedQuotation)
        setLoading(false)
        };

        loadQuotation();
    }, []);

    return  (
        <div className={styles.order}>
            {!loading ?
                <div className="w-auto h-auto flex flex-col justify-between items-center p-4 ">
                    <h1 className="block font-medium text-3xl p-2">Cotizaciones</h1>
                    <div className="max-w-[100%] h-[73vh] min-[880px]:h-[80vh] overflow-auto text-white">
                        <table className="table-auto bg-[#131619]">
                            <thead>
                                <tr className="sticky top-0 bg-[#95c480] text-black" >
                                    <th className="border-b dark:border-slate-600 px-5 py-2  text-left">Nombre Del Vehiculo</th>
                                    <th className="border-b dark:border-slate-600 px-5 py-2  text-left">Cotizacion</th>
                                    <th className="border-b dark:border-slate-600 px-5 py-2  text-left">Hecho por</th>
                                    <th className="border-b dark:border-slate-600 px-5 py-2  text-left"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#131619]">
                            { quotationModify.map((item) => (
                                <tr key={item.id}>
                                    <td className="border-l border-b border-slate-200 border dark:border-slate-600 px-2">{item.nameCar}</td>
                                    <td className="border-l border-b border-slate-200 border dark:border-slate-600 px-2">{item.price}</td>
                                    <td className="border-l border-b border-slate-200 border dark:border-slate-600 px-2">{item.nameSeller}</td>
                                    <td className="border-l border-r border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-center">
                                        <Link href={`/quotation/quotationId?id=${item.id}`}>
                                            <button className="rounded-full w-[100px] h-[50px] bg-[#0d0f10] hover:bg-[#bbb] hover:text-[#0d0f10]">Editar</button>
                                        </Link>
                                    </td>         
                                </tr> 
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <Link href= "/quotation/quotationId">
                        <button className="h-[4rem] w-[8rem] mb-0 rounded-full bg-[#b6f09c] hover:bg-[#95c480] text-black m-[1rem] hover:text-[#0d0f10] p-2 font- text-center focus:outline-none tap:focus:outline-none">Añadir</button>
                    </Link>
                </div>:
                <LoadingSpinner/>
            }
        </div>
    )
}