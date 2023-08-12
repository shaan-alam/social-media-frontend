export interface FormInputProps {
  id: string;
  name: string;
  formik: any;
  as: "normal" | "password" | "textarea";
  cols?: number;
  rows?: number;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
