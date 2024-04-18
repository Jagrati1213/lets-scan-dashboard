import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import Style from "../styles/SiderContainer.module.scss";
import { IoHome } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { RiLogoutCircleFill } from "react-icons/ri";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem("Dashboard", "1", <IoHome />),
  getItem("Menus", "2", <MdRestaurantMenu />),
  getItem("Order List", "3", <FaBoxOpen />),
  getItem("Logout", "4", <RiLogoutCircleFill />),
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
      <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
    </Sider>
  );
};
