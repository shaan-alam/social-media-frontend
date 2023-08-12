import { useState } from "react";
import { FacebookCounter } from "@charkour/react-reactions";
import { AnimatePresence } from "framer-motion";
import { useUser } from "../../../hooks/user";
import PostStatsModal from "../PostStatsModal";
import Counter from "thousands-counter";
import { PostStatsProps } from "./types";

const PostStats = ({ counters, comments }: PostStatsProps) => {
  const [postStatsModal, setPostStatsModal] = useState(false);
  const user = useUser();

  return (
    <div className="flex items-center justify-between">
      <FacebookCounter
        onClick={() => setPostStatsModal(true)}
        counters={counters?.map((res) => ({
          emoji: res.emoji,
          by: res.by.fullName,
        }))}
        user={user?.fullName}
        important={
          counters?.length > 2
            ? counters
                ?.filter((counter) => counter.by.userID !== user?._id)
                ?.map((counter) => counter.by.fullName)
                ?.slice(3)
            : []
        }
      />
      <p className="text-gray-500 text-sm">
        {comments == 1 ? "1 Comment" : `${Counter(comments)} comments`}
      </p>
      <AnimatePresence>
        {postStatsModal && (
          <PostStatsModal
            isOpen={postStatsModal}
            setOpen={setPostStatsModal}
            counters={counters}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostStats;
