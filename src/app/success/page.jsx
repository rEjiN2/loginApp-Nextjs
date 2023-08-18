"use client";


import React from 'react';
import {  Button, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import styles from './Index.module.css'; 


const Page = () => {

    const router = useRouter()


  return (
    <div className={styles.container}>
    <div className={styles.backgroundContainer}>
      <div className={styles.backgroundContent}>
        <Button
          type="submit"
          variant="contained"
          color="warning"
          style={{marginTop:"-3rem"}}
          className={styles.continueButton}
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
      <Paper elevation={3} className={styles.formPaper}>
      <div style={{  marginBottom: '1rem' }}>
            <div style={{ display:'flex', justifyContent:'center' ,marginTop: '3rem' }}>
            <Image
              src="/tick1.png"
              alt="Logo"
              width={200}
              height={200}
              priority
            />
            </div>
            <div  style={{ display:'flex', justifyContent:'center' , marginTop: '1rem' }}>
            All the best
             </div>
            
            <Typography variant='body2' color='textSecondary' align='center' style={{ marginTop: '1rem' }}>
               You will recieve an email Once approved
            </Typography>
          </div>
          
          
      </Paper>
    </Grid>
  </div>
  )
}

export default Page