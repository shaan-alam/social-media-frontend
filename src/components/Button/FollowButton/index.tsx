import { useState } from "react";
import Button from "../index";
import { useProfile } from "../../../hooks/profile";
import { useUser, useFollowUser, useUnfollowUser } from "../../../hooks/user";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { useLocalStorage } from "../../../hooks/localStorage";

interface Props {
  userId: string;
  currentUserId: string
}

const FollowButtonComponent = ({ userId, currentUserId }: Props) => {
  const user = useLocalStorage();

  const profileUser = useProfile(userId);
  const currentUser = useProfile(user?._id);

  const [isFollowingUser, setFollowingUser] = useState<boolean | null>(null);

  useEffect(() => {
    setFollowingUser(
      currentUser?.data?.following?.find(
        (user) => user._id === profileUser?.data?._id
      )
        ? true
        : false
    );
  }, []);

  const followMutation = useFollowUser(profileUser?.data?._id as string, () =>
    setFollowingUser(true)
  );

  const unfollowMutation = useUnfollowUser(
    profileUser?.data?._id as string,
    () => setFollowingUser(false)
  );

  const generateFollowButtonText = () => {
    if (
      !isFollowingUser &&
      profileUser?.data?.following?.find(
        (usr) => usr._id === currentUser?.data?._id
      )
    ) {
      return "Follow Back";
    } else if (isFollowingUser) {
      return "Unfollow";
    } else if (!isFollowingUser) {
      return "Follow";
    }
  };

  const onClick = () => {
    setFollowingUser(!isFollowingUser);
    if (isFollowingUser) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  return !profileUser.isLoading ? (
    <Button
      variant={isFollowingUser ? "secondary" : "primary"}
      className="p-2 my-3"
      // isLoading={followMutation.isLoading || unfollowMutation.isLoading}
      onClick={onClick}
    >
      {generateFollowButtonText()}
    </Button>
  ) : (
    <Skeleton count={1} height={40} width={200} className="mt-4" />
  );
};

export default FollowButtonComponent;
