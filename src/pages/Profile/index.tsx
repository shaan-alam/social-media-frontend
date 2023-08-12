import { useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useProfile } from "../../hooks/profile";
import { useUser } from "../../hooks/user";
import FollowButton from "../../components/Button/FollowButton";
import { GoDeviceCamera } from "react-icons/go";
import "./index.css";
import "../../components/Modal/EditProfilePictureModal";
import EditProfilePictureModal from "../../components/Modal/EditProfilePictureModal";
import EditCoverModal from "../../components/Modal/EditCoverModal";
import { AnimatePresence } from "framer-motion";
import EditUserDetailsModal from "../../components/Modal/EditUserDetailsModal";
import ProfileNav from "../../components/ProfileNav";
import ProfilePosts from "./PostsPage";
import { Switch, Route } from "react-router-dom";
import FollowersPage from "./FollowersPage";
import FollowingPage from "./FollowingPage";
import PhotosPage from "./PhotosPage";

const Profile = () => {
  const user = useUser();
  const [profilePictureModal, setProfilePictureModal] = useState(false);
  const [coverPictureModal, setCoverPictureModal] = useState(false);
  const [editUserDetailsModal, setEditUserDetailsModal] = useState(false);
  const { id }: { id: string } = useParams();

  const profile = useProfile(id);
  const currentUser = useProfile(user._id);

  return (
    <>
      <div className="flex flex-col items-center h-1/2 shadow-md">
        <div className="header relative mx-auto w-full lg:w-3/4 h-96 justify-center items-end">
          <div className="cover-pic-container relative h-96">
            <img
              src={profile.data?.cover_picture}
              className="w-full h-96 object-cover rounded-b-md"
            />
            {user._id === id && (
              <span
                className="cover-pic-edit-btn absolute top-4 right-4 p-4 rounded-full bg-white cursor-pointer shadow-lg"
                onClick={() => setCoverPictureModal(true)}
              >
                <GoDeviceCamera className="h-5 w-5 text-gray-800" />
              </span>
            )}
          </div>
          {profile.isLoading ? (
            <Skeleton
              circle
              width={200}
              height={200}
              className="absolute -bottom-3 left-1/2 right-1/2 transform -translate-x-1/2"
            />
          ) : (
            <div className="profile-pic-container w-36 h-36 border-4 border-white rounded-full absolute -bottom-3 left-1/2 right-1/2 transform -translate-x-1/2">
              <img
                src={profile.data?.avatar}
                alt="Profile Picture"
                className="rounded-full"
              />
              <span
                className="profile-pic-edit-btn absolute bottom-4 -right-3 p-4 rounded-full bg-white cursor-pointer shadow-lg"
                onClick={() => setProfilePictureModal(true)}
              >
                <GoDeviceCamera className="h-5 w-5 text-gray-800" />
              </span>
            </div>
          )}
        </div>
        <div className="text-center">
          <h1 className="font-bold text-2xl mt-4 justify-between">
            {profile.isLoading ? (
              <Skeleton count={1} height={30} width={100} />
            ) : (
              profile.data?.fullName
            )}
          </h1>
          {user._id !== id && (
            <FollowButton
              userId={id}
              currentUserId={currentUser?.data?._id as string}
            />
          )}
          {user._id === id && !user.details.bio && (
            <span
              className="text-fb font-bold mt-4 inline-block cursor-pointer"
              onClick={() => setEditUserDetailsModal(true)}
            >
              Add Bio
            </span>
          )}
          {!profile.isLoading && (
            <p className="text-gray-600 mt-6 font-bold">
              {profile?.data?.details.bio}
            </p>
          )}
        </div>
        <div
          className="bg-gray-200 w-full mt-4"
          style={{ height: "2px" }}
        ></div>
        <ProfileNav profile={profile} />
      </div>
      <Switch>
        <Route path="/profile/:id/posts">
          <ProfilePosts />
        </Route>
        <Route path="/profile/:id/followers">
          <FollowersPage
            userProfile={{
              _id: profile.data?._id,
              fullName: profile.data?.fullName,
            }}
          />
        </Route>
        <Route path="/profile/:id/following">
          <FollowingPage
            userProfile={{
              _id: profile.data?._id,
              fullName: profile.data?.fullName,
            }}
          />
        </Route>
        <Route path="/profile/:id/photos">
          <PhotosPage />
        </Route>
      </Switch>
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

export default Profile;
