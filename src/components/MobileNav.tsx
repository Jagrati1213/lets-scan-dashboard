import { Avatar, Button, Flex } from "antd";
import { MenuProps, message } from "antd";
import { IoHome } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Axios } from "../global";
import { useDispatch } from "react-redux";
import { logoutAction } from "../store/slices/venderSlice";
import Style from "../styles/_SiderContainer.module.scss";
import { useEffect, useState } from "react";

export const MobileNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("/");

  // HANDLE FOR LOG OUT
  const handleLogout = async () => {
    const response = await Axios.get("logout");
    const { statusText, success } = await response.data;
    if (success) {
      message.success(statusText);
      dispatch(logoutAction());
    } else message.error(statusText);
  };

  const handleChangePage = async (name: string) => {
    navigate(`${name}`);
  };
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname, active]);

  return (
    <Flex align="center" justify="space-between" className={Style.mobile_nav}>
      <div>
        <Button
          icon={<IoHome />}
          type="link"
          onClick={handleChangePage.bind(null, "/")}
          className={active === "/" ? Style.active_btn : ""}
        />
      </div>
      <div>
        <Button
          icon={<MdRestaurantMenu />}
          type="link"
          onClick={handleChangePage.bind(null, "/menu")}
          className={active.slice(1) === "menu" ? Style.active_btn : ""}
        />
      </div>
      <div>
        <Button
          icon={<FaBoxOpen />}
          type="link"
          onClick={handleChangePage.bind(null, "/orders")}
          className={active.slice(1) === "orders" ? Style.active_btn : ""}
        />
      </div>
      <div>
        <Button
          icon={<RiLogoutCircleFill />}
          type="link"
          onClick={handleLogout}
        />
      </div>
    </Flex>
  );
};
