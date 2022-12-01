import React from "react";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
import styles from './Host.module.css'
import {  useHistory } from 'react-router-dom';

const Host = () => {
  const history = useHistory();
  function startRegister() {
      history.push('/Adminname');
  }
  return (
    <div className={styles.cardWrapper}>
    <Card>
      <div className={styles.head}>Login</div>
      <input type="email" name="email" placeholder="Enter Your Host Email" className={styles.email} />
      <input type="password" name="password" placeholder="Enter Your Password" className={styles.password} />
      <div>
        <Button text="Login" onClick={startRegister} />
      </div>
    </Card>
    </div>
  );
};

export default Host;
