import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useMutation, useQueryClient } from "react-query";
import { followUser, unfollowUser, updateProfileDetails } from "../api";
import { SET_USER } from "../constants";

interface ProfileDetails {
  lives_in_city: string;
  from_city: string;
  works: string[];
  bio: string;
  education: string[];
}

/**
 * @description A custom hook to return the current user from the redux store
 */
export const useUser = () => {
  const user = useSelector((state: RootState) => state.auth.authData.user);

  return user;
};

/**
 * @description A custom hook to follow a user
 * @param userId The ID of the user who is to be followed
 */
export const useFollowUser = (userId: string, callback: Function) => {
  const user = useUser();
  const queryClient = useQueryClient();

  return useMutation(() => followUser(userId), {
    onSuccess: () => {
      // callback();
      queryClient.refetchQueries(["profile", userId]);
      queryClient.refetchQueries(["profile", user._id]);
    },
  });
};

/**
 * @description A custom hook to unfollow a user
 * @param userId The ID of the user who is to be unfollowed
 */
export const useUnfollowUser = (userId: string, callback: Function) => {
  const user = useUser();
  const queryClient = useQueryClient();

  return useMutation(() => unfollowUser(userId), {
    onSuccess: () => {
      // callback();
      queryClient.refetchQueries(["profile", userId]);
      queryClient.refetchQueries(["profile", user._id]);
    },
  });
};

export const useEditUserDetails = () => {
  const queryClient = useQueryClient();
  const user = useUser();
  const dispatch = useDispatch();

  const mutation = useMutation(
    (details: ProfileDetails) => updateProfileDetails(details),
    {
      onSuccess: (values) => {
        queryClient.refetchQueries(["profile", user._id]);

        const profile = JSON.parse(localStorage.getItem("profile") || "{}");
        profile.user = values.data;

        localStorage.setItem("profile", JSON.stringify(profile));

        dispatch({ type: SET_USER, payload: { user: values.data } });
      },
    }
  );

  return mutation;
};
