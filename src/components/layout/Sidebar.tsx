import { Button, Layout, Menu, MenuProps } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppDispatch } from "../../redux/redux.hooks";
import { useCurrentUser } from "../../redux/feature/auth/authSlice";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

interface SidebarProps {
  collapsed: boolean;
}
//! Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const user = useCurrentUser();
  const userRoleType = user?.role ?? "GUEST";
  let sidebarItems: MenuProps["items"] = [];

  switch (userRoleType) {
    case userRole?.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      sidebarItems = [];
      break;
  }
  // console.dir(sidebarItems, { depth: null });

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      collapsedWidth={0} // Fully collapse the sidebar
      breakpoint="lg"
      width={250} // Full width when expanded
      style={{
        height: "100vh",
        left: 0,
        top: 0,
        bottom: 0,
        overflow: "auto",
      }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#001529",
        }}
      >
        <h1 style={{ fontSize: "18px" }}>Navigation</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
        style={{ padding: "6px" }}
      />
    </Sider>
  );
};

export default Sidebar;
