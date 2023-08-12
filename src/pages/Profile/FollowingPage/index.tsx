import { useParams } from "react-router";
import Button from "../../../components/Button";
import FollowButton from "../../../components/Button/FollowButton";
import { useRetrieveFollowing } from "../../../hooks/following";
import Skeleton from "react-loading-skeleton";
import { useUser } from "../../../hooks/user";
import SkeletonFollower from "../../../components/Skeletons/SkeletonFollower";
import { Link } from "react-router-dom";
import loader from "../../../assets/svg/loader-dark.svg";

interface Props {
  following: {
    _id: string;
    fullName: string;
    avatar: string;
    details: { bio: string };
  };
}

const Following = ({ following }: Props) => {
  const currentUser = useUser();

  return (
    <div className="following-container sm:flex items-center my-10">
      <div className="following flex w-full sm:items-center sm:w-3/4">
        <div className="avatar h-14 w-14 sm:h-24 sm:w-24 mr-4">
          <img src={following?.avatar} alt="Avatar" className="rounded-full" />
        </div>
        <div className="follower-details w-full mb-4">
          <Link to={`/profile/${following._id}/posts`}>
            <h2 className="text-lg text-fb sm:text-xl font-semibold">
              {following?.fullName}
            </h2>
          </Link>
          <p className="text-gray-600">{following?.details.bio}</p>
        </div>
      </div>
      {following._id !== currentUser._id && (
        <div className="follow-btn">
          <FollowButton
            userId={following?._id}
            currentUserId={currentUser._id as string}
          />
        </div>
      )}
    </div>
  );
};

interface FollowingPageProps {
  userProfile: {
    _id: string | undefined;
    fullName: string | undefined;
  };
}

const FollowingPage = ({ userProfile }: FollowingPageProps) => {
  const { id }: { id: string } = useParams();
  const user = useUser();

  const { following, showMoreButton } = useRetrieveFollowing(id);

  return (
    <div className="bg-gray-100 p-4">
      <div className="container bg-white rounded-md shadow-md p-10">
        {following?.data?.following?.length === 0 ? (
          <p className="text-center p-4 bg-white shadow-md rounded-md text-xl font-semibold">
            {user._id === userProfile._id
              ? "You do not have any followings"
              : `${userProfile.fullName} does not has any followings`}
          </p>
        ) : (
          <h1 className="text-3xl font-bold">
            {!userProfile._id ? (
              <Skeleton count={1} width={300} />
            ) : user._id === userProfile._id ? (
              "Your Followings"
            ) : (
              `${userProfile.fullName}'s Followings`
            )}
          </h1>
        )}
        <div className="sm:grid grid-cols-2">
          {following.isLoading ? (
            <SkeletonFollower />
          ) : (
            following?.data?.following.map((follower) => (
              <Following following={follower} key={follower._id} />
            ))
          )}
        </div>
        {showMoreButton && (
          <div className="more-btn flex items-center">
            <Button
              text="Load More"
              variant="default"
              className="p-2"
              onClick={() => following.refetch()}
            />
            {(following.isLoading || following.isFetching) && (
              <img src={loader} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowingPage;
