import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { TextField, Button, Stack, Typography, Container} from '@mui/material';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => res.json())
        .then((response) => {
            if(!response.success){
                return setError(response.message)
            
            }
            
            setUser(response.user)
            history.push("/home");
        })
        .catch((err) => {
            console.log(err)
        });
    }


    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", height: '70%' }}>
            <Typography variant="h1" compomnent="h1" sx={{ fontWeight: 'bold', marginBottom: '30px' }}>Riftter</Typography>
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
                            onChange: e => setUsername(e.target.value)
                        }}
                       
                    />
                <TextField 
                        variant="outlined"
                        label="surname"
                        name="surname"
                        sx={{ backgroundColor: 'white', boxShadow: 'inset 0 0 2px' }}
                        inputProps={{ 
                            onChange: e => setPassword(e.target.value)
                        }}
                       
                    />
             
                {error && <span>{error}</span>}
                <Button type="submit" variant="contained" color="secondary">Log in</Button>
            </Stack>
       </Container>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch({ type: 'user/set', payload: user })
});

export default connect(null, mapDispatchToProps)(Login);