import {
  Button,
  Drawer,
  Form,
  FormProps,
  Input,
  InputNumber,
  Spin,
  Upload,
} from "antd";
import React, { useState } from "react";
import { MenuFormProps, DrawerOptionsType } from "../../types";
import Style from "../../styles/_AddMenuDrawer.module.scss";
import {
  createMenuItemHandler,
  uploadMenuItemImage,
} from "../../apis/menuItemHandler";
import { useAppDispatch } from "../../store/store";
import { addMenuItemAction } from "../../store/slices/menuListSlice";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadFile } from "antd/es/upload";

interface AddMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<DrawerOptionsType>>;
}

export default function AddMenuDrawer({ open, setOpen }: AddMenuProps) {
  // State
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | undefined | any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean | any>(false);
  const [form] = Form.useForm();

  const onClose = () => {
    setOpen((prev) => ({ ...prev, isAddMenuOpen: false }));
    setFileList([]);
    form.resetFields();
  };

  // UPLOAD FILE
  const handleUploadImage = async (file: RcFile): Promise<void> => {
    // CREATE FORM
    const data = new FormData();
    data.append("image", file);

    // INVOKE API & SET STATE
    setIsImageLoading(true);
    try {
      const URL = await uploadMenuItemImage(data);
      setFile(URL);
      if (typeof URL === "string") {
        setFileList((prevList) => [
          ...prevList,
          {
            uid: file?.uid,
            name: file?.name,
            status: "done",
            url: URL,
          },
        ]);
      }
    } catch (error) {
      console.error("ERROR IMAGE UPLOAD FAILED:", error);
    } finally {
      setIsImageLoading(false);
    }
  };

  // SEND ITEM"S DATA TO API
  const handleMenuItemCreate = async (values: any) => {
    values.image = file;
    setIsLoading(true);

    //INVOKE CREATE MENU API
    try {
      const createItem = await createMenuItemHandler(values);
      dispatch(addMenuItemAction(createItem));
    } catch (error) {
      console.log("ERROR MENU ITEM NOT CREATE FAILED");
    } finally {
      // RESET THE DRAWER
      setIsLoading(false);
      form.resetFields();
      onClose();
    }
  };

  // IF USER NOT ADDED FIELD
  const onFinishFailed: FormProps<MenuFormProps>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={Style.add_menu_drawer}>
      <Drawer
        title="Add Menu"
        placement="right"
        closable={!(isLoading || isImageLoading)}
        onClose={onClose}
        open={open}
        getContainer={false}
        maskClosable={!(isLoading || isImageLoading)}
      >
        <Spin spinning={isLoading}>
          <Form
            name="add-menu"
            form={form}
            onFinish={handleMenuItemCreate}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            variant="outlined"
            encType="multipart/form-data"
          >
            <Form.Item<MenuFormProps>
              label="Item Name"
              name="name"
              rules={[{ required: true, message: "Name require!" }]}
            >
              <Input placeholder="dosh" />
            </Form.Item>

            <Form.Item<MenuFormProps>
              label="Item Price"
              name="price"
              rules={[{ required: true, message: "Price require!" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={10}
                placeholder="100"
              />
            </Form.Item>

            <Form.Item<MenuFormProps>
              label="Item Image"
              name="image"
              rules={[{ required: true, message: "Image require!" }]}
            >
              <Upload
                name="image"
                maxCount={1}
                multiple={false}
                accept="image/*"
                beforeUpload={handleUploadImage}
                fileList={fileList}
                listType="picture-card"
              >
                <Button icon={<UploadOutlined />} loading={isImageLoading}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item<MenuFormProps>
              label="Description"
              name="desc"
              rules={[{ required: true, message: "Description require!" }]}
            >
              <Input.TextArea placeholder="delicious food" rows={13} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={isImageLoading}
              >
                Add Menu
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Drawer>
    </div>
  );
}
