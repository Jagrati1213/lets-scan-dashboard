import {
  Button,
  Drawer,
  Form,
  FormProps,
  Image,
  Input,
  InputNumber,
  Space,
  message,
} from "antd";
import React, { FormEvent, useEffect, useState } from "react";
import { MenuFormProps, DrawerOptionsType } from "../../types";
import Style from "../../styles/_AddMenuDrawer.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  updateMenuItemHandler,
  uploadMenuItemImage,
} from "../../apis/menuItemHandler";
import { updateMenuItemAction } from "../../store/slices/menuListSlice";

interface EditMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<DrawerOptionsType>>;
  menuItemId: string | undefined | null;
}
export default function EditMenuDrawer({
  open,
  setOpen,
  menuItemId,
}: EditMenuProps) {
  // STATE
  const dispatch = useAppDispatch();
  const { menulist } = useAppSelector((store) => store.menuListSlice);

  const [imageUrl, setImageUrl] = useState<string | any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean | any>(false);
  const [form] = Form.useForm();

  // CLOSE DRAWER
  const onClose = () => {
    setOpen((prev) => ({ ...prev, isMenuEditorOpen: false }));
  };

  // UPLOAD FILE
  const handleUploadImage = async (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    };
    const data = new FormData();
    data.append("image", target?.files[0]);
    setIsImageLoading(true);
    const url = await uploadMenuItemImage(data);
    setImageUrl(url);
    setIsImageLoading(false);
  };

  // SEND ITEM"S DATA TO API
  const handleMenuItemUpdate = async (values: any) => {
    setIsLoading(true);
    try {
      values.image = imageUrl;
      values.menuId = menuItemId;

      // INVOKE CREATE MENU API & SET IN SLICE
      const data = await updateMenuItemHandler(values);
      dispatch(updateMenuItemAction(data));
    } catch (error) {
      console.log("ERROR IN UPDATE MENU ITEMS", error);
      return error;
    } finally {
      // RESET THE DRAWER
      setIsLoading(false);
      onClose();
    }
  };

  // IF FORM SUBMISSION FAILED
  const onFinishFailed: FormProps<MenuFormProps>["onFinishFailed"] = (
    errorInfo: any
  ) => {
    message.error(errorInfo);
  };

  // RENDER MENU ITEM
  useEffect(() => {
    const menuItem = menulist.find((item) => item._id === menuItemId);
    if (menuItem) {
      form.setFieldsValue({
        name: menuItem?.name,
        price: menuItem?.price,
        desc: menuItem?.description,
      });
      setImageUrl(menuItem?.image);
    }
  }, [menuItemId]);

  return (
    <div className={Style.add_menu_drawer}>
      <Drawer
        title="Edit Menu"
        placement="right"
        closable={!isLoading || !isImageLoading}
        onClose={onClose}
        open={open}
        getContainer={false}
        maskClosable={!isLoading || !isImageLoading}
      >
        <Form
          form={form}
          name="edit-menu"
          onFinish={handleMenuItemUpdate}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          variant="outlined"
          encType="multipart/form-data"
        >
          <Form.Item<MenuFormProps>
            label="Name"
            name="name"
            rules={[{ required: true, message: "add item name!" }]}
          >
            <Input placeholder="dosh" />
          </Form.Item>

          <Form.Item<MenuFormProps>
            label="Price"
            name="price"
            rules={[{ required: true, message: "add price" }]}
          >
            <InputNumber style={{ width: "100%" }} min={10} placeholder="100" />
          </Form.Item>

          <Form.Item<MenuFormProps> name={"image"}>
            <Space direction="horizontal">
              <Image
                width={60}
                height={60}
                src={imageUrl}
                loading={isImageLoading}
              />

              <div>
                <label htmlFor="update">Update Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleUploadImage}
                  accept="image/*"
                  id="update"
                />
              </div>
            </Space>
          </Form.Item>

          <Form.Item<MenuFormProps>
            label="Description"
            name="desc"
            rules={[{ required: true, message: "Description required!" }]}
          >
            <Input.TextArea placeholder="delicious food" rows={15} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isImageLoading}
            >
              Update Menu
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
