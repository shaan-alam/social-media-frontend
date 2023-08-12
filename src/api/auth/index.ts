import { getAPIInstance } from "../index";
import { GoogleAuthentication, SignUpDataType } from "../types";

const API = getAPIInstance();

/**
 * @description Function making an API call to sign in the user
 * @param {[String]} email Stores the email of the user trying to signin
 * @param {[String]} password Stores the password of the user trying to signin
 */
export const signIn = (email: string, password: string) =>
  API.post("/auth/signin", { email, password });

/**
 * @description Function making an API call to sign in the user
 * @param {[SignUpDataType]} signUpData An object containing firstName, lastName, email, password, confimPassword to be sent to the backend.
 */
export const signUp = (signUpData: SignUpDataType) =>
  API.post("/auth/signup", { ...signUpData });

/**
 * @description Function to make a backend request for Google Authentication
 * @param formData An object containing details required for Google Authentication
 */
export const googleAuthentication = (googleAuthObject: { email: string, avatar: string, fullName: string}) =>
  API.post("/auth/googleAuth", {
    ...googleAuthObject 
  });
