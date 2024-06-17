import { Menu, MenuProps, message } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Style from "../styles/_SiderContainer.module.scss";
import { Axios } from "../global";
import { logoutAction } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/store";
// import { RiQrCodeFill } from "react-icons/ri";

export const SiderContainer = () => {
  // COLLAPSE MENU SIDEBAR
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // HANDLE FOR LOG OUT
  const handleLogout = async () => {
    const response = await Axios.get("api/v1/user/logout");
    const { statusText, success } = await response.data;
    if (success) {
      navigate("/");
      message.success(statusText);
      dispatch(logoutAction());
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
      label: <Link to="/menu">Menu List</Link>,
      key: "menu",
      icon: <MdRestaurantMenu />,
    },
    // {
    //   label: <Link to="/qr-generator">QR Generator</Link>,
    //   key: "qrgenerator",
    //   icon: <RiQrCodeFill />,
    // },
    {
      label: <Link to="/orders">Orders</Link>,
      key: "orders",
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
