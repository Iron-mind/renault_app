import React, { useCallback, useState, useEffect } from "react";
import { registerUser, updateUser } from "../../api/session.api";
import { useDropzone } from "react-dropzone";

import { getClient } from "../../api/order.api";
import Image from "next/image";
import { getStaff } from "../../api/client.api";
import { Imprima } from "next/font/google";
import styles from "../../styles/profile.module.css"
import LoadingSpinner from "@/components/Loading";


export default function Profile({ theUserName }) {
  //booleano auxiliar para crear el registro para el staff

  const [esGerente, setEsGerente] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const diccionario = {
    clave1: "Gerente",
    clave2: "Jefe de Taller",
    clave3: "Vendedor",
  };
  const [coping, setCoping] = useState(false);

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
    paymentType: "CD",
    id: "",
    image: "",
  });



  let [loading, setLoading] = useState(true);
  useEffect(() => {
    const jobTitle = localStorage.getItem("jobTitle");
    setJobTitle(jobTitle);
    const username = localStorage.getItem("username");
    if (!theUserName) {
      getClient({ username }).then((res) => {
        if (res.data?.length == 0) {
          return getStaff({ username }).then((res) => {
            setInputClient(res.data[0]);
            setLoading(false);
          });
        }
        setInputClient(res.data[0]);
        setLoading(false);
      });
    }
    setEsGerente(jobTitle === "GE");
  }, []);
  //Funcion para el cliente
  function handleInputClientChange(e) {

      setInputClient({
        ...inputClient,
        [e.target.name]: e.target.value,
      });


      
  }
  function handleCopy() {
    setCoping(true);
    setTimeout(() => {
      setCoping(false);
      navigator.clipboard.writeText("Te invito a registrarte en Renault para unirte a la nueva revolución eléctrica. localhost:3000/login");
    }, 1000);
  }
  //subida del formulario
  function handleSubmit(e) {
    
    e.preventDefault();
    setLoading(true);
    if (jobTitle !== "") {
      updateUser(inputClient, inputClient.id, 'staff')
      .then((res) => {
        console.log(res)
        if(res?.status !== 200){
          alert("Error al cargar los datos");
        }else{alert("Datos actualizados");}
        

      }).finally(() => {
        setLoading(false);
      });

    } else {
      updateUser(inputClient, inputClient.id, 'client')
      .then((res) => {
        alert("Datos actualizados");

      }).finally(() => {
        setLoading(false);
      });
    }
  }

  //Verifica la imagen enviada, la transforma en otro formato y lo manda al staff
  const onDrop = useCallback(
    (acceptedFiles, rejectFiles) => {

      const reader = new FileReader();
      reader.onload = () => {
        setInputClient({
          ...inputClient,
          image: reader.result,
        });
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [inputClient]
  );

  //Uso del dropzone para la imagen
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className={styles.profile}>
      <h2 className="text-center text-3xl font-bold ">
        Perfil
      </h2>
      <div className="flex justify-center mt-5 ">
        <div className="flex w-full max-w-xs justify-center mb-4">
          <img src={inputClient.image || "/images/user.png"} className="bg-slate-50 rounded-md" width={150} height={150} />
        </div>
      </div>
      {!loading ? (
        <form className="bg-[#131619] text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              onChange={handleInputClientChange}
              value={inputClient.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              onChange={handleInputClientChange}
              value={inputClient.username}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          {jobTitle === "" && (
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo
            </label>
            <input
              onChange={handleInputClientChange}
              value={inputClient.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>)}
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="address"
            >
              Dirección
            </label>
            <input
              onChange={handleInputClientChange}
              value={inputClient.address}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              name="address"
              placeholder="Address"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Teléfono
            </label>
            <input
              onChange={handleInputClientChange}
              value={inputClient.phone}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              name="phone"
              placeholder="Phone"
            />
          </div>
          {jobTitle === "" && (
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="paymentType"
            >
              Método de pago
            </label>
            <select
              className="shadow  border rounded w-full py-2 px-3 appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="paymentType"
              id="paymentType"
              onChange={handleInputClientChange}
              value={inputClient.paymentType}
            >
              <option default value="EF">Efectivo</option>
              <option value="CD">Tarjeta</option>
              <option value="CA">Cuenta de ahorros</option>
              <option value="CT">A cuotas</option>
            </select>
          </div>)}
          <div className="mb-6">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              onChange={handleInputClientChange}
              value={inputClient.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          {esGerente && (
            <div className="mb-6">
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
                value={inputClient.jobTitle}
              >
                <option disabled value="" defaultValue>
                  Selecciona una opción
                </option>
                <option value="GE">{valor1}</option>
                <option value="JT">{valor2}</option>
                <option value="VE">{valor3}</option>
              </select>
            </div>
          )}
          {esGerente && (
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Foto de perfil
              </label>
              <div
                {...getRootProps()}
                className="shadow  border rounded w-full py-2 px-3 appearance-none leading-tight focus:outline-none focus:shadow-outline"
              >
                <input {...getInputProps()} id="image" name="image" />
                <p>Da clic para buscar la imagen en los archivos</p>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mb-12">
            {/* boton para invitar a un amigo pegar link al portapapeles */}
            <button
              onClick={handleCopy}
              className="bg-[#b6f09c] hover:bg-[#95c480] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              tooltip="Invita un amigo y obtiene descuentos" 
            >
              {coping? "Copiando" : "Invitar amigo"}
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#b6f09c] hover:bg-[#95c480] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Confirmar cambios
            </button>
          </div>
        </form>
      ) : 
        <LoadingSpinner/>
      }
    </div>
  );
}
