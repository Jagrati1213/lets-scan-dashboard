import {
  Button,
  Drawer,
  Form,
  FormProps,
  Input,
  InputNumber,
  Spin,
} from "antd";
import React, { FormEvent, useState } from "react";
import { MenuFormProps, drawerOptions } from "../../types";
import Style from "../../styles/_AddMenuDrawer.module.scss";
import { createMenuItemHandler } from "../../utils/menuItemHandler";
interface AddMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<drawerOptions>>;
}

export default function AddMenuDrawer({ open, setOpen }: AddMenuProps) {
  const [file, setFile] = useState<File | undefined | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onClose = () => {
    setOpen((prev) => ({ ...prev, isAddMenuOpen: false }));
  };

  // UPLOAD FILE
  const handleUploadImage = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target?.files[0]);
  };

  // SEND ITEM"S DATA TO API
  const handleMenuItemCreate = async (values: any) => {
    values.image = file;

    // Append the form data to the FormData object
    const data = new FormData();
    data.append("name", values.name);
    data.append("price", values.price.toString());
    data.append("desc", values.desc);
    if (values.image) {
      data.append("image", values.image);
    }
    //INVOKE CREATE MENU API
    setIsLoading(true);
    await createMenuItemHandler(values);
    setIsLoading(false);
    form.resetFields();
    onClose();
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
        closable={!isLoading}
        onClose={onClose}
        open={open}
        getContainer={false}
        maskClosable={!isLoading}
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
              rules={[{ required: true, message: "add item name!" }]}
            >
              <Input placeholder="dosh" />
            </Form.Item>

            <Form.Item<MenuFormProps>
              label="Item Price"
              name="price"
              rules={[{ required: true, message: "add price" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={10}
                placeholder="100"
              />
            </Form.Item>

            <Form.Item<MenuFormProps>
              name={"image"}
              rules={[{ required: true, message: "upload item image" }]}
            >
              <input
                type="file"
                name="image"
                value={file}
                onChange={handleUploadImage}
                accept="image/*"
                required
              />
            </Form.Item>

            <Form.Item<MenuFormProps>
              label="Description"
              name="desc"
              rules={[{ required: true, message: "Add item details" }]}
            >
              <Input.TextArea placeholder="delicious food" rows={13} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Add Menu
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Drawer>
    </div>
  );
}
