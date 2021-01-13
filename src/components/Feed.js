import React from 'react';
import styled from 'styled-components';
import Post from './Post';

const FeedWrapper = styled.div`
    width: 100%;
    border: 1px solid grey;
    height: 100%;
    border-bottom: none;
`;

const NoPosts = styled.div`
    text-align: center;
`;

const Feed = ({ posts }) => {
    if(!posts || !posts.length) {
        return (
            <NoPosts>No posts yet!</NoPosts>
        );
    }

    return (
        <FeedWrapper>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </FeedWrapper>
    )
}

export default Feed;