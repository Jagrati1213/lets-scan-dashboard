import { Avatar, Button, Flex } from "antd";
import { MenuProps, message } from "antd";
import { IoHome } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Axios } from "../global";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import Style from "../styles/_SiderContainer.module.scss";

export const MobileNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // HANDLE FOR LOG OUT
  const handleLogout = async () => {
    const response = await Axios.get("logout");
    const { statusText, success } = await response.data;
    if (success) {
      message.success(statusText);
      dispatch(removeUser());
    } else message.error(statusText);
  };

  const handleChangePage = async (name: string) => {
    navigate(`${name}`);
  };

  return (
    <Flex align="center" justify="space-between" className={Style.mobile_nav}>
      <div>
        <Button
          icon={<IoHome />}
          type="link"
          onClick={handleChangePage.bind(null, "/")}
        />
      </div>
      <div>
        <Button
          icon={<MdRestaurantMenu />}
          type="link"
          onClick={handleChangePage.bind(null, "/menu")}
        />
      </div>
      <div>
        <Button
          icon={<FaBoxOpen />}
          type="link"
          onClick={handleChangePage.bind(null, "/orders")}
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
