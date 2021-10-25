import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { 
    PostWrapper, PostHeader, Author, Timestamp, PostBody, PostFooter, LikeAction, 
    LikesCount, Actions, Edit, Delete
} from './elements'
import { 
    likePost as likePostReq, 
    unlikePost as unlikePostReq
} from '../../services/postsService';
import { Typography } from '@mui/material';

const Post = ({ post, user, deletePost }) => {
   const [likedByUser, setLikedByUser] = useState(null);
   const [postLikes, setPostLikes] = useState([]);

    useEffect(() => {
        setLikedByUser(post.likes.indexOf(user.id) !== -1);
        setPostLikes(post.likes);
    }, [post.id, post.likes, user.id])

    const toggleLike = () => {
        if(likedByUser === false) {
            return likePostReq(post.id).then(() => {
                setLikedByUser(true);
                postLikes.push(user.id)
                setPostLikes([...postLikes]);
            })
        } else if (likedByUser === true) {
            return unlikePostReq(post.id).then(() => {
               setLikedByUser(false)
               const idx = postLikes.indexOf(user.id);
               postLikes.splice(idx, 1)
               setPostLikes([...postLikes]);
            })
        }
    }

    console.log({ post, user })

    return (
        <PostWrapper>
            <PostHeader>
                <Author>
                    <Typography variant="h6" gutterBottom>{post.username}</Typography>
                </Author>
                <Timestamp>{moment(post.createdat).fromNow()}</Timestamp>
            </PostHeader>
            <PostBody>
                <Typography paragraph={true}>
                    {post.body}
                </Typography>
            </PostBody>
            <PostFooter>
               {post.authorid === user.id && (
                   <Actions>
                        <Edit>Edit</Edit>
                        <Delete onClick={() => deletePost(post.id)}>Delete</Delete>
                    </Actions>
               )}
               <Actions>
                    <LikeAction
                        likedByUser={likedByUser}
                        onClick={toggleLike}
                    >
                        Like
                    </LikeAction>
                    <LikesCount>{postLikes.length} likes</LikesCount>
               </Actions>
            </PostFooter>
        </PostWrapper>
    )
}


const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Post);