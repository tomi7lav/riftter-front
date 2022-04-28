import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { Typography, Container } from '@mui/material';
import Link from '@mui/material/Link';

const Welcome = ({ user }) => {
    if(user) {
        return <Redirect to='/home' />
    }

   return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", height: '70%' }}>
            <Typography variant="h1" compomnent="h1" sx={{ fontWeight: 'bold' }}>Riftter</Typography>
            <Typography variant="subtitle1">Welcome to our wonderful new network, where dreams come true.</Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: "30px" }}>
                Please log in 
                <Link href="/login" sx={{ color: 'secondary.main' }}>Login</Link> 
                if you already have an account, otherwise register
                 <Link href="/register" sx={{ color: 'secondary.main' }}>Register</Link>
            </Typography>
        </Container>
   )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Welcome);