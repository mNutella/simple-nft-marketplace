export const SET_SIGN_IN = "setSignIn";

export function reducer(state, { type, payload }) {
  switch (type) {
    case SET_SIGN_IN: {
      return { ...state, signIn: payload };
    }
    default:
      throw new Error("Undefined type");
  }
}
