// components/AuthChecker.js

import { useRouter } from "next/router";
import { useEffect } from "react";
import '../app/globals.css'
import LoginView from "../pages/login";

const AuthChecker = ({ children }) => {
  const router = useRouter();

  // Aquí deberías implementar tu lógica real de verificación de autenticación
  const isAuthenticated= 'false';
  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("authored")); // Reemplaza esto con tu lógica de autenticación
    const token = localStorage.getItem("token");
    const stringDate = token?.split(";")[1]
    const role = token?.split(";")[2]
    localStorage.setItem("role", role)
    const jobTitle = token?.split(";")[3]
    localStorage.setItem("jobTitle", jobTitle)
    let fechaActual = new Date();

    // Crear la fecha objetivo a partir del string proporcionado
    let fechaObjetivo = new Date(stringDate);

    // Obtener la diferencia en milisegundos entre las dos fechas
    let isTodayToken = (fechaObjetivo.getFullYear() === fechaActual.getFullYear() &&
    fechaObjetivo.getMonth() === fechaActual.getMonth() &&
    fechaObjetivo.getDate() === fechaActual.getDate())
    
    
    if (!isAuthenticated && !isTodayToken) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      if (router.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [isAuthenticated, router]);
  if (router.pathname === '/login') return <LoginView />;
  // Renderiza los componentes hijos solo si el usuario está autenticado
  return isAuthenticated ? children : null;
};

export default AuthChecker;
