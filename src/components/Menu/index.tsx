import { Avatar, Button, Flex, List } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import MenuViewDrawer from "./MenuViewDrawer";
import AddMenuDrawer from "./AddMenuDrawer";
import { MenuListType, DrawerOptionsType } from "../../types";
import Style from "../../styles/_Menu.module.scss";
import EditMenuDrawer from "./EditMenuDrawer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchMenuListAction } from "../../store/slices/menuListSlice";

export default function Menu() {
  // State
  const [DrawerOptionsType, setDrawerOptions] = useState<DrawerOptionsType>({
    isAddMenuOpen: false,
    isMenuViewOpen: false,
    isMenuEditorOpen: false,
  });

  // Action
  const { menulist } = useAppSelector((store) => store.menuListSlice);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  // const [menuDetails, setMenuDetails] = useState<MenuListType>(menuList[0]);

  // methods
  const showDrawer = (option: string) => {
    setDrawerOptions((prev) => ({ ...prev, [option]: true }));
  };

  // Fetch Menulist
  useEffect(() => {
    dispatch(fetchMenuListAction()).finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className={Style.menu_container}>
      <Flex gap="40px" vertical>
        <Flex justify={"space-between"} align="center">
          <Title level={5}>Menu List </Title>
          <Button
            type="primary"
            shape="round"
            onClick={showDrawer.bind(null, "isAddMenuOpen")}
          >
            Add Menu
          </Button>
        </Flex>

        <List
          dataSource={menulist}
          bordered
          loading={loading}
          renderItem={(item, index) => (
            <List.Item
              key={item?._id}
              actions={[
                <p>&#8377; {item?.price}</p>,
                <Button
                  type="link"
                  onClick={() => {
                    // setMenuDetails(menuList[index]);
                    showDrawer("isMenuViewOpen");
                  }}
                >
                  View
                </Button>,
                <Button
                  type="link"
                  onClick={() => {
                    // setMenuDetails(menuList[index]);
                    showDrawer("isMenuEditorOpen");
                  }}
                >
                  Edit
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar shape="square" size="large" src={item?.image} />
                }
                title={<a href="https://ant.design/index-cn">{item?.name}</a>}
                description={`${item?.description?.slice(0, 60)}...`}
              />
            </List.Item>
          )}
        />

        {/* <MenuViewDrawer
          open={DrawerOptionsType.isMenuViewOpen}
          setOpen={setDrawerOptions}
          menuData={menuDetails}
        /> */}
        <AddMenuDrawer
          open={DrawerOptionsType.isAddMenuOpen}
          setOpen={setDrawerOptions}
        />
        {/* 
        <EditMenuDrawer
          open={DrawerOptionsType.isMenuEditorOpen}
          setOpen={setDrawerOptions}
          menuData={menuDetails}
        /> */}
      </Flex>
    </div>
  );
}
