export const useLocalStorage = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  return profile.user;
};
