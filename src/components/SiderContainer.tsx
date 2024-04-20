import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Style from "../styles/_SiderContainer.module.scss";

const items: MenuProps["items"] = [
  {
    label: <Link to="/">Dashboard</Link>,
    key: "home",
    icon: <IoHome />,
  },
  {
    label: <Link to="/menu">Menu</Link>,
    key: "menu",
    icon: <MdRestaurantMenu />,
  },
  {
    label: <Link to="/orders">Order List</Link>,
    key: "order",
    icon: <FaBoxOpen />,
  },
  {
    label: <Link to="/logout">Log Out</Link>,
    key: "logout",
    icon: <RiLogoutCircleFill />,
  },
];

export const SiderContainer = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      className={Style.siderbar}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu defaultSelectedKeys={["home"]} mode="inline" items={items} />
    </Sider>
  );
};
