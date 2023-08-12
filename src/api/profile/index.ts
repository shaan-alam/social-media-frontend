import { getAPIInstance } from "../index";

const API = getAPIInstance();

export const getProfile = (userId: string) => API.get(`/profile/${userId}`);

export const getProfilePost = (userId: string) =>
  API.get(`/profile/posts/${userId}`);

export const getUserProfile = (id: string) => API.get(`/profile/${id}`);

export const updateProfileDetails = (details: {
  lives_in_city: string;
  from_city: string;
  works: string[];
  bio: string;
  education: string[];
}) => API.patch("/profile/edit", { details });

export const changeUserProfilePicture = (image: string) =>
  API.patch(`/profile/edit/profile-picture`, { image });

export const changeCoverPicture = (image: string) =>
  API.patch(`/profile/edit/cover-picture`, { image });
