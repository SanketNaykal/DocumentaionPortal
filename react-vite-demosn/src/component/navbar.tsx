import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./navbar.scss";
import { Fragment } from "react/jsx-runtime";
import Layout from "../react-vite-demosn_layout";
import { Button, Container, Form, Nav, Navbar, NavDropdown,} from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { green, lightGreen } from "@mui/material/colors";

function CustomNavbar() {
  const auth = useContext(AuthContext);
  if (!auth) {
    // Handle missing context (e.g., show loading or error)
    return <div>Loading...</div>;
  }
  const { currentUser, logout } = auth;
  return (
    <Fragment>
      <div className='container-fluid '>
        <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#admin_panel">Admin Panel</a>
              </li>
              <li className="nav-item">
                {currentUser && (<span><a href="#admin_panel"><FiberNewIcon sx={{ color: lightGreen[600], fontSize: 40 }}/></a></span>)}
              </li>
            </ul>
            <form className="d-flex float-right" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            {currentUser ? (<span className="d-flex border border-primary rounded p-2 align-items-center" onClick={logout}>
              <LogoutIcon /><p className="mb-0 mt-0">Logout</p></span>) 
              : 
              (<span className="border border-primary rounded p-2">
                <a href="#login" className="d-flex align-items-center" style={{ textDecoration: "none" }}><LoginIcon /><p className="mb-0 mt-0">Login</p></a></span>)}
          </div>
        </div>
      </nav>
      </div>
      {/* <Navbar expand="lg" className="bg-body-tertiary w-100 ps-5 pe-5 shadow-sm">
        <Container fluid>
          <Navbar.Toggle className="ms-0 me-2" aria-controls="navbarScroll" />
          <Navbar.Brand href="#/">Navbar scroll</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#admin_panel">
                Admine Panel
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </Fragment>
  );
}
export default CustomNavbar;
