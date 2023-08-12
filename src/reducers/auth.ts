import {
  AUTH,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAILURE,
  LOGOUT,
  SET_USER,
} from "../constants";

interface Action {
  type: string;
  payload: {
    user: {
      _id: string;
      fullName: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      avatar: string;
      cover_picture: string;
      details: {
        lives_in_city: string;
        from_city: string;
        bio: string;
        works: string[];
        education: string[];
      };
    };
    token: string;
  };
}

interface InitialStateInterface {
  authData: {
    token: string;
    user: {
      _id: string;
      fullName: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      avatar: string;
      cover_picture: string;
      details: {
        lives_in_city: string;
        from_city: string;
        bio: string;
        works: string[];
        education: string[];
      };
    };
  };
}

const initialState: InitialStateInterface = {
  authData: {
    token: "",
    user: {
      _id: "",
      fullName: "",
      email: "",
      createdAt: "",
      updatedAt: "",
      avatar: "",
      cover_picture: "",
      details: {
        bio: "",
        from_city: "",
        lives_in_city: "",
        works: [],
        education: [],
      },
    },
  },
};

const auth = (state = initialState, action: Action) => {
  switch (action.type) {
    case AUTH:
    case GOOGLE_AUTH_SUCCESS:
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        authData: {
          ...action.payload,
        },
      };

    case SET_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          user: action.payload.user,
        },
      };

    case LOGOUT:
    case GOOGLE_AUTH_FAILURE:
      localStorage.clear();
      return {
        ...state,
        authData: {
          token: "",
          user: {
            _id: "",
            fullName: "",
            email: "",
            createdAt: "",
            updatedAt: "",
            avatar: "",
            cover_picture: "",
            details: {
              bio: "",
              from_city: "",
              lives_in_city: "",
              works: [],
              education: [],
            },
          },
        },
      };

    default:
      return state;
  }
};

export default auth;
