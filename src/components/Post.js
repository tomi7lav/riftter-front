import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';

const PostWrapper = styled.div`
    padding: 15px;
    border-bottom: 1px solid grey;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
        cursor: pointer; 
    }
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Author = styled.h4`
    font-weight: bold;
    margin: 0px;

    &:hover {
        text-decoration: underline;
     }
`;

const Timestamp = styled.span`
    color: grey;
    font-size: 14px;
`;

const PostBody = styled.div`
    margin: 10px 0px;
`;

const PostFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Likes = styled.span`
    font-size: 12px;
   
    &:hover {
       text-decoration: underline;
    }
`;

const Like = styled.span`
    font-size: 12px;
    margin-right: 7px;
    display: inline-block;
    font-weight: ${({ likedByUser }) => likedByUser ? 'bold' : 'normal'};
    color: ${({ likedByUser }) => likedByUser ? 'blue' : 'grey'};
    &:hover {
        text-decoration: underline;
    }
`;

const likeRequest = (postId) => {
    return fetch(`http://localhost:3000/posts/${postId}/like`, {
        method: 'POST',
        credentials: 'include'
    })
    .catch((err) => console.log({ err }));
};

const unlikeRequest = (postId) => {
    return fetch(`http://localhost:3000/posts/${postId}/like`, {
        method: 'DELETE',
        credentials: 'include'
    })
    .catch((err) => console.log({ err }));
};


const Post = ({ post, user }) => {
   const [likedByUser, setLikedByUser] = useState(null);
   const [postLikes, setPostLikes] = useState([]);

    useEffect(() => {
        setLikedByUser(post.likes.indexOf(user.id) !== -1);
        setPostLikes(post.likes);
    }, [post.postid])

    const toggleLike = () => {
        if(likedByUser === false) {
            return likeRequest(post.postid).then(() => {
                setLikedByUser(true);
                postLikes.push(user.id)
                setPostLikes([...postLikes]);
            })
        } else if (likedByUser === true) {
            return unlikeRequest(post.postid).then(() => {
               setLikedByUser(false)
               const idx = postLikes.indexOf(user.id);
              
               
               postLikes.splice(idx, 1)

               console.log({ after: JSON.stringify(postLikes) })
               setPostLikes([...postLikes]);
            })
        }
    }

    return (
        <PostWrapper>
            <PostHeader>
                <Author>{post.username}</Author>
                <Timestamp>{moment(post.timestamp).fromNow()}</Timestamp>
            </PostHeader>
            <PostBody>{post.body}</PostBody>
            <PostFooter>
                <Like 
                    likedByUser={likedByUser}
                    onClick={toggleLike}
                >
                    Like
                </Like>
                <Likes>{postLikes.length} likes</Likes>
            </PostFooter>
        </PostWrapper>
    )
}


const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Post);