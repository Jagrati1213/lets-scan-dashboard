import {
  Button,
  Flex,
  List,
  Space,
  Tag,
  message,
  Typography,
  Avatar,
  Skeleton,
  Divider,
} from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import MenuViewDrawer from "./MenuViewDrawer";
import AddMenuDrawer from "./AddMenuDrawer";
import { DrawerOptionsT } from "../../types";
import EditMenuDrawer from "./EditMenuDrawer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteMenuItemAction,
  fetchMenuListAction,
} from "../../store/slices/menuListSlice";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Style from "../../styles/_Menu.module.scss";
import { RiQrCodeFill } from "react-icons/ri";
import QRModal from "../QRModal/index";
import SwitchFoodAvailability from "./SwitchFoodAvaibility";
import { deleteMenuItemHandler } from "../../apis/menu/deleteMenuItem";

const { Paragraph, Text } = Typography;
export default function Menu() {
  // SLICE STATE
  const dispatch = useAppDispatch();
  const { menulist } = useAppSelector((store) => store.menuListSlice);
  const { vendor } = useAppSelector((store) => store.authSlice);

  // STATE
  const [DrawerOptionsT, setDrawerOptions] = useState<DrawerOptionsT>({
    isAddMenuOpen: false,
    isMenuViewOpen: false,
    isMenuEditorOpen: false,
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuItemId, setMenuItemId] = useState<string | undefined | null>();
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

  // HANDLE DRAWER
  const showDrawer = (option: string) => {
    setDrawerOptions((prev) => ({ ...prev, [option]: true }));
  };

  // DELETE
  const deleteMenuItem = async (id: string | null) => {
    try {
      if (!id) return;
      const deleted = await deleteMenuItemHandler({
        menuId: id,
      });
      if (deleted) {
        dispatch(deleteMenuItemAction(id));
      }
    } catch (error) {
      return null;
    }
  };

  // FETCH MENULIST
  useEffect(() => {
    dispatch(fetchMenuListAction()).finally(() => setLoading(false));
  }, [dispatch]);

  // CHECK MENUITEMS IS NOT NULL
  const checkMenuItems = async () => {
    if (menulist.length === 0)
      return message.error({
        content: "ADD MENU ITEMS, FOR GENERATE QR",
        duration: 1,
      });
    if (!vendor?._id)
      return message.error({ content: "USER NOT FOUNDED!", duration: 1 });
    setIsQrModalOpen(true);
  };

  // RESIZE LAYOUT
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
    <div className={Style.menu_container}>
      <Flex gap="20px" vertical>
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
              disabled={vendor?.isOpen}
              onClick={showDrawer.bind(null, "isAddMenuOpen")}
            >
              Add Menu
            </Button>
          </Flex>
        </Flex>

        <List
          dataSource={menulist}
          bordered
          itemLayout={windowWidth > 991 ? "vertical" : "horizontal"}
          size="large"
          renderItem={(item, _) => (
            <>
              {loading ? (
                <div style={{ padding: "2rem" }}>
                  {Array(4)
                    .fill(null)
                    .map((_, key) => {
                      return (
                        <div key={key}>
                          <Skeleton />
                          <Divider />
                        </div>
                      );
                    })}
                </div>
              ) : (
                <List.Item
                  key={item?._id}
                  extra={windowWidth > 991 ? <img src={item?.image} /> : null}
                  actions={[
                    <p style={{ fontWeight: "500" }}>&#8377; {item?.price}</p>,
                    <Button
                      type="link"
                      shape="circle"
                      icon={<FaEye size={16} />}
                      disabled={vendor?.isOpen}
                      onClick={() => {
                        setMenuItemId(item?._id);
                        showDrawer("isMenuViewOpen");
                      }}
                    />,
                    <Button
                      type="link"
                      shape="circle"
                      icon={<FaEdit size={16} />}
                      disabled={vendor?.isOpen}
                      onClick={() => {
                        setMenuItemId(item?._id);
                        showDrawer("isMenuEditorOpen");
                      }}
                    />,
                    <Button
                      type="link"
                      danger
                      shape="circle"
                      icon={<FaTrash size={16} />}
                      disabled={vendor?.isOpen}
                      onClick={() => {
                        deleteMenuItem(item?._id);
                      }}
                    />,
                    <SwitchFoodAvailability menuItemId={item._id} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      windowWidth <= 991 && (
                        <Avatar
                          src={item?.image}
                          shape="square"
                          size={"large"}
                        />
                      )
                    }
                    title={
                      <Space>
                        <Tag
                          color={item?.isVeg ? "green" : "red"}
                          className={Style.is_veg_tag}
                          style={{
                            borderColor: `${
                              item?.isVeg ? "#0f8a65" : "#e43b4f"
                            }`,
                          }}
                        >
                          <div
                            style={{
                              width: "12px",
                              height: "12px",
                              background: `${
                                item?.isVeg ? "#0f8a65" : "#e43b4f"
                              }`,
                              borderRadius: "50%",
                            }}
                          ></div>
                        </Tag>
                        <Text>
                          {item?.name?.charAt(0).toUpperCase()}
                          {item?.name?.slice(1)}
                        </Text>
                      </Space>
                    }
                    description={
                      <Paragraph
                        ellipsis={{
                          rows: 2,
                          expanded: false,
                        }}
                      >
                        {item?.description}
                      </Paragraph>
                    }
                  />
                </List.Item>
              )}
            </>
          )}
        />

        <MenuViewDrawer
          open={DrawerOptionsT.isMenuViewOpen}
          setOpen={setDrawerOptions}
          menuItemId={menuItemId}
        />
        <AddMenuDrawer
          open={DrawerOptionsT.isAddMenuOpen}
          setOpen={setDrawerOptions}
        />

        <EditMenuDrawer
          open={DrawerOptionsT.isMenuEditorOpen}
          setOpen={setDrawerOptions}
          menuItemId={menuItemId}
        />

        <QRModal
          openQrModal={isQrModalOpen}
          setOpenQrModal={setIsQrModalOpen}
        />
      </Flex>
    </div>
  );
}
