import { useState } from "react";
import { Comment } from "../Post/types";
import Skeleton from "react-loading-skeleton";
import { useQueryClient } from "react-query";
import loader from "../../assets/svg/loader-dark.svg";
import { useUser } from "../../hooks/user";
import { useFormik } from "formik";
import * as yup from "yup";
import CommentReply from "./CommentReply";
import Form from "./CommentReply/Form";
import Moment from "react-moment";
import CommentDropdown from "./CommentDropdown";
import { CommentReplyInterface } from "./types";
import CommentEditForm from "./CommentEditForm";
import {
  useDeleteComment,
  useEditComment,
  useLikeComment,
} from "../../hooks/comments";
import { useFetchCommentReplies } from "../../hooks/commentReply";

const PostComment = ({ comment }: { comment: Comment }) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const [commentForm, setCommentForm] = useState(false);
  const [commentReplyForm, setCommentReplyForm] = useState(false);
  const [commentReplies, setCommentReplies] = useState<CommentReplyInterface[]>(
    []
  );
  const [isLoaded, setLoaded] = useState(false);
  const [menu, setMenu] = useState(false);


  // For Deleting comment reply
  const mutation = useDeleteComment(comment._id);

  const likeMutation = useLikeComment(comment.postId, comment._id, user._id);

  // For Fetching comment replies
  const { refetch, isLoading, isFetching } = useFetchCommentReplies(
    comment._id,
    setCommentReplies
  );

  // For updating comment
  const editCommentMutation = useEditComment(() => {
    queryClient.refetchQueries("comments");
    formik.setSubmitting(false);
    setCommentForm(false);
  });

  const formik = useFormik({
    initialValues: {
      comment: comment.message,
    },
    validationSchema: yup.object({
      comment: yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        await editCommentMutation.mutateAsync({
          id: comment._id,
          message: values.comment,
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <div className="comment flex items-start justify-start my-4">
        {!isLoaded && (
          <Skeleton style={{ borderRadius: "100%" }} height={30} width={30} />
        )}
        <img
          style={{ display: !isLoaded ? "none" : "block" }}
          src={comment.author.avatar}
          alt={comment.author.fullName}
          className="h-7 w-7 rounded-full mr-4"
          onLoad={() => setLoaded(true)}
        />
        {!isLoaded && <Skeleton count={1} />}
        {commentForm && (
          <CommentEditForm
            initialComment={comment.message}
            setCommentForm={setCommentForm}
            isReply={false}
            commentId={comment._id}
          />
        )}
        {isLoaded && !commentForm && (
          <div className="flex flex-col">
            <div
              className="comment-box flex items-center"
              onMouseOver={() => setMenu(true)}
              onMouseLeave={() => setMenu(false)}
            >
              <div className="w-full py-3 px-5 rounded-2xl bg-gray-200">
                <h1 className="font-semibold">{comment.author.fullName}</h1>
                {!mutation.isLoading && <p>{comment.message}</p>}
                {mutation.isLoading && (
                  <span className="flex justify-center">
                    <img src={loader} />
                  </span>
                )}
              </div>
              {menu && user._id === comment.author._id && (
                <CommentDropdown
                  onEditBtnClick={() => setCommentForm(true)}
                  onDelete={() => mutation.mutate()}
                  isCommentReply={false}
                />
              )}
            </div>
            {!mutation.isLoading && (
              <div className="flex">
                {comment.commentLikes.length != 0 && (
                  <span className="text-sm text-gray-600 cursor-pointer ml-3 mt-2">
                    {comment.commentLikes.length}&nbsp;
                    {comment.commentLikes.length > 1 ? "Likes" : "Like"}
                  </span>
                )}
                <span
                  className="text-sm text-gray-600 cursor-pointer hover:underline ml-3 mt-2"
                  onClick={() => likeMutation.mutate()}
                >
                  {comment.commentLikes.find((like) => like.by === user._id)
                    ? "Unlike"
                    : "Like"}
                </span>
                <span
                  className="text-sm text-gray-600 cursor-pointer hover:underline ml-3 mt-2"
                  onClick={() => setCommentReplyForm(!commentReplyForm)}
                >
                  Reply
                </span>
                <span className="text-sm text-gray-600 ml-3 mt-2">
                  <Moment fromNow>{comment.date}</Moment>
                </span>
              </div>
            )}
            {comment.commentRepliesCount > commentReplies.length && (
              <span
                className="mt-2 mb-3 text-gray-600 cursor-pointer hover:underline flex items-center text-sm"
                onClick={() => refetch()}
              >
                View more replies&nbsp;
                {(isLoading || isFetching) && <img src={loader} />}
              </span>
            )}
          </div>
        )}
      </div>
      {commentReplyForm && (
        <Form commentId={comment._id} setCommentReplies={setCommentReplies} />
      )}
      {commentReplies.map((reply) => (
        <CommentReply commentReply={reply} key={reply._id} />
      ))}
    </>
  );
};

export default PostComment;
