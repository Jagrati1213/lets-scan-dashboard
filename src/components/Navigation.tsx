import { Avatar, Flex, Tooltip } from "antd";
import { useAppSelector } from "../store/store";
import Style from "../styles/_Navigation.module.scss";
import { useEffect, useState } from "react";

export const Navigation = () => {
  const { user } = useAppSelector((store) => store.authSlice);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={Style.nav}>
      <Flex align="center" justify="space-between">
        <h1>OrderMinder</h1>
        {user.username && (
          <Flex align="center" justify="space-between" gap={"10px"}>
            <p>{user.username}</p>
            {windowWidth >= 575 ? (
              <Avatar className={Style.user_avatar}>
                {user.username.slice(0, 1).toUpperCase()}
              </Avatar>
            ) : (
              <Tooltip title={user?.username}>
                <Avatar className={Style.user_avatar}>
                  {user.username.slice(0, 1).toUpperCase()}
                </Avatar>
              </Tooltip>
            )}
          </Flex>
        )}
      </Flex>
    </div>
  );
};
