import { useReducer } from "react";
import { reducer } from "./context/reducer";
import { SET_SIGN_IN } from "./context/reducer";

export function useUserApi(initValue) {
  const [{ signIn }, dispatch] = useReducer(reducer, initValue);

  const setSignIn = (value) => {
    dispatch({
      type: SET_SIGN_IN,
      payload: value,
    });
  };

  return {
    signIn,
    setSignIn,
  };
}
