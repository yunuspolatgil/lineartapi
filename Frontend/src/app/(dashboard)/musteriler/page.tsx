// MUI Imports
"use client";
import * as React from 'react';

import Box from '@mui/material/Box';
import type { ButtonProps } from '@mui/material/Button'

const DialogMusteriEkle = () => {
  // Vars
  const buttonProps: ButtonProps = {
    variant: 'contained',
    children: 'Müşteri Ekle'
  }
  return (
   <>
     <Box component="section" sx={{ p: 2, border: '1px  grey' }}>

     </Box>
   </>
  )
}
export default DialogMusteriEkle
