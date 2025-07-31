import { Fragment } from "react/jsx-runtime";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "quill/dist/quill.core.css";
import katex from 'katex';// ES6
import 'katex/dist/katex.min.css'; // ES6
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modal from "bootstrap/js/dist/modal";
import "./editor.scss";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import moment from "moment";
import { data, href, useNavigate } from "react-router-dom";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { blue } from "@mui/material/colors";

window.katex = katex;

interface editorProps {
  editor_type: string;
  blog_id: number;
  blog_title: string;
  blog_content: string;
}

function editor({editor_type, blog_id, blog_title, blog_content}: editorProps) {
  const API_BASE = import.meta.env.VITE_API_BASE || 'https://documentaionportalbackend.onrender.com';
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [errMessage, setError] = useState<string | null>(null);
    const [errStatus, setErrStatus] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    // Set initial value only when editor_type or blog_content changes
    useEffect(() => {
        if (editor_type === "edit") {
            setValue(blog_content);
            setTitle(blog_title);
            //console.log("blog_content", blog_content);
        }
        if (editor_type === "createIN") {
            setValue(blog_content);
            setTitle(blog_title);
            //console.log("blog_content", blog_content);
        }
        if (editor_type === "create") {
            setValue(blog_content);
            setTitle(blog_title);
            //console.log("blog_content", blog_content);
        }
    }, [editor_type, blog_id, blog_content]);
    const handleDraftSave = async (event: React.FormEvent) => {
      event.preventDefault();
        // Logic to save the draft
        try{
          if (editor_type === "edit") {
            // Logic to update the draft
            await axios.put(`${API_BASE}/api/posts/${blog_id}`, { title, content: value }, { withCredentials: true });
          }
        }catch(err){
            console.error("Error saving draft:", err);
        }
        try{
          if (editor_type === "createIN") {
            // Logic to create a new draft
            console.log("Creating new draft");
            console.log("Draft saved:", { title, content: value });
            await axios.post(`${API_BASE}/api/posts`, { title, content: value, date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") }, { withCredentials: true });
            const setblogcode = await axios.post(`${API_BASE}/api/processedDatas/setNewBlogCode/${blog_id}`)
            console.log("lastBlogId:", setblogcode.data);
          }
        }catch(err){
            console.error("Error saving draft:", err);
            const error = err as AxiosError<{ message: string }>;
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                setErrStatus(error.response.status);
            } else {
                setError("An unknown error occurred.");
                //await logout(); // Logout if an error occurs
            }
            if (modalRef.current) {
            // @ts-ignore
            const modal = new Modal(modalRef.current);
            modal.show();
          }
        }
        try{
          if (editor_type === "create") {
            // Logic to create a new draft
            console.log("Creating new draft");
            console.log("Draft saved:", { title, content: value });
            await axios.post(`${API_BASE}/api/posts`, { title, content: value, date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") }, { withCredentials: true });
            const setblogcode = await axios.post(`${API_BASE}/api/processedDatas/setNewBlogCode`)
            console.log("lastBlogId:", setblogcode.data.data);
          }
        }catch(err){
            console.error("Error saving draft:", err);
            const error = err as AxiosError<{ message: string }>;
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                setErrStatus(error.response.status);
            } else {
                setError("An unknown error occurred.");
                //await logout(); // Logout if an error occurs
            }
            if (modalRef.current) {
            // @ts-ignore
            const modal = new Modal(modalRef.current);
            modal.show();
          }
        }
    }
    
    const modules = {
    toolbar: [
      [{"font": []}],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [{"background": []}, {"color": []}], // dropdown with defaults from theme
      ["link", "image", "video"], // link, image, video button
      ["formula"], // formula button
      ["code-block"], // code block button
      ["clean"], // remove formatting button
    ],
    formula: true
  };
  const formats = ["header", "font", "size", "bold", "italic", "underline", "strike","align", "color", "background", "list", "bullet", "indent", "link", "image", "video", "formula", "code-block", "clean"];
  return (
    <Fragment>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true" ref={modalRef}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  <div className="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="25"><path fill="#e60000" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                    <div className="ps-2 pe-2">
                      <p>({errStatus}) {errMessage}</p>
                    </div>
                  </div>
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {errStatus === 401 ? (
                  <p className="text-danger">You are not authorized to perform this action. Please log in.</p>): <p className="text-danger">An error occurred: {errMessage}</p>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { setError(null); setErrStatus(null); navigate("/login")}}>Login</button>
              </div>
            </div>
          </div>
        </div>

        <form className="mt-3 rounded-3 shadow p-3">
          <p className="text-center fs-3">{editor_type === "edit" ? "Edit Blog" : editor_type === "createIN" ? "CreateIN New Blog" : "Create New Blog"}</p>  
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Blog title
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputEmail3" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="editor" className="col-sm-2 col-form-label">
              Blog content
            </label>
            <div className="col-sm-10">
                <ReactQuill id="editor" theme="snow" value={value} onChange={setValue} modules={modules} formats={formats}/>
            </div>
          </div>
          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                <label className="form-check-label" htmlFor="gridRadios1">
                  First radio
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                <label className="form-check-label" htmlFor="gridRadios2">
                  Second radio
                </label>
              </div>
            </div>
          </fieldset>
          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <input className="form-check-input disabled" type="checkbox" id="gridCheck1" disabled/>
                <label className="form-check-label disabled" htmlFor="gridCheck1">
                  Example checkbox {blog_id}
                </label>
              </div>
            </div>
          </div>
          <div className="row g-2">
            <div className="col-sm-7 d-flex ">
              <p><a target="_blank" rel="noopener noreferrer" href="https://katex.org/docs/support_table" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
              <HelpOutlineIcon sx={{ fontSize: 20, color: blue[700] }}/><i>Support table for formulas</i></a></p>
            </div>
            <div className="col-sm ps-2 pe-2 d-flex justify-content-end">
                <button className="ms-1 me-1 btn btn-primary" type="button" onClick={handleDraftSave}>  
                    Save as draft
                </button>
                <button type="submit" className="ms-1 me-1 btn btn-primary">
                    Post
                </button>
            </div>
          </div>
        </form>
    </Fragment>
  );
}
export default editor;