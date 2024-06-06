import { Drawer, Flex, Image, Rate } from "antd";
import React from "react";
import { MenuListType, DrawerOptionsType } from "../../types";
import Title from "antd/es/typography/Title";
import Style from "../../styles/_MenuViewDrawer.module.scss";

interface MenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<DrawerOptionsType>>;
  menuData: MenuListType;
}
export default function MenuViewDrawer({ open, setOpen, menuData }: MenuProps) {
  const onClose = () => {
    setOpen((prev) => ({ ...prev, isMenuViewOpen: false }));
  };
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
          <Image src={menuData?.image} preview={false} />
          <Flex vertical align="start" style={{ width: "100%" }}>
            <Title level={5}>{menuData?.name}</Title>
            <p>{menuData?.description}</p>
            <p className="price">{`Price : ${menuData?.price}`}</p>
            <Rate disabled allowHalf defaultValue={2.5} />
          </Flex>
        </Flex>
      </Drawer>
    </div>
  );
}
