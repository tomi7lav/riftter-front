import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Follow from '../components/Follow';
import Feed from '../components/Feed';
import TopBar from '../components/TopBar';
import { deletePost as deletePostReq, getUserPosts as getUserPostsReq } from '../services/postsService';
import { getUserProfile as getUserProfileReq } from '../services/profileService';
import { Grid, Container, Typography, Stack } from '@mui/material';

const ActionsWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justifu-continer: space-between;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 4px;
    background-color: white;
`;

const Profile = ({ user }) => {
    const [profileData, setProfileData] = useState();
    const [userPosts, setUserPosts] = useState();

    const { profileId } = useParams();
    
    useEffect(() => {
        getUserProfileReq(profileId).then((profileData) => {
            setProfileData(profileData)
        })
    }, [profileId])

    useEffect(() => {
        getUserPostsReq(profileId).then((userPosts) => {
            setUserPosts(userPosts)
        })
    }, [profileId])

    const deletePost = (postId) => deletePostReq(postId).then(() => {
        const newPosts = userPosts.filter(post => post.id !== postId)
        setUserPosts(newPosts)
    })

    console.log({ profileData })

    if(!profileData) {
        return null
    }

    return (
        <>
            <TopBar />
            <Container width="960px">
                <Grid container columns={9} spacing={2} sx={{ marginTop: '80px' }}>
                    <Grid item xs={3}>
                        <InfoWrapper>
                            <Stack key="name" direction='row' sx={{ margin: '5px' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: '5px' }}>Name: </Typography>
                                <Typography variant="body1" >{profileData.name}</Typography>
                            </Stack>
                            <Stack key="surname" direction='row' sx={{ margin: '5px' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: '5px' }}>Surname: </Typography>
                                <Typography variant="body1" >{profileData.surname}</Typography>
                            </Stack>
                            <Stack key="gender" direction='row' sx={{ margin: '5px' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: '5px' }}>Gender: </Typography>
                                <Typography variant="body1" >{profileData.Profile.gender}</Typography>
                            </Stack>
                            <Stack key="age" direction='row' sx={{ margin: '5px' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: '5px' }}>Age: </Typography>
                                <Typography variant="body1" >{profileData.Profile.age}</Typography>
                            </Stack>
                            <Stack key="occupation" direction='row' sx={{ margin: '5px' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: '5px' }}>Occupation: </Typography>
                                <Typography variant="body1" >{profileData.Profile.occupation}</Typography>
                            </Stack>
                            <Stack key="bio" direction='row' sx={{ margin: '5px' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: '5px' }}>Bio: </Typography>
                                <Typography variant="body1" >{profileData.Profile.bio}</Typography>
                            </Stack>
                        </InfoWrapper>
                        <ActionsWrapper>
                        {(user.id !== profileData.id) && <Follow profileId={profileId} />}
                        </ActionsWrapper>
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', padding: '0px 20px' }}>
                        <Feed posts={userPosts} deletePost={deletePost}/>
                    </Grid>
                </Grid>
            </Container>
           
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
  })

export default connect(mapStateToProps)(Profile);