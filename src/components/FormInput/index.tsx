import { useState } from "react";
import { EyeIcon } from "@heroicons/react/solid";
import { EyeOffIcon } from "@heroicons/react/solid";
import { FormInputProps } from "./types";

const FormInput = ({
  type,
  className,
  placeholder,
  id,
  name,
  formik,
  as,
  disabled,
  cols,
  rows,
}: FormInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  if (as === "password") {
    return (
      <>
        {formik.touched[name] && formik.errors[name] && (
          <div className="text-red-500 font-semibold text-center py-2">
            {formik.errors[name]}
          </div>
        )}
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id={id}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            {...formik.getFieldProps(name)}
          />
          {isPasswordVisible ? (
            <EyeOffIcon
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="h-10 w-10 text-blue-600 absolute right-1 top-1 hover:bg-blue-100 rounded-full cursor-pointer p-2"
            />
          ) : (
            <EyeIcon
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="h-10 w-10 text-blue-600 absolute right-1 top-1 hover:bg-blue-100 rounded-full cursor-pointer p-2"
            />
          )}
        </div>
      </>
    );
  } else if (as === "textarea") {
    return (
      <>
        {formik.touched[name] && formik.errors[name] && (
          <div className="text-red-500 font-semibold text-center py-2">
            {formik.errors[name]}
          </div>
        )}
        <textarea
          name={name}
          cols={cols}
          rows={rows}
          id={id}
          className={className}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
        ></textarea>
      </>
    );
  }

  return (
    <div className="mr-2">
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-500 font-semibold text-center py-2">
          {formik.errors[name]}
        </div>
      )}
      <input
        type={type}
        id={id}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        {...formik.getFieldProps(name)}
      />
    </div>
  );
};

export default FormInput;
