import { useEffect, useState } from "react"
import { getAllQuotation } from "../api/quotation.api.js"

export function QuotationList() {
    const [quotations, setQuotation] = useState([]);

    useEffect(()=> {
        async function loadQuotation(){
            const {data} = await getAllQuotation();
            setQuotation(data);
            console.log(data)
        }
        loadQuotation();
    }, []);

    return  <div className="flex max-h-[96%] min-h-[96%] h-[96%] max-w-[77%] min-w-[77%] w-[77%] bg-[#0d0f10] fixed right-[1rem] top-[1rem] rounded-md flex-col items-center py-24 px-24 pb-12 ">
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
                        { quotations.map((item) => (
                            <tr key={item.id}>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.carName.name}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.price}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.request.worker.name}</td>          
                            </tr> 
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
}