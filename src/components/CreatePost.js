import React, { useState } from 'react';
import styled from 'styled-components';

const CreateTextarea = styled.textarea`
    height: 135px;
    resize: none;
    margin-bottom: 5px;
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

const SubmitButton = styled.button`
    width:100px;
    height:30px;
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
                <SubmitButton type="submit" disabled={!post}>Create</SubmitButton>
            </Actions>
        </CreateForm>
    )
}

export default CreatePost;