import { AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import { createComment, editComment, fetchComments } from "../api";
import {
  NewComment,
  UseCreateComment,
  UseEditComment,
  UseFetchComments,
} from "./types";
import { deleteComment, likeCommment } from "../api";
import { useState } from "react";

interface Comment {
  message: string;
  author: string;
}

/**
 * @function useFetchComments
 * @description A custom hook to fetch the comments of a post. This hook will fetch 5 comments at a time, starting with 3 comments.
 * @param postId ID of the post for which comments are to be fetched
 * @param setComments To set the comments state in the component where it is used
 * @returns An Object containing refetch(), isLoading & isFetching
 */
export const useFetchComments: UseFetchComments = (postId, setComments) => {
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(3);

  const fetchMoreComments = async () => {
    try {
      const { data } = await fetchComments(postId, offset);

      setOffset(offset + 5);

      console.log("comments", data);

      setComments(data);
    } catch (err: any) {
      setError(err as string);
      console.log(err);
    }
  };

  const { refetch, isLoading, isFetching } = useQuery(
    ["comments", postId],
    fetchMoreComments,
    {
      refetchOnWindowFocus: false,
    }
  );

  return { refetch, isLoading, isFetching, error };
};

/**
 * @description A custom hook to create a comment for a post.
 * @param postId ID of the post for which comment is to be created
 * @param comment An object containing the author ID and the message for the comment.
 * @param onSuccess A callback function to be executed after the comment is created
 */
export const useCreateComment: UseCreateComment = (postId, onSuccess) => {
  const mutation = useMutation(
    "createComment",
    (comment: Comment) => createComment(postId, comment),
    {
      onSuccess,
    }
  );

  return mutation;
};

type UseDeleteComment = (
  commentId: string
) => UseMutationResult<AxiosResponse<any>, unknown, void, unknown>;

/**
 * @function useDeleteComment
 * @description A custom hook to delete Comment;
 * @param commentId ID of the comment which is to be deleted
 */
export const useDeleteComment: UseDeleteComment = (commentId) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => deleteComment(commentId), {
    onSuccess: () => {
      queryClient.refetchQueries("comments");
    },
  });

  return mutation;
};

/**
 * @description A custom hook to edit comments
 * @param onSuccess A callback function to be called when the comment editing is successfull!
 */
export const useEditComment: UseEditComment = (onSuccess) => {
  const mutation = useMutation(
    (newComment: NewComment) => editComment(newComment.id, newComment.message),
    {
      onSuccess,
    }
  );

  return mutation;
};

export const useLikeComment = (
  postId: string,
  commentId: string,
  userId: string
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => likeCommment(commentId, userId), {
    onSuccess: () => {
      queryClient.refetchQueries(["comments", postId]);
    },
  });

  return mutation;
};
