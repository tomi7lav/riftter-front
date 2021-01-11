import React from 'react';
import styled from 'styled-components';

const FeedWrapper = styled.div`
    width: 600px;
    border: 1px solid;
    height: 100%;
`;

const Post = styled.div`
    padding: 15px;
    border-bottom: 1px solid whitesmoke;
`;

const FeedItem = styled.div``;

const Feed = ({ posts }) => {
    if(!posts || !posts.length) {
        return (
            <div>No posts yet!</div>
        );
    }

    return (
        <FeedWrapper>
            {posts.map((post) => (
                <Post key={post.id}>
                    {post.body}
                </Post>
            ))}
        </FeedWrapper>
    )
}

export default Feed;