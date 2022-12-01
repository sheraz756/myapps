// import React, { useState } from 'react';
// import Card from '../../../components/shared/Card/Card';
// import Button from '../../../components/shared/Button/Button';
// import TextInput from '../../../components/shared/TextInput/TextInput';
// import { useDispatch, useSelector } from 'react-redux';
// import { setEmail } from '../../../store/activateSlice';
// import styles from './StepEmail.module.css';
// const StepEmail = ({ onNext }) => {
//     const { email } = useSelector((state) => state.activate);
//     const dispatch = useDispatch();
//     const [mail, setmail] = useState(email);

//     function nextStep() {
//         if (!email) {
//             return;
//         }
//         dispatch(setEmail(mail));
//         onNext();
//     }
//     return (
//         <>
//             <Card title="What’s your full Email?" icon="goggle-emoji">
//                 <TextInput
//                     value={mail}
//                     onChange={(e) => setmail(e.target.value)}
//                 />
//                 <p className={styles.paragraph}>
//                     People use  anonymous at Anony :) !
//                 </p>
//                 <div>
//                     <Button onClick={nextStep} text="Next" />
//                 </div>
//             </Card>
//         </>
//     );
// };

// export default StepEmail;