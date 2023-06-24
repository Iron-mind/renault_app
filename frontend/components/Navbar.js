import Link from "next/link";
import Image from "next/image";
// components/Navbar.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const [authored, setAuthored] = React.useState(false);
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("authored")); // Reemplaza esto con tu lógica de autenticación
    setAuthored(isAuthenticated);
  }, [router]);
  function logOut() {
    localStorage.removeItem("authored");
    localStorage.removeItem("token");
  }
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">
            <Image 
              alt="Renault Logo"
              src={'/images/logo.webp'} 
              width={45} height={35} 
              style={{backgroundColor:'white', display:'inline'}}/>
              <span className={styles.navLogo}> Renault</span>
             
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/cars">Vehículos</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/part">Inventario</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/quotation">Cotización</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contacto">Contacto</Link>
        </li>
      </ul>
      {!authored ? (
        <div className={styles.navAuth}>
          <Link href="/login">Iniciar sesión</Link>
        </div>
      ) : (
        <div onClick={logOut} className={styles.navAuth}>
          <Link href="/">Cerrar sesión</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
