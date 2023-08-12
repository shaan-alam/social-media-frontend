import { useProfilePost, useProfile } from "../../../hooks/profile";
import { useParams } from "react-router-dom";
import { useUser } from "../../../hooks/user";
import Skeleton from "react-loading-skeleton";
import PhotoThumbnail from "../../../components/PhotoThumbnail";
import SkeletonImage from "../../../components/Skeletons/SkeletonImage";

const SkeletonImages = () => {
  return (
    <>
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
    </>
  );
};

const PhotosPage = () => {
  const { id }: { id: string } = useParams();
  const user = useUser();

  const profileUser = useProfile(id);
  const { photos } = useProfilePost(id);

  return (
    <div className="bg-gray-100 p-4">
      <div className="container">
        <div className="bg-white p-16 rounded-md shadow-md">
          {photos?.length === 0 ? (
            <div className="bg-white rounded-md drop-shadow-md text-center">
              {user._id === id
                ? "You do not have any photos!"
                : `${profileUser?.data?.fullName} does not have any photos!`}
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold">
                {!profileUser?.data?._id ? (
                  <Skeleton count={1} width={300} />
                ) : user._id === profileUser?.data?._id ? (
                  "Your Photos"
                ) : (
                  `${profileUser?.data?.fullName}'s Photos`
                )}
              </h1>
            </>
          )}
          <div className="my-10 photos grid grid-cols-3 gap-8">
            {!photos && <SkeletonImages />}
            {photos &&
              photos?.map((photo) => (
                <PhotoThumbnail photo={photo} key={photo?._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosPage;
