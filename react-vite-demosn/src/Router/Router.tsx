import { Fragment } from "react/jsx-runtime";
import Admin_panel from "../Pages/admin_panel";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Router() {
    return (
        <Fragment>
            <BrowserRouter>
            <Routes>
                <Route path="admin_panel" element={<Admin_panel/>} />
            </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

export default Router;