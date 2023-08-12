import Modal from "../index";
import { useFormik } from "formik";
import { useUser, useEditUserDetails } from "../../../hooks/user";
import { HiTrash } from "react-icons/hi";
import Button from "../../Button";
import { FaTimesCircle, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import * as yup from "yup";
import { v4 } from "uuid";

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditUserDetailsModal = ({ isOpen, setOpen }: Props) => {
  const user = useUser();

  const mutation = useEditUserDetails();

  const formik = useFormik({
    initialValues: {
      newWork: "",
      newEducation: "",
      ...user.details,
    },
    validationSchema: yup.object({
      details: yup.object({
        bio: yup.string().trim(),
        lives_in_city: yup.string().trim(),
        from_city: yup.string().trim(),
        works: yup.array(),
        education: yup.array(),
      }),
      newWork: yup.string().trim(),
      newEducation: yup.string().trim(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const { bio, education, works, lives_in_city, from_city } = values;
      await mutation.mutateAsync({
        bio,
        education,
        works,
        lives_in_city,
        from_city,
      });

      setSubmitting(false);
      setOpen(false);
    },
  });

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} modalTitle="Edit Details">
      <div className="p-4 sm:p-12 overflow-y-auto h-96">
        <form>
          <div className="lives_in p-2 mb-1">
            <label className="mb-1 inline-block font-semibold text-xl">
              Live in
            </label>
            <input
              type="text"
              className="p-2 mt-1 rounded-md border w-full focus:ring-2 focus:ring-fb"
              placeholder="Live in"
              id="lives_in_city"
              {...formik.getFieldProps("lives_in_city")}
            />
          </div>
          <div className="bio p-2 mb-1">
            <label className="mb-1 inline-block font-semibold text-xl">
              Home Town
            </label>
            <input
              type="text"
              className="p-2 mt-1 rounded-md border w-full focus:ring-2 focus:ring-fb"
              placeholder="Home Town"
              id="from_city"
              {...formik.getFieldProps("from_city")}
            />
          </div>
          <div className="bio p-2 mb-1">
            <label className="mb-1 inline-block font-semibold text-xl">
              Bio
            </label>
            <input
              type="text"
              className="p-2 mt-1 rounded-md border w-full focus:ring-2 focus:ring-fb"
              placeholder="Add Bio"
              id="bio"
              {...formik.getFieldProps("bio")}
            />
          </div>
          <div className="works p-2 mb-1">
            <label className="mb-1 inline-block font-semibold text-xl">
              Works
            </label>
            <div className="flex justify-between items-center border rounded-md mt-1">
              <input
                type="text"
                className="p-2 w-full rounded-md focus:ring-2 focus:ring-fb mr-1"
                placeholder="Add Works"
                id="newWork"
                {...formik.getFieldProps("newWork")}
              />
              <span
                className="cursor-pointer text-fb p-2 rounded-full hover:bg-gray-300 ml-2"
                onClick={() => {
                  formik.setFieldValue(
                    "works",
                    formik.values.works.concat(formik.values.newWork)
                  );
                  formik.setFieldValue("newWork", "");
                }}
              >
                <FaPlusCircle />
              </span>
            </div>
            {formik.values.works.map((work) => (
              <div
                className="work my-2 p-2 bg-gray-100 rounded-md font-semibold flex justify-between"
                key={v4()}
              >
                {work}
                <span
                  className="cursor-pointer text-fb p-2 rounded-full hover:bg-gray-300"
                  onClick={() => {
                    formik.setFieldValue(
                      "works",
                      formik.values.works.filter((wrk) => wrk !== work)
                    );
                  }}
                >
                  <HiTrash />
                </span>
              </div>
            ))}
          </div>
          <div className="works p-2 mb-1">
            <label className="mb-1 inline-block font-semibold text-xl">
              Education
            </label>
            <div className="flex justify-between items-center border rounded-md mt-2">
              <input
                type="text"
                className="p-2 w-full rounded-md focus:ring-2 focus:ring-fb mr-1"
                placeholder="Add Education"
                id="newEducation"
                {...formik.getFieldProps("newEducation")}
              />
              <span
                className="cursor-pointer text-fb p-2 rounded-full hover:bg-gray-300 ml-2"
                onClick={() =>
                  formik.setFieldValue(
                    "education",
                    formik.values.education.concat(formik.values.newEducation)
                  )
                }
              >
                <FaPlusCircle />
              </span>
            </div>
            {formik.values.education.map((education) => (
              <div
                className="work my-2 p-2 bg-gray-100 rounded-md font-semibold flex justify-between"
                key={v4()}
              >
                {education}&nbsp;
                <span
                  className="cursor-pointer text-fb p-2 rounded-full hover:bg-gray-300"
                  onClick={() =>
                    formik.setFieldValue(
                      "education",
                      formik.values.education.filter((edu) => edu !== education)
                    )
                  }
                >
                  <HiTrash />
                </span>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="flex border-t flex-end p-4">
        <Button
          variant="secondary"
          className="font-semibold p-2"
          onClick={() => setOpen(false)}
        >
          <FaTimesCircle />
          &nbsp;Discard
        </Button>
        <Button
          variant="primary"
          className="font-semibold p-2 ml-2"
          onClick={() => formik.handleSubmit()}
          isLoading={formik.isSubmitting}
        >
          <FaCheckCircle />
          &nbsp;Save
        </Button>
      </div>
    </Modal>
  );
};

export default EditUserDetailsModal;
