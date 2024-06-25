import {
  Button,
  Drawer,
  Form,
  FormProps,
  Image,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Skeleton,
  Space,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { MenuFormT, MenuDrawerT } from "../../types";
import Style from "../../styles/_AddMenuDrawer.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { updateMenuItemAction } from "../../store/slices/menuListSlice";
import { UploadOutlined } from "@ant-design/icons";
import Upload, { RcFile } from "antd/es/upload";
import { updateMenuItemHandler } from "../../apis/menu/updateMenuItem";
import { uploadMenuItemImage } from "../../apis/uploadImage/uploadMenuItemImage";

export default function EditMenuDrawer({
  open,
  setOpen,
  menuItemId,
}: MenuDrawerT) {
  // STATE
  const dispatch = useAppDispatch();
  const { menulist } = useAppSelector((store) => store.menuListSlice);

  const [file, setFile] = useState<File | undefined | any>(null);
  const [isVeg, setIsVeg] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean | any>(false);
  const [form] = Form.useForm();

  // CLOSE DRAWER
  const onClose = () => {
    setOpen((prev) => ({ ...prev, isMenuEditorOpen: false }));
  };

  // CHANGE FOOD TYPE
  const foodType = (e: RadioChangeEvent) => {
    setIsVeg(e.target.value);
  };

  // UPLOAD FILE
  const handleUploadImage = async (file: RcFile): Promise<void | any> => {
    // CREATE FORM
    const data = new FormData();
    data.append("image", file);

    // INVOKE API & SET STATE
    setIsImageLoading(true);
    try {
      const URL = await uploadMenuItemImage(data);
      setFile(URL);
    } catch (error) {
      return null;
    } finally {
      setIsImageLoading(false);
    }
  };

  // SEND ITEM"S DATA TO API
  const handleMenuItemUpdate = async (values: any) => {
    setIsLoading(true);
    try {
      values.image = file;
      values.menuId = menuItemId;

      // INVOKE CREATE MENU API & SET IN SLICE
      const data = await updateMenuItemHandler(values);
      dispatch(updateMenuItemAction(data));
    } catch (error) {
      return null;
    } finally {
      // RESET THE DRAWER
      setIsLoading(false);
      onClose();
    }
  };

  // IF FORM SUBMISSION FAILED
  const onFinishFailed: FormProps<MenuFormT>["onFinishFailed"] = (
    errorInfo: any
  ) => {
    message.error(errorInfo);
  };

  // RENDER MENU ITEM
  useEffect(() => {
    const menuItem = menulist?.find((item) => item._id === menuItemId);
    if (menuItem) {
      form.setFieldsValue({
        name: menuItem?.name,
        price: menuItem?.price,
        desc: menuItem?.description,
        type: menuItem?.isVeg,
      });
      setFile(menuItem?.image);
    }
  }, [menuItemId]);

  return (
    <div className={Style.add_menu_drawer}>
      <Drawer
        title="Edit Menu"
        placement="right"
        closable={!(isLoading || isImageLoading)}
        onClose={onClose}
        open={open}
        getContainer={false}
        maskClosable={!(isLoading || isImageLoading)}
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
          <Form.Item<MenuFormT>
            label="Name"
            name="name"
            rules={[{ required: true, message: "add item name!" }]}
          >
            <Input placeholder="dosh" />
          </Form.Item>

          <Form.Item<MenuFormT>
            label="Price"
            name="price"
            rules={[{ required: true, message: "add price" }]}
          >
            <InputNumber style={{ width: "100%" }} min={10} placeholder="100" />
          </Form.Item>

          <Form.Item<MenuFormT> label="Image">
            <Space>
              {file ? (
                <Image width={60} height={60} src={file} />
              ) : (
                <Skeleton.Avatar active={true} />
              )}

              <Upload
                name="image"
                maxCount={1}
                multiple={false}
                accept="image/*"
                beforeUpload={handleUploadImage}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} loading={isImageLoading}>
                  Upload
                </Button>
              </Upload>
            </Space>
          </Form.Item>

          <Form.Item<MenuFormT> name={"type"} label="Choose Food Type" required>
            <Radio.Group name="food" value={isVeg} onChange={foodType}>
              <Radio value={true}>Veg</Radio>
              <Radio value={false}>Non Veg</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item<MenuFormT>
            label="Description"
            name="desc"
            rules={[
              { required: true, message: "Description required!" },
              { max: 150, message: "Reduces word" },
            ]}
          >
            <Input.TextArea placeholder="delicious food" rows={5} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading || isImageLoading}
            >
              Update Menu
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
