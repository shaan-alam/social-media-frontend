import { PostDeleteModalProps } from "./types";
import Modal from "../../Modal";
import { TrashIcon } from "@heroicons/react/outline";
import Button from "../../Button";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../../../api";
import { toast, Flip, ToastContainer } from "react-toastify";

const PostDeleteModal = ({ isOpen, setOpen, post }: PostDeleteModalProps) => {
  const queryClient = useQueryClient();

  const deletePost = async (_id: string) => {
    try {
      await api.deletePost(_id);

      setOpen(false); // Close the modal
    } catch (err: any) {
      toast.error(err.message, {
        transition: Flip,
      });
    }
  };

  const { isLoading, isError, error, mutate } = useMutation(
    (_id: string) => deletePost(_id),
    {
      onSuccess: () => {
        queryClient.refetchQueries("posts");
        queryClient.refetchQueries("profile-post");
      },
    }
  );

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} modalTitle="Delete Post">
      <div className="p-12">
        {isError && (
          <h2 className="p-2 text-center bg-red-200 text-red-500 rounded-lg mb-4 font-bold">
            {error as string}
          </h2>
        )}
        <h2 className=" text-base sm:text-xl font-bold flex items-center">
          <TrashIcon className="h-10 w-10 text-red-500" /> &nbsp; Do you want to
          delete this Post?
        </h2>
        <p className="leading-7 my-3 sm:my-1 text-gray-600 sm:ml-14 sm:w-3/4">
          If you delete this post, all of its data will be lost. Are you sure
          you want to continue?
        </p>
        <div className="flex mt-8">
          <Button
            type="button"
            text="Cancel"
            variant="secondary"
            className="p-2 font-semibold text-gray-700 mr-2"
            onClick={() => setOpen(false)}
          />
          <Button
            isLoading={isLoading}
            type="button"
            text="Delete"
            variant="primary"
            className="p-2 font-semibold text-white"
            onClick={() => mutate(post?._id)}
          />
        </div>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default PostDeleteModal;
