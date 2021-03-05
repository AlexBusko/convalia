import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import "./style.scss";

let User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div className="user">
      <div className="container">
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              className={styles.userPhoto}
              alt={"userphoto"}
            />
          </NavLink>
        </div>
        <div className="buttons">
          {user.followed ? (
            <Button
              type="ghost"
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              type="primary"
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </Button>
          )}
        </div>
      </div>
      <span>
        <span>
          <div className="name" >{user.name}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
