import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getRoom } from '../../http';
import { getdelete } from '../../http';
// import axios from 'axios'

import styles from './AdminRoom.module.css';
// import VoiceChanger from '../VoiceChanger/VoiceChanger';
// import { remove } from '../../../../models/user-model';

const HostRoom = () => {
    const user = useSelector((state) => state.auth.user);
    const [showModal, setShowModal] = useState(false);
    const { id: roomId } = useParams();
    const [room, setRoom] = useState(null);

    const { clients, provideRef, handleMute } = useWebRTC(roomId, user);

    const history = useHistory();

    const [isMuted, setMuted] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            const { data } = await getRoom(roomId);
            setRoom((prev) => data);
        };

        fetchRoom();
    }, [roomId]);

    useEffect(() => {
        handleMute(isMuted, user.id);
    }, [isMuted]);

    const handManualLeave = () => {
        history.push('/Adminrooms');
    };
    const remove = () => {
        history.push('/Adminrooms');
    };
    // async function deleteProduct(id) {
    //     console.log("productId: ", id);

    //     let response = await axios
    //         .delete(`localhost:3000/room/${user.id}`)
    //         .catch(e => {
    //             console.log("error: ", e);
    //             return;
    //         });

    //     if (response) {
    //         console.log('deleted');
    //         // getAllProducts();
    //     }
    // }
    const btn = ()=>{
        const windowFeatures = "left=100,top=100,width=320,height=320";
        const handle = window.open("https://sheraz756.github.io/works/", "github", windowFeatures);
    }

    const handleMuteClick = (clientId) => {
        if (clientId !== user.id) {
            return;
        }
        setMuted((prev) => !prev);
    };
    const join = (clientId) => {
        if (clientId !== user.id) {
            return;
        }
        setMuted((prev) => !prev);
    };
    const question = (user)=>{
        alert("you have question from roommate")
    }
    function del(){
        const delroom =  () => {
            console.log("User Have been removed")
            const { data } =  getdelete(roomId);
            setRoom((prev) => data);
            console.log(data)
        }
        delroom();
       
    }
    function openModal() {
        setShowModal(true);
    }
    return (
        <div>
            
            <div className="container">
                <button onClick={handManualLeave} className={styles.goBack}>
                    <img src="/images/arrow-left.png" alt="arrow-left" />
                    <span>All voice rooms</span>
                </button>
            </div>
            <div className={styles.clientsWrap}>
                <div className={styles.header}>
                    {room && <h2 className={styles.topic}>{room.topic}</h2>}
                    <div className={styles.actions}>
                        <button className={styles.actionBtn}>
                            <img src="/images/palm.png" alt="palm-icon" onClick={question} />
                        </button>
                        <button
                            onClick={handManualLeave}
                            className={styles.actionBtn}
                        >
                            <img src="/images/win.png" alt="win-icon" />
                            <span className={styles.leave}>Leave quietly</span>
                        </button>
                    </div>
                </div>
                <div className={styles.clientsList}>
                    {clients.map((client) => {
                        return (
                            <div className={styles.client} key={client.id}>
                                <div className={styles.userHead}>
                                    <img
                                        className={styles.userAvatar}
                                        src={client.avatar}
                                        alt=""
                                    />
                                    <audio
                                        autoPlay
                                        ref={(instance) => {
                                            provideRef(instance, client.id);
                                        }}
                                    />
                                    <button
                                        onClick={() =>
                                            handleMuteClick(client.id)
                                        }
                                        className={styles.micBtn}
                                    >
                                        {client.muted ? (
                                            <img
                                                className={styles.mic}
                                                src="/images/mic-mute.png"
                                                alt="mic"
                                            />
                                        ) : (
                                            <img
                                                className={styles.micImg}
                                                src="/images/mic.png"
                                                alt="mic"
                                            />
                                        )}
                                    </button>
                                </div>
                                <h4 className={styles.name}>{client.name}</h4>
                                <input type="button" className={styles.btn1} value="change Voice" onClick={btn} />
                                <input type="button" className={styles.kick} value="KickOut" onClick={() =>
                                            remove(client.id)
                                        } />
                                         <button onClick={del}>del</button>
                                         <button onClick={openModal}>change</button>
                                         {/* {showModal && <VoiceChanger onClose={() => setShowModal(false)} />} */}
                                {/* <>
                                <div className={styles.boxing}>
  <textarea
    id="note-textarea"
    placeholder="Create a new note by typing or using voice recognition."
    rows={6}
    defaultValue={""}
  />
  <br />
  <button id="start-record-btn" title="Start Recording">
    Start Recognition
  </button>
  <button id="pause-record-btn" title="Pause Recording">
    Pause Recognition
  </button>
  </div>
</> */}

                            </div>
                            
                        );
                    })}
                </div>
            </div>
        </div>
    );
};



export default HostRoom;
