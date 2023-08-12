import { AxiosResponse } from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { retrieveFollowing } from "../api/following";

interface Following {
  _id: string;
  fullName: string;
  avatar: string;
  details: {
    bio: string;
  };
}

type Response = AxiosResponse<{
  following: Following[];
  followingCount: number;
}>;

export const useRetrieveFollowing = (userId: string) => {
  const [offset, setOffset] = useState(20);

  // To determine whether to show the load more button on the following page or not!
  const [showMoreButton, setShowMoreButton] = useState(true);

  const fetchFollowing = async () => {
    try {
      const result: Response = await retrieveFollowing(userId, offset);

      if (result.data.followingCount === result.data.following.length) {
        setShowMoreButton(false);
      }

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    following: useQuery(["retrieveFollowing", userId], fetchFollowing, {
      onSuccess: () => {
        setOffset((offset) => offset + 20);
      },
    }),
    showMoreButton,
  };
};
