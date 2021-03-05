import { usersAPI } from "../API/API";
import { updateObjectInArray } from "../utils/object-helpers";
import { UserType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";
import { Dispatch } from "react";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const FOLLOWING_IN_PROGRESS = "FOLLOWING_IN_PROGRESS";

type InitialStateType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>; // array of user id
};

let initialState: InitialStateType = {
  users: [],
  pageSize: 12,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};

const usersReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

type ActionsType =
  | FollowSuccessType
  | UnfollowSuccessType
  | SetUsersType
  | SetCurrentPageType
  | SetUsersTotalCountType
  | ToggleIsFetchingType
  | ToggleFollowingProgressType;

type FollowSuccessType = {
  type: typeof FOLLOW;
  userId: number;
};

export const followSuccess = (userId: number): FollowSuccessType => ({
  type: FOLLOW,
  userId,
});

type UnfollowSuccessType = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};

export const setUsers = (users: Array<UserType>): SetUsersType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetUsersTotalCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};

export const setUsersTotalCount = (
  totalUsersCount: number
): SetUsersTotalCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingProgressType = {
  type: typeof FOLLOWING_IN_PROGRESS;
  isFetching: boolean;
  userId: number;
};

export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressType => ({
  type: FOLLOWING_IN_PROGRESS,
  isFetching,
  userId,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUsersProfiles = (
  currentPage: number,
  pageSize: number
): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
  };
};

const followUnfollowFlow = async (
  dispatch: Dispatch<ActionsType>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType
) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(userId),
      followSuccess
    );
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(userId),
      unfollowSuccess
    );
  };
};

export default usersReducer;
