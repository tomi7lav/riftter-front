import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import styled from 'styled-components';
import TopBar from '../components/TopBar';
import Feed from '../components/Feed';

const HomeWrapper = styled.div``;

const getPosts = () => 
    fetch('http://localhost:3000/posts', {
        credentials: 'include',
    })
    .then(res => res.json())
    .then((posts) => posts)
    .catch((err) => console.log({ err }));


const Home = ({ user }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(user) {
            getPosts().then((posts) => setPosts(posts))
        }
    }, [user])

    if(!user) {
        return <Redirect to='/login' />
    }

    return (
       <HomeWrapper>
           <TopBar />
           <Feed posts={posts} />
       </HomeWrapper>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Home);