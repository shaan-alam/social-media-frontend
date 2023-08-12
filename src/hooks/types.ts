import { AxiosResponse } from "axios";
import React from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutationResult,
} from "react-query";
import { Comment } from "../components/Post/types";

export interface QueryReturnType {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<void, unknown>>;
  isLoading: boolean;
  isFetching: boolean;
  error: string;
}

export type UseFetchComments = (
  postId: string,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
) => QueryReturnType;

export type CommentCreationSuccess = (
  data: AxiosResponse<any>,
  variables: any,
  context: unknown
) => void | Promise<unknown>;

export type UseCreateComment = (
  postId: string,
  onSuccess: CommentCreationSuccess
) => UseMutationResult<AxiosResponse<any>, unknown, any, unknown>;

export interface NewComment {
  id: string;
  message: string;
}

export type UseEditComment = (
  onSuccess: (
    data: AxiosResponse<any>,
    variables: NewComment,
    context: unknown
  ) => void | Promise<unknown>
) => UseMutationResult<AxiosResponse<any>, unknown, NewComment, unknown>;

export interface CommentReplyInterface {
  _id: string;
  message: string;
  author: {
    _id: string;
    avatar: string;
    fullName: string;
  };
  date: string;
}

export type UseFetchCommentReplies = (
  commentId: string,
  setCommentReplies: React.Dispatch<
    React.SetStateAction<CommentReplyInterface[]>
  >
) => QueryReturnType;

export interface CommentReply {
  message: string;
  author: string;
  commentId: string;
}

export type UseCreateCommentReply = (onSuccess: CommentCreationSuccess) => any;

export interface NewCommentReply {
  commentReplyId: string;
  message: string;
}

export type UseEditCommentReply = (
  onSuccess: (
    data: AxiosResponse<any>,
    variables: NewCommentReply,
    context: unknown
  ) => void | Promise<unknown> | undefined
) => UseMutationResult<AxiosResponse<any>, unknown, NewCommentReply, unknown>;

