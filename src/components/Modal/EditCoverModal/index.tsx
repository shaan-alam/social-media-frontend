import React, { useState, useRef } from "react";
import { PhotographIcon } from "@heroicons/react/solid";
import { useDragAndDrop } from "../../../hooks/dragAndDrop";
import Modal from "../index";
import Button from "../../Button";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useUpdateCoverPicture } from "../../../hooks/profile";

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCoverModal = ({ isOpen, setOpen }: Props) => {
  const [formStep, setFormStep] = useState(0);
  const cropperRef = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState<string>();

  const mutation = useUpdateCoverPicture(image, () => setOpen(false));

  const {
    dragOver,
    setDragOver,
    fileDropError,
    setFileDropError,
    onDragOver,
    onDragLeave,
  } = useDragAndDrop();

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

  const uploadProfilePicture = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    mutation.mutate(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} modalTitle="Edit Cover picture">
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
        {formStep == 1 && image && (
          <div>
            <Cropper
              src={image}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={16 / 9}
              guides={false}
              viewMode={2}
              ref={cropperRef}
              aspectRatio={16 / 9}
            />
            <div className="flex mt-4">
              <Button
                text="Back"
                variant="secondary"
                className="p-2 w-full"
                onClick={() => setFormStep((formStep) => formStep - 1)}
              />
              <Button
                text="Set as Cover Picture"
                variant="primary"
                className="p-2 ml-2 "
                disabled={mutation.isLoading}
                isLoading={mutation.isLoading}
                onClick={uploadProfilePicture}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditCoverModal;
