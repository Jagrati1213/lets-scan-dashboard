import { Menu, MenuProps, message } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { RiLogoutCircleFill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Style from "../styles/_SiderContainer.module.scss";
import { Axios } from "../global";
import { logoutAction } from "../store/slices/vendorSlice";
import { useAppDispatch } from "../store/store";

export const SiderContainer = () => {
  // COLLAPSE MENU SIDEBAR
  const [collapsed, setCollapsed] = useState(false);
  const [disable, setDisable] = useState(false);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // HANDLE FOR LOG OUT
  const handleLogout = async () => {
    setDisable(true);
    const response = await Axios.get("api/v1/vendor/logout");
    const { statusText, success } = await response.data;
    if (success) {
      navigate("/");
      message.success({ content: statusText, duration: 1 });
      dispatch(logoutAction());
    } else message.error({ content: statusText, duration: 1 });
    setDisable(false);
  };

  // SIDE MENU LIST
  const items: MenuProps["items"] = [
    {
      label: <Link to="/">Dashboard</Link>,
      key: "home",
      icon: <IoHome />,
    },
    {
      label: <Link to="/menu">Menu List</Link>,
      key: "menu",
      icon: <FaClipboardList />,
    },
    {
      label: <Link to="/orders?type=pending">Orders</Link>,
      key: "orders",
      icon: <FaCartArrowDown />,
    },
    {
      label: <Link to="/transitions">Transitions</Link>,
      key: "transitions",
      icon: <RiMoneyRupeeCircleFill />,
    },
    {
      label: "Log Out",
      key: "logout",
      icon: <RiLogoutCircleFill />,
      onClick: handleLogout,
      disabled: disable,
    },
  ];

  return (
    <Sider
      className={Style.siderbar}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        defaultSelectedKeys={[
          location.pathname === "/" ? "home" : location.pathname.slice(1),
        ]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};
