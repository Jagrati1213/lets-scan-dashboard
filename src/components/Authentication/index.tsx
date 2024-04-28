import { Button, Flex, Form, FormProps, Input, message } from "antd";
import Style from "../../styles/_Authentication.module.scss";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { AuthFieldTypes } from "../../types";
import "../../styles/global.scss";
import { signUpHandler } from "../../utils/authHandler";

export default function Authentication() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [form] = Form.useForm();
  const handleAuthentication: FormProps<AuthFieldTypes>["onFinish"] = async (
    values
  ) => {
    if (isSignUp) {
      const { username, email, password } = values;
      const data = await signUpHandler({ username, email, password });
      console.log(data);
      if (data.status === 400 || data.status === 500) {
        message.error(data.message);
      } else {
        message.success(data.message);
      }
    }
  };
  return (
    <div className={Style.auth_form}>
      <Flex align="center" vertical gap={"20px"}>
        <Title level={5}>ORDER MINDER</Title>
        <Form
          form={form}
          title="Login OrderMinder"
          layout="vertical"
          onFinish={handleAuthentication}
        >
          <Form.Item
            name={"username"}
            rules={[{ required: true }]}
            label={"User Name"}
          >
            <Input placeholder="@username" />
          </Form.Item>
          {isSignUp && (
            <Form.Item
              name={"email"}
              rules={[{ required: true }]}
              label={"Email"}
            >
              <Input placeholder="xyz@gmail.com" />
            </Form.Item>
          )}

          <Form.Item
            name={"password"}
            rules={[{ required: true }]}
            label={"Password"}
          >
            <Input.Password placeholder="....." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              {isSignUp ? "Sign up" : "Sign In"}
            </Button>
          </Form.Item>
          <Flex vertical align="center">
            {isSignUp ? (
              <div>
                Already have account?
                <Button type="link" onClick={() => setIsSignUp(false)}>
                  Signin
                </Button>
              </div>
            ) : (
              <div>
                New to orderMinder?
                <Button type="link" onClick={() => setIsSignUp(true)}>
                  Signup
                </Button>
              </div>
            )}
          </Flex>
        </Form>
      </Flex>
    </div>
  );
}
