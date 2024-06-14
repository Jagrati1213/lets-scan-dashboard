import { Avatar, Button, Flex, List, Tooltip, message } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import MenuViewDrawer from "./MenuViewDrawer";
import AddMenuDrawer from "./AddMenuDrawer";
import { DrawerOptionsType, QRDetailsTypes } from "../../types";
import EditMenuDrawer from "./EditMenuDrawer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteMenuItemAction,
  fetchMenuListAction,
} from "../../store/slices/menuListSlice";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { deleteMenuItemHandler } from "../../apis/menuItemHandler";
import Style from "../../styles/_Menu.module.scss";
import { RiQrCodeFill } from "react-icons/ri";
import { generateQRCodeHandler } from "../../apis/generateQRHandler";
import QRModal from "../QR/QRModal";

export default function Menu() {
  // SLICE STATE
  const dispatch = useAppDispatch();
  const { menulist } = useAppSelector((store) => store.menuListSlice);
  const { user } = useAppSelector((store) => store.authSlice);

  // STATE
  const [DrawerOptionsType, setDrawerOptions] = useState<DrawerOptionsType>({
    isAddMenuOpen: false,
    isMenuViewOpen: false,
    isMenuEditorOpen: false,
  });
  const [loading, setLoading] = useState(true);
  const [menuItemId, setMenuItemId] = useState<string | undefined | null>();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrDetails, setQrDetails] = useState<QRDetailsTypes>({
    image: null,
    url: null,
  });

  // HANDLE DRAWER
  const showDrawer = (option: string) => {
    setDrawerOptions((prev) => ({ ...prev, [option]: true }));
  };

  // DELETE
  const deleteMenuItem = async (id: string | null) => {
    if (!id) return;
    const deleted = await deleteMenuItemHandler({
      menuId: id,
    });
    if (deleted) {
      dispatch(deleteMenuItemAction(id));
    }
  };

  // FETCH MENULIST
  useEffect(() => {
    dispatch(fetchMenuListAction()).finally(() => setLoading(false));
  }, [dispatch]);

  // CHECK MENUITEMS IS NOT NULL
  const checkMenuItems = async () => {
    if (menulist.length === 0)
      return message.error("ADD MENU ITEMS, FOR GENERATE QR");
    if (!user._id) return message.error("USER NOT FOUNDED!");
    const { QRimageSrc, url } = await generateQRCodeHandler(user?._id);
    if (QRimageSrc) {
      setIsQrModalOpen(true);
      setQrDetails({ image: QRimageSrc, url: url });
    }
  };
  return (
    <div className={Style.menu_container}>
      <Flex gap="40px" vertical>
        <Flex justify={"space-between"} align="center">
          <Title level={5}>Menu List </Title>

          <Flex gap="middle">
            <Button
              type="primary"
              shape="round"
              icon={<RiQrCodeFill />}
              onClick={checkMenuItems}
            />
            <Button
              type="primary"
              shape="round"
              onClick={showDrawer.bind(null, "isAddMenuOpen")}
            >
              Add Menu
            </Button>
          </Flex>
        </Flex>

        <List
          dataSource={menulist}
          bordered
          loading={loading}
          renderItem={(item, index) => (
            <List.Item
              key={item?._id}
              actions={[
                <p style={{ fontWeight: "500" }}>&#8377; {item?.price}</p>,
                <Button
                  type="link"
                  shape="circle"
                  icon={<FaEye />}
                  onClick={() => {
                    setMenuItemId(item?._id);
                    showDrawer("isMenuViewOpen");
                  }}
                />,
                <Button
                  type="link"
                  shape="circle"
                  icon={<FaEdit />}
                  onClick={() => {
                    setMenuItemId(item?._id);
                    showDrawer("isMenuEditorOpen");
                  }}
                />,
                <Button
                  type="link"
                  danger
                  shape="circle"
                  icon={<FaTrash />}
                  onClick={() => {
                    deleteMenuItem(item?._id);
                  }}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar shape="square" size="large" src={item?.image} />
                }
                title={`${item?.name
                  ?.charAt(0)
                  .toUpperCase()}${item?.name?.slice(1)}`}
                description={`${item?.description?.slice(0, 60)}...`}
              />
            </List.Item>
          )}
        />

        <MenuViewDrawer
          open={DrawerOptionsType.isMenuViewOpen}
          setOpen={setDrawerOptions}
          menuItemId={menuItemId}
        />
        <AddMenuDrawer
          open={DrawerOptionsType.isAddMenuOpen}
          setOpen={setDrawerOptions}
        />

        <EditMenuDrawer
          open={DrawerOptionsType.isMenuEditorOpen}
          setOpen={setDrawerOptions}
          menuItemId={menuItemId}
        />

        <QRModal
          qrDetails={qrDetails}
          openQrModal={isQrModalOpen}
          setOpenQrModal={setIsQrModalOpen}
        />
      </Flex>
    </div>
  );
}
