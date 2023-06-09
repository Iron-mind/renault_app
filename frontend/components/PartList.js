import { useEffect, useState } from "react"
import { getAllParts } from "../api/part.api"
import { useRouter } from 'next/router';
import Link from "next/link";

export function PartList() {
    const [parts, setParts] = useState([]);

    useEffect(()=> {
        async function loadPart(){
            const res = await getAllParts();
            setParts(res.data);
            console.log(res.data)
        }
        loadPart();
    }, []);

    return  <div className="flex max-h-[96%] min-h-[96%] h-[96%] max-w-[77%] min-w-[77%] w-[77%] bg-[#0d0f10] fixed right-[1rem] top-[1rem] rounded-md flex-col items-center py-24 px-24 pb-12 ">
                <h1 className="block font-medium text-3xl p-2">Inventario</h1>
                <div className="hover:table-fixed min-h-[70%] max-h-[70%]  h-[70%] w-[100%] overscroll-contain overflow-auto">
                    <table className="table-fixed hover:table-fixed h-[100%] w-[100%] mt-[1rem] border-collapse text-sm m-0  overscroll-contain">
                        <thead>
                            <tr className="sticky top-0 bg-[#0d0f10]" >
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Nombre</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Precio</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Cantidad</th>
                                <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#131619]">

                        { parts.map((item) => (
                            <tr key={item.id}>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.name}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.price}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.amount}</td>
                                <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-center">
                                    <Link href={`/part/partId?id=${item.id}`}>
                                        <button className="rounded-full w-[100px] h-[50px] bg-[#0d0f10] hover:bg-[#bbb] hover:text-[#0d0f10]">Edit</button>
                                    </Link>
                                </td>           
                            </tr> 
                        ))}
                        </tbody>
                    </table>
                </div>
                <Link href= "/part/partId">
                    <button className="rounded-full w-[15rem] h-[5rem] bg-[#131619] absolute bottom-[3rem] right-[3rem] hover:bg-[#bbb] m-[1rem] hover:text-[#0d0f10]">Añadir</button>
                </Link>
            </div>
}