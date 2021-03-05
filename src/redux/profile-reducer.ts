import { ThunkAction } from "redux-thunk";
import { profileAPI, usersAPI } from "../API/API";
import { ProfileType, PostsType } from "../types/types";
import { AppStateType } from "./redux-store";

const SET_USERS_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";

export type InitialStateType = {
  posts: Array<PostsType>;
  profile: Array<ProfileType> | null;
  status: string;
  newPostText?: string;
};

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 12 },
    { id: 3, message: "Of course i still love you", likesCount: 12 },
    { id: 4, message: "We are programmers", likesCount: 12 },
  ],
  profile: null,
  status: "",
};

const profileReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: " ",
      };
    }
    case SET_USERS_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }
    default:
      return state;
  }
};

type ActionsType =
  | SetUserProfileType
  | SetStatusType
  | AddPostType
  | DeletePostType;

type SetUserProfileType = {
  type: typeof SET_USERS_PROFILE;
  profile: Array<ProfileType>;
};

export const setUserProfile = (
  profile: Array<ProfileType>
): SetUserProfileType => ({
  type: SET_USERS_PROFILE,
  profile,
});

type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setStatus = (status: string): SetStatusType => ({
  type: SET_STATUS,
  status,
});

type AddPostType = {
  type: typeof ADD_POST;
  newPostText: string;
};

export const addPost = (newPostText: string): AddPostType => ({
  type: ADD_POST,
  newPostText,
});

type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const deletePost = (postId: number): DeletePostType => ({
  type: DELETE_POST,
  postId,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUserProfile = (userId: number): ThunkType => async (
  dispatch
) => {
  let response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number): ThunkType => async (
  dispatch: any
) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string): ThunkType => async (
  dispatch: any
) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
