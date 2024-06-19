import { Drawer, Flex, Image, Rate, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { MenuItemT, MenuDrawerT } from "../../types";
import Title from "antd/es/typography/Title";
import Style from "../../styles/_MenuViewDrawer.module.scss";
import { useAppSelector } from "../../store/store";

const { Paragraph, Text } = Typography;
export default function MenuViewDrawer({
  open,
  setOpen,
  menuItemId,
}: MenuDrawerT) {
  // STATE
  const { menulist } = useAppSelector((store) => store.menuListSlice);
  const [menuItem, setMenuItem] = useState<MenuItemT>();

  // CLOSE DRAWER
  const onClose = () => {
    setOpen((prev) => ({ ...prev, isMenuViewOpen: false }));
  };

  // RENDER MENU ITEM
  useEffect(() => {
    const menuItem = menulist?.find((item) => item._id === menuItemId);
    setMenuItem(menuItem);
  }, [menuItemId, menulist]);

  return (
    <div className={Style.menu_view_drawer}>
      <Drawer
        title="Menu Details"
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <Flex gap={"15px"} vertical align="center">
          <Image src={menuItem?.image} preview={false} />
          <Flex vertical align="start" style={{ width: "100%" }}>
            <Flex align="center" gap={"10px"}>
              <Title level={5}>{`${menuItem?.name
                ?.charAt(0)
                .toUpperCase()}${menuItem?.name?.slice(1)}`}</Title>
              <Tag
                color={menuItem?.isVeg ? "green" : "red"}
                className={Style.is_veg_tag}
                style={{
                  borderColor: `${menuItem?.isVeg ? "#0f8a65" : "#e43b4f"}`,
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: `${menuItem?.isVeg ? "#0f8a65" : "#e43b4f"}`,
                    borderRadius: "50%",
                  }}
                ></div>
              </Tag>
            </Flex>

            <Paragraph>{menuItem?.description}</Paragraph>
            <Text className="price">&#8377; {`${menuItem?.price}`}</Text>
            <Rate disabled allowHalf defaultValue={2.5} />
          </Flex>
        </Flex>
      </Drawer>
    </div>
  );
}
