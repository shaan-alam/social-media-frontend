import { useQuery } from "react-query";
import { getPosts } from "../api";
import { AxiosResponse } from "axios";
import { PostType } from "../components/Post/types";

/**
 * @description A custom hook to fetch posts from the backend
 */
export const usePosts = () => {
  const fetchPosts = async () => {
    const result: AxiosResponse<PostType[]> = await getPosts();

    return result.data;
  };

  return useQuery("posts", fetchPosts, { refetchOnWindowFocus: true });
};
