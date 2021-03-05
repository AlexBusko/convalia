import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { Button, Layout } from "antd";
import Bitcoin from "./NavBtcPrice";

const { Header } = Layout;

const Head = ({ isAuth, logout, login }) => {
  return (
    <Header className="header">
      <span className="logo">convalia</span>
      <div className="header-container">
        <Bitcoin />
        <span className="loginBlock">
          {isAuth ? (
            <div>
              {login}
              <Button className="logout-btn" onClick={logout}>
                Log out
              </Button>
            </div>
          ) : (
            <Button type="ghost" className="login-btn">
              <NavLink to={"/login"}>Login</NavLink>
            </Button>
          )}
        </span>
      </div>
    </Header>
  );
};

export default Head;
