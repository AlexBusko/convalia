import { AppStateType } from "./redux-store";
import { authAPI, ResultCodeEnums } from "../API/API";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";

const SET_USER_DATA = "convalia/auth/SET_USER_DATA";

export type InitialStateType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

type ActionsType = SetAuthUserDataType;

type SetAuthUserDataPayloadType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataPayloadType;
};

export const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataType => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  
  let meData = await authAPI.me();

  if (meData.resultCode === ResultCodeEnums.Success) {
    let { id, email, login } = meData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean
) => async (dispatch: any) => {
  let loginData = await authAPI.login(email, password, rememberMe);
  if (loginData.resultCode === ResultCodeEnums.Success) {
    dispatch(getAuthUserData());
  } else {
    let message =
      loginData.messages.length > 0
        ? loginData.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodeEnums.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
