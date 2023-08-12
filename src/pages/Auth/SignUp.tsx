import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput";
import GoogleAuth from "../../components/GoogleAuth";
import Button from "../../components/Button";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [signUpError, setSignUpError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const mutation = useMutation((formData: FormData) => signUp(formData), {
    onSuccess: (profile) => {
      localStorage.setItem("profile", JSON.stringify(profile));
      dispatch({ type: AUTH, payload: profile });
      history.push("/");
    },
    onError: (err: any) => {
      setSignUpError(err.response.data.message);
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      fullName: yup.string().trim().required("Full name is required!"),
      email: yup
        .string()
        .email("You must provide a valid email!")
        .required("Email is required!"),
      password: yup.string().min(6, "Password must be 6 characters or more!"),
      confirmPassword: yup
        .string()
        .min(6, "Password must be 6 characters or more!")
        .oneOf([yup.ref("password")], "The two passwords should match"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await mutation.mutateAsync(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    // Redirect to home if the user is already logged in
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");

    if (profile.token || profile.tokenId) {
      history.push("/");
    }
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-50">
      <div className="p-6 rounded-lg flex sm:flex-row flex-col sm:w-full md:w-3/4">
        <div className="hero mb-6 block sm:mr-6 sm:w-full">
          <h1 className="text-fb text-4xl text-center sm:text-left sm:text-7xl font-extrabold">
            facebook
          </h1>
          <p className="text-lg text-center sm:text-left sm:text-xl my-3">
            Facebook helps you connect and share with people.
          </p>
        </div>
        <div className="login w-full sm:w-3/4 bg-white p-4 sm:p-10 rounded-lg shadow-md">
          {signUpError && (
            <div className="text-red-500 font-semibold text-center my-4">
              {signUpError}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              as="normal"
              type="text"
              className="mr-3 focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              id="fullName"
              name="fullName"
              formik={formik}
              placeholder="Full Name"
            />
            <FormInput
              as="normal"
              type="text"
              className="mr-3 focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              id="email"
              name="email"
              formik={formik}
              placeholder="Email"
            />
            <FormInput
              as="password"
              type="password"
              className="mr-3 focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              id="password"
              name="password"
              formik={formik}
              placeholder="Password"
            />
            <FormInput
              as="password"
              type="password"
              className="mr-3 focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              id="confirmPassword"
              name="confirmPassword"
              formik={formik}
              placeholder="Repeat Password"
            />
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              text="Sign up"
              variant="primary"
              className="py-2 px-4"
            />
            <div className="text-center mt-3">
              <Link to="/auth/signin" className="text-fb">
                Already have an account? Login
              </Link>
            </div>
            <div className="h-1 w-full my-4 bg-gray-200"></div>
            {/* <GoogleAuth /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
