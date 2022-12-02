import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import { Link, useHistory } from 'react-router-dom';
import { edituser } from '../../../http';
import styles from './EditStepName.module.css';
// import axios from 'axios'
import {  useParams } from 'react-router-dom';
const EditStepName = ({ onNext }) => {

    const { id } = useParams();
    const initialValue = {
        fullname: '',
        mail: '',
        dob1: '',
        jobtitle1: '',
        depart: '',
        org: '',
        country: ''
    }
    const history = useHistory();
    const [data, setdata] = useState(initialValue);
    
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [dob, setdob] = useState();
    const [jobtitle, setjobtitle] = useState();
    const [department, setdepartment] = useState();
    const [organization, setorganization] = useState();
    const [country, setcountry] = useState();

    async function editUserDetails () {
        try {
            const { data } = await edituser({ name, email,dob,jobtitle,department,organization,country},id);
           
            console.log(data)
            
            alert("record updated sucessfully")
            history.push("/rooms")
        } catch (err) {
            console.log(err.message);
        }
    }
    
        // history.back()
    
    return (
        <>
            <button className={styles.logoutButton} onClick={() => history.goBack()}>
            <img src="/images/logout1.png" alt="logout" />
            
          </button>
        <div className={styles.cardWrapper}>
            <Card title="Update Your Profile:" icon="goggle-emoji">
           
                <TextInput
                placeholder="Enter Your Full Name" 
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
                   <TextInput
                   placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                    <TextInput
                    placeholder="Enter Your Full DOB"
                    value={dob}
                    onChange={(e) => setdob(e.target.value)}
                />
                   <TextInput
                   placeholder="Enter Your JobTitle"
                    value={jobtitle}
                    onChange={(e) => setjobtitle(e.target.value)}
                /> 
                        <TextInput
                        placeholder="Enter Your Department Name"
                    value={department}
                    onChange={(e) => setdepartment(e.target.value)}
                />
                            <TextInput
                            placeholder="Enter Your Organization"
                    value={organization}
                    onChange={(e) => setorganization(e.target.value)}
                />
                               <TextInput
                               placeholder="Enter Your Country Name"
                    value={country}
                    onChange={(e) => setcountry(e.target.value)}
                />
                 
                <p className={styles.paragraph}>
                    People use  anonymous at Anony :) !
                </p>
                <div>
                    <Button onClick={editUserDetails} text="Update" />
                </div>
        
            </Card>
            </div>
        </>
    );
};

export default EditStepName;