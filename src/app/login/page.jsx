"use client";

import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { FaGooglePlay } from 'react-icons/fa';
import { GrAppleAppStore } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/postContext';
import styles from './Index.module.css'; 


const Page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticationError, setAuthenticationError] = useState(false);
  const { userData, updateUserData } = useAuth();
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
      console.log(storedUserData,"user")
    
    if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
      console.log("success");
      router.push('/'); 
           } 
      else {
      console.log('Authentication failed');
      setAuthenticationError(true);
           }
           };
  return (
    <div className={styles.container}>
      <Grid
        container
        item
        xs={12}
        md={6}
        alignItems="center"
        justifyContent="center"
        className={styles.formContainer}
      >
        <Paper elevation={3} className={styles.formPaper}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-1.75rem' }}>
            <Image
              src="/logo.webp"
              alt="Logo"
              width={200}
              height={200}
              priority
            />
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              InputProps={{ style: { borderRadius: 20 } }}              
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              InputProps={{ style: { borderRadius: 20 } }} 
              
              onChange={(e) => setPassword(e.target.value)}
            />
            {authenticationError && (
          <Typography variant='body2' color='error' align='center' style={{ marginTop: '1rem' }}>
            Incorrect email or password. Please try again.
          </Typography>
        )}
             <Typography variant='caption' color='textSecondary' align='center' style={{ marginTop: '1rem' , cursor:'pointer' }}>
               Forgot Password
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
  <Button
    type="submit"
    variant="contained"
    color="secondary"

    style={{ borderRadius: 20,  }}
  >
    Continue Caoching
  </Button>
  
</div>

           <Typography variant='caption' color='textSecondary' align='center' style={{ marginTop: '4rem' }}>
           Design & Developed By
            </Typography>
            <Typography variant='body2' color='textSecondary' align='center' >
             HashGate Technology LLC
            </Typography>
          </form>
        </Paper>
      </Grid>
      <div className={styles.backgroundContainer}>
      <div className={styles.backgroundContent}>
  <Button
    type="submit"
    variant="contained"
    color="warning"
    style={{marginLeft:'2rem',marginTop:'4rem',marginBottom:20 ,borderRadius:20}}
    className={styles.registerButton}
    onClick={() => router.push('/register')}
  >
    Register as Coach
  </Button> 
  <div style={{ display: 'flex', flexDirection:'coloumn',color:'white' , justifyContent: 'center' ,marginTop:10  }}>
    <GrAppleAppStore style={{ fontSize: '24px', marginRight: '1rem', cursor:'pointer' }} />
    <FaGooglePlay style={{ fontSize: '24px', cursor:'pointer' }} />
  </div>
  
  {/* Container for the Typography components */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', cursor:'pointer' }}>
    <Typography variant='caption' color='white' align='center' >
    Available on App store & Google Play store
    </Typography>
    <Typography variant='body2' color='white' align='center'>
    © 2023 XiaFitness LLC
    </Typography>
  </div>
</div>


      </div>
    </div>
  )
}

export default Page