import { Fragment } from "react/jsx-runtime";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./blog_board.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

interface BlogBoardProps {
  blog_id: number | undefined;
  blog_title: string | undefined;
  blog_content: string | undefined;
  blog_date: string | undefined;
}
function BlogBoard({ blog_id, blog_title, blog_content, blog_date }: BlogBoardProps) {
  const [blogTitle, setBlogTitle] = useState<string | undefined>(undefined);
  const [blogContent, setBlogContent] = useState("");
  const [blogId, setBlogId] = useState<number | undefined>(undefined);
  const [blogDate, setBlogDate] = useState<string | undefined>(undefined);
  useEffect(() => {
    if ( blog_id !== undefined && blog_title !== undefined && blog_content !== undefined && blog_date !== undefined) {
      setBlogId(blog_id);
      setBlogTitle(blog_title);
      setBlogContent(blog_content);
      setBlogDate(blog_date)
    }
  }, [blog_id, blog_title, blog_content, blog_date]);

  return (
    <Fragment>
      {blogTitle && blogId !== undefined ? (
        <Fragment>
          <div className="two">
            <h1>
              {blogTitle}
              <span>Posted: {moment(blogDate).fromNow()}</span>
            </h1>
          </div>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blogContent }}/>
          <small>Post ID: {blogId}</small>
          <nav className="blog-pagination">
              <a className="btn btn-outline-primary" href="#">
                Older
              </a>
              <a className="btn btn-outline-secondary disabled" href="#">
                Newer
              </a>
            </nav>
        </Fragment>
      ) : (
        <Fragment>
            <div className="blog-post">
              <h2 className="blog-post-title">Sample blog post</h2>
              <p className="blog-post-meta">
                January 1, 2014 by <a href="#">Mark</a>
              </p>
              <p>
                This blog post shows a few different types of content that's
                supported and styled with Bootstrap. Basic typography, images,
                and code are all supported.
              </p>
              <hr />
              <p>
                Cum sociis natoque penatibus et magnis{" "}
                <a href="#">dis parturient montes</a>, nascetur ridiculus mus.
                Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                venenatis vestibulum. Sed posuere consectetur est at lobortis.
                Cras mattis consectetur purus sit amet fermentum.
              </p>
              <blockquote>
                <p>
                  Curabitur blandit tempus porttitor.{" "}
                  <strong>Nullam quis risus eget urna mollis</strong> ornare
                  vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id
                  elit.
                </p>
              </blockquote>
              <p>
                Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                mattis consectetur purus sit amet fermentum. Aenean lacinia
                bibendum nulla sed consectetur.
              </p>
              <h2>Heading</h2>
              <p>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula, eget lacinia odio sem nec elit. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros.
              </p>
              <h3>Sub-heading</h3>
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <pre>
                <code>Example code block</code>
              </pre>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem
                malesuada magna mollis euismod. Fusce dapibus, tellus ac
                cursus commodo, tortor mauris condimentum nibh, ut fermentum
                massa.
              </p>
              <h3>Sub-heading</h3>
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
                consectetur. Etiam porta sem malesuada magna mollis euismod.
                Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
              <ul>
                <li>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et.
                </li>
                <li>Donec id elit non mi porta gravida at eget metus.</li>
                <li>Nulla vitae elit libero, a pharetra augue.</li>
              </ul>
              <p>
                Donec ullamcorper nulla non metus auctor fringilla. Nulla
                vitae elit libero, a pharetra augue.
              </p>
              <ol>
                <li>Vestibulum id ligula porta felis euismod semper.</li>
                <li>
                  Cum sociis natoque penatibus et magnis dis parturient
                  montes, nascetur ridiculus mus.
                </li>
                <li>
                  Maecenas sed diam eget risus varius blandit sit amet non
                  magna.
                </li>
              </ol>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Sed posuere
                consectetur est at lobortis.
              </p>
            </div>
            <div className="blog-post">
              <h2 className="blog-post-title">Another blog post</h2>
              <p className="blog-post-meta">
                December 23, 2013 by <a href="#">Jacob</a>
              </p>
              <p>
                Cum sociis natoque penatibus et magnis{" "}
                <a href="#">dis parturient montes</a>, nascetur ridiculus mus.
                Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                venenatis vestibulum. Sed posuere consectetur est at lobortis.
                Cras mattis consectetur purus sit amet fermentum.
              </p>
              <blockquote>
                <p>
                  Curabitur blandit tempus porttitor.{" "}
                  <strong>Nullam quis risus eget urna mollis</strong> ornare
                  vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id
                  elit.
                </p>
              </blockquote>
              <p>
                Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                mattis consectetur purus sit amet fermentum. Aenean lacinia
                bibendum nulla sed consectetur.
              </p>
              <p>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula, eget lacinia odio sem nec elit. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros.
              </p>
            </div>
            <div className="blog-post">
              <h2 className="blog-post-title">New feature</h2>
              <p className="blog-post-meta">
                December 14, 2013 by <a href="#">Chris</a>
              </p>
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
                consectetur. Etiam porta sem malesuada magna mollis euismod.
                Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
              <ul>
                <li>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et.
                </li>
                <li>Donec id elit non mi porta gravida at eget metus.</li>
                <li>Nulla vitae elit libero, a pharetra augue.</li>
              </ul>
              <p>
                Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                mattis consectetur purus sit amet fermentum. Aenean lacinia
                bibendum nulla sed consectetur.
              </p>
              <p>
                Donec ullamcorper nulla non metus auctor fringilla. Nulla
                vitae elit libero, a pharetra augue.
              </p>
            </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default BlogBoard;
