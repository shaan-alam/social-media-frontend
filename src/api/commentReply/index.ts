import { getAPIInstance } from "../index";

const API = getAPIInstance();

export const fetchCommentReplies = (commentId: string, offset: number) =>
  API.get(`/post/comment-reply/replies/${commentId}?offset=${offset}`);

export const createCommentReply = (commentReply: {
  message: string;
  commentId: string;
  author: string;
}) => API.post(`/post/comment-reply/reply`, { commentReply });

export const editCommentReply = (commentReply: {
  commentReplyId: string;
  message: string;
}) =>
  API.patch(`/post/comment-reply/edit-reply/${commentReply.commentReplyId}`, {
    message: commentReply.message,
  });

export const deleteCommentReply = (commentReplyId: string) =>
  API.delete(`/post/comment-reply/delete-reply/${commentReplyId}`);
