import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import '../app/globals.css';

const Login = () => {
  let router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    // const email = e.target.email.value;
    // const password = e.target.password.value;
      alert(`Iniciando sesión con ${email} y ${password}`);
      // Aquí deberías implementar tu lógica real de verificación de autenticación
      localStorage.setItem("authored", 'true'); // Reemplaza esto con tu lógica de autenticación
      router.push('/home');
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Iniciar sesión</h2>
        <Image src="/images/Renault-Logo.png" alt="Renault Logo" width={300} height={300} priority />
        <form >
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">Correo electrónico:</label>
            <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">Contraseña:</label>
            <input type="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded" />
          </div>
          <button onClick={(e)=>handleSubmit(e)} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
