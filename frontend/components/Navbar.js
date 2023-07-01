import Link from "next/link";
import Image from "next/image";
// components/Navbar.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const [authored, setAuthored] = React.useState(false);
  const [jobTitle, setJobTitle] = React.useState("VE");
  const [username, setUsername] = React.useState("");
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("authored")); // Reemplaza esto con tu lógica de autenticación
    setAuthored(isAuthenticated);
    const jobTitle = localStorage.getItem("jobTitle");
    setJobTitle(jobTitle);
    const username = localStorage
      .getItem("token")
      ?.split("520")[1]
      ?.split(";")[0];
    setUsername(username);
    localStorage.setItem("username", username);
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
              src={"/images/logo.webp"}
              width={45}
              height={35}
              style={{ backgroundColor: "white", display: "inline" }}
            />
            <span className={styles.navLogo}> Renault</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/home">Inicio</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/cars">Vehículos</Link>
        </li>
        {jobTitle == "JE" && (
          <li className={styles.navItem}>
            <Link href="/part">Inventario</Link>
          </li>
        )}
        {jobTitle === "" && (
        <li className={styles.navItem}>
          <Link href="/demand">Peticiones</Link>
        </li>
        )}
        {jobTitle === "VE" && (
        <li className={styles.navItem}>
          <Link href="/quotation">Cotizaciónes</Link>
        </li>
        )}
        {jobTitle !== "" && (
          <li className={styles.navItem}>
            <Link href="/clients">Clientes</Link>
          </li>
        )}

        {jobTitle === "GE" && (
          <li className={styles.navItem}>
            <Link href="/register">Registrar staff</Link>
          </li>
        )}
        {(jobTitle === "GE" || jobTitle === "JT") && (
          <li className={styles.navItem}>
            <Link href="/order">Ordenes de Trabajo</Link>
          </li>
        )}
        
      </ul>
      <div  className={styles.navAuth}>
        <Link  href="/profile"> <p className="text-blue-700">@{username || "Usuario"}</p> </Link>

        <Link onClick={logOut} href="/">Cerrar sesión</Link>
      </div>
    </nav>
  );
};

export default Navbar;

