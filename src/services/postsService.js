import { BASE_URL } from "../config/api";

export const getAllPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        credentials: 'include',
      });
      return response.json();
    } catch (err) {
      throw new Error(err);
    }
};

export const getUserPosts = async (profileId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/author/${profileId}`, {
        credentials: 'include',
      });
      return response.json();
    } catch (err) {
      throw new Error(err);
    }
};

export const likePost = async postId => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
            method: 'POST',
            credentials: 'include'
        });
      return response
    } catch (err) {
      throw new Error(err);
    }
};

export const unlikePost = async (postId) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
            method: 'DELETE',
            credentials: 'include'
        });
      return response
    } catch (err) {
        throw new Error(err);
    }
};

export const deletePost = async (postId) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        return response;
    } catch (err) {
        throw new Error(err);
    }
}

