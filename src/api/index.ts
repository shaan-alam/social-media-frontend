import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants";

export function getAPIInstance() {
  const API = axios.create({ baseURL: BASE_URL }); // Creating an Axios Instance for API calls.

  // Attach the token from the localStorage to req.headers.authorization before any API calls.
  API.interceptors.request.use((req: AxiosRequestConfig) => {
    if (localStorage.getItem("profile") || "{}") {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile") || "{}").token
      }`;
    }

    return req;
  });

  return API;
}

export { signIn, signUp, googleAuthentication } from "./auth";
export { createPost, reactPost, getPosts, editPost, deletePost } from "./posts";
export {
  createComment,
  deleteComment,
  editComment,
  fetchComments,
  likeCommment
} from "./comments";
export {
  createCommentReply,
  deleteCommentReply,
  editCommentReply,
  fetchCommentReplies,
} from "./commentReply";
export {
  changeUserProfilePicture,
  getProfile,
  getProfilePost,
  getUserProfile,
  updateProfileDetails,
} from "./profile";
export { followUser, unfollowUser, getUser } from "./user";
export { retrieveFollowers } from "./followers";
