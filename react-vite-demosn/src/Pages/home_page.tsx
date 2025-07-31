import { Fragment } from "react/jsx-runtime";
import Sidebar from "../component/sidebar";
import BlogBoard from "../component/blog_board";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./home_page.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function Home({apiMessage} : {apiMessage: string}) {
  const API_BASE = import.meta.env.VITE_API_BASE || 'https://documentaionportalbackend.onrender.com';
  const auth = useContext(AuthContext);
  if (!auth) {
    // Handle missing context (e.g., show loading or error)
    return <div>Loading...</div>;
  }
  const { currentUser } = auth;
  type Post = {
    idpost:number;
    title:string;
    date:string;
    uid: number;
    code:string;
  };
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [blog_content, setBlogContent] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res= await axios.get(`${API_BASE}/api/posts`);
        //console.log("Api response new",res.data.data);
        setPosts(res.data.data);
        //console.log(posts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);
  const handleSidebarClick = (id: number) => {
    const post = posts.find((p) => p.idpost === id);
    setSelectedPost(post || null);
    // Open modal
    //const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    //modal.show();
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res= await axios.get(`${API_BASE}/api/posts/${selectedPost?.idpost}`);
        //console.log("Api response new",res.data.data);
        setBlogContent(res.data.data.description);
        //console.log(posts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [selectedPost]);
  const apimessage = apiMessage;
    const sidebar_menuItems = [
        { label: "Home"},
        { label: "About"},
        { label: "Services"},
        { label: "Contact"},
      ];
  return (
    <Fragment>
      <div className="container mt-4">
        <div className="row">
          {/* Smaller column, sticks to the left */}

          <div className="col-3 bg-secondary text-white" style={{ position: "sticky", top: 0 }}>
            <div className="sidebar-data">
              <div className="flex-shrink-0">
                <Sidebar sidebar_menuItems={posts.map((post) => ({ label: post.title, onClick: () => handleSidebarClick(post.idpost) }))} sidebar_admin_buttons={[]} sidebar_header="Subjects" sidebar_type="home_page"/>
              </div>
            </div>
          </div>
          {/* Larger column */}
          <div className="col-9">
            <div className="blog-main">
              <h3 className="ps-2 pt-2 pb-2 mb-4 fs-6 fw-lighter bg-body-tertiary border-bottom">
                <nav style={{ "--bs-breadcrumb-divider": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")" } as React.CSSProperties} aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Library</li>
                  </ol>
                </nav>
              </h3>
              <BlogBoard blog_id={selectedPost?.idpost} blog_title={selectedPost?.title} blog_content={blog_content} blog_date={selectedPost?.date}/>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Home;
