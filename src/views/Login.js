import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

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
        .then((user) => {
            setUser(user)
           
            history.push("/home");
        })
        .catch((err) => setError(err));
    }


    return (
        <div>
            <h1>Please submit your login credentials</h1>
            <form onSubmit={onSubmit}>
                <p>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        onChange={e => setUsername(e.target.value)}
                    />
                </p>
                <p>
                    <label>Password:</label>
                    <input 
                        type="text"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </p>
                {/* {error && <span>{error}</span>} */}
                <p>
                    <input type="submit" value="Login" />
                </p>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch({ type: 'user/set', payload: user })
});

export default connect(null, mapDispatchToProps)(Login);