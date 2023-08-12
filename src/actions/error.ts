import { CLEAR_ERROR } from "../constants";

/**
 * @description An action creator for clearing the errors from the redux store
 */
export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
