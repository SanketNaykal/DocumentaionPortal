import { Fragment } from "react/jsx-runtime";
import CustomNavbar from "../component/navbar";
import Sidebar from "../component/sidebar";
import Editor from "../component/editor";
import { Delta } from "quill";
import Link from "quill/formats/link";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./admin_panel.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/authContext";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import { indigo, lightGreen, red } from "@mui/material/colors";
import axios from "axios";

function Admin_panel() {
  const {currentUser} = useContext(AuthContext);
  type Post = {
    idpost:number;
    title:string;
    date:string;
    uid: number;
    code:string;
  };
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res= await axios.get("/api/posts");
        //console.log("Api response new",res.data.data);
        setPosts(res.data.data);
        //console.log(posts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  const handleSidebarButtonClick = (label: string) => {
    const post = posts.find((p) => p.title === label);
    setSelectedPost(post || null);
    // Open modal
    //const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    //modal.show();
  };

  function clearmodal(): import("react").ReactNode {
    // This function is likely intended to clear the selectedPost when the modal is closed
    // Bootstrap modals trigger 'hidden.bs.modal' event when closed
    useEffect(() => {
      const modal = document.getElementById('exampleModal');
      if (!modal) return;

      const handler = () => setSelectedPost(null);
      modal.addEventListener('hidden.bs.modal', handler);

      return () => {
        modal.removeEventListener('hidden.bs.modal', handler);
      };
    }, []);

    return null;
  }
  const [editor_type, setEditorType] = useState<"create" | "createIN" | "edit">("create");
  const [blog_title, setBlogTitle] = useState("Blog Title");
  const [blog_id, setBlogId] = useState(0);
  const [blog_content, setBlogContent] = useState("Blog Content");
  function handleeditor(id: number) {
    setEditorType("edit");
    setBlogTitle(selectedPost ? selectedPost.title : "Blog Title");
    setBlogId(id);
  }
  function handleCreateIN(id: number) {
    setEditorType("createIN");
    setBlogTitle(selectedPost ? selectedPost.title : "Blog Title");
    setBlogId(id);
  }
  useEffect(() => {
    if (editor_type === "edit") {
      // Fetch the blog post data for editing
      const fetchPost = async () => {
        try {
          const res = await axios.get(`/api/posts/${blog_id}`);
          //setBlogTitle(res.data.title);
          setBlogContent(res.data.data.description);
          //console.log("blog_content",res.data.data.description);
        } catch (err) {
          console.log(err);
        }
      };

      fetchPost();
    }
    if (editor_type === "createIN") {
      setBlogTitle("Blog Title");
      setBlogContent("Blog Content");
    }
    if (editor_type === "create") {
      setBlogId(0); 
      setBlogTitle("Blog Title");
      setBlogContent("Blog Content");
    }
  }, [editor_type, blog_id]);
  const handleDelete = async(id: number) => {
    try {
          const res = await axios.delete(`/api/posts/${id}`,{withCredentials: true});
          console.log(res.data.message);
          setEditorType("create");
        } catch (err) {
          console.log(err);
        }
  };
  //{currentUser.username === posts.username ? console.log("currentUser",currentUser) : console.log("not the same user",posts.username)}
  const sidebar_menuItems = [
    { label: "sub-1", href: "#" },
    { label: "sub-2", href: "#" },
    { label: "sub-3", href: "#" },
    { label: "sub-4", href: "#" },
  ];
  const sidebar_admin_buttons = [
    { label: "sub-1" },
    { label: "sub-2" },
    { label: "sub-3" },
    { label: "sub-4" },
  ];

  return (
    <Fragment>
      {/* modal */}
      <div className="modal fade" id="exampleModal" tabIndex ={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <InfoOutlineRoundedIcon sx={{ fontSize: 30 }}/>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSelectedPost(null)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className=" row">
                  <label htmlFor="blog-title" className="col-sm-3 col-form-label text-body-secondary">Blog title:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control-plaintext fw-medium" id="blog-title" value={selectedPost ? selectedPost.title : "Example Title"}/>
                  </div>
                </div>
                <div className=" row">
                  <label htmlFor="message-text" className="col-sm-4 col-form-label text-body-secondary">Inherited From:</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control-plaintext fw-medium" id="inherited-from" value="@example/example"/>
                  </div>
                </div>
                <div className=" row">
                  <div className=" col">
                    <label htmlFor="created-date" className="col-form-label text-body-secondary">Date Created:</label>
                    <input type="text" className="form-control-plaintext fw-medium" id="created-date" value={selectedPost ? selectedPost.date : "01/01/0001"}/>
                  </div>
                  <div className=" col">
                    <label htmlFor="modified-date" className="col-form-label text-body-secondary">Date Modified:</label>
                    <input type="text" className="form-control-plaintext fw-medium" id="modified-date" value="01/01/0001"/>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn bg-primary-subtle" data-bs-dismiss="modal" onClick={() => selectedPost && handleCreateIN(selectedPost.idpost)}><HistoryEduIcon className="icon-hover-up" color="primary"/><span className="ps-1">Nest in</span></button>
              <button type="button" className="btn bg-primary-subtle" data-bs-dismiss="modal" onClick={() => selectedPost && handleeditor(selectedPost.idpost)}><EditNoteRoundedIcon className="icon-hover-up" color="primary"/><span className="ps-1">Edit / View</span></button>
              <button type="button" className="btn bg-danger-subtle" data-bs-dismiss="modal" onClick={() => selectedPost && handleDelete(selectedPost.idpost)}><DeleteOutlineRoundedIcon className="icon-hover-up" sx={{ color: red[700] }}/><span className="ps-1"></span></button>
            </div>
          </div>
        </div>
        {clearmodal()}
      </div>

      <div className="container-fluid position-relative">
        
        <div className="row">
          <div className="col-2 mt-3 ms-3 me-2 rounded-3 shadow h-auto" style={{top: 0 }}>
            <div className="sidebar-data">
              <div className="">
                <aside>
                  <Sidebar sidebar_menuItems={sidebar_menuItems} sidebar_header="Subjects" sidebar_type="admin_panel" sidebar_admin_buttons={currentUser ? posts.map((post) => ({ blogCode: post.code, label: post.title, onClick: () => handleSidebarButtonClick(post.title) })) : []}/>
                </aside>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="container-xxl d-flex justify-content-between align-items-center mt-3">
              <h2 className="fw-normal">Admin Panel </h2>
              <div className="d-flex justify-content-end">
                {currentUser && (<span onClick={() => setEditorType("create")}><FiberNewIcon sx={{ color: lightGreen[700], fontSize: 50 }}/></span>)}
                <span><p className="fw-bolder">User : {currentUser?.username}</p></span>
              </div>
            </div>
            <Editor editor_type={editor_type} blog_title={blog_title} blog_id={blog_id} blog_content={blog_content}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Admin_panel;
