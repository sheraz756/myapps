import React from 'react';
import styles from './AdminCard.module.css';
import { useHistory } from 'react-router-dom';
import { getdeleteroom } from '../../http';
// import { Link, useHistory } from 'react-router-dom';
const AdminCard = ({ room }) => {
    const history = useHistory();
    
    function deleteUser(id){
        alert("User Remove")
        history.push('/');
       fetch(getdeleteroom(id),{
        method:'delete'
        
       }).then((result)=>{
        result.json().then((resp)=>{
            console.log("user delted",resp)
            alert("user remove")
        })
       })
    }
    
    return (
        <div
            onClick={() => {
                history.push(`/Adminroom/${room.id}`);
            }}
            className={styles.card}
        >
<img src="/images/del.jpg" alt="delete" className={styles.del} onClick={()=>deleteUser(room.id)} />
            <h3 className={styles.topic}>{room.topic}</h3>
            <div
                className={`${styles.speakers} ${
                    room.speakers.length === 1 ? styles.singleSpeaker : ''
                }`}
            >
                <div className={styles.avatars}>
                    {room.speakers.map((speaker) => (
                        <img
                            key={speaker.id}
                            src={speaker.avatar}
                            alt="speaker-avatar"
                        />
                    ))}
                </div>
                <div className={styles.names}>
                    {room.speakers.map((speaker) => (
                        <div key={speaker.id} className={styles.nameWrapper}>
                            <span>{speaker.name}</span>
                            <img
                                src="/images/chat-bubble.png"
                                alt="chat-bubble"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.peopleCount}>
                <span>{room.totalPeople}</span>
                <img src="/images/user-icon.png" alt="user-icon" />
            </div>
        </div>
    );
};

export default AdminCard;