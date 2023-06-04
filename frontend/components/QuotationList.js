import { useEffect, useState } from "react"
import { getAllQuotation } from "../api/quotation.api"
import Link from "next/link";

export function QuotationList() {
    const [quotations, setQuotation] = useState([]);

    useEffect(()=> {
        async function loadQuotation(){
            const res = await getAllQuotation();
            setQuotation(res.data);
            console.log(res.data)
        }
        loadQuotation();
    }, []);

    return  <div className="flex max-h-[96%] min-h-[96%] h-[96%] max-w-[72%] min-w-[72%] w-[72%] bg-[#0d0f10] fixed right-[1rem] top-[1rem] rounded-md flex-col items-center justify-between py-24 px-24 pb-12  place-content-center">
                <div className="hover:table-fixed min-h-[80%] max-h-[80%]  h-[80%] w-[100%] overscroll-contain overflow-auto">
                    <table className="table-fixed hover:table-fixed h-[100%] w-[100%] mt-[1rem] border-collapse text-sm m-0  overscroll-contain">
                        <thead>
                            <tr >
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Precio</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Carro</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Solicitud</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Personal Encargado</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Propietario</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Estado</th>

                            </tr>
                        </thead>
                        <tbody className="bg-[#131619]">
                        { quotations.map((item) => (
                            <tr key={item.id}>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.price}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.carName}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.request.id}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.request.worker.name}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.request.client.name}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.request.status}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-center">
                                    <Link href={`/quotation/${item.id}`}>
                                        <button className="rounded-full w-[100px] h-[50px] bg-[#0d0f10] hover:bg-[#bbb] hover:text-[#0d0f10]">Edit</button>
                                    </Link>
                                </td>           
                            </tr> 
                        ))}
                        </tbody>
                    </table>
                </div>
                <button className="rounded-full w-[15rem] h-[5rem] bg-[#131619] absolute bottom-[3rem] right-[3rem] hover:bg-[#bbb] m-[1rem] hover:text-[#0d0f10]">Añadir</button>
            </div>
            

        /*
        {quotation.map(quotation => (
            <div>
                
                <p></p>
                <p>{quotation.carName}</p>
                <p>{quotation.request}</p>
            </div>
        ))}
        */
        /*
        <div style={{color: '#ffffff'}} className="flex min-h-screen flex-col items-center justify-between p-24">
            pagina
        </div>
        */ 
}