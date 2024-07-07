import {
  Button,
  Drawer,
  Form,
  FormProps,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Spin,
  Upload,
  message,
} from "antd";
import React, { useState } from "react";
import { MenuFormT, DrawerOptionsT } from "../../types";
import Style from "../../styles/_AddMenuDrawer.module.scss";
import { useAppDispatch } from "../../store/store";
import { addMenuItemAction } from "../../store/slices/menuListSlice";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadFile } from "antd/es/upload";
import { uploadMenuItemImage } from "../../apis/uploadImage/uploadMenuItemImage";
import { createMenuItemHandler } from "../../apis/menu/createMenuItem";

interface AddMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<DrawerOptionsT>>;
}

export default function AddMenuDrawer({ open, setOpen }: AddMenuProps) {
  // State
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | undefined | any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isVeg, setIsVeg] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean | any>(false);
  const [form] = Form.useForm();

  const onClose = () => {
    setOpen((prev) => ({ ...prev, isAddMenuOpen: false }));
    setFileList([]);
    form.resetFields();
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
      return null;
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
      return null;
    } finally {
      // RESET THE DRAWER
      setIsLoading(false);
      form.resetFields();
      onClose();
    }
  };

  // IF USER NOT ADDED FIELD
  const onFinishFailed: FormProps<MenuFormT>["onFinishFailed"] = (
    errorInfo
  ) => {
    message.warning({ content: "FILL ALL FIELDS!", duration: 1 });
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
            <Form.Item<MenuFormT>
              label="Item Name"
              name="name"
              rules={[{ required: true, message: "Name require!" }]}
            >
              <Input placeholder="dosh" />
            </Form.Item>

            <Form.Item<MenuFormT>
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

            <Form.Item<MenuFormT>
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

            <Form.Item<MenuFormT>
              name={"type"}
              label="Choose Food Type"
              required
            >
              <Radio.Group name="food" value={isVeg} onChange={foodType}>
                <Radio value={true}>Veg</Radio>
                <Radio value={false}>Non Veg</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item<MenuFormT>
              label="Description"
              name="desc"
              rules={[
                { required: true, message: "Description require!" },
                { max: 150, message: "Reduce words." },
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
                Add Menu
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Drawer>
    </div>
  );
}
