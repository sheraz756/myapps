import React, { useState, useEffect } from 'react';
import styles from './UserCard.module.css';
import { getdelete } from '../../http'

const UserCard = ({ user }) => {
function deleteUser(id){
    alert("User Remove")
   fetch(getdelete(id),{
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
           
            className={styles.card}
        >
           <img src="/images/del.jpg" alt="delete" className={styles.del} onClick={()=>deleteUser(user.id)} />
            <h5 className={styles.topic}>User Name:{user.name}</h5>
            <h5 className={styles.topic}>ID:{user.id}</h5>
            <h5 className={styles.topic}>Phone:{user.phone}</h5>
            <h5 className={styles.topic}>User Created at:{user.createdAt}</h5>
            <h5 className={styles.topic}>Picture:{user.avatar}</h5>
           
        </div>
    );
};

export default UserCard;