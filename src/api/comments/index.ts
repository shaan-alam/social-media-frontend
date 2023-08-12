import { getAPIInstance } from "../index";

const API = getAPIInstance();

export const fetchComments = (postId: string, offset: number) =>
  API.get(`/post/comment/${postId}?offset=${offset}`);

export const createComment = (
  postId: string,
  comment: { message: string; author: string }
) => API.post(`/post/comment/${postId}`, { comment });

export const deleteComment = (id: string) => API.delete(`/post/comment/${id}`);

export const editComment = (id: string, message: string) =>
  API.patch(`/post/comment/${id}`, { message });

export const likeCommment = (commentId: string, userId: string) =>
  API.patch(`/post/comment/${commentId}/like`, { commentId, userId });
