import React, { useState, useEffect } from 'react';
import UserAddRoomModal from '../../components/UserAddRoomModal/UserAddRoomModal';
import UserRoomCard from '../../components/UserRoomCard/UserRoomCard';
import styles from './Rooms.module.css';
import { getAllRooms } from '../../http';
import { Link, useHistory } from 'react-router-dom';
// import Search from '../../components/Search/Search'


const Rooms = () => {
    const [showModal, setShowModal] = useState(false);
    const [rooms, setRooms] = useState([]);
    // const [searchs, setSearch] = useState([]);
   
    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllRooms();
            setRooms(data);
            // console.log(data.indexOf('633f52d07a04b3e3cfff1346'))
       
        };
        
        fetchRooms();
    }, []);
    
    // setInterval(myfunc, 5000);

    // function myfunc() {
    //     const d = new Date();
    //     alert("heelo")
    //   }
    function sayHi() {
        alert('Upgrade Your Plan, and start hosting meetings anonymously');
        // window.location.reload(true);
      }
      
      setTimeout(sayHi, 5000);
    
      const ok = useHistory();
      function leave() {
          ok.push('/rooms');
      }
    return (
        <>
   
            <div className="container">
            {/* <div id='alrt' style="fontWeight = 'bold'"></div> */}
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice rooms</span>
                        <div className={styles.searchBox}>
                            <img src="/images/search-icon.png" alt="search" />
                            <input type="text" onChange={event => (event.target.value)} className={styles.searchInput} 
                         />
                           {/* {searchs.map((Search) => (
                        <Search key={Search.id} Search={Search} />
                    ))}
                          */}
                        </div>
                    </div>
                    <div className={styles.right}>
                     
                    <button className={styles.logoutButton} onClick={leave}>
            <img src="/images/logout.png" alt="logout" />
            
          </button>
                            <span>Your Rooms</span>
                        
                    </div>
                </div>

                <div className={styles.roomList}>
                    {rooms.map((room) => (
                        <UserRoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
            {showModal && <UserAddRoomModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default Rooms;