import React, { useState, useEffect } from 'react';
import styles from './CreateHost.module.css'
import Button from '../../components/shared/Button/Button'
import { Link, useHistory } from 'react-router-dom';
// import TextInput from '../../components/shared/TextInput/TextInput';
import { createhost } from '../../http'
// import createhost1 from '../../http'
const CreateHost = () => {
    // const [roomType, setRoomType] = useState('open');
    const [fname, setTopic] = useState('');
    const [lastname, setlastname] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [companyType, setcompanyType] = useState('');
    const [companyLocation, setcompanyLocation] = useState('');
    const [totalDeparts, settotalDeparts] = useState('');
    const [CounterParties, setCounterParties] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Password1, setPassword1] = useState('');
    async function createhost1() {
      try {
        // alert("heelo")
        // if (!fname||lastname||!companyName||!companyType||!companyLocation||!totalDeparts||!CounterParties||!Phone||!Email||!Password||!Password1) return;
          const { data } = await createhost({ fname, lastname,companyName,companyType,companyLocation,totalDeparts,CounterParties,Phone,Email,Password,Password1});
          // history.push(`/hostroom/${data.id}`);
          document.getElementById("result").innerHTML="host created";
          console.log(data)
      } catch (err) {
          console.log(err.message);
      }
  }
  const ok = useHistory();
  function leave() {
      ok.push('/Adminrooms');
  }
  return (
    <>
    <div className={styles.container}>
        <div className={styles.create1}>
        <p className={styles.create}>Host Creation Form</p>
        </div>
        <button className={styles.logoutButton} onClick={leave}>
            <img src="/images/logout.png" alt="logout" />
            
          </button>
        <form method='post'>
        <div className="one">
        <input type="text"  fullwidth="true"
                        value={fname}
                        onChange={(e) => setTopic(e.target.value)} placeholder='First Name' name='fname' className={styles.first} />
            <input type="text"  fullwidth="true"
                        value={lastname}
                        onChange={(e) => setlastname(e.target.value)} placeholder='last Name' name='lastname' className={styles.first} />
            <input type="text"  fullwidth="true"
                        value={companyName}
                        onChange={(e) => setcompanyName(e.target.value)} placeholder='Company Name' name='companyName' className={styles.first} />
            <input type="text"  fullwidth="true"
                        value={companyType}
                        onChange={(e) => setcompanyType(e.target.value)} placeholder='Number of Employee' name='companyType' className={styles.first} />
        </div>
        <div className="one">
        <input type="text"  fullwidth="true"
                        value={companyLocation}
                        onChange={(e) => setcompanyLocation(e.target.value)} placeholder='Company Type' name='companyLocation' className={styles.first} />
            <input type="text"  fullwidth="true"
                        value={totalDeparts}
                        onChange={(e) => settotalDeparts(e.target.value)} placeholder='Company Location' name='companyLocation' className={styles.first} />
            <input type="text"  fullwidth="true"
                        value={CounterParties}
                        onChange={(e) => setCounterParties(e.target.value)} placeholder='Total Deparments' name='totalDeparts' className={styles.first} />
            <input type="number"  fullwidth="true"
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)} placeholder='Counter Parties' name='CounterParties' className={styles.first} />
        </div>
        <div className="one">
        <input type="number"  fullwidth="true"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)} placeholder='Phone No' name='Phone' className={styles.first} />
            <input type="email"  fullwidth="true"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)} placeholder='Email Address' name='Email' className={styles.first} />
            <input type="text"  fullwidth="true"
                        value={Password1}
                        onChange={(e) => setPassword1(e.target.value)} placeholder='Password' name='Password' className={styles.first} />
                        {/* <button onSubmit={sumbit} >sumbit</button> */}

            {/* <input type="text"  fullwidth="true"
                        value={fname}
                        onChange={(e) => setTopic(e.target.value)} placeholder='Re-type Password' name='Password' className={styles.first} />
                      */}
        </div>
        </form>
                      {/* <Button text="Create Host" onClick={createhost1} /> */}
        <Button text="Create Host" onClick={createhost1}  />
        <div id="result"></div>
    </div>
    
    </>
  )
}

export default CreateHost