import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <h1>This is AdminLayout component</h1>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
