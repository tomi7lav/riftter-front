import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { TextField, Button, Stack, Typography, Container} from '@mui/material';

const ErrorMessage = styled.span`
    display: block;
`


const Register = ({ setUser }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();

    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username,
                password,
                name,
                surname
            })
        })
        .then(res => res.json())
        .then(({ errors: errorsRes, user }) => {
            
            if(errorsRes) {
                return setErrors(errorsRes.data.map(err => ({
                    message: err.message,
                    key: err.context.key
                })))
            }
           
            if(user) {
                setUser(user)
           
                history.push("/home");
            }
        })
        .catch((err) => {
            console.log('err', err)
        });
    }


    return (
       <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", height: '70%' }}>
            <Typography variant="h1" compomnent="h1" sx={{ fontWeight: 'bold' }}>Riftter</Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: "30px" }}>Welcome to our wonderful new network, where dreams come true.</Typography>
            <Stack
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '35ch' },
                }}
                onSubmit={onSubmit}
                noValidate
                autoComplete="off"
            >

                <TextField 
                        variant="outlined"
                        label="name"
                        name="name" 
                        sx={{ backgroundColor: 'white', boxShadow: 'inset 0 0 2px', borderRadius: '5px' }}
                        inputProps={{ 
                            onChange: e => setName(e.target.value)
                        }}
                       
                    />
                <TextField 
                        variant="outlined"
                        label="surname"
                        name="surname"
                        sx={{ backgroundColor: 'white', boxShadow: 'inset 0 0 2px' }}
                        inputProps={{ 
                            onChange: e => setSurname(e.target.value)
                        }}
                       
                    />
                <TextField 
                        variant="outlined"
                        label="username"
                        name="username" 
                        sx={{ backgroundColor: 'white',  boxShadow: 'inset 0 0 2px' }}
                        inputProps={{ 
                            onChange: e => setUsername(e.target.value)
                        }}
                       
                    />
                <TextField
                        variant="outlined"
                        label="password"
                        name="password" 
                        sx={{ backgroundColor: 'white',  boxShadow: 'inset 0 0 2px' }}
                        inputProps={{ 
                            onChange: e => setPassword(e.target.value)
                        }} 
                    />
                {Boolean(errors.length) && (
                    errors.map(err => <ErrorMessage key={err.key}>{err.message}</ErrorMessage>)
                )}
                <Button type="submit" variant="contained" color="secondary">Register</Button>
            </Stack>
       </Container>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch({ type: 'user/set', payload: user })
});

export default connect(null, mapDispatchToProps)(Register);