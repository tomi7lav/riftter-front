import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FollowButton = styled.button`
    font-size: 16px;
    margin-bottom: 20px;
`;


const getFollowingStatus = (profileId) => {
    return fetch(`http://localhost:3000/users/follow/${profileId}`, {
        credentials: 'include'
    })
    .then(res => res.json())
    .catch((err) => console.log({ err }));
};

const followRequest = (profileId) => {
    return fetch(`http://localhost:3000/users/follow/${profileId}`, {
        method: 'PUT',
        credentials: 'include'
    })
    .then(res => {
        console.log({ res })
        return res;
    })
    .catch((err) => console.log({ err }));
};

const unfollowRequest = (profileId) => {
    return fetch(`http://localhost:3000/users/follow/${profileId}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    .then(res => res.json())
    .catch((err) => console.log({ err }));
};


const Follow = ({ profileId }) => {
    const [following, setFollowing] = useState(null);
    const [fetching, setFetching] = useState();

    useEffect(() => {
        getFollowingStatus(profileId).then(({ following }) => {
            console.log({ following })
            setFollowing(following);
        })
    }, [profileId])

    const toggleFollow = () => {
        setFetching(true);
        if(following === false) {
            return followRequest(profileId).then(() => {
                setFetching(false);
                setFollowing(true);
            }).catch(() => {
                setFetching(false);
            })
        } else if (following === true) {
            return unfollowRequest(profileId).then(() => {
                setFetching(false);
                setFollowing(false);
            }).catch(() => {
                setFetching(false);
            })
        }
    }

    const buttonText = following ? 'Following' : 'Follow'

    return (
        <FollowButton 
            disabled={fetching}
            onClick={toggleFollow}
        >
                {buttonText}
        </FollowButton>
    )
}

export default Follow;