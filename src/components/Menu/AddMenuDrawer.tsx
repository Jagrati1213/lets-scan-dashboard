import { Button, Drawer, Form, FormProps, Input, InputNumber } from "antd";
import React from "react";
import Style from "../../styles/_AddMenuDrawer.module.scss";
import { MenuFormProps } from "../../types";
import TextArea from "antd/es/input/TextArea";

interface MenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddMenuDrawer({ open, setOpen }: MenuProps) {
  const onClose = () => {
    setOpen(false);
  };
  const onFinish: FormProps<MenuFormProps>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

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
        closable={true}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <Form
          name="add-menu"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          variant="outlined"
        >
          <Form.Item<MenuFormProps>
            label="Name"
            name="name"
            rules={[{ required: true, message: "add item name!" }]}
          >
            <Input placeholder="dosh" />
          </Form.Item>

          <Form.Item<MenuFormProps>
            label="price"
            name="price"
            rules={[{ required: true, message: "add price" }]}
          >
            <InputNumber style={{ width: "100%" }} min={10} placeholder="100" />
          </Form.Item>

          <Form.Item<MenuFormProps> label="Description" name="desc">
            <Input.TextArea placeholder="delicious food" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
