import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import styled from 'styled-components';
import TopBar from '../components/TopBar';
import Feed from '../components/Feed';
import CreatePost from '../components/CreatePost';
import { 
    getAllPosts as getAllPostsReq, 
    deletePost as deletePostReq 
} from '../services/postsService';
import { Container } from '@mui/material';

const HomeWrapper = styled.div``;

const ContentWrapper = styled.div`
    width: 600px;
    position: relative;
    margin: auto;
    margin-top: 80px;
`;

const Home = ({ user }) => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => getAllPostsReq().then((posts) => 
        setPosts(posts)
    )

    const deletePost = (postId) => deletePostReq(postId).then(() => {
        const newPosts = posts.filter(post => post.id === postId)
        setPosts(newPosts)
    })

    useEffect(() => {
        if(user) {
            getPosts()
        }
    }, [user])

    if(!user) {
        return <Redirect to='/login' />
    }
    
    return (
       <HomeWrapper>
           <TopBar />
           <ContentWrapper>
            <CreatePost success={getPosts} />
            <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                <Feed posts={posts} deletePost={deletePost}/>
            </Container>
           </ContentWrapper>
       </HomeWrapper>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Home);