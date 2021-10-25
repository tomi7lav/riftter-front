import React  from 'react';
import styled from 'styled-components';
import Post from './Post';

const FeedWrapper = styled.div`
    height: 100%;
    border-bottom: none;
    max-width: 600px;
    display: inline-block;
`;

const NoPosts = styled.div`
    text-align: center;
`;


const Feed = ({ posts, deletePost }) => {
    if(!posts || !posts.length) {
        return (
            <NoPosts>No posts yet!</NoPosts>
        );
    }

    return (
        <FeedWrapper>
            {posts.map((post) => (
                <Post key={post.id} post={post} deletePost={deletePost} />
            ))}
        </FeedWrapper>
    )
}

export default Feed;