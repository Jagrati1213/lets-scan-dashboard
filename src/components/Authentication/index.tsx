import { Button, Flex, Form, Input } from "antd";
import Style from "../../styles/_Authentication.module.scss";
import Title from "antd/es/typography/Title";
import "../../styles/global.scss";

export default function Authentication() {
  const [form] = Form.useForm();
  return (
    <div className={Style.auth_form}>
      <Flex align="center" vertical gap={"20px"}>
        <Title level={5}>ORDER MINDER</Title>
        <Form form={form} title="Login OrderMinder" layout="vertical">
          <Form.Item
            name={"userName"}
            rules={[{ required: true }]}
            label={"User Name"}
          >
            <Input placeholder="@username" />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[{ required: true }]}
            label={"Password"}
          >
            <Input.Password placeholder="....." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
}
