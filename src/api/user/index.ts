import { getAPIInstance } from "../index";

const API = getAPIInstance();

/**
 * @description Get the user from the backend
 * @param {[String]} email Email of the user which we have to search from the backend
 * @returns Promise<AxiosResponse<any>>
 */
export const getUser = (email: string) => API.get(`/users/${email}`);

export const followUser = (userId: string) =>
  API.patch(`/profile/follow/${userId}`);

export const unfollowUser = (userId: string) =>
  API.patch(`/profile/unfollow/${userId}`);
