import { ERROR, CLEAR_ERROR } from "../constants";

interface InitialStateInterface {
  ON: string;
  message: string;
}

const initialState: InitialStateInterface = {
  ON: "",
  message: "",
};

type Action = {
  type: string;
  payload: {
    on: string;
    message: string;
  };
};

const error = (state = initialState, action: Action) => {
  switch (action.type) {
    case ERROR:
      return { ...state, ...action.payload };

    case CLEAR_ERROR:
      return { ...state, ON: "", message: "" };

    default:
      return state;
  }
};

export default error;
