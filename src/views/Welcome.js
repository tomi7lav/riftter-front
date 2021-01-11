import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

const Welcome = ({ user }) => {
    if(user) {
        return <Redirect to='/home' />
    }

   return (
        <div>
            <h1>Welcome to riftter!</h1>
            <p>Do you have an account? <a href="/login">Log in</a></p>
            <p>If not, register. <a href="/register">Register</a></p>
        </div>
   )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Welcome);