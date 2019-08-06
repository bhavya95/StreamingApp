import { AUTH } from "../actions";

interface initialState {
  isSignedIn: null | boolean;
  userId: null | string;
}

const INITIAL_STATE: initialState = {
  isSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action: AUTH): initialState => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSignedIn: true, userId: action.payload };

    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: null };

    default:
      return state;
  }
};
