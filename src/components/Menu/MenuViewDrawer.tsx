import { Drawer, Flex, Image, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { MenuListType, DrawerOptionsType } from "../../types";
import Title from "antd/es/typography/Title";
import Style from "../../styles/_MenuViewDrawer.module.scss";
import { useAppSelector } from "../../store/store";
interface MenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<DrawerOptionsType>>;
  menuItemId: string | undefined | null;
}
export default function MenuViewDrawer({
  open,
  setOpen,
  menuItemId,
}: MenuProps) {
  // STATE
  const { menulist } = useAppSelector((store) => store.menuListSlice);
  const [menuItem, setMenuItem] = useState<MenuListType>();

  // CLOSE DRAWER
  const onClose = () => {
    setOpen((prev) => ({ ...prev, isMenuViewOpen: false }));
  };

  // RENDER MENU ITEM
  useEffect(() => {
    const menuItem = menulist.find((item) => item._id === menuItemId);
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
            <Title level={5}>{menuItem?.name}</Title>
            <p>{menuItem?.description}</p>
            <p className="price">{`Price : ${menuItem?.price}`}</p>
            <Rate disabled allowHalf defaultValue={2.5} />
          </Flex>
        </Flex>
      </Drawer>
    </div>
  );
}
