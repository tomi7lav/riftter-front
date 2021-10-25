import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const CreateTextarea = styled.textarea`
    height: 135px;
    resize: none;
    margin-bottom: 5px;
    font-family: 'Roboto';
    box-shadow: 0 2px 2px rgb(0 0 0 / 0.2);
    border: none;
    padding: 3px;
    border-radius: 4px;

    &:focus {
        outline: none !important;
        box-shadow: 0 0 5px grey;
    }
`;

const CreateForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 5px 0px 10px 0px;
`;

const Actions = styled.div`
    display:flex;
    justify-content: flex-end;
`;


const createPostRequest = (text) => {
    return fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        credentials: 'include',
        body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .catch((err) => console.log({ err }));
}

const CreatePost = ({ success }) => {
    const [post, setPost] = useState('');

    const createPost = (e) => {
        e.preventDefault();

        createPostRequest(post).then(() => {
            setPost('');
            if(success) {
                success()
            }
        });
    }

    return (
        <CreateForm onSubmit={e => createPost(e)}>
            <CreateTextarea 
                type="text"
                value={post}
                placeholder="Create your post here..."
                onChange={e => setPost(e.target.value)}
            />
            <Actions>
                <Button type="submit" variant="contained" color="inherit" sx={{ marginTop: '5px' }} disabled={!post}>Create</Button>
            </Actions>
        </CreateForm>
    )
}

export default CreatePost;