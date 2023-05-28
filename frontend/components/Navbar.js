
import Link from 'next/link';
// components/Navbar.js

import React from 'react';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link href="/">Inicio</Link></li>
        <li className={styles.navItem}><Link href="/acerca">Acerca</Link></li>
        <li className={styles.navItem}><Link href="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
