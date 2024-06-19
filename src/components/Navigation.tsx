import { Avatar, Flex, Image, Tooltip } from "antd";
import { useAppSelector } from "../store/store";
import Style from "../styles/_Navigation.module.scss";
import { useEffect, useState } from "react";

export const Navigation = () => {
  const { vender } = useAppSelector((store) => store.authSlice);
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
        <h1>LET'S SCAN</h1>
        <Image />
        {vender && vender?.username && (
          <Flex align="center" justify="space-between" gap={"10px"}>
            <p>{vender?.username}</p>
            {windowWidth >= 575 ? (
              <Avatar className={Style.user_avatar}>
                {vender?.username.slice(0, 1).toUpperCase()}
              </Avatar>
            ) : (
              <Tooltip title={vender?.username}>
                <Avatar className={Style.user_avatar}>
                  {vender?.username.slice(0, 1).toUpperCase()}
                </Avatar>
              </Tooltip>
            )}
          </Flex>
        )}
      </Flex>
    </div>
  );
};
