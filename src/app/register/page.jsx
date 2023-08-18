"use client";

import React,{useState} from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { FaGooglePlay } from 'react-icons/fa';
import { GrAppleAppStore } from 'react-icons/gr';
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/postContext'
import styles from './Index.module.css'; 
import PencilIcon from '../components/Loading/PencilIcon';

export default function Home() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
   const { userData, updateUserData } = useAuth();
  const router = useRouter();
   


  const validateUsername = () => {
    if (username.trim() === '') {
      setUsernameError('Username is required');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const calculatePasswordStrength = () => {
    // Implement your password strength logic here
    if (password.length === 0) {
      return 0;
    } else if (password.length < 4) {
      return 1;
    } else if (password.length < 7) {
      return 2;
    } else {
      return 3;
    }
  };

  const passwordStrengthColors = ['red', 'yellow', 'orange', 'green'];
  const passwordStrengthLabels = ['Weak', 'Moderate', 'Good', 'Strong'];


  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!validateUsername() || !validateEmail() || !validatePassword()) {
      return;
    }
    setIsLoading(true);
    try {
      await updateUserData({ username, email, password });
      const userData = { username, email, password };
      localStorage.setItem('userData', JSON.stringify(userData));
      router.push('/success');
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      setIsLoading(false); // Finish loading, whether success or failure
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundContent}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={styles.continueButton}
            style={{marginTop:"-3rem"}}
            onClick={() => router.push('/login')}
          >
            Continue as Coach
          </Button>
        </div>
      </div>
      <Grid
        container
        item
        xs={12}
        md={6}
        alignItems="center"
        justifyContent="center"
        className={styles.formContainer}
      >
        <Paper  className={styles.formPaper}>
        <div style={{ display: 'flex', justifyContent: 'center',marginBottom: '-1.75rem' }}>
            <Image
              src="/logo.webp"
              alt="Logo"
              width={155}
              height={155}
              priority
            />
          </div>
         
         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <TextField
    label="Username"
    focused
    size='small'
    variant="outlined"
    margin="normal"
    InputProps={{ style: { borderRadius: 20 } }}
    error={usernameError !== ''}
    helperText={usernameError}
    onChange={(e) => {
      setUsername(e.target.value);
      setUsernameError('');
    }}
  />

  <TextField
    label="Email"
    type="email"
    size='small'
    variant="outlined"
    margin="normal"
    InputProps={{ style: { borderRadius: 20 } }}
    error={emailError !== ''}
    helperText={emailError}
    onChange={(e) => {
      setEmail(e.target.value);
      setEmailError('');
    }}
  />

  <TextField
    label="Password"
    size='small'
    type="password"
    variant="outlined"
    margin="normal"
    InputProps={{ style: { borderRadius: 20 } }}
    error={passwordError !== ''}
    helperText={passwordError}
    onChange={(e) => {
      setPassword(e.target.value);
      setPasswordError('');
    }}
  />

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  flex: calculatePasswordStrength(),
                  height: '10px',
                  backgroundColor: passwordStrengthColors[calculatePasswordStrength()],
                  borderRadius: '5px',
                  transition: 'flex 0.3s ease-out',
                }}
              ></div>
              <div style={{ flex: 3 - calculatePasswordStrength() }}></div>
            </div>
            <Typography variant='caption' color='textSecondary' align='center' style={{   fontSize: '8px'  }}>
              Our team approves your request manually within 2 days
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
  <Button
    type="submit"
    variant="contained"
    color="warning"
    fullWidth
    size='medium'
    style={{ borderRadius: 20 }}
    onClick={handleSubmit}
    disabled={isLoading}
  >
    {isLoading ? <PencilIcon /> : 'Register as a Coach'}
  </Button>
</div>
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.75rem' }}>
  <GrAppleAppStore style={{  fontSize: '24px',color:'#FFA600', marginRight: '1rem' ,cursor:'pointer' }} />
  <FaGooglePlay style={{ fontSize: '24px',color:'#FFA600' ,cursor:'pointer' }} />
</div>
           <Typography variant='caption' color='#FFA600' align='center' style={{ marginTop: '1rem' }}>
              Available on App store & Google Play store
            </Typography>
            <Typography variant='body2' color='#FFA600' align='center' >
              © 2023 XiaFitness LLC
            </Typography>
          </form>
         
        </Paper>
      </Grid>
    </div>
  )
}
