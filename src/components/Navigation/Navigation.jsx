import React, { useState } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  TagsFilled,
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

const Navigation = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Menu theme="light" defaultSelectedKeys={["4"]} mode="inline">
        <Menu.Item icon={<MessageOutlined className="menu-icon" />} key="1">
          <NavLink to="/content">Про нас</NavLink>
        </Menu.Item>
        <Menu.Item icon={<UserOutlined className="menu-icon" />} key="2">
          <NavLink to="/profile">Профіль</NavLink>
        </Menu.Item>
        <Menu.Item icon={<TeamOutlined className="menu-icon" />} key="3">
          <NavLink to="/users">Користувачі</NavLink>
        </Menu.Item>
        <Menu.Item icon={<TagsFilled className="menu-icon" />} key="4">
          <NavLink to="/prices">Ціни</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Navigation;
