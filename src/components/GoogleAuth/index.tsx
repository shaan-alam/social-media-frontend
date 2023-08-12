import GoogleLogin from "react-google-login";
import * as api from "../../api";
import { useDispatch } from "react-redux";
import { AUTH, GOOGLE_AUTH_SUCCESS } from "../../constants";
import { useHistory } from "react-router-dom";
import google from "../../assets/svg/google.svg";
import Button from "../Button";
import { googleAuthentication } from "../../api";
import { useMutation } from "react-query";

interface GoogleAuthObject {
  email: string;
  avatar: string;
  fullName: string;
}

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authMutation = useMutation(
    (googleAuthObject: GoogleAuthObject) =>
      googleAuthentication(googleAuthObject),
    {
      onSuccess: (result) => {
        dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: result.data });
        history.push("/");
      },
    }
  );

  const onGoogleSuccess = (res: any) => {
    const googleData = {
      email: res?.profileObj?.email,
      fullName: res?.profileObj?.name,
      avatar: res?.profileObj.imageUrl,
    };

    authMutation.mutate(googleData);
  };

  const onGoogleFailure = (err: any) => {
    console.log(err);
  };

  return (
    <div className="text-center">
      <GoogleLogin
        render={(props) => (
          <Button
            isLoading={authMutation.isLoading}
            variant="default"
            className="w-full md:w-3/4/ mx-auto py-4 px-8 bg-white shadow-md rounded-md font-medium flex items-center justify-evenly"
            onClick={props.onClick}
          >
            <img src={google} alt="Google" className="mr-4" />
            Login with Google
          </Button>
        )}
        buttonText="Sign in with Google"
        clientId={`${process.env.REACT_APP_CLIENT_ID}`}
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
      />
    </div>
  );
};

export default GoogleAuth;
