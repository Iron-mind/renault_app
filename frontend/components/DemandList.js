//React
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"

//Importaciones de funciones de la api
import { getDemand, getWorker } from "../api/demand.api"

//Next.js
import Link from "next/link";
import { getAllOrders } from "@/api/order.api";
import Quotation from "@/pages/quotation";
 
//Importante que sea default
export function DemandList() {
    //Cambiar por el cliente actual
    const clientId = 12
    //Crea las variables para extraer los datos desde la url
    const router = useRouter();
    const params = router.query;
    let [loading, setLoading] = useState(false);
    const [demands, setDemands] = useState([]);
    const [demandsModify, setDemandsModify] = useState([]);



    //Extrae de la base de datos ese dato por medio del id,para llenar la informacion de las casillas 
    useEffect(()=> {
        setLoading(true)
        //Extrae los clientes
        async function loadDemands(){
            const {data} = await getDemand({client:clientId});
            setDemands(data)
            console.log("data es: ", data)
            //busca los trabajadores de cada peticion y los guarda
            const demandsIds = []
            const workers = []
            for (let i = 0; i < data.length; i++) {
                const demand = data[i];
                const { data: workerData } = await getWorker({id:demand.worker});
                workers.push(workerData[0]);
                demandsIds.push(demand.id)
            }

            //obtiene las ordenes y las filtra por las peticiones que ya hay 
            const ordenes = await getAllOrders()
            const filteredDemandsList = ordenes.data.filter((orden) => demandsIds.includes(orden.request));

            const updatedDemands = await Promise.all(data.map(async (demand) => {
                const worker = workers.find((worker) => worker.id === demand.worker);
                const nameSeller = worker ? worker.name : '';
                const isInOrders = filteredDemandsList.some((orden) => orden.request === demand.id);
                let typeOf = "";
                let stateString = "";
                let isQuotation = "";

                if (isInOrders) {
                    typeOf = "Orden de Reparacion";
                    isQuotation = false
                } else {
                    typeOf = "Cotizacion";
                    isQuotation = true
                }
                
                if(demand.state){
                    stateString = "Completado"
                }else{
                    stateString = "En proceso"
                }

                console.log("typeOf: ", typeOf);
                console.log("nameSeller: ", nameSeller);
                return {
                    ...demand,
                    nameSeller: nameSeller,
                    typeOf: typeOf,
                    stateString: stateString, 
                    isQuotation: isQuotation,
                };
            }));
            setDemandsModify(updatedDemands)
            setLoading(false)
        };
        loadDemands();

    }, []);

    //Pagina
    return ( 
        <div>
            {!loading? 
                <div className="flex max-h-[70%] min-h-[70%] h-[70%] max-w-[60%] min-w-[60%] w-[60%] bg-[#0d0f10] fixed right-[10rem] top-[8rem] rounded-md flex-col items-center py-24 px-24 pb-12">
                    <div className="min-h-[80%] max-h-[80%] h-[80%] w-[100%] ">
                        <h1 className="block font-medium text-3xl pb-4">Tus peticiones</h1>
                        <div className="hover:table-fixed min-h-[90%] max-h-[90%]  h-[90%] w-[100%] overscroll-contain overflow-auto">
                            <table className="table-fixed hover:table-fixed h-[100%] w-[100%] mt-[1rem] border-collapse text-sm m-0  overscroll-contain">
                                <thead>
                                    <tr className="sticky top-0 bg-[#0d0f10]" >
                                        <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">#</th>
                                        <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Tipo de petición</th>
                                        <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Estado</th>
                                        <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left">Hecho por</th>
                                        <th className="border-b dark:border-slate-600  p-4 pl-8 pt-0 pb-3 text-left"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-[#131619]">
                                {demandsModify.map((item) => (
                                    <tr key={item.id}>
                                        <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.id}</td>
                                        <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.typeOf}</td>
                                        <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.stateString}</td>
                                        <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8">{item.nameSeller}</td>
                                        {item.isQuotation && 
                                            <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-center">
                                                <Link href={`/demand/demandQuotation?id=${item.id}`}>
                                                    <button className="rounded-full w-[100px] h-[50px] bg-[#0d0f10] hover:bg-[#bbb] hover:text-[#0d0f10]">Ver más</button>
                                                </Link>
                                            </td>
                                        }
                                        {!item.isQuotation && 
                                            <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-center">
                                                <Link href={`/demand/demandOrder?id=${item.id}`}>
                                                    <button className="rounded-full w-[100px] h-[50px] bg-[#0d0f10] hover:bg-[#bbb] hover:text-[#0d0f10]">Ver más</button>
                                                </Link>
                                            </td>
                                        }          
                                    </tr> 
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
