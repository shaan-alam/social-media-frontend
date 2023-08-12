import Modal from "../index";
import { useFormik } from "formik";
import FormInput from "../../FormInput";
import Button from "../../Button";
import * as api from "../../../api";
import { useMutation, useQueryClient } from "react-query";
import { PostEditModalProps } from "./types";
import "../../../assets/css/cssgram.css";

const PostEditModal = ({ isOpen, setOpen, post }: PostEditModalProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost: { caption: string }) => api.editPost(post?._id, newPost),
    {
      onSuccess: () => {
        queryClient.refetchQueries("posts");
        queryClient.refetchQueries("profile-post");
        formik.setSubmitting(false);
        setOpen(false);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      caption: post?.caption,
    },
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate({ caption: values.caption });
    },
  });

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} modalTitle="Edit Post">
      <div className="p-12">
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            as="textarea"
            formik={formik}
            id="caption"
            name="caption"
            placeholder="Caption..."
            className="p-2 focus:ring-2 focus:ring-fb rounded-lg w-full my-4 border-2 border-gray-200"
          />
          {post?.imageURL && (
            <div className="h-48 overflow-y-auto w-full">
              <img
                src={post?.imageURL}
                alt="Preview File"
                className={`w-full rounded-lg object-cover self-center ${post?.filter}`}
              />
            </div>
          )}
          <div className="flex justify-between my-4">
            <Button
              text="Discard"
              variant="secondary"
              type="button"
              className="p-2 font-semibold text-gray-600 mr-4"
              onClick={() => setOpen(false)}
            />
            <Button
              isLoading={formik.isSubmitting}
              text="Save Changes"
              variant="primary"
              type="submit"
              className="p-2 font-semibold text-white"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PostEditModal;
