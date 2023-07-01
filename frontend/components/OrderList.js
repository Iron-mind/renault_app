import { useEffect, useState } from "react"
import { getAllOrders, getWorker } from "../api/order.api"
import { getDemand } from "../api/demand.api"
import Link from "next/link";

export function OrderList() {
    const [orders, setOrders] = useState([]);
    const [ordersModify, setOrdersModify] = useState([]);

    let [loading, setLoading] = useState(false); 

    useEffect(() => {
        setLoading(true)
        //obtiene todas las ordenes
        const loadData = async () => {
        const { data } = await getAllOrders();
        console.log('la data es', data);
        setOrders(data);

        //busca las peticiones de cada orden y los guarda
        const demands = [];
        const demandsIds = [];
        for (let i = 0; i < data.length; i++) {
            const order = data[i];
            const { data: demandData } = await getDemand({id:order.request});
            demands.push(demandData[0]);
            demandsIds.push(demandData[0].id)
        }
        console.log('Estas son las peticiones: ', demands);
        
        //busca los trabajadores de cada peticion y los guarda
        const workers = []
        for (let i = 0; i < demands.length; i++) {
            const demand = demands[i];
            const { data: workerData } = await getWorker({id:demand.worker});
            workers.push(workerData[0]);
        }
        console.log("los workers son: ", workers)

        //recorre las ordenes, verifica que sean los datos correctos y edita las ordenes para mostrarlas correctamente
        const updatedOrders = data.map((order, i) => {
            const demand = demands.find((demand) => demand.id === order.request);
            const worker = demand ? workers.find((worker) => worker.id === demand.worker) : null;
            const nameSeller = worker ? worker.name : '';
            return {
            ...order,
            nameSeller: nameSeller
            };
        });
        setOrdersModify(updatedOrders)
        setLoading(false)
        };
        loadData();
      }, []);


    return  (
        <div >
            {!loading? 
                <div className="flex max-h-[96%] min-h-[96%] h-[96%] max-w-[77%] min-w-[77%] w-[77%] bg-[#0d0f10] fixed right-[1rem] top-[1rem] rounded-md flex-col items-center py-24 px-24 pb-12 ">
                    <h1 className="block font-medium text-3xl p-2">Ordenes de trabajo</h1>
                    <div className="hover:table-fixed min-h-[70%] max-h-[70%]  h-[70%] w-[100%] overscroll-contain overflow-auto">
                        <table className="table-fixed hover:table-fixed h-[100%] w-[100%] mt-[1rem] border-collapse text-sm m-0  overscroll-contain">
                            <thead>
                                <tr className="sticky top-0 bg-[#0d0f10]" >
                                    <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Fecha de Creación</th>
                                    <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Carro</th>
                                    <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Precio</th>
                                    <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Vendedor</th>
                                    <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left w-1/3">Descripción</th>
                                    <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#131619]">

                            { ordersModify.map((item) => (
                                <tr key={item.id}>
                                    <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.startTime}</td>
                                    <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.car}</td>
                                    <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.price}</td>
                                    <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.nameSeller}</td>
                                    <td className="border-b border-slate-200 dark:border-slate-600 p-4 w-1/3">
                                        <div className="max-h-[250px] h-[250px] flex items-center overflow-auto pl-2 ml-2">
                                            {item.description}
                                        </div>
                                    </td>
                                    <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-center">
                                        <Link href={`/order/orderId?id=${item.id}`}>
                                            <button className="rounded-full w-[100px] h-[50px] bg-[#0d0f10] hover:bg-[#bbb] hover:text-[#0d0f10]">Editar</button>
                                        </Link>
                                    </td>           
                                </tr> 
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <Link href= "/order/orderId">
                        <button className="rounded-full w-[15rem] h-[5rem] bg-[#131619] absolute bottom-[3rem] right-[3rem] hover:bg-[#bbb] m-[1rem] hover:text-[#0d0f10]">Añadir</button>
                    </Link>
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