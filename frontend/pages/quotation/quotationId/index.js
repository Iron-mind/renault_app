//React
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"

//Importaciones de funciones de la api
import { createQuotation, getAllQuotation } from "../../../api/quotation.api"


//Importante que sea default
export default function QuotationId() {
    //Crea las variables para extraer los datos desde la url
    const router = useRouter();
    
    //Todo lo necesario para el formulario, se usa en la pagina web
    const { register, handleSubmit, formState: {errors}} = useForm();

    //Aqui realiza todo con respecto al formulario, para editar y para crear
    const onSubmit = handleSubmit(async data =>{ //Funcion asincrona
        //Crea la cotizacion en la base de datos
        await createQuotation(data)
        
        //Redirecciona
        router.push('/quotation')
    })

    const [quotations, setQuotation] = useState([]);
    const [nombreCarros, setNombreCarro] = useState('');
    const [vendedores, setVendedor] = useState('');

    // Obtener las opciones de la base de datos
    useEffect(() => {
        async function loadQuotation(){
            const {data} = await getAllQuotation();
            setQuotation(data);
            console.log(data)
        }
        loadQuotation();

    }, []);

    const handleSeleccionarNombreCarro = (event) => {
        setNombreCarro(event.target.value);
    };

    const handleSeleccionarVendedor = (event) => {
        setVendedor(event.target.value);
    };

    //Pagina
    return  <div className="flex max-h-[70%] min-h-[70%] h-[70%] max-w-[60%] min-w-[60%] w-[60%] bg-[#0d0f10] fixed right-[10rem] top-[8rem] rounded-md flex-col items-center py-24 px-24 pb-12">
                <div className="min-h-[50%] max-h-[50%] h-[50%] w-[100%] ">
                    <h1 className="block font-medium text-3xl pb-4">Crea una nueva cotización</h1>
                    <h1 className="block font-medium text-2xl pb-4 text-left">Complete los siguientes datos</h1>
                    <form onSubmit={onSubmit} className="min-h-[100%] max-h-[100%] h-[100%] w-[100%] flex flex-col">
                        <span className="block font-medium "
                              {...register("carName",{required: true})}>
                            Escoga el vehiculo
                            <select 
                                value={nombreCarros} 
                                onChange={handleSeleccionarNombreCarro}
                                className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]">    
                                {quotations.map((quotation) => (
                                    <option key={quotation.id} value={quotation.id}>
                                    {quotation.carName}
                                    </option>
                                ))}
                            </select>
                        </span>
                        {errors.carName && <span className="absolute right-[6rem] top-[12rem] after:ml-0.5 after:text-red-500 block font-medium mb-[20px]">Este campo es requerido</span>}
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium ">Precio de la cotización</span>
                        <input 
                            className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]"
                            type="number" 
                            placeholder="Precio" 
                            {...register("price",{required: true})}/>
                        {errors.price && <span className="absolute right-[6rem] top-[18rem] after:ml-0.5 after:text-red-500 block font-medium mb-[20px]">Este campo es requerido</span>}
                        <span className="block font-medium "
                              {...register("request",{required: true})}>
                            Escoga el vehiculo
                            <select 
                                value={vendedores} 
                                onChange={handleSeleccionarVendedor}
                                className="rounded bg-[#131619] shadow-sm mt-1 px-3 py-2 border border-[#131619] placeholder-slate-400 focus:outline-none focus:border-[#bbb] focus:ring-[#bbb] block w-full sm:text-sm focus:ring-1 mb-[30px]">    
                                {quotations.map((quotation) => (
                                    <option key={quotation.id} value={quotation.id}>
                                    {quotation.request.worker.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        {errors.request && <span className="absolute right-[6rem] top-[24rem] after:ml-0.5 after:text-red-500 block font-medium text-white">Este campo es requerido</span>}
                        <button className="rounded-full w-[10rem] h-[5rem] bg-[#b6f09c] absolute bottom-[3rem] right-[3rem] hover:bg-[#95c480] m-[1rem] text-[#131619] font-medium">Crear</button>
                    </form>   
                </div>
            </div>
}