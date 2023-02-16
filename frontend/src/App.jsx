import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import Client from "./components/layouts/client";
import Admin from "./components/layouts/admin";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Client />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<Admin />}>
          <Route path="/admin" element={<h1>Admin page</h1>} />
        </Route>
        <Route path="*" element={<h1>404 NotFound</h1>} />
      </Routes>
    </>
  );
}

export default App;
