import { Button, Flex } from "antd";
import { message } from "antd";
import { IoHome } from "react-icons/io5";
import { RiLogoutCircleFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaCartArrowDown, FaClipboardList } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Axios } from "../global";
import { logoutAction } from "../store/slices/vendorSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import Style from "../styles/_SiderContainer.module.scss";

export const MobileNav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("/");

  // HANDLE FOR LOG OUT
  const handleLogout = async () => {
    const response = await Axios.get("api/v1/vendor/logout");
    const { statusText, success } = await response.data;
    if (success) {
      navigate("/");
      message.success({ content: statusText, duration: 1 });
      dispatch(logoutAction());
    } else message.error({ content: statusText, duration: 1 });
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
          icon={<FaClipboardList />}
          type="link"
          onClick={handleChangePage.bind(null, "/menu")}
          className={active.slice(1) === "menu" ? Style.active_btn : ""}
        />
      </div>
      <div>
        <Button
          icon={<FaCartArrowDown />}
          type="link"
          onClick={handleChangePage.bind(null, "/orders?type=pending")}
          className={active.slice(1) === "orders" ? Style.active_btn : ""}
        />
      </div>
      <div>
        <Button
          icon={<RiMoneyRupeeCircleFill />}
          type="link"
          onClick={handleChangePage.bind(null, "/transitions")}
          className={active.slice(1) === "transitions" ? Style.active_btn : ""}
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
