import { useEffect, useState } from "react"
import { getAllOrders } from "../api/order.api"
import { useRouter } from 'next/router';
import Link from "next/link";

export function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(()=> {
        async function loadOrder(){
            const {data} = await getAllOrders();
            setOrders(data);
            console.log(data)
        }
        loadOrder();
    }, []);

    return  <div className="flex max-h-[96%] min-h-[96%] h-[96%] max-w-[77%] min-w-[77%] w-[77%] bg-[#0d0f10] fixed right-[1rem] top-[1rem] rounded-md flex-col items-center py-24 px-24 pb-12 ">
                <h1 className="block font-medium text-3xl p-2">Ordenes de trabajo</h1>
                <div className="hover:table-fixed min-h-[70%] max-h-[70%]  h-[70%] w-[100%] overscroll-contain overflow-auto">
                    <table className="table-fixed hover:table-fixed h-[100%] w-[100%] mt-[1rem] border-collapse text-sm m-0  overscroll-contain">
                        <thead>
                            <tr className="sticky top-0 bg-[#0d0f10]" >
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Carro</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Precio</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Vendedor</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#131619]">

                        { orders.map((item) => (
                            <tr key={item.id}>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.car}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.price}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.request.worker.name}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-center">
                                    <Link href={`/order/orderId?id=${item.id}`}>
                                        <button className="rounded-full w-[100px] h-[50px] bg-[#0d0f10] hover:bg-[#bbb] hover:text-[#0d0f10]">Ver mas</button>
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
            </div>
}