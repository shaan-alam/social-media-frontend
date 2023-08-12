import { AxiosResponse } from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { retrieveFollowers } from "../api/followers";

interface Follower {
  _id: string;
  fullName: string;
  avatar: string;
  details: {
    bio: string;
  };
}

type Response = AxiosResponse<{
  followers: Follower[];
  followerCount: number;
}>;

export const useRetrieveFollowers = (userId: string) => {
  const [offset, setOffset] = useState(20);

  // To determine whether to show the load more button on the followers page or not!
  const [showMoreButton, setShowMoreButton] = useState(true);

  const fetchFollowers = async () => {
    try {
      const result: Response = await retrieveFollowers(userId, offset);

      if (result.data.followerCount === result.data.followers.length) {
        setShowMoreButton(false);
      }

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    followers: useQuery(["retrieveFollowers", userId], fetchFollowers, {
      onSuccess: () => {
        setOffset((offset) => offset + 20);
      },
    }),
    showMoreButton,
  };
};
