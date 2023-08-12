import { Redirect, Route, RouteProps } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...props }: any) {
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  if (profile.token || profile.tokenId) {
    return <Route path="/" {...props} />;
  } else {
    return <Redirect to={{ pathname: "/auth/signin" }} />;
  }
}
