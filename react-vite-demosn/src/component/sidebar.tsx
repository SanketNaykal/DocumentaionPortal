import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/js/src/modal.js";
import { Fragment, useState } from "react";
import "./sidebar.scss";
import { Nav, Navbar } from "react-bootstrap";

interface SidebarProps {
  sidebar_menuItems: { label: string; onClick?: () => void}[];
  sidebar_header: string;
  sidebar_type: string;
  sidebar_admin_buttons: { label: string, blogCode: string | null; onClick?: () => void}[];
}

function Sidebar({sidebar_menuItems, sidebar_header, sidebar_type, sidebar_admin_buttons}: SidebarProps) {
  const [split1, setsplit1] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-light">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="sidebarMenu">
          <div className="sidebar-sticky">
            <div className="sidebar-header">
              {/* <h3 className="text-center">{sidebar_header}</h3> */}
              <p className="text-center fs-2 m-0">{sidebar_header}</p>
            </div>
            <ul className="list-unstyled ps-0">
                {sidebar_type === "admin_panel" ? (
                  (() => {
                      const bButtonsByParent: { [key: string]: typeof sidebar_admin_buttons } = {};
                      sidebar_admin_buttons.forEach(btn => {
                        if (btn.blogCode != null) {
                          const [blogid, , inheritId, stage] = btn.blogCode.split('*');
                          if (stage === 'b') {
                            if (!bButtonsByParent[inheritId]) bButtonsByParent[inheritId] = [];
                            bButtonsByParent[inheritId].push(btn);
                          }
                        }
                      });
                    return (
                      sidebar_admin_buttons.map((item, index) => {
                      const parts = item.blogCode ? item.blogCode.split('*') : [];
                      let codeBlogid = parts[0] || '';
                      let codeBoolean = parts[1] || '';
                      let codeInheritId = parts[2] || '';
                      let codeStage = parts[3] || '';
                      return (
                        <li className="mb-1" key={index}>
                          { codeStage === 'a' && codeBoolean === 'true' ? (
                            <Fragment>
                              <div className="btn-group">
                                <button key={index} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={item.onClick}>{item.label}</button>
                                <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" onClick={() => setOpenDropdown(openDropdown === index ? null : index)} aria-expanded={openDropdown === index}>
                                  <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                              </div>
                              {openDropdown === index && (
                                  <div id={codeBlogid} className="border rounded bg-white mt-1">
                                    {bButtonsByParent[codeBlogid]?.map((bItem, bIdx) => (
                                      <button key={`b-${bIdx}`} type="button" className="btn bg-primary-subtle ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={bItem.onClick}>{bItem.label}</button>
                                    ))}
                                  </div>
                                )}
                            </Fragment>
                          ): codeStage === 'a' && codeBoolean === 'false' ? (
                            <button key={index} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={item.onClick}>{item.label}</button>
                          ): (codeStage !== 'a' && codeStage !== 'b' && codeStage !== 'c' && codeStage !== 'd' && codeStage !== 'e' && codeStage !== 'f' && codeStage !== 'g' && codeStage !== 'h') ? (
                              <button key={index} type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={item.onClick}>{item.label}</button>
                          ):(
                            null
                          )}
                        </li>
                      );
                    })
                  )})()
                  ) : (
                    sidebar_menuItems.map((item, index) => (
                      <li className="mb-1" key={index}>
                        <a style={{ textDecoration: "none" }} className="text-white" onClick={item.onClick}>
                          <span>{item.label}</span>
                        </a>
                      </li>
                    ))
                  )
                }
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );    
}
export default Sidebar;
