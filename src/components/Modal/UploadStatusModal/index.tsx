import Modal from "../index";
import { useUser } from "../../../hooks/user";
import { useMutation } from "react-query";
import FormInput from "../../FormInput";
import { useFormik } from "formik";
import * as api from "../../../api";
import Button from "../../Button";
import Avatar from "../../Avatar";
import { UploadStatusModalProps } from "./types";
import { useQueryClient } from "react-query";

const UploadStatusModal = ({ isOpen, setOpen }: UploadStatusModalProps) => {
  const user = useUser();
  const queryClient = useQueryClient();

  const postStatus = async (status: {
    filter: string;
    caption: string;
    image: string;
  }) => {
    try {
      const { data } = await api.createPost(status);

      // Clear form values
      formik.resetForm();

      setOpen(false);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, isError, error, isSuccess, mutate } = useMutation(
    postStatus,
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("posts");
        queryClient.refetchQueries(["profile-post", user._id]);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      status: "",
    },
    onSubmit: (values: { status: string }) => {
      // Make a POST request to the backend for creating a new status
      mutate({ caption: values.status, image: "", filter: "" });
    },
  });

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} modalTitle="Create Post">
      <div className="p-12">
        <div className="flex items-center">
          <Avatar src={user?.avatar} className="h-8 w-8 rounded-full" />
          <h4 className="ml-3 font-semibold text-fb">{user?.fullName}</h4>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            as="textarea"
            name="status"
            id="status"
            formik={formik}
            className="p-4 border-2 my-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder={`What's on your mind?, ${user?.fullName}`}
          ></FormInput>
          <Button
            variant="primary"
            isLoading={formik.isSubmitting}
            text="Post"
            disabled={
              isLoading || formik.values.status === "" || !formik.values.status
                ? true
                : false
            }
            className="w-full rounded-md py-2 cursor-pointer"
          />
        </form>
      </div>
    </Modal>
  );
};

export default UploadStatusModal;
