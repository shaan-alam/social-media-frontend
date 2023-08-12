import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Posts from "../../components/Posts";

import { clearError } from "../../actions/error";

// Interfaces and Types
import NewPost from "../../components/NewPost";
import ProfileSuggestion from "../../components/ProfileSuggestion";
import { usePosts } from "../../hooks/posts";

const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="container sm:w-3/4 mx-auto flex">
        /
        <div className="wall lg:mr-2 w-full">
          <NewPost />
          <div className="posts my-4 rounded-lg">
            <Posts />
          </div>
        </div>
        <ProfileSuggestion />
      </div>
    </div>
  );
};

export default Feed;
