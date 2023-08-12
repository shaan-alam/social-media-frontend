import { changeUserProfilePicture } from "../../../api";
import { useMutation } from "react-query";

export const useProfilePicture = () => {
  return useMutation((image: string) => changeUserProfilePicture(image));
};
