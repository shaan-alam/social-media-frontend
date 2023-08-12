import Skeleton from "react-loading-skeleton";
import User from "../../../assets/svg/user.svg";
import { useUser } from "../../../hooks/user";
import Button from "../../Button";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { useCreateCommentReply } from "../../../hooks/commentReply";

interface CommentReplyInterface {
  _id: string;
  message: string;
  author: {
    _id: string;
    avatar: string;
    fullName: string;
  };
  date: string;
}

const Form = ({
  commentId,
  setCommentReplies,
}: {
  commentId: string;
  setCommentReplies: React.Dispatch<
    React.SetStateAction<CommentReplyInterface[]>
  >;
}) => {
  const author = useUser();

  const mutation = useCreateCommentReply((result) => {
    setCommentReplies((replies) => [...replies, result.data.reply]);
  });

  const formik = useFormik({
    initialValues: {
      reply: "",
    },
    validationSchema: yup.object({
      reply: yup.string().required().trim(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);

      try {
        await mutation.mutateAsync({
          message: values.reply,
          author: author._id,
          commentId,
        });
        setSubmitting(false);
        formik.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <form className="flex items-center ml-10" onSubmit={formik.handleSubmit}>
      {!true && (
        <Skeleton style={{ borderRadius: "100%" }} height={30} width={30} />
      )}
      <img
        src={author?.avatar ? author.avatar : User}
        alt={author?.fullName}
        className="h-7 w-7 rounded-full mr-4"
      />
      <div className="w-full rounded-full mt-3 bg-gray-100 flex justify-between">
        <input
          type="text"
          className="w-full p-2 rounded-full outline-none bg-gray-100"
          id="reply"
          placeholder="Comment..."
          {...formik.getFieldProps("reply")}
        />
        <Button
          type="submit"
          text="Reply"
          isLoading={formik.isSubmitting}
          variant="default"
          className="text-sm py-2 px-3 rounded-full flex-shrink text-fb hover:bg-gray-200"
        />
      </div>
    </form>
  );
};

export default Form;
