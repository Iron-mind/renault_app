//React
import { useEffect, useState } from "react"
import { useRouter } from "next/router";

//Importaciones de funciones de la api
import { getQuotations, getWorker, getCar} from "../../../api/quotation.api"
import { getDemand } from "../../../api/demand.api"

//Next.js
import Link from "next/link";

//Importante que sea default
export default function demandQuotation() {
    //Crea las variables para extraer los datos desde la url
    const router = useRouter();
    const params = router.query;
    let [loading, setLoading] = useState(false); 
    const [dataLoaded, setDataLoaded] = useState(false);

    const [quotations, setQuotation] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [cars, setCars] = useState([]);

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
        let quotation = await getQuotations({request:data[0].id})
        setQuotation(quotation.data[0])
        console.log('la cotizacion es: ', quotation)

        //Saca el nombre del carro
        let cars = await getCar({id:quotation.data[0].carName})
        setCars(cars.data[0])
        console.log('El carro es: ', cars.data[0])
        
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
                    <div className="min-h-[60%] max-h-[60%] h-[60%] w-[100%]">
                        <h1 className="block font-medium text-3xl pb-[60px] text-left">Mas información</h1>
                        <span className="block font-medium text-2xs">Carro</span>
                        <label className="block  p-[20px] pl-[110px]">{cars.name}</label>
                        <span className="block font-medium text-2xs ">Precio</span>
                        <label className="block  p-[20px] pl-[110px]">{quotations.price}</label>
                        <span className="block font-medium text-2xs ">Hecho por</span>
                        <label className="block  p-[20px] pl-[110px] pb-[40px]">{workers.name}</label>
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