import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Button } from "react-bootstrap";
import { fetchBlog, IBlog } from "../redux/blog/blogSlice";
import BlogModal from "./blog.modal";
import BlogDeleteModal from "./blog.delete.modal";
function BlogsTable() {
  const blogs = useAppSelector((state) => state.blog.listBlogs);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBlog());
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
        className="mb-3"
      >
        <h2>Blogs</h2>
        <Button
          variant="success"
          onClick={() => {
            setShowModal(true);
            setSelectedBlog(null);
          }}
        >
          Add Blog
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title </th>
            <th>Content</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.content}</td>
              <td>{blog.author}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedBlog(blog);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="m-2"
                  variant="danger"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedBlog(blog);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <BlogModal
          show={showModal}
          action={selectedBlog ? "Edit" : "Add"}
          blogSelected={selectedBlog}
          handleClose={() => setShowModal(false)}
        />
        <BlogDeleteModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          id={selectedBlog?.id ?? 0}
        />
      </Table>
    </div>
  );
}

export default BlogsTable;
