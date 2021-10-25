import styled from 'styled-components';

export const PostWrapper = styled.div`
    padding: 15px;
    border-bottom: 1px solid grey;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    margin-bottom: 5px;
    border-radius: 4px;
    width: 500px;
    
    &:hover {
        cursor: pointer; 
    }
`;

export const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Author = styled.h4`
    font-weight: bold;
    margin: 0px;

    &:hover {
        text-decoration: underline;
    }
`;

export const Timestamp = styled.span`
    color: grey;
    font-size: 14px;
`;

export const PostBody = styled.div`
    margin: 10px 0px;
`;

export const PostFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const Actions = styled.div`
    display: flex;

`;

export const LikesCount = styled.span`
    font-size: 12px;
    color: grey;
    &:hover {
        text-decoration: underline;
    }
`;

export const LikeAction = styled.span`
    font-size: 12px;
    margin-right: 7px;
    display: inline-block;
    font-weight: ${({ likedByUser }) => likedByUser ? 'bold' : 'normal'};
    color: ${({ likedByUser }) => likedByUser ? 'black' : 'grey'};
    &:hover {
        text-decoration: underline;
    }
`;

export const Edit = styled.span`
    font-size: 12px;
    color: black;
    margin-right: 7px;
    &:hover {
        text-decoration: underline;
    }
`;

export const Delete = styled.span`
    font-size: 12px;
    color: black;
    margin-right: 7px;
    &:hover {
        text-decoration: underline;
    }
`;