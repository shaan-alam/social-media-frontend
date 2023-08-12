import { getAPIInstance } from "../index";
import { EditPost, NewPost, Reaction } from "../types";

const API = getAPIInstance();

/**
 * @description Function making an GET API call to fetch all the posts from the backend
 */
export const getPosts = () => API.get("/posts");

/**
 * @description Function making a POST API call to create a new post
 * @param {[newPost]} newPost An object containing new post details.
 */
export const createPost = (newPost: NewPost) => API.post("/posts", newPost);

/**
 * @description Function making a DELETE API call to delete a post
 * @param {[String]} id ID of the post to be deleted
 */
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

/**
 * @description Function making a PATCH API call to edit a post
 * @param {[string]} id ID of the post
 * @param {[EditPost]} newPost An object containing edited post details
 * @return {[Promise<AxiosResponse<any>>]} Returns a promise of AxiosResponse<any>
 */
export const editPost = (id: string, newPost: EditPost) =>
  API.patch(`/posts/${id}`, newPost);

/**
 * @description Function making a PATCH API call to react to a post
 * @param {[String]} id ID of the post to be liked
 * @param {[Reaction]} reaction An object containing user's reaction details for example { emoji: 'haha', by: 'some user ID'}
 */
export const reactPost = (id: string, reaction: Reaction) =>
  API.patch(`/posts/${id}/reactPost`, { reaction });
