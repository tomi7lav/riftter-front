import { BASE_URL } from "../config/api";

export const getUserProfile = async (profileId) => {
    try {
      const response = await fetch(`${BASE_URL}/profiles/${profileId}`, {
        credentials: 'include',
      });
      return response.json();
    } catch (err) {
      throw new Error(err);
    }
};