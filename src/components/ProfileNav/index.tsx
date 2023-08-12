import { Props } from "./types";
import { NavLink } from "react-router-dom";

const ProfileNav = ({ profile }: Props) => {
  return (
    <div className="nav-menu w-full container">
      <ul className="flex">
        <NavLink
          to={`/profile/${profile?.data?._id}/posts`}
          activeClassName="text-fb border-b-4 border-fb"
          className="font-semibold text-gray-600 text-lg mr-6 p-4 cursor-pointer hover:bg-gray-200"
        >
          Posts
        </NavLink>
        <NavLink
          to={`/profile/${profile?.data?._id}/followers`}
          activeClassName="text-fb border-b-4 border-fb"
          className="text-gray-600 font-semibold text-lg mr-6 p-4 cursor-pointer hover:bg-gray-200"
        >
          Followers&nbsp;
          <span className="font-normal text-sm">
            {profile?.data?.followers?.length}
          </span>
        </NavLink>
        <NavLink
          to={`/profile/${profile?.data?._id}/following`}
          activeClassName="text-fb border-b-4 border-fb"
          className="text-gray-600 font-semibold text-lg mr-6 p-4 cursor-pointer hover:bg-gray-200"
        >
          Followings&nbsp;
          <span className="font-normal text-sm">
            {profile?.data?.following?.length}
          </span>
        </NavLink>
        <NavLink
          to={`/profile/${profile?.data?._id}/photos`}
          activeClassName="text-fb border-b-4 border-fb"
          className="text-gray-600 font-semibold text-lg mr-6 p-4 cursor-pointer hover:bg-gray-200"
        >
          Photos
        </NavLink>
      </ul>
    </div>
  );
};

export default ProfileNav;
