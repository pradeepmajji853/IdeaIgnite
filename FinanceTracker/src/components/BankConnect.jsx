import * as React from 'react';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
export default function BankConnect(){
    return(
        <Button sx={{color:"green",border:'none' ,'&:hover': {
            border: 'green',boxShadow:'0 4px 8px'
          }}} variant="outlined">Connect a Bank Account</Button>
    )
}
