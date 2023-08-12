import { CommentEditFormInterface } from "./types";
import Button from "../../Button";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import {
  editComment,
  editCommentReply,
} from "../../../api";

const CommentEditForm = ({
  isReply,
  setCommentForm,
  initialComment,
  commentId,
  commentReplyId,
}: CommentEditFormInterface) => {
  const queryClient = useQueryClient();

  const editCommentMutation = useMutation(
    (newComment: { id: string; message: string }) =>
      editComment(newComment.id, newComment.message),
    {
      onSuccess: () => {
        queryClient.refetchQueries("comments");
        formik.setSubmitting(false);
        setCommentForm(false);
      },
    }
  );

  const editCommentReplyMutation = useMutation(
    (newComment: { commentReplyId: string; message: string }) =>
      editCommentReply(newComment),
    {
      onSuccess: () => {
        queryClient.refetchQueries("comment-replies");
        setCommentForm(false);
        formik.setSubmitting(false);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      comment: initialComment,
    },
    onSubmit: async (values) => {
      console.log(values);

      try {
        if (isReply && commentReplyId) {
          return await editCommentReplyMutation.mutateAsync({
            commentReplyId,
            message: values.comment,
          });
        }

        if (commentId) {
          await editCommentMutation.mutateAsync({
            id: commentId,
            message: values.comment,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="edit-comment w-full flex items-center">
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="w-full rounded-full mt-3 bg-gray-100 flex justify-between">
          <input
            type="text"
            className="w-full p-2 rounded-full outline-none bg-gray-100"
            placeholder="Comment..."
            {...formik.getFieldProps("comment")}
          />
          <Button
            type="submit"
            text="POST"
            variant="default"
            isLoading={formik.isSubmitting}
            className="py-2 px-3 rounded-full flex-shrink text-fb font-semibold hover:bg-gray-200"
          />
        </div>
        <a
          href="#!"
          onClick={() => setCommentForm(false)}
          className="text-fb underline block mt-2 text-sm"
        >
          Cancel
        </a>
      </form>
    </div>
  );
};

export default CommentEditForm;
