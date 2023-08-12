import { useParams } from "react-router";
import Button from "../../../components/Button";
import FollowButton from "../../../components/Button/FollowButton";
import { useRetrieveFollowers } from "../../../hooks/followers";
import { useUser } from "../../../hooks/user";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import SkeletonFollower from "../../../components/Skeletons/SkeletonFollower";
import loader from "../../../assets/svg/loader-dark.svg";

interface Follower {
  _id: string;
  fullName: string;
  avatar: string;
  details: { bio: string };
}

const Follower = ({ follower }: { follower: Follower }) => {
  const currentUser = useUser();

  return (
    <div className="follower-container sm:flex items-center my-10">
      <div className="follower flex w-full sm:items-center sm:w-3/4">
        <div className="avatar h-16 w-16 sm:h-24 sm:w-24 mr-4">
          <img src={follower.avatar} alt="Avatar" className="rounded-full" />
        </div>
        <div className="follower-details w-full">
          <Link to={`/profile/${follower._id}/posts`}>
            <h2 className="text-xl text-fb sm:text-2xl font-semibold">
              {follower.fullName}
            </h2>
          </Link>
          <p className="text-gray-600">{follower.details.bio}</p>
        </div>
      </div>
      {follower._id !== currentUser._id && (
        <div className="follow-btn">
          <FollowButton userId={follower._id} currentUserId={currentUser._id as string} />
        </div>
      )}
    </div>
  );
};

interface FollowerPageProps {
  userProfile: {
    _id: string | undefined;
    fullName: string | undefined;
  };
}

const FollowersPage = ({ userProfile }: FollowerPageProps) => {
  const { id }: { id: string } = useParams();
  const user = useUser();

  const { followers, showMoreButton } = useRetrieveFollowers(id);

  return (
    <div className="bg-gray-100 p-4">
      <div className="container bg-white rounded-md shadow-md p-10">
        {followers?.data?.followers?.length == 0 ? (
          <p className="text-center p-4 bg-white shadow-md rounded-md text-xl font-semibold">
            {user._id === userProfile._id
              ? "You do not have any followers"
              : `${userProfile.fullName} does not has any followers`}
          </p>
        ) : (
          <h1 className="text-3xl font-bold">
            {!userProfile._id ? (
              <Skeleton count={1} width={300} />
            ) : user._id === userProfile._id ? (
              "Your Followers"
            ) : (
              `${userProfile.fullName}'s Followers`
            )}
          </h1>
        )}
        <div className="sm:grid grid-cols-2">
          {followers.isLoading ? (
            <SkeletonFollower />
          ) : (
            followers?.data?.followers.map((follower) => (
              <Follower follower={follower} key={follower._id} />
            ))
          )}
        </div>
        {showMoreButton && (
          <div className="more-btn flex items-center">
            <Button
              text="Load More"
              variant="default"
              className="p-2"
              onClick={() => followers.refetch()}
            />
            {(followers.isLoading || followers.isFetching) && (
              <img src={loader} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowersPage;
