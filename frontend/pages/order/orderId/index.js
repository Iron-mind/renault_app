//React
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"
import moment from 'moment';

//Importaciones de funciones de la api
import { editOrder, deleteOrder, getOrder, createOrder, getWorker, getClient } from "../../../api/order.api"
import { createDemand, getAllClients, getAllSellers, getDemand, editDemand, deleteDemand } from "../../../api/demand.api"

//Next.js
import Link from "next/link";

//Importante que sea default
export default function Order() {
    //Crea las variables para extraer los datos desde la url
    const router = useRouter();
    const params = router.query;
    let [loading, setLoading] = useState(false); 
    const [orders, setOrder] = useState([]);
    const [clients, setClients] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [demands, setDemands] = useState({
        client: "",
        state: "",
        worker: "",
    });
    const [idDemands,setIdDemands] = useState([]);
    const [mostrarVendedor, setMostrarVendedor] = useState("");
    const [mostrarCliente, setMostrarCliente] = useState("");
    const [mostrarEstado, setMostrarEstado] = useState("");


    
    //Todo lo necesario para el formulario, se usa en la pagina web
    const { register, handleSubmit, formState: {errors}, setValue} = useForm();

    //Aqui realiza todo con respecto al formulario, para editar y para crear
    const onSubmit = handleSubmit(async data =>{ //Funcion asincrona
        console.log("se esta enviando: ", data)
        console.log("en demands hay: ", demands)
        if(params.id) {
            try {
                console.log(idDemands)
                await editDemand(idDemands, demands)
                console.log("edite el demand")
                await editOrder(params.id, data);
                // Redirecciona
                router.push('/order');
            } catch (error) {
                console.error(error)
            }
        }else{
            try {
                const res = await createDemand(demands)
                console.log("soy el res: ", res)
                setMostrar(false)
                data.request = res.data.id;
                const fechaActual = moment().format('YYYY-MM-DD');
                const fechaFormateada = fechaActual;
                data.startTime = fechaFormateada;
                console.log(data);
                await createOrder(data);
                // Redirecciona
                router.push('/order');
            } catch (error) {
                console.error(error);
            }
        }
    }) 

    //Extrae de la base de datos ese dato por medio del id,para llenar la informacion de las casillas 
    useEffect(()=> {
        //Extrae los clientes
        async function loadClient(){
            setLoading(true)
            const {data} = await getAllClients();
            setClients(data)
        }
        loadClient();
        
        //Extrae los vendedores 
        async function loadSellers(){
            const {data} = await getAllSellers();
            setSellers(data)
            if(!params.id){
                setLoading(false)
            }
        }
        loadSellers();

        //Si existe el parametro id, busca en la base de datos
        if(params.id){
            //funcion asincrona
            async function loadOrder(){
                const {data} = await getOrder(params.id);
                setOrder(data)
                const demanda = await getDemand({id:data.request})
                console.log("soy demanda: ", demanda)
                const trabajador = await getWorker({id:demanda.data[0].worker})
                const cliente = await getClient({id:demanda.data[0].client})
                console.log(demanda.data[0])
                //Coloca los valores de la peticion si se edita la peticion tambien
                setDemands({
                    ...demands,
                    client:demanda.data[0].client,
                    state:demanda.data[0].state,
                    worker:demanda.data[0].worker,
                })
                setIdDemands(demanda.data[0].id)
                //los coloca en los campos
                setValue('car', data.car)
                setValue('price', data.price)
                setValue('startTime', data.startTime)
                setValue('description', data.description)
                setValue('request', data.request)
                setMostrarVendedor(trabajador.data[0].name)
                setMostrarCliente(cliente.data[0].name)
                if (demanda.data[0].state){
                    setMostrarEstado(true)
                }else{
                    setMostrarEstado(false)
                }
                setMostrar(true)
                setLoading(false)
            }
            loadOrder();
        }
        
    }, []);

    function handleInputChange(e) {
        setDemands({
        ...demands,
        [e.target.name]: e.target.value,
        });
        
        if(e.target.name == "worker"){
            setMostrarVendedor(e.target.value)
            setMostrar(true)
        }
        if(e.target.name == "client"){
            setMostrarCliente(e.target.value)
        }
    }


    //Pagina
    return  (
        <div>
            {!loading?
                <div className="flex max-h-[90%] min-h-[90%] h-[90%] max-w-[60%] min-w-[60%] w-[60%] bg-[#0d0f10] fixed right-[10rem] top-[3rem] rounded-md flex-col items-center py-24 px-24 pb-12">
                    <div className="min-h-[80%] max-h-[80%] h-[80%] w-[100%] overscroll-contain overflow-auto">
                        {params.id && <h1 className="block font-medium text-3xl pb-4">Actualiza los datos</h1>}
                        {!params.id && <h1 className="block font-medium text-3xl pb-4">Crea uno nuevo</h1>}
                        <form onSubmit={onSubmit} className="min-h-[100%] max-h-[100%] h-[100%] w-[100%] flex flex-col">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium ">Carro</span>
                            <input 
                                className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]"
                                type="text" 
                                placeholder="Nombre" 
                                {...register("car",{required: true})}/>
                            {errors.car && <span className="absolute right-[7rem] after:ml-0.5 after:text-red-500 block font-medium ">Este campo es requerido</span>}
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium ">Precio</span>
                            <input 
                                className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]"
                                type="number" 
                                placeholder="Precio" 
                                {...register("price",{required: true})}/>
                            {errors.price && <span className="absolute right-[7rem] top-[15rem] after:ml-0.5 after:text-red-500 block font-medium ">Este campo es requerido</span>}
                            <span className=" after:text-red-500 block font-medium ">
                                Seleccione el vendedor
                                <select 
                                    value={mostrarVendedor}
                                    id="worker"
                                    name="worker"
                                    onChange={handleInputChange}
                                    className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]">    
                                        <option disabled value="">Selecciona una opción</option>
                                    {sellers.map((item) => (
                                        <option key={item.id} value={item.id}>
                                        {item.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                            {mostrar && 
                            <div>
                                <span className=" after:text-red-500 block font-medium ">
                                    Escoga el cliente
                                    <select 
                                        value={mostrarCliente}
                                        id="client"
                                        name="client"
                                        onChange={handleInputChange}
                                        className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]">    
                                            <option disabled value="" defaultValue>Selecciona una opción</option>
                                        {clients.map((item) => (
                                            <option key={item.id} value={item.id}>
                                            {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </span>
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium ">La petición ya esta completa?</span>
                                {params.id && 
                                    <div>
                                        <label >
                                            <input 
                                                className="mb-[30px]"
                                                type="radio" 
                                                name="state" 
                                                value={true} 
                                                checked={mostrarEstado === true}
                                                onChange={handleInputChange}/>
                                            Yes
                                        </label>
                                        <label >
                                            <input
                                                className="mb-[30px]" 
                                                type="radio" 
                                                name="state"
                                                value={false}
                                                checked={mostrarEstado === false}
                                                onChange={handleInputChange}/>
                                            No
                                        </label>
                                    </div>}
                                {!params.id &&
                                    <div>
                                        <label >
                                            <input 
                                                className="mb-[30px]"
                                                type="radio" 
                                                name="state" 
                                                value={true} 
                                                onChange={handleInputChange}/>
                                            Yes
                                        </label>
                                        <label >
                                            <input
                                                className="mb-[30px]" 
                                                type="radio" 
                                                name="state"
                                                value={false}
                                                onChange={handleInputChange}/>
                                            No
                                        </label>
                                    </div>
                                }
                            </div>}
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium ">Descripción</span>
                            <div  className="h-[4rem]">
                                <textarea 
                                    className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border resize-none border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 "
                                    placeholder="descripción"
                                    rows="5" 
                                    cols="5"
                                    maxLength="750"
                                    {...register("description",{required: true})}/>
                            </div>
                            {errors.description && <span className="absolute right-[7rem] top-[33rem] after:ml-0.5 after:text-red-500 block font-medium ">Este campo es requerido</span>}
                            <button className="rounded-full w-[10rem] h-[5rem] bg-[#b6f09c] absolute bottom-[3rem] right-[3rem] hover:bg-[#95c480] m-[1rem] text-[#131619] font-medium">Confirmar</button>
                        </form>
                        {params.id && <button 
                            className="rounded-full w-[10rem] h-[5rem] bg-[#131619] absolute bottom-[3rem] right-[16rem] hover:bg-[#bbb] m-[1rem] hover:text-[#0d0f10] font-medium"
                            onClick ={async () =>{
                                const accepted = window.confirm('Estas seguro?')
                                if(accepted){
                                    await deleteOrder(params.id);
                                    await deleteDemand(idDemands)
                                    router.push('/order')
                        }}}>Borrar
                        </button>}    
                    </div>
                    <Link href={'/order/'}>
                        <button className="rounded-full w-[10rem] h-[5rem] bg-[#131619] absolute bottom-[3rem] left-[3rem] hover:bg-[#bbb] m-[1rem] hover:text-[#0d0f10] font-medium">Volver</button>
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
