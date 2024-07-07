import { Button, Divider, Flex, Form, FormProps, Input, message } from "antd";
import Style from "../../styles/_Authentication.module.scss";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { AuthFieldT, VenderResponseT } from "../../types";
import "../../styles/global.scss";
import { setUserDetailsAction } from "../../store/slices/vendorSlice";
import { useDispatch } from "react-redux";
import { signUp } from "../../apis/auth/signup";
import { signIn } from "../../apis/auth/signin";

export default function AuthBoard() {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleAuthentication: FormProps<AuthFieldT>["onFinish"] = async (
    values
  ): Promise<any> => {
    const { username, email, password, resName } = values;
    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp({ username, email, password, resName });
        setIsSignUp(false);
      } else {
        const data = await signIn({ username, password });
        if (!data) throw new Error();
        dispatch(setUserDetailsAction(data));
      }
    } catch (error: any) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuest = async (): Promise<VenderResponseT["data"] | unknown> => {
    setIsLoading(true);
    try {
      const data = await signIn({ username: "s", password: "s" });
      if (!data) throw new Error();
      dispatch(setUserDetailsAction(data));
    } catch (error: any) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={Style.auth_form}>
      <Flex align="center" vertical gap={"20px"}>
        <Title level={5}>LET'S SCAN</Title>
        <Form
          form={form}
          title="Login Let's Scan"
          layout="vertical"
          onFinish={handleAuthentication}
        >
          <Form.Item
            name={"username"}
            rules={[
              { required: true, message: "name required!" },
              {
                max: 20,
                message:
                  "your name is too long. maximum length is 20 character",
              },
            ]}
            label={"Vender UserName"}
          >
            <Input placeholder="vendorname123" />
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
            <Button
              type="primary"
              block
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {isSignUp ? "Sign up" : "Sign In"}
            </Button>

            <Divider children={"or"} />
            <Button onClick={handleGuest} block>
              Guest
            </Button>
          </Form.Item>

          <Flex vertical align="center">
            {isSignUp ? (
              <div>
                Already have account?
                <Button type="link" onClick={() => setIsSignUp(false)}>
                  SignIn
                </Button>
              </div>
            ) : (
              <div>
                New to orderMinder?
                <Button type="link" onClick={() => setIsSignUp(true)}>
                  SignUp
                </Button>
              </div>
            )}
          </Flex>
        </Form>
      </Flex>
    </div>
  );
}
