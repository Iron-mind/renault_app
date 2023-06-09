import React, { useCallback, useState, useEffect } from "react";
import { registerUser } from "../api/session.api";
import { useDropzone } from 'react-dropzone';
import LoadingSpinner from "../components/Loading";
import styles from "../styles/register.module.css"

export default function Register({ setRegisterOn }) {

  //booleano auxiliar para crear el registro para el staff

  const [esGerente, setEsGerente] = useState(false);
  const diccionario = {
    clave1: "Gerente",
    clave2: "Jefe de Taller",
    clave3: "Vendedor",
  };

   // Acceder a los valores del diccionario
   const valor1 = diccionario.clave1;
   const valor2 = diccionario.clave2;
   const valor3 = diccionario.clave3;

  //para los clientes
  let [inputClient, setInputClient] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  //para el staff
  let [inputStaff, setInputStaff] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    jobTitle: "",
    image: "",
  });

  let [loading, setLoading] = useState(false); 
  useEffect(() => {
    const jobTitle = localStorage.getItem("jobTitle");
    setEsGerente(jobTitle === "GE");
  }, [])

  //Funcion para el cliente
  function handleInputClientChange(e) {
    if(esGerente){
      setInputStaff({
        ...inputStaff,
        [e.target.name]: e.target.value,
      });
    }else{
      setInputClient({
        ...inputClient,
        [e.target.name]: e.target.value,
      });
    }
    console.log(inputStaff)
  }

  //subida del formulario
  function handleSubmit(e) {
    console.log(inputStaff)
    e.preventDefault();
    setLoading(true);
    if(esGerente){
      registerUser(inputStaff, 'staff').then((res) => {
        alert("Ya puedes iniciar sesión");
        setRegisterOn(false);
      }).finally(() => {
        setLoading(false);
      });
    }
    else{
      registerUser(inputClient).then((res) => {
        alert("Ya puedes iniciar sesión");
        setRegisterOn(false);
      }).finally(() => {
        setLoading(false);
      });
    }
  }
  
  //Verifica la imagen enviada, la transforma en otro formato y lo manda al staff
  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    console.log(inputStaff)
    const reader = new FileReader()
    reader.onload = () =>{
      setInputStaff({
        ...inputStaff,
        image: reader.result,
      });
      
    }
    reader.readAsDataURL(acceptedFiles[0])
  }, [inputStaff])
  
  //Uso del dropzone para la imagen
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept:'image/*', });

  return (
    <div className={`${esGerente? styles.registerGerente : styles.register}`}>
      <div className="mx-auto w-[400px] max-[768px]:w-screen max-[768px]:h-screen">
        {!loading?
        <form className="bg-[#0d0f10] text-white shadow-md rounded px-8 pt-6 pb-8 flex  flex-col items-center max-[768px]:w-screen h-[95%] max-[768px]:h-screen  overflow-auto">
          {esGerente? <h3 className="block text-[30px] font-bold mb-2">Registra aqui</h3>:<h3 className="block text-[30px] font-bold mb-2">Registrate</h3>}
          <div className="mb-4 w-[80%]">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
          
            <input
              onChange={handleInputClientChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="mb-4 w-[80%]">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              onChange={handleInputClientChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="mb-4 w-[80%]">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo
            </label>
            <input
              onChange={handleInputClientChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4 w-[80%]">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="address"
            >
              Dirección
            </label>
            <input
              onChange={handleInputClientChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              name="address"
              placeholder="Address"
            />
          </div>
          <div className="mb-4 w-[80%]">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Teléfono
            </label>
            <input
              onChange={handleInputClientChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              name="phone"
              placeholder="Phone"
            />
          </div>
          <div className="mb-6 w-[80%]">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              onChange={handleInputClientChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          {esGerente && 
            <div className="mb-6 w-[80%]">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="jobTittle"
              >
                Cargo
              </label>
              <select 
                className="shadow  border rounded w-full py-2 px-3 appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="jobTitle"
                name="jobTitle"
                onChange={handleInputClientChange}
                value={inputStaff.jobTitle}
              >
                <option disabled value="" defaultValue>Selecciona una opción</option>
                <option value="GE">{valor1}</option>
                <option value="JT">{valor2}</option>
                <option value="VE">{valor3}</option>
              </select>
            </div>
          }
          {esGerente && 
          <div className="mb-4 w-[80%]">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Foto de perfil
            </label>
            <div {...getRootProps()} className="shadow  border rounded w-full py-2 px-3 appearance-none bg-white text-black leading-tight focus:outline-none focus:shadow-outline">
              <input 
                {...getInputProps()} 
                id="image"
                name="image"
              />
              <p>Da clic para buscar la imagen en los archivos</p>
            </div>
          </div>
          }                
          <div className="flex max-[768px]:w-[80%] justify-end">
            <button
              onClick={handleSubmit}
              className="bg-[#b6f09c] hover:bg-[#95c480] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Registrarse
            </button>
          </div>
        </form>:
        <LoadingSpinner/>
        }
      </div>
    </div>
  );
}
