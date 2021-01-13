import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Link = styled.a`
    text-align: right;
`;

const Logout = ({ clearUser }) => {
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:3000/auth/logout`, {
            credentials: 'include'
        })
        .then(() => {
            clearUser();
            history.push('/');
        })
        .catch((err) => console.log({ err }));
    }

    return (
        <Link onClick={e => logout(e)} href="/logout">Logout</Link>
    )
}

const mapDispatchToProps = (dispatch) => ({
    clearUser: () => dispatch({ type: 'user/clear' })
});

export default connect(null, mapDispatchToProps)(Logout)