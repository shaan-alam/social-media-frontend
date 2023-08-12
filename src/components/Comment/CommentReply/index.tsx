import { useState } from "react";
import loader from "../../../assets/svg/loader-dark.svg";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import { useUser } from "../../../hooks/user";
import Moment from "react-moment";
import CommentDropdown from "../CommentDropdown";
import { CommentReplyInterface } from "../types";
import CommentEditForm from "../CommentEditForm";
import Skeleton from "react-loading-skeleton";
import {
  useDeleteCommentReply,
  useEditCommentReply,
} from "../../../hooks/commentReply";

const CommentReply = ({
  commentReply,
}: {
  commentReply: CommentReplyInterface;
}) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const [isLoaded, setLoaded] = useState(false);
  const [commentForm, setCommentForm] = useState(false);
  const [menu, setMenu] = useState(false);

  const editMutation = useEditCommentReply(() => {
    queryClient.refetchQueries("comment-replies");
    setCommentForm(false);
    formik.setSubmitting(false);
  });

  const deleteReplyMutation = useDeleteCommentReply(commentReply._id);

  const formik = useFormik({
    initialValues: {
      commentReply: commentReply.message,
    },
    onSubmit: async (values) => {
      try {
        const newReply = {
          message: values.commentReply,
          commentReplyId: commentReply._id,
        };
        formik.resetForm();
        await editMutation.mutateAsync(newReply);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <div className="my-4 ml-10 comment-box flex items-center">
        <img
          style={{ display: !isLoaded ? "none" : "block" }}
          src={commentReply.author.avatar}
          alt={commentReply.author?.fullName}
          className="h-7 w-7 rounded-full mr-4"
          onLoad={() => setLoaded(true)}
        />
        {!isLoaded && <Skeleton count={1} />}
        {commentForm && (
          <CommentEditForm
            initialComment={commentReply.message}
            setCommentForm={setCommentForm}
            isReply={true}
            commentReplyId={commentReply._id}
          />
        )}
        {isLoaded && !commentForm && (
          <div className="flex flex-col">
            <div
              className="comment-box flex items-center"
              onMouseOver={() => setMenu(true)}
              onMouseLeave={() => setMenu(false)}
            >
              <div className="py-3 px-5 rounded-2xl bg-gray-200">
                <h1 className="font-semibold">
                  {commentReply.author.fullName}
                </h1>
                {!deleteReplyMutation.isLoading && (
                  <p>{commentReply.message}</p>
                )}
                {deleteReplyMutation.isLoading && (
                  <span className="flex justify-center">
                    <img src={loader} />
                  </span>
                )}
              </div>
              {menu && user._id === commentReply.author._id && (
                <CommentDropdown
                  onEditBtnClick={() => setCommentForm(true)}
                  onDelete={() => deleteReplyMutation.mutate()}
                  isCommentReply={true}
                />
              )}
            </div>
            <div className="flex">
              <span className="text-sm text-gray-600 cursor-pointer hover:underline ml-3 mt-2">
                Like
              </span>
              <span className="text-sm text-gray-600 ml-3 mt-2">
                <Moment fromNow>{commentReply.date}</Moment>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentReply;
