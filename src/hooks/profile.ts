import { useMutation, useQuery, useQueryClient } from "react-query";
import { changeUserProfilePicture, getProfile, getProfilePost } from "../api";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { PostType } from "../components/Post/types";
import { useUser } from "./user";
import { useDispatch } from "react-redux";
import { SET_USER } from "../constants";
import { changeCoverPicture } from "../api/profile";

type Response = AxiosResponse<{
  _id: string;
  fullName: string;
  avatar: string;
  cover_picture: string;
  createdAt: string;
  details: {
    lives_in_city: string;
    from_city: string;
    bio: string;
    works: string[];
    education: string[];
  };
  followers: Array<{ _id: string; fullName: string; avatar: string }>;
  following: Array<{ _id: string; fullName: string; avatar: string }>;
}>;

/**
 * @description A custom hook to fetch the profile of the user specified
 * @param userId The ID of the user whose profile is to be fetched
 */
export const useProfile = (userId: string) => {
  const fetchProfile = async ({ queryKey }: any) => {
    const [_key, userId] = queryKey;

    try {
      const result: Response = await getProfile(userId);

      return result.data;
    } catch (err) {
      console.error("Error", err);
      // console.log("here is the error");
    }
  };

  console.log("use", userId);

  return useQuery(["profile", userId], fetchProfile);
};

/**
 * @description A custom hook to fetch the posts of a particular user
 * @param userId The ID of the user whose posts are required
 */
export const useProfilePost = (userId: string) => {
  const [photos, setPhotos] = useState<PostType[]>();

  const fetchProfilePosts = async (userId: string) => {
    try {
      const result: AxiosResponse<PostType[]> = await getProfilePost(userId);

      setPhotos(result.data.filter((post) => post.imageURL !== ""));

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    posts: useQuery(["profile-post", userId], () => fetchProfilePosts(userId)),
    photos,
  };
};

export const useUpdateProfilePicture = (
  image: string | undefined,
  callback?: Function
) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const dispatch = useDispatch();

  return useMutation((image: string) => changeUserProfilePicture(image), {
    onSuccess: (result) => {
      queryClient.refetchQueries(["profile", user?._id]);
      queryClient.refetchQueries(["profile-post", user._id]);
      queryClient.refetchQueries(["posts"]);
      queryClient.refetchQueries(["comments"]);
      queryClient.refetchQueries(["comment-replies"]);

      queryClient.invalidateQueries(["profile", user?._id]);
      queryClient.invalidateQueries(["profile-post", user._id]);
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["comments"]);
      queryClient.invalidateQueries(["comment-replies"]);

      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      profile.user = result.data.updatedUser;

      localStorage.setItem("profile", JSON.stringify(profile));

      dispatch({
        type: SET_USER,
        payload: { user: result.data.updatedUser },
      });

      if (callback !== undefined) {
        callback();
      }
    },
  });
};

export const useUpdateCoverPicture = (
  image: string | undefined,
  callback?: Function
) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const dispatch = useDispatch();

  return useMutation((image: string) => changeCoverPicture(image), {
    onSuccess: (result) => {
      queryClient.refetchQueries(["profile", user?._id]);

      queryClient.invalidateQueries(["profile", user?._id]);

      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      profile.user = result.data.updatedUser;

      localStorage.setItem("profile", JSON.stringify(profile));

      dispatch({
        type: SET_USER,
        payload: { user: result.data.updatedUser },
      });

      if (callback !== undefined) {
        callback();
      }
    },
  });
};
