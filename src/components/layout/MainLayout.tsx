import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

const { Header, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header
          style={{ padding: 0, background: "#001529", position: "relative" }}
        >
          {/* Sidebar toggle button */}
          <Button
            type="primary"
            onClick={toggleSidebar}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px", // Move to the top-right corner
              zIndex: 1000,
              transition: "right 0.3s ease", // Smooth transition
            }}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
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
      </Layout>
    </Layout>
  );
};

export default MainLayout;
