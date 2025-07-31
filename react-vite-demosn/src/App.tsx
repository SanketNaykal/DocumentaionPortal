import { Fragment, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import CustomNavbar from "./component/navbar";
import Sidebar from "./component/sidebar";
import Alart from "./component/Alart";
import Home from "./Pages/home_page";
import Admin_panel from "./Pages/admin_panel";
import Register from "./Pages/register";
import Login from "./Pages/login";
import Layout from "./react-vite-demosn_layout";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";


function App() {
  const API_BASE = import.meta.env.VITE_API_BASE || 'https://documentaionportalbackend.onrender.com';
  const [message, setMessage] = useState("");
  const faychAPI = async () => {
    const response = await axios.get(`${API_BASE}/api/hello`); //Demo data https://jsonplaceholder.typicode.com/posts
    console.log(response.data);
    setMessage(response.data.message);
  };

  useEffect(() => {
    faychAPI();
  }, []);
  return (
    <Fragment>
      <div className="navbar"> {/* <CustomNavbar />{" "} */}</div>
      {/* links */}
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/admin_panel" element={<Admin_panel />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home apiMessage={message} />} />
          </Route>
        </Routes>
      </Router>
      {/* <div className="container mt-4">
        <Router>
          <Routes >
              <Route path="/home_page" element={<Home />} />
          </Routes>
        </Router>
      </div> */}
    </Fragment>
  );
}

export default App;
