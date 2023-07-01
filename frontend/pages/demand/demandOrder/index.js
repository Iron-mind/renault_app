//React
import { useEffect, useState } from "react"
import { useRouter } from "next/router";

//Importaciones de funciones de la api
import { getOrders, getWorker} from "../../../api/order.api"
import { getDemand } from "../../../api/demand.api"

//Next.js
import Link from "next/link";

//Importante que sea default
export default function demandOrder() {
    //Crea las variables para extraer los datos desde la url
    const router = useRouter();
    const params = router.query;
    let [loading, setLoading] = useState(false); 
    const [dataLoaded, setDataLoaded] = useState(false);

    const [orders, setOrders] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [strings, setStrings] = useState("");
 
    //Extrae la demanda especifica
    async function loadDemands(){
        setLoading(true)

        //Saca la peticion
        let {data} = await getDemand({id:params.id});
        console.log('la peticion es: ', data[0])

        //Saca el nombre del vendedor
        let worker = await getWorker({id:data[0].worker});
        setWorkers(worker.data[0])
        console.log('el trabajador es: ', worker.data[0])
        
        //Saca la cotizacion
        let order = await getOrders({request:data[0].id})
        setOrders(order.data[0])
        
        if(data[0].state){
            setStrings("Completado")
        }else{
            setStrings("En proceso")
        }
        console.log('el trabajador es: ', order.data[0])
        console.log('la fecha es: ',order.data[0].startTime)
        setLoading(false)
        setDataLoaded(true);
    }


    // Obtener las opciones de la base de datos y recargar la pagina adecuadamente
    useEffect(() => {
        if (params.id && !dataLoaded) {
            loadDemands();
          }        
    }, [params.id, dataLoaded]);


    //Pagina
    return  (
        <div>
            {!loading?
                <div className="flex max-h-[80%] min-h-[80%] h-auto max-w-[60%] min-w-[30%] w-auto bg-[#0d0f10] fixed left-[40%] top-[10%] rounded-md flex-col items-center py-24 px-24 pb-12">
                    <h1 className="block font-medium text-3xl pb-[60px] text-left">Mas información</h1>
                    <div className="min-h-[60%] max-h-[60%] h-[60%] w-[100%] overscroll-contain overflow-auto">
                        <span className="block font-medium text-2xs">Carro</span>
                        <label className="block  p-[20px] pl-[110px] pr-[30px]">{orders.car}</label>
                        <span className="block font-medium text-2xs ">Precio</span>
                        <label className="block  p-[20px] pl-[110px] pr-[30px]">{orders.price}</label>
                        <span className="block font-medium text-2xs ">Fecha de creación</span>
                        <label className="block  p-[20px] pl-[110px] pr-[30px]">{new Date(orders.startTime).toLocaleDateString()}</label>
                        <span className="block font-medium text-2xs ">Estado</span>
                        <label className="block  p-[20px] pl-[110px] pr-[30px]">{strings}</label>
                        <span className="block font-medium text-2xs ">Hecho por</span>
                        <label className="block  p-[20px] pl-[110px] pb-[40px]">{workers.name}</label>
                        <span className="block font-medium text-2xs ">Descripcion</span>
                        <label className="block pt-[20px] pb-[20px] w-[500px]">{orders.description}</label>
                    </div>
                    <Link href={'/demand/'}>
                        <button className="rounded-full w-[10rem] h-[5rem] bg-[#131619] hover:bg-[#bbb] m-[1rem] hover:text-[#0d0f10] font-medium">Volver</button>
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