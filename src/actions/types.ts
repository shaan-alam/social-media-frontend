import { SignInFormDataType } from "../pages/Auth/types";
import { Dispatch } from "redux";

export interface AuthResponse {
  user: {
    email: string;
    password: string;
    name: string;
  };
  token: string;
}

export type SignInType = (formData: {
  email: string;
  password: string;
}) => Promise<void>;

export type SignUpType = (formData: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => Promise<void>;

export type GoogleAuthenticationType = (
  token: string,
  redirect: () => void
) => (dispatch: Dispatch<any>) => Promise<void>;
