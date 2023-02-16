import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div>
      <h1>Admin Header div</h1>
      <Outlet />
      <h2>footer div</h2>
    </div>
  );
}

export default Admin;
