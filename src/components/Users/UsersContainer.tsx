import React from "react";

import { connect } from "react-redux";
import { follow, unfollow, getUsersProfiles } from "../../redux/users-reducer";

import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/user-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  totalUsersCount: number;
  isFetching: boolean;
  users: Array<UserType>;
  followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  getUsersProfiles: (currentPage: number, pageSize: number) => void;
};

type OwnPropsType = {
  pageTitle: string;
};

type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsersProfiles(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.getUsersProfiles(pageNumber, pageSize);
  };

  render() {
    const {
      pageSize,
      totalUsersCount,
      isFetching,
      currentPage,
      users,
      follow,
      unfollow,
      followingInProgress,
    } = this.props;

    const { onPageChanged } = this;

    return (
      <div>
        {isFetching ? <Preloader /> : <Users
          totalUsersCount={totalUsersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          users={users}
          onPageChanged={onPageChanged}
          follow={follow}
          unfollow={unfollow}
          followingInProgress={followingInProgress}
        />}
   
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      follow,
      getUsersProfiles,
      unfollow,
    }
  )
)(UsersContainer);
