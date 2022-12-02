import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import Button from "../../../components/shared/Button/Button";
import { useHistory } from "react-router-dom";
import { getAllEdit } from '../../../http'
import DropDown from '../Drop/DropDown';


const Navigation = ({onClose,onClick}) => {
  const [showModal, setShowModal] = useState(false);
  // const [HideModal, setHideModal] = useState(true);
  const [rooms, setRooms] = useState([]);
  function openModal() {
    setShowModal(true);
}
// function onClose() {
//   setHideModal(false);
// }

  useEffect(() => {
    
    const fetchRooms = async () => {
        const { data } = await getAllEdit();
        document.getElementById("ok").innerHTML=JSON.stringify(data[0].fname)
        // document.getElementById("ok1").innerHTML=JSON.stringify(data[0].lastname)
        document.getElementById("ok2").innerHTML=JSON.stringify(data[0].phone)
        // document.getElementById("ok3").innerHTML=JSON.stringify(data[0].DOB)
        document.getElementById("ok4").innerHTML=JSON.stringify(data[0].Organization)
        document.getElementById("ok5").innerHTML=JSON.stringify(data[0].Email)
        document.getElementById("ok6").innerHTML=JSON.stringify(data[0].location)
        // setRooms(data);
        // console.log(data)
    };
    fetchRooms();
}, []);

    const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

    const history = useHistory();
   const leave = () => {
      history.push("/");
   };

  return (
    <nav className={`${styles.navbar} container`}>
      
      <div style={brandStyle}>
        <img src="/images/logo.png" onClick={leave} alt="logo" className={styles.logo} />
        <span className={styles.logoText} onClick={logoutUser}>Anony</span>
      </div>
      {isAuth && (
      
        <div className={styles.navRight}>
          <h3 className={styles.user}onClick={onClose} >{user?.name}</h3>
          <div  className={styles.abc} onClick={onClose} >
            <img
            
              className={styles.avatar}
              onClick={()=>{ openModal()}}
              // onClose={onClose}
              src={
                
                user?.avatar
                ? user?.avatar
                : "/images/profile.jfif"
              }
              width="40"
              height="40"
              alt="avatar"
              />
  {showModal && <DropDown onClose={() => setShowModal(false)} />}
  {/* {HideModal && <DropDown onClose={() => setHideModal(true)} />} */}
          </div>
          
          <button className={styles.logoutButton} onClick={leave}>
            {/* <img src="/images/logout.png" alt="logout" /> */}
            
          </button>
         
                         
          
        </div>
        
      )}
    </nav>
    
  );
};

export default Navigation;