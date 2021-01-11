import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const Home = ({ user }) => {
    if(!user) {
        return <Redirect to='/login' />
    }

    const message = `Hey ${user.name} ${user.surname}`;

    return (
        <div>
            <h1>{message}</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Home);