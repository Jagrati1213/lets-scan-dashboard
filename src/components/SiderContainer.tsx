import { Menu, MenuProps, message } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Style from "../styles/_SiderContainer.module.scss";
import { apiClient } from "../global";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";

export const SiderContainer = () => {
  // COLLAPSE MENU SIDEBAR
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  // HANDLE FOR LOG OUT
  const handleLogout = async () => {
    const response = await apiClient.get("logout");
    const { statusText, success } = await response.data;
    if (success) {
      message.success(statusText);
      dispatch(removeUser());
    } else message.error(statusText);
  };

  // SIDE MENU LIST
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
      label: "Log Out",
      key: "logout",
      icon: <RiLogoutCircleFill />,
      onClick: handleLogout,
    },
  ];

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
