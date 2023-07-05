import { useEffect, useState } from "react"
import { getAllOrders, getWorker } from "../api/order.api"
import { getDemand } from "../api/demand.api"
import Link from "next/link";
import LoadingSpinner from "./Loading";
import styles from "../styles/order.module.css"

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
        <div className={styles.order}>
            {!loading? 
                <div className="w-auto h-auto flex flex-col justify-between items-center p-4 ">
                    <h1 className="block font-medium text-3xl p-4">Ordenes de trabajo</h1>
                    <div className="max-w-[100%] h-auto min-[880px]:h-[80vh] overflow-auto  text-white">
                        <table className="table-auto bg-[#131619]">
                            <thead>
                                <tr className="sticky top-0 bg-[#95c480] text-black" >
                                    <th className="border-b dark:border-slate-600 px-5 py-2  text-left">Fecha de Creación</th>
                                    <th className="border-b dark:border-slate-600 px-4 py-2  text-left">Carro</th>
                                    <th className="border-b dark:border-slate-600 px-4 py-2  text-left">Precio</th>
                                    <th className="border-b dark:border-slate-600 px-4 py-2  text-left">Vendedor</th>
                                    <th className="border-b dark:border-slate-600 px-4 py-2  text-left max-w-[400px]">Descripción</th>
                                    <th className="border-b dark:border-slate-600 px-4 py-2  text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                            { ordersModify.map((item) => (
                                <tr key={item.id}>
                                    <td className="border-l border-b border-slate-200 border dark:border-slate-600 px-2">{item.startTime}</td>
                                    <td className="border-l border-b border-slate-200 dark:border-slate-600 px-2">{item.car}</td>
                                    <td className="border-l border-b border-slate-200 dark:border-slate-600 px-2">{item.price}</td>
                                    <td className="border-l border-b border-slate-200 dark:border-slate-600 px-2">{item.nameSeller}</td>
                                    <td className="border-l border-b border-slate-200 dark:border-slate-600 max-w-[400px] w-[300px] p-2">
                                        <div className="max-h-[250px] h-[250px] max-w-[400px] w-[300px] flex items-center overflow-auto ">
                                            {item.description}
                                        </div>
                                    </td>
                                    <td className="border-l border-r border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-center">
                                        <Link href={`/order/orderId?id=${item.id}`}>
                                            <button className="rounded-full w-[100px] h-[50px] bg-[#0d0f10] hover:bg-[#bbb] hover:text-[#0d0f10] focus:outline-none tap:focus:outline-none">Editar</button>
                                        </Link>
                                    </td>           
                                </tr> 
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex justify-center">
                        <Link href= "/order/orderId" className="">
                            <button className="h-[4rem] w-[8rem] mb-0 rounded-full bg-[#b6f09c] hover:bg-[#95c480] text-black m-[1rem] hover:text-[#0d0f10] p-2 font- text-center focus:outline-none tap:focus:outline-none">Añadir</button>
                        </Link>
                    </div>
                </div>:
                <LoadingSpinner/>
            }
        </div>
    )
}