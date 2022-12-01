import React, { useState, useEffect } from 'react';
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal';
import RoomCard from '../../components/RoomCard/RoomCard';
import styles from './HostRooms.module.css';
import { getAllRooms } from '../../http';
import { Link, useHistory } from 'react-router-dom';



const HostRooms = () => {
    const history = useHistory();
    function Dashboard() {
        history.push('/Dashboard');
    }
    const user = useHistory();
    function AllUser() {
        history.push('/users');
    }
    const CreateHost = useHistory();
    function Host() {
        history.push('/createhost');
    }
  
    const [showModal, setShowModal] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllRooms();
            setRooms(data);
            console.log(data)
        };
        fetchRooms();
    }, []);
    function openModal() {
        setShowModal(true);
    }
    const ok = useHistory();
    function leave() {
        ok.push('/Adminrooms');
    }

    return (
        <>

            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice rooms</span>
                        <div className={styles.searchBox}>
                            <img src="/images/search-icon.png" alt="search" />
                            <input type="text" className={styles.searchInput} />
                        </div>
                    </div>
                    <div className={styles.right}>
                    <button className={styles.logoutButton} onClick={leave}>
            <img src="/images/logout.png" alt="logout" />
            
          </button>
                    <button
                            onClick={openModal}
                            className={styles.startRoomButton}
                        >
                            <img
                                src="/images/add-room-icon.png"
                                alt="add-room"
                            />
                            <span>Start a room</span>
                        </button>
             
                    </div>
                    
                </div>
                <div className={styles.btn2}>
                <button className={styles.startRoomButton1} onClick={Dashboard} >Mange Host</button>
                <br />
                <button className={styles.startRoomButton1} onClick={AllUser}>Mange Users</button>
                <br />
                <button className={styles.startRoomButton1} onClick={Host}>Create Host</button>
                </div>
                <div className={styles.roomList}>
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
            {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default HostRooms;