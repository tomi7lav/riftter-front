import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Follow from '../components/Follow';
import Feed from '../components/Feed';
import omit from 'lodash/omit';

const ProfileWrapper = styled.div`
    max-width: 600px;
    margin: auto;
`;

const ActionsWrapper = styled.div`
    margin-top: 20px;
    border-bottom: 1px solid grey;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justifu-continer: space-between;
    margin-top: 20px;
    border: 1px solid grey;
`;

const Info = styled.div`
    margin: 10px 5px;
`;

const InfoTitle = styled.span`
    font-weight: bold;
`;

const InfoValue = styled.span``;

const FeedWrapper = styled.div``;


const getUserData = (profileId) => {
    return fetch(`http://localhost:3000/profiles/${profileId}`, {
        credentials: 'include',
    })
    .then(res => res.json())
    .catch((err) => console.log({ err }));
};

const getUserPosts = (profileId) => {
    return fetch(`http://localhost:3000/posts/author/${profileId}`, {
        credentials: 'include',
    })
    .then(res => res.json())
    .catch((err) => console.log({ err }));
}

const Profile = () => {
    const [profileData, setProfileData] = useState();
    const [userPosts, setUserPosts] = useState();

    const { profileId } = useParams();
    
    useEffect(() => {
        console.log('running effect')
        getUserData(profileId).then((profileData) => {
            console.log({ profileData })
            setProfileData(profileData)
        })
    }, [profileId])

    useEffect(() => {
        getUserPosts(profileId).then((profileData) => {
            setUserPosts(profileData)
        })
    }, [profileId])

    return (
        <ProfileWrapper>
            <InfoWrapper>
                {profileData && Object.entries(omit(profileData, ['id', 'password'])).map(([infoKey, infoValue]) => (
                    <Info key={infoKey}>
                        <InfoTitle>{infoKey}</InfoTitle>
                        {': '}
                        <InfoValue>{infoValue}</InfoValue>
                    </Info>
                ))}
            </InfoWrapper>
            <ActionsWrapper>
                <Follow profileId={profileId} />
            </ActionsWrapper>
            <FeedWrapper>
                <Feed posts={userPosts} />
            </FeedWrapper>
        </ProfileWrapper>
    )
}

export default Profile;