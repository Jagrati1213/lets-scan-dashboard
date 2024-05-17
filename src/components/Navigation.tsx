import { Avatar, Flex } from "antd";
import { useAppSelector } from "../store/store";
import Style from "../styles/_Navigation.module.scss";

export const Navigation = () => {
  const { user } = useAppSelector((store) => store.auth);
  console.log(user.username);
  return (
    <div className={Style.nav}>
      <Flex align="center" justify="space-between">
        <h1>OrderMinder</h1>
        {user.username && (
          <Flex align="center" justify="space-between" gap={"10px"}>
            <p>{user.username}</p>
            <Avatar className={Style.user_avatar}>
              {user.username.slice(0, 1).toUpperCase()}
            </Avatar>
          </Flex>
        )}
      </Flex>
    </div>
  );
};
