import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import '../app/globals.css';
import { loginUser } from '../api/session.api';

const Login = () => {
  let [input, setInput] = React.useState({ email: "", password: "" });
  let router = useRouter();
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  function handleSubmit(e) {
 
    const email = input.email;
    const password = input.password;

    e.preventDefault();
    loginUser({ username:email, password })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          console.log(res.data)
          localStorage.setItem("authored", "true");
          localStorage.setItem("token", res.data);
          router.push("/home");
        }else{
          alert('Verifica las credenciales');
        }
       
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Iniciar sesión</h2>
        <Image
          src="/images/Renault-Logo.png"
          alt="Renault Logo"
          width={300}
          height={300}
          priority
        />
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">
              Correo electrónico:
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              name="email"
              type="email"
              id="email"
              value={input.email}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              Contraseña:
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              name="password"
              type="password"
              id="password"
              value={input.password}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
