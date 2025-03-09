import { Button, Form, Modal } from "react-bootstrap";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  createNewBlog,
  IBlog,
  resetCreateSuccess,
  resetUpdateSuccess,
  updateBlog,
} from "../redux/blog/blogSlice";

interface IProps {
  show: boolean;
  handleClose: () => void;
  action: string;
  blogSelected: IBlog | null;
}

const BlogModal = (props: IProps) => {
  const { show, handleClose, action, blogSelected } = props;
  const dispatch = useAppDispatch();
  const isCreateSuccess = useAppSelector((state) => state.blog.isCreateSuccess);
  const isUpdateSuccess = useAppSelector((state) => state.blog.isUpdateSuccess);
  const [blog, setBlog] = useState<Omit<IBlog, "id">>(
    blogSelected ?? {
      title: "",
      content: "",
      author: "",
    }
  );

  useEffect(() => {
    if (isCreateSuccess) {
      handleClose();
      toast.success("Blog saved successfully!");
      setBlog({
        title: "",
        content: "",
        author: "",
      });
      dispatch(resetCreateSuccess());
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      handleClose();
      toast.success("Blog saved successfully!");
      setBlog({
        title: "",
        content: "",
        author: "",
      });
      dispatch(resetUpdateSuccess());
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    setBlog(
      blogSelected ?? {
        title: "",
        content: "",
        author: "",
      }
    );
  }, [blogSelected]);

  const handleSave = () => {
    if (!blog.title || !blog.author || !blog.content) {
      toast.error("Title, Author and Content are required!");
      return;
    }
    if (action === "Edit" && blogSelected) {
      dispatch(
        updateBlog({
          ...blog,
          id: blogSelected.id,
        })
      );
    } else {
      dispatch(createNewBlog(blog));
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {`${action} Blog`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={blog?.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              value={blog?.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              placeholder="Content"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={blog?.author}
              onChange={(e) => setBlog({ ...blog, author: e.target.value })}
              placeholder="Author"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogModal;
