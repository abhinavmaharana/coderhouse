import React, { useState } from 'react'
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css';
import { verifyOtp } from '../../../http';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../../store/authSlice';

const StepOtp = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const {phone, hash} = useSelector((state) => state.auth.otp);
  async function submit() {
    try {
        const {data} = await verifyOtp({otp, phone,hash});
        dispatch(setAuth(data));
    } catch (err) {
        console.log(err)
    }
  }
  return (
    <>
            <div className={styles.cardWrapper}>
                <Card
                    title="Enter the code we just texted you"
                    icon="lock-emoji"
                >
                    <TextInput
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className={styles.actionButtonWrap}>
                        <Button onClick={submit} text="Next" />
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering your number, you’re agreeing to our Terms of
                        Service and Privacy Policy. Thanks!
                    </p>
                </Card>
            </div>
        </>
  )
}

export default StepOtp