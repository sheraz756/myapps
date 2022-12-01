import React from 'react';
import styles from './Home.module.css';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/shared/Button/Button';
import Navbar from '../NavbarSet/Navbar';

const Home = () => {
    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px',
    };
    const history = useHistory();
    function startRegister() {
        history.push('/authenticate');
    }
    return (
        <>
        <div className="navcover"><Navbar /></div>
        
        
        <div className={styles.cardWrapper}>
      
          <div className={styles.right}>
            <p className={styles.h1}>Random voice and text chat rooms that you'll love.</p>
            <p className={styles.h2}>Speakrandom is your go-to place to relax and make new friends easily. Find respectful, non-judging, and truly random chat rooms that you'll never forget.</p>
           <div className={styles.cover}> <Button onClick={startRegister} text="Join Chat Now" /></div>
          </div>
          <div className={styles.left}>
          
            <img src="/images/intro.jpg" alt="intro" />
          </div>

        
        </div>
        </>
    );
};

export default Home;
