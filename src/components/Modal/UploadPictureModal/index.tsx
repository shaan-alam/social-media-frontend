import React, { useState } from "react";
import Modal from "../index";
import { PhotographIcon } from "@heroicons/react/solid";
import { filters } from "../../../utils/filters";
import FilterCard from "../../FilterCard";
import { useFormik } from "formik";
import { useUser } from "../../../hooks/user";
import * as api from "../../../api";
import Button from "../../Button";
import Avatar from "../../Avatar";
import "../../../assets/css/cssgram.css";
import { UploadPictureModalProps } from "./types";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { Filter, NewPost } from "./types";
import Image from "../../Image";
import { useDragAndDrop } from "../../../hooks/dragAndDrop";
import FormInput from "../../FormInput";
import "./index.css";

const UploadPictureModal = ({ isOpen, setOpen }: UploadPictureModalProps) => {
  const user = useUser();
  const {
    dragOver,
    setDragOver,
    fileDropError,
    setFileDropError,
    onDragOver,
    onDragLeave,
  } = useDragAndDrop();

  const queryClient = useQueryClient();

  const [image, setImage] = useState<string>();
  const [formStep, setFormStep] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(filters[0]);

  const { mutate, isError, error, isLoading } = useMutation(
    (newPost: NewPost) => api.createPost(newPost),
    {
      onSuccess: () => {
        formik.resetForm();
        setOpen(false);
        queryClient.refetchQueries("posts");
        queryClient.refetchQueries(["profile-post", user._id]);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      caption: "",
    },
    onSubmit: async (values) => {
      const newPost = {
        filter: selectedFilter.name,
        image: image as string,
        caption: values.caption,
      };

      await mutate(newPost);
    },
  });

  const fileSelect = (e: any) => {
    e.preventDefault();

    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (files[0].type.split("/")[0] !== "image") {
      return setFileDropError("Please provide an image file to upload!");
    }

    setFileDropError("");

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setImage(reader.result as string);
    };

    setFormStep((formStep) => formStep + 1);
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} modalTitle="Create Post">
      {/* To Select the image file */}
      <div className="p-12">
        {fileDropError && (
          <span className="text-xs text-red-500 font-semibold text-center">
            {fileDropError}
          </span>
        )}
        {formStep == 0 && (
          <>
            <label
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={(e) => {
                e.preventDefault();
                e.isPropagationStopped();

                setDragOver(false);
                fileSelect(e);
              }}
              htmlFor="file"
              className={`h-48 my-7 w-full border-dashed border-4 rounded-md flex justify-center items-center cursor-pointer hover:border-gray-500 text-gray-400 hover:text-gray-500 ${
                dragOver ? "border-fb" : "border-gray-300"
              }`}
            >
              {dragOver ? (
                <p className="text-xl font-semibold text-fb">Drop here...</p>
              ) : (
                <>
                  <PhotographIcon className="h-10 w-10" />
                  &nbsp;
                  <p className="font-semibold">Drag & Drop or select a file.</p>
                </>
              )}
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              name="file"
              accept="image/*"
              onChange={fileSelect}
            />
          </>
        )}

        {/* To apply filter to the cropped image */}
        {formStep === 1 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-4 text-center w-full">Preview: </h4>
            <Image
              skeletonHeight={400}
              src={image}
              style={{ filter: selectedFilter.name }}
              className={`w-full ${selectedFilter.name}`}
            />
            <div className="w-full filters overflow-x-auto mt-2">
              <ul className="flex mt-4 py-4">
                {filters.map((filter: any) => (
                  <FilterCard
                    src={image as string}
                    filter={filter}
                    key={filter.name}
                    setSelectedFilter={setSelectedFilter}
                    selected={selectedFilter.name === filter.name}
                  />
                ))}
              </ul>
            </div>
            <div className="flex mt-4">
              <Button
                text="Back"
                variant="secondary"
                className="p-2 w-full"
                onClick={() => setFormStep((formStep) => formStep - 1)}
              />
              <Button
                text="Next"
                variant="primary"
                className="p-2 ml-2 "
                onClick={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  setFormStep((formStep) => formStep + 1);
                }}
              />
            </div>
          </div>
        )}
        {/* To type the caption and submit the form... */}

        {formStep === 2 && image && (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col md:justify-evenly p-4 items-start">
              {isError && (
                <div className="p-2 bg-red-200 text-red-500 font-bold text-center rounded-lg w-full mb-4">
                  {error as string}
                </div>
              )}
              <div className="mb-4 w-full">
                <Avatar
                  src={user?.avatar}
                  className="rounded-full h-7 w-7 mb-2 mr-1"
                  name={user?.fullName}
                  withName
                />
                <FormInput
                  as="textarea"
                  id="caption"
                  placeholder="Caption"
                  formik={formik}
                  name="caption"
                  cols={25}
                  className="p-4 border-2 my-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div className="h-48 overflow-y-auto w-full">
                <img
                  src={image as string}
                  alt="Preview File"
                  className={`w-full rounded-lg object-cover self-center ${selectedFilter.name}`}
                />
              </div>
            </div>
            <div className="flex mt-4">
              <Button
                variant="secondary"
                text="Back"
                className="p-2"
                onClick={() => setFormStep((formStep) => formStep - 1)}
              />
              <Button
                text="Post"
                isLoading={isLoading}
                variant="primary"
                disabled={formik.isSubmitting}
                className="ml-2"
                type="submit"
              />
            </div>
          </form>
        )}
      </div>
      <div className="flex"></div>
    </Modal>
  );
};

export default UploadPictureModal;
