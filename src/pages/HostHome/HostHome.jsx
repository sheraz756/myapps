import React from 'react';
import styles from './HostHome.module.css';
import { Link, useHistory } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const HostHome = () => {
    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px',
    };
    const history = useHistory();
    function startRegister() {
        history.push('/hostauthenticate');
    }
    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to Anony! As Host" className={styles.logo1}>
                <p className={styles.text}>
                    We’re working hard to get Anony ready for everyone!yes
                    While we wrap up the finishing touches, we’re adding people
                    gradually to make sure nothing breaks
                </p>
                <div>
                    <Button onClick={startRegister} text="Let's Go" />
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>
                        Have an invite text?
                    </span>
                </div>
            </Card>
        </div>
    );
};

export default HostHome;
