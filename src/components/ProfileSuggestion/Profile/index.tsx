const Profile = () => {
  return (
    <div className="person my-4">
      <div className="my-3 flex items-center">
        <img
          src="https://avatars.githubusercontent.com/u/48273777?v=4"
          alt="Shaan Alam"
          className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
        />
        <p className="hidden sm:block">Shaan Alam</p>
      </div>
      <button className="bg-fb hover:bg-blue-600 text-white px-3 py-2 rounded-lg outline-none">
        Add Friend
      </button>
      <button className="bg-gray-200 ml-3 hover:bg-gray-300 text-black px-3 py-2 rounded-lg outline-none">
        Remove
      </button>
    </div>
  );
};

export default Profile;
