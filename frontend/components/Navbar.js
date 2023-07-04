import Link from "next/link";
import Image from "next/image";
// components/Navbar.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const [authored, setAuthored] = React.useState(false);
  const [jobTitle, setJobTitle] = React.useState("VE");
  const [username, setUsername] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);

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

  const handleLinkClick = () => {
    setIsChecked(!isChecked);
  };

  //NavBar
  return (
    <nav className={styles.navbar}>
      <button
        className={`${styles.check} ${isChecked && styles.checkActive}`} 
        checked={isChecked}
        onClick={handleLinkClick}
        id="check" >
        <Image
          alt="bars-solid"
          src={"/images/bars-solid.png"}
          width={25}
          height={25}>
        </Image>
      </button>
      <div className={`${styles.divNavLogo} ${isChecked && styles.divNavLogoActive}`}>
        <Link href="/">
          <div className={styles.orderNavLogo}>
            <Image
              alt="Renault Logo"
              src={"/images/logo.png"}
              width={80}
              height={80}
              style={{display: "inline" }}
            />
            <span className={styles.navLogo}> Renault</span>
          </div>
        </Link>
      </div>
      <ul className={`${styles.navList} ${isChecked && styles.navbarListActive}`}>
        <li className={styles.navItem}>
          <Link href="/home" onClick={handleLinkClick}>Inicio</Link>
        </li>
        <li className={styles.navItem} onClick={handleLinkClick}>
          <Link href="/cars">Vehículos</Link>
        </li>
        {jobTitle == "JT" && (
          <li className={styles.navItem} onClick={handleLinkClick}>
            <Link href="/part">Inventario</Link>
          </li>
        )}
        {jobTitle === "" && (
        <li className={styles.navItem} onClick={handleLinkClick}>
          <Link href="/demand">Peticiones</Link>
        </li>
        )}
        {jobTitle === "VE" && (
        <li className={styles.navItem} onClick={handleLinkClick}>
          <Link href="/quotation">Cotizaciónes</Link>
        </li>
        )}
        {jobTitle !== "" && (
          <li className={styles.navItem} onClick={handleLinkClick}>
            <Link href="/clients">Clientes</Link>
          </li>
        )}

        {jobTitle === "GE" && (
          <li className={styles.navItem} onClick={handleLinkClick}>
            <Link href="/register">Registrar staff</Link>
          </li>
        )}
        {(jobTitle === "GE" || jobTitle === "JT") && (
          <li className={styles.navItem} onClick={handleLinkClick}>
            <Link href="/order">Ordenes de Trabajo</Link>
          </li>
        )}
        
      </ul>
      <div  className={`${styles.navAuth} ${isChecked && styles.navAuthActive}`} onClick={handleLinkClick}>        
        <Link  href="/profile" > <p className={styles.nickname}>@{username || "Usuario"}</p> </Link>
        <p className={styles.navItem}>
          <Link onClick={logOut} href="/">Cerrar sesión</Link>
        </p>
      </div>
    </nav>
    
  );
};

export default Navbar;

