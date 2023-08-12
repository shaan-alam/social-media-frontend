import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createCommentReply,
  deleteCommentReply,
  editCommentReply,
  fetchCommentReplies,
} from "../api";
import {
  CommentReply,
  NewCommentReply,
  UseCreateCommentReply,
  UseEditCommentReply,
  UseFetchCommentReplies,
} from "./types";

/**
 * @function useFetchCommentReplies
 * @description A custom hook to fetch comment replies
 * @param commentId ID of the comment for which replies are to be fetched
 * @param setCommentReplies A function that will set comment replies state in the component
 */
export const useFetchCommentReplies: UseFetchCommentReplies = (
  commentId,
  setCommentReplies
) => {
  const [offset, setOffset] = useState(2);
  const [error, setError] = useState("");

  const fetchMoreCommentReplies = async () => {
    try {
      const { data } = await fetchCommentReplies(commentId, offset);

      setOffset(offset + 5);

      setCommentReplies(data);
    } catch (err: any) {
      setError(err);
      console.log(err);
    }
  };

  const { refetch, isLoading, isFetching } = useQuery(
    ["comment-replies", commentId],
    fetchMoreCommentReplies,
    {
      refetchOnWindowFocus: false,
    }
  );

  return { refetch, isLoading, isFetching, error };
};

/**
 * @function useCreateCommentReply
 * @description A custom hook to create a reply to a particular comment
 * @param onSuccess A callback function to set the comment replies state in the component.
 */
export const useCreateCommentReply: UseCreateCommentReply = (onSuccess) => {
  const mutation = useMutation(
    (commentReply: CommentReply) => createCommentReply(commentReply),
    {
      onSuccess,
    }
  );

  return mutation;
};

/**
 * @function useDeleteCommentReply
 * @description A custom hook to delete a comment reply
 * @param commentReplyId ID of the comment reply which is to be deleted
 */
export const useDeleteCommentReply = (commentReplyId: string) => {
  const queryClient = useQueryClient();

  const deleteReplyMutation = useMutation(
    () => deleteCommentReply(commentReplyId),
    {
      onSuccess: () => {
        queryClient.refetchQueries("comments");
        queryClient.refetchQueries("comment-replies");
      },
    }
  );

  return deleteReplyMutation;
};

/**
 * @function useEditCommentReply
 * @description A custom hook to update comment replies
 * @param onSuccess This function will refetch comment-replies and set in the component state
 */
export const useEditCommentReply: UseEditCommentReply = (onSuccess) => {
  const mutation = useMutation(
    (newCommentReply: NewCommentReply) => editCommentReply(newCommentReply),
    {
      onSuccess,
    }
  );

  return mutation;
};
