// components/AuthChecker.js

import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "./Login";
import '../app/globals.css'

const AuthChecker = ({ children }) => {
  const router = useRouter();

  // Aquí deberías implementar tu lógica real de verificación de autenticación
  const isAuthenticated= 'false';
  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("authored")); // Reemplaza esto con tu lógica de autenticación

    if (!isAuthenticated) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      if (router.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [isAuthenticated, router]);
  if (router.pathname === '/login') return <Login />;
  // Renderiza los componentes hijos solo si el usuario está autenticado
  return isAuthenticated ? children : null;
};

export default AuthChecker;
