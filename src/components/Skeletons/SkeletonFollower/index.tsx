import Skeleton from "react-loading-skeleton";

const SkeletonUser = () => {
  return (
    <div className="follower-container sm:flex items-center my-10">
      <div className="follower flex w-full sm:items-center sm:w-3/4">
        <div className="avatar h-16 w-16 sm:h-24 sm:w-24 mr-4">
          <Skeleton circle height={100} width={100} />
        </div>
        <div className="follower-details w-full flex flex-col">
          <Skeleton count={1} width={300} height={20} />
          <Skeleton count={1} width={100} height={20} />
        </div>
      </div>
    </div>
  );
};

const SkeletonFollower = () => {
  return (
    <>
      <SkeletonUser />
      <SkeletonUser />
      <SkeletonUser />
      <SkeletonUser />
      <SkeletonUser />
      <SkeletonUser />
    </>
  );
};

export default SkeletonFollower;
