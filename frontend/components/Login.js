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
    
    loginUser({ username: email, password })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          console.log(res.data)
          localStorage.setItem("authored", "true");
          localStorage.setItem("token", res.data);
          router.push("/cars");
          router.push("/home");
        } else {
          alert('Verifica las credenciales');
        }
      })
      .catch((error) => {
        alert('Ocurrió un error en el proceso. Verifica las credenciales.');
      });
    
  }

  return (
    <div className="flex items-center justify-center max-[768px]:w-screen  max-[768px]:h-screen max-[768px]:m-0">
      <div className="bg-[#0d0f10] p-8 shadow-md rounded-md max-[768px]:w-screen  max-[768px]:h-screen">
        <div className='max-[768px]:flex max-[768px]:justify-center max-[768px]:w-full'>
          <Image
            src="/images/Renault-Logo1.png"
            alt="Renault Logo"
            width={300}
            height={300}
            priority
          />
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mt-5 mb-3 font-medium">
              Nombre de usuario:
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
            <label htmlFor="password" className="block mb-3 font-medium">
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
          <div className="flex justify-end mt-8">
            <button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="bg-[#b6f09c] hover:bg-[#95c480] text-black px-4 py-2 rounded font-medium"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
