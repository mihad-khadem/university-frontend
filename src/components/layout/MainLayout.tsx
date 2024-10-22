import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "Profile",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "Users",
  },
];

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className=""
        style={{
          height: "100vh",

          left: 0,
          top: 0,
          bottom: 0,
        }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>University Management</h1>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
