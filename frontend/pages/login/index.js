import Login from "../../components/Login";
import { useState } from "react";
import Link from "next/link";
import Register from "../../components/Register";

export default function LoginView() {
  let [registerOn, setRegisterOn] = useState(false)
  let [registerOrLogin, setregisterOrLogin] = useState('login')

  function handleRegister(){
    setRegisterOn(!registerOn)
    registerOn?setregisterOrLogin('login'):setregisterOrLogin('register')
  }

  return (
    <div>
      <section className="text-white px-2 flex flex-col items-center justify-center min-h-screen absolute left-1/2 transform -translate-x-1/2 max-[768px]:w-screen  
      max-[768px]:h-screen max-[768px]:p-0">
          {registerOn? <Register setRegisterOn={setRegisterOn}/>:<Login />}
          {registerOn && <div className="flex justify-center max-[768px]:justify-start max-[768px]:absolute max-[768px]:top-[585px] max-[768px]:w-[calc(80%-3rem)] "><button onClick={handleRegister} className="mt-4 max-[768px]:mt-0">Iniciar sesión</button></div>}
          {!registerOn && <div className="flex justify-center max-[768px]:fixed max-[768px]:left-[0] max-[768px]:bottom-[10%] max-[768px]:w-screen "><button onClick={handleRegister} className="mt-4 max-[768px]:mt-0">Crear una cuenta</button></div>}
      </section>
    </div>
  );
}
