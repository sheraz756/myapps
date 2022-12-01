import React, { useState, useEffect } from "react";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import AdminCard from "../../components/AdminCard/AdminCard";
import styles from "./Dashboard.module.css";
import { getAllRooms } from "../../http";
import { Link, useHistory } from 'react-router-dom';
// import { getdeleteroom } from "../../http";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
      console.log(data);
          
    };
    fetchRooms();
  }, []);
//   cons [searchTerm,setSearchTerm]
  // function del() {
  //   const delroom = async () => {
  //     const { data } = await getdeleteroom();
  //     setRooms(data);
  //     console.log(data);
  //   };
  //   delroom();
  // }
  const ok = useHistory();
    function leave() {
        ok.push('/Adminrooms');
    }
  return (
    <>
      <div className="container">
      <button className={styles.logoutButton} onClick={leave}>
            <img src="/images/logout.png" alt="logout" />
            
          </button>

        <div className={styles.roomList}>
          {rooms.map((room) => (
            <AdminCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      {showModal && <AddRoomModal onClose={() => setShowModal(true)} />}
    </>
  );
};

export default Dashboard;
