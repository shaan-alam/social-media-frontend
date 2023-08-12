import Post from "../Post";
import { PostType } from "../Post/types";
import { ExclamationIcon } from "@heroicons/react/solid";
import SkeletonPost from "../Skeletons/SkeletonPost";
import { UseQueryResult } from "react-query";
import { usePosts } from "../../hooks/posts";

const Posts = () => {
  const posts = usePosts();

  return (
    <>
      {posts?.isLoading && !posts?.data && (
        <div className="">
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </div>
      )}
      {posts?.isError && (
        <div className="flex  items-center bg-red-100 border-2 border-red-200 rounded-lg p-3 font-semibold text-red-600">
          <ExclamationIcon className="h-8 w-8" />
          {/* &nbsp; {posts.error} */}
        </div>
      )}
      {posts &&
        !posts?.isLoading &&
        posts?.isSuccess &&
        posts?.data?.map((post: PostType) => (
          <Post post={post} key={post?._id} />
        ))}
    </>
  );
};

export default Posts;
