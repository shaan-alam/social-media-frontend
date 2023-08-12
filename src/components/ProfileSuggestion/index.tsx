import Profile from "./Profile";

const ProfileSuggestion = () => {
  return (
    <div className="hidden lg:block static top-0 lg:w-1/2">
      <div className="sticky top-4 right-persons bg-white p-4 my-3 shadow-sm rounded-lg">
        <h4 className="text-fb font-semibold">People you may know!</h4>
        <Profile />
        <Profile />
        <Profile />
      </div>
    </div>
  );
};

export default ProfileSuggestion;
