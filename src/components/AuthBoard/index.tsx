import { Button, Flex, Form, FormProps, Input, message } from "antd";
import Style from "../../styles/_Authentication.module.scss";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { AuthFieldTypes } from "../../types";
import "../../styles/global.scss";
import { setUserDetailsAction } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { signUp } from "../../apis/auth/signup";
import { signIn } from "../../apis/auth/signin";

export default function AuthBoard() {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [form] = Form.useForm();

  const handleAuthentication: FormProps<AuthFieldTypes>["onFinish"] = async (
    values
  ) => {
    const { username, email, password, resName } = values;
    try {
      if (isSignUp) {
        await signUp({ username, email, password, resName });
        setIsSignUp(false);
      } else {
        const data = await signIn({ username, password });
        if (!data) return;
        dispatch(setUserDetailsAction(data));
      }
    } catch (error: any) {
      console.log("ERROR IN AUTH", error);
      return error;
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
            rules={[
              { required: true, message: "username required!" },
              { max: 20, message: "too long name" },
              {
                pattern: new RegExp("^[a-z][a-z0-9]*$"),
                message: "name start with small letter & includes numeric",
              },
            ]}
            label={"User Name"}
          >
            <Input placeholder="username123" />
          </Form.Item>

          {isSignUp && (
            <>
              <Form.Item
                name={"resName"}
                rules={[
                  { required: true, message: "restaurant name required!" },
                ]}
                label={"Restaurant Name"}
              >
                <Input placeholder="food corner" />
              </Form.Item>

              <Form.Item
                name={"email"}
                rules={[
                  {
                    type: "email",
                    message: "enter valid mail!",
                  },
                  {
                    required: true,
                    message: "email required",
                  },
                ]}
                label={"Email"}
              >
                <Input placeholder="xyz@gmail.com" />
              </Form.Item>
            </>
          )}

          <Form.Item
            name={"password"}
            rules={[{ required: true, message: "password required" }]}
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
