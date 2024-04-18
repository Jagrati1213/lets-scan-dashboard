import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Style from "../styles/MainContainer.module.scss";
import { Navigation } from "./Navigation";
import { SiderContainer } from "./SiderContainer";

export const MainContainer = () => {
  return (
    <Layout className={Style.main_container}>
      <Header>
        <Navigation />
      </Header>
      <Layout>
        <SiderContainer />
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
