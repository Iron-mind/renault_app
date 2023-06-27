import { useEffect, useState } from "react"
import { getAllQuotation, getWorker, getCar } from "../api/quotation.api.js"
import { getDemand } from "../api/demand.api"
import Link from "next/link";

export function QuotationList() {
    const [quotations, setQuotation] = useState([]);
    const [quotationModify, setQuotationModify] = useState([]);
    let [loading, setLoading] = useState(false); 

    //Confirmar si es el jefe de taller o no
    const usuarioEsVendedor = true
    
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

        //Si es un usuario, reduce la cantidad de cotizaciones a la de solo el cliente
        if (!usuarioEsVendedor) {
            // Filtra las órdenes basadas en las demandas
            const filteredQuotationList = data.filter((quotation) => demandsIds.includes(quotation.request));
            setQuotation(filteredQuotationList)
            demands.clear()
            demandsIds.clear()

            for (let i = 0; i < filteredQuotationList.length; i++) {
                const quotation = filteredQuotationList[i];
                const { data: demandData } = await getDemand({id:quotation.request});
                demands.push(demandData[0]);
            }

            for (let i = 0; i < filteredQuotationList.length; i++) {
                const quotation = filteredQuotationList[i];
                const { data: carData } = await getCar({id:quotation.carName});
                cars.push(carData[0]);
            }
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
        <div>
            {!loading ?
                <div className="flex max-h-[96%] min-h-[96%] h-[96%] max-w-[77%] min-w-[77%] w-[77%] bg-[#0d0f10] fixed right-[1rem] top-[1rem] rounded-md flex-col items-center py-24 px-24 pb-12 ">
                    <h1 className="block font-medium text-3xl p-2">Cotizaciones</h1>
                    <div className="hover:table-fixed min-h-[70%] max-h-[70%]  h-[70%] w-[100%] overscroll-contain overflow-auto">
                        <table className="table-fixed hover:table-fixed h-[100%] w-[100%] mt-[1rem] border-collapse text-sm m-0  overscroll-contain">
                            <thead>
                                <tr className="sticky top-0 bg-[#0d0f10]" >
                                    <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Nombre Del Vehiculo</th>
                                    <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Cotizacion</th>
                                    <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Hecho por</th>
                                    <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#131619]">
                            { quotationModify.map((item) => (
                                <tr key={item.id}>
                                    <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.nameCar}</td>
                                    <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.price}</td>
                                    <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.nameSeller}</td>
                                    <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-center">
                                        <Link href={`/quotation/quotationId?id=${item.id}`}>
                                            <button className="rounded-full w-[100px] h-[50px] bg-[#0d0f10] hover:bg-[#bbb] hover:text-[#0d0f10]">Editar</button>
                                        </Link>
                                    </td>         
                                </tr> 
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {usuarioEsVendedor && 
                        <Link href= "/quotation/quotationId">
                            <button className="rounded-full w-[15rem] h-[5rem] bg-[#131619] absolute bottom-[3rem] right-[3rem] hover:bg-[#bbb] m-[1rem] hover:text-[#0d0f10]">Añadir</button>
                        </Link>}
                </div>:
                <div
                className="fixed right-[40%] top-[50%] h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div> 
            }
        </div>
    )
}