//React
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"

//Importaciones de funciones de la api
import { editOrder, deleteOrder, getOrder, createOrder } from "../../../api/order.api"

//Next.js
import Link from "next/link";

//Importante que sea default
export default function Order() {
    //Crea las variables para extraer los datos desde la url
    const router = useRouter();
    const params = router.query;
    const [orders, setOrder] = useState([]);
    const [vendedores, setVendedor] = useState('');

    //Todo lo necesario para el formulario, se usa en la pagina web
    const { register, handleSubmit, formState: {errors}, setValue } = useForm();

    //Aqui realiza todo con respecto al formulario, para editar y para crear
    const onSubmit = handleSubmit(async data =>{ //Funcion asincrona
        //Si existe el parametro id, actualiza el dato, sino crea uno nuevo
        if(params.id){
            await editOrder(params.id, data)
        }else{
            await createOrder(data)
        }
        //Redirecciona
        router.push('/order')
    })

    //Extrae de la base de datos ese dato por medio del id,para llenar la informacion de las casillas 
    useEffect(()=> {
        //Si existe el parametro id, busca en la base de datos
        if(params.id){
            //funcion asincrona
            async function loadOrder(){
                const {data} = await getOrder(params.id);
                setOrder(data)
                //los coloca en los campos
                setValue('car', data.car)
                setValue('price', data.price)
                setValue('request', data.request.worker.name)
                setValue('startTime', data.startTime)
                setValue('description', data.description)
            }
            loadOrder();
        }
    }, []);

    const handleSeleccionarVendedor = (event) => {
        setVendedor(event.target.value);
    };

    //Pagina
    return  <div className="flex max-h-[90%] min-h-[90%] h-[90%] max-w-[60%] min-w-[60%] w-[60%] bg-[#0d0f10] fixed right-[10rem] top-[3rem] rounded-md flex-col items-center py-24 px-24 pb-12">
                <div className="min-h-[70%] max-h-[70%] h-[70%] w-[100%] ">
                    {params.id && <h1 className="block font-medium text-3xl pb-4">Actualiza los datos</h1>}
                    {!params.id && <h1 className="block font-medium text-3xl pb-4">Crea uno nuevo</h1>}
                    <form onSubmit={onSubmit} className="min-h-[100%] max-h-[100%] h-[100%] w-[100%] flex flex-col">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium ">Carro</span>
                        <input 
                            className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]"
                            type="text" 
                            placeholder="Nombre" 
                            {...register("name",{required: true})}/>
                        {errors.name && <span className="absolute right-[7rem] after:ml-0.5 after:text-red-500 block font-medium ">Este campo es requerido</span>}
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium ">Precio</span>
                        <input 
                            className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]"
                            type="number" 
                            placeholder="Precio" 
                            {...register("price",{required: true})}/>
                        {errors.price && <span className="absolute right-[7rem] top-[15rem] after:ml-0.5 after:text-red-500 block font-medium ">Este campo es requerido</span>}
                        <span className=" after:text-red-500 block font-medium ">
                            Escoga el vendedor
                            <select 
                                value={vendedores} 
                                onChange={handleSeleccionarVendedor}
                                {...register("request",{required: true})}
                                className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]">    
                                {orders.map((order) => (
                                    <option key={order.id} value={order.id}>
                                    {order.request.worker.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        {errors.request && <span className="absolute right-[7rem] top-[21rem] after:ml-0.5 after:text-red-500 block font-medium text-white">Este campo es requerido</span>}
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium ">Fecha de creación</span>
                        <input 
                            className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]"
                            type="text" 
                            placeholder="fecha" 
                            disabled
                            {...register("startTime",{required: true})}/>
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium ">Descripción</span>
                        <textarea 
                            className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border h-[200px] border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 "
                            placeholder="descripción"
                            rows="5" 
                            maxLength="750"
                            {...register("description",{required: true})}/>
                        {errors.description && <span className="absolute right-[7rem] top-[33rem] after:ml-0.5 after:text-red-500 block font-medium ">Este campo es requerido</span>}
                        <button className="rounded-full w-[10rem] h-[5rem] bg-[#b6f09c] absolute bottom-[3rem] right-[3rem] hover:bg-[#95c480] m-[1rem] text-[#131619] font-medium">Confirmar</button>
                    </form>
                    {params.id && <button 
                        className="rounded-full w-[10rem] h-[5rem] bg-[#131619] absolute bottom-[3rem] right-[16rem] hover:bg-[#bbb] m-[1rem] hover:text-[#0d0f10] font-medium"
                        onClick ={async () =>{
                            const accepted = window.confirm('Estas seguro?')
                            if(accepted){
                                await deleteOrder(params.id);
                                router.push('/order')
                    }}}>Borrar
                    </button>}    
                </div>
                <Link href={'/order/'}>
                    <button className="rounded-full w-[10rem] h-[5rem] bg-[#131619] absolute bottom-[3rem] left-[3rem] hover:bg-[#bbb] m-[1rem] hover:text-[#0d0f10] font-medium">Volver</button>
                </Link>
            </div>
}