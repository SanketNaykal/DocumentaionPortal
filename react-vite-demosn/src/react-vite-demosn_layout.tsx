import { Fragment } from "react/jsx-runtime";
import CustomNavbar from "./component/navbar";
// import Sidebar from "./component/sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Fragment>
      <CustomNavbar />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}
export default Layout;
