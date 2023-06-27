//React
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"

//Importaciones de funciones de la api
import { createDemand, getAllClients, getAllSellers } from "../../api/demand.api"

//Next.js
import Link from "next/link";

//Importante que sea default
export default function Demand() {
    //Crea las variables para extraer los datos desde la url
    const router = useRouter();
    const params = router.query;
    const [sellers, setSellers] = useState([]);
    const [clients, setClients] = useState([]);

    
    //Todo lo necesario para el formulario, se usa en la pagina web
    const { register, handleSubmit, formState: {errors}, watch } = useForm();
    const actuallySeller = watch("worker")
    const actuallyClient = watch("client")

    

    //Aqui realiza todo con respecto al formulario, para editar y para crear
    const onSubmit = handleSubmit(async data =>{ //Funcion asincrona
        console.log(data)
        await createDemand(data)
        //Redirecciona
        router.push('/order')
    })

    //Extrae de la base de datos ese dato por medio del id,para llenar la informacion de las casillas 
    useEffect(()=> {
        //Extrae los clientes
        async function loadClient(){
            const {data} = await getAllClients();
            setClients(data)
        }
        loadClient();

        //Extrae los vendedores 
        async function loadSellers(){
            const {data} = await getAllSellers();
            setSellers(data)
        }
        loadSellers();
    }, []);

    //Pagina
    return  <div className="flex max-h-[70%] min-h-[70%] h-[70%] max-w-[60%] min-w-[60%] w-[60%] bg-[#0d0f10] fixed right-[10rem] top-[8rem] rounded-md flex-col items-center py-24 px-24 pb-12">
                <div className="min-h-[70%] max-h-[70%] h-[70%] w-[100%] ">
                    <h1 className="block font-medium text-3xl pb-4">Crea uno nuevo</h1>
                    <form onSubmit={onSubmit} className="min-h-[100%] max-h-[100%] h-[100%] w-[100%] flex flex-col">
                        <span className=" after:text-red-500 block font-medium ">
                            Escoga el cliente
                            <select 
                                {...register("client",{required: true})}
                                value={actuallyClient}
                                className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]">    
                                    <option disabled value="" defaultValue>Selecciona una opción</option>
                                {clients.map((item) => (
                                    <option key={item.id} value={item.id}>
                                    {item.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        {errors.client && <span className="absolute right-[7rem] top-[10rem] after:ml-0.5 after:text-red-500 block font-medium text-white">Este campo es requerido</span>}
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium ">La petición ya esta completa?</span>
                        <label>
                            <input 
                                type="radio" 
                                name="state" 
                                value={true} 
                                {...register("state",{required: true})}/>
                            Yes
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="state"
                                value={false}
                                {...register("state",{required: true})}/>
                            No
                        </label>
                        {errors.state && <span className="absolute right-[7rem] top-[15rem] after:ml-0.5 after:text-red-500 block font-medium ">Este campo es requerido</span>}
                        <span className=" after:text-red-500 block font-medium ">
                            Seleccione el vendedor
                            <select 
                                {...register("worker",{required: true})}
                                value={actuallySeller}
                                className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]">    
                                    <option disabled value="" defaultValue>Selecciona una opción</option>
                                {sellers.map((item) => (
                                    <option key={item.id} value={item.id}>
                                    {item.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        {errors.worker && <span className="absolute right-[7rem] top-[21rem] after:ml-0.5 after:text-red-500 block font-medium text-white">Este campo es requerido</span>}
                        <button className="rounded-full w-[10rem] h-[5rem] bg-[#b6f09c] absolute bottom-[3rem] right-[3rem] hover:bg-[#95c480] m-[1rem] text-[#131619] font-medium">Confirmar</button>
                    </form>
                </div>
            </div>
}
