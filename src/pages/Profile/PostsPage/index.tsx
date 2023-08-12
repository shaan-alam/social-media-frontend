import { useState } from "react";
import PhotosCard from "../../../components/PhotosCard";
import IntroCard from "../../../components/IntroCard";
import NewPost from "../../../components/NewPost";
import Posts from "../../../components/Posts";
import { useParams } from "react-router-dom";
import { useProfile, useProfilePost } from "../../../hooks/profile";
import { useUser } from "../../../hooks/user";
import EditProfilePictureModal from "../../../components/Modal/EditProfilePictureModal";
import EditCoverModal from "../../../components/Modal/EditCoverModal";
import { AnimatePresence } from "framer-motion";
import EditUserDetailsModal from "../../../components/Modal/EditUserDetailsModal";

const ProfilePosts = () => {
  const user = useUser();
  const [profilePictureModal, setProfilePictureModal] = useState(false);
  const [coverPictureModal, setCoverPictureModal] = useState(false);
  const [editUserDetailsModal, setEditUserDetailsModal] = useState(false);
  const { id }: { id: string } = useParams();
  const profile = useProfile(id);
  const { posts, photos } = useProfilePost(id);

  return (
    <>
      <div className="bg-gray-100 pt-5">
        <div className="flex justify-around container">
          <div className="sidebar hidden md:flex flex-col w-1/3 mr-4 static top-4">
            <IntroCard
              details={profile.data?.details}
              createdAt={profile.data?.createdAt}
              followers={profile.data?.followers?.length}
              following={profile.data?.following?.length}
            />
            {photos && <PhotosCard photos={photos} />}
          </div>
          <main className="main w-full md:w-3/4 mr-4">
            {user._id === id && <NewPost />}
            {posts?.data?.length === 0 && (
              <div className="w-full text-center bg-white p-6 font-semibold rounded-lg shadow-md">
                <p>You haven't posted anything till now!!</p>
              </div>
            )}
            <Posts />
          </main>
        </div>
      </div>
      <AnimatePresence>
        {profilePictureModal && (
          <EditProfilePictureModal
            isOpen={profilePictureModal}
            setOpen={setProfilePictureModal}
          />
        )}
        {coverPictureModal && (
          <EditCoverModal
            isOpen={coverPictureModal}
            setOpen={setCoverPictureModal}
          />
        )}
        {editUserDetailsModal && (
          <EditUserDetailsModal
            isOpen={editUserDetailsModal}
            setOpen={setEditUserDetailsModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfilePosts;
