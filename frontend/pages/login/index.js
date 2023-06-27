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
      <section className="text-blue-600 px-2 flex flex-col items-center justify-center min-h-screen absolute left-1/2 transform -translate-x-1/2">
          {registerOn? <Register setRegisterOn={setRegisterOn}/>:<Login />}
          <button onClick={handleRegister} style={{marginTop:'12px'}}>{registerOn?'Iniciar Sesión':'Crear una cuenta'}</button>
      </section>
    </div>
  );
}
