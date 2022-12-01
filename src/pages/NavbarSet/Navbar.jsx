import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from './NavbarSet.module.css'

const Navbar = () => {
  // const [showModal, setShowModal] = useState(false);
//   function openModal() {
//     setShowModal(true);
// }
  return (
    <>
   
  
  <div class={styles.container} >
  <div className={styles.cover1}>
    

  <Link to='/host' className={styles.chk}>Host</Link>
  <Link to='/admin' className={styles.chk}>Admin</Link>
  </div>

    </div>
    </>
  )
}

export default Navbar