import { Button, Drawer, Form, FormProps, Input, InputNumber } from "antd";
import React, { useEffect } from "react";
import { MenuFormProps, MenuListType, drawerOptions } from "../../types";
import Style from "../../styles/_AddMenuDrawer.module.scss";
import { useForm } from "antd/es/form/Form";

interface EditMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<drawerOptions>>;
  menuData: MenuListType;
}
export default function EditMenuDrawer({
  open,
  setOpen,
  menuData,
}: EditMenuProps) {
  const [form] = useForm<MenuFormProps>();

  const onClose = () => {
    setOpen((prev) => ({ ...prev, isMenuEditorOpen: false }));
  };

  const onFinish: FormProps<MenuFormProps>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<MenuFormProps>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: menuData?.name,
      price: menuData?.price,
      desc: menuData?.desc,
    });
  }, [menuData]);

  return (
    <div className={Style.add_menu_drawer}>
      <Drawer
        title="Edit Menu"
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <Form
          form={form}
          name="edit-menu"
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
            <Input.TextArea placeholder="delicious food" rows={15} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
